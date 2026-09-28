/**
 * VIDEOTECA IZETA · servidor do painel administrativo
 *
 * Este código roda no Google Apps Script, ligado à planilha de dados da videoteca.
 * Ele guarda o catálogo na planilha, confere a senha do painel, lê a pasta de
 * vídeos do Drive e recebe as imagens de capa enviadas pelo painel.
 *
 * Instalação: veja o passo a passo no README do site.
 */

// 1) Antes de rodar "configurar", troque pela senha do painel (mínimo 6 caracteres).
//    Depois você pode trocar a senha pelo próprio painel.
const SENHA_INICIAL = 'TROQUE-ESTA-SENHA';

// Pasta principal dos vídeos no Google Drive (pode ser trocada no painel)
const PASTA_PADRAO = '1sWEqbZydUPLoa3PkiMvOfyojE3KP282r';

// Subpasta criada dentro da pasta principal para as capas enviadas pelo painel
const PASTA_CAPAS = 'Capas da Videoteca';

const ABAS = {
  Config: ['chave', 'valor'],
  Secoes: ['id', 'nome'],
  Videos: ['id', 'titulo', 'descricao', 'secao', 'formato', 'alta', 'media', 'baixa', 'tamanho', 'capa', 'oculto', 'download']
};
const CACHE_PUBLICO = 'catalogo-publico';

/* ─────────────── Rode esta função uma vez, pelo editor ─────────────── */

function configurar() {
  if (!SENHA_INICIAL || SENHA_INICIAL === 'TROQUE-ESTA-SENHA' || SENHA_INICIAL.length < 6) {
    throw new Error('Antes de rodar, troque SENHA_INICIAL no topo do código por uma senha com pelo menos 6 caracteres.');
  }
  const ss = SpreadsheetApp.getActive();
  if (!ss) throw new Error('Abra este código pela planilha (Extensões → Apps Script), não como projeto separado.');

  Object.keys(ABAS).forEach(function (nome) {
    let sh = ss.getSheetByName(nome);
    if (!sh) sh = ss.insertSheet(nome);
    if (sh.getLastRow() === 0) {
      sh.appendRow(ABAS[nome]);
      sh.setFrozenRows(1);
    }
  });
  ['Página1', 'Planilha1', 'Sheet1'].forEach(function (n) {
    const sh = ss.getSheetByName(n);
    if (sh && sh.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(sh);
  });

  PropertiesService.getScriptProperties().setProperty('SENHA_HASH', hash_(SENHA_INICIAL));
  DriveApp.getFolderById(PASTA_PADRAO).getName(); // confirma o acesso à pasta de vídeos
  Logger.log('Tudo pronto. Agora publique: Implantar → Nova implantação → App da Web.');
}

/* ─────────────── Entradas do App da Web ─────────────── */

// Leitura pública do catálogo (usada pelo site)
function doGet() {
  return ContentService.createTextOutput(catalogoPublico_()).setMimeType(ContentService.MimeType.JSON);
}

// Ações do painel (todas exigem a senha)
function doPost(e) {
  let req;
  try { req = JSON.parse(e.postData.contents); } catch (err) { return json_({ erro: 'Pedido inválido.' }); }
  try {
    verificarSenha_(req.senha);
    switch (req.acao) {
      case 'entrar':       return json_({ ok: true });
      case 'carregar':     return json_(lerTudo_());
      case 'salvar':       return json_(salvarTudo_(req.dados));
      case 'sincronizar':  return json_(sincronizar_());
      case 'infoArquivo':  return json_(infoArquivo_(req.id));
      case 'compartilhar': return json_(compartilhar_(req.ids || []));
      case 'enviarImagem': return json_(enviarImagem_(req));
      case 'trocarSenha':  return json_(trocarSenha_(req.novaSenha));
    }
    return json_({ erro: 'Ação desconhecida.' });
  } catch (err) {
    return json_({ erro: err.message });
  }
}

/* ─────────────── Senha ─────────────── */

function hash_(s) {
  return Utilities.base64Encode(
    Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, 'videoteca:' + s, Utilities.Charset.UTF_8));
}

function verificarSenha_(senha) {
  const cache = CacheService.getScriptCache();
  const falhas = Number(cache.get('falhas') || 0);
  if (falhas >= 10) throw new Error('Muitas tentativas com senha errada. Aguarde 15 minutos e tente de novo.');
  const certo = PropertiesService.getScriptProperties().getProperty('SENHA_HASH');
  if (!certo) throw new Error('O servidor ainda não foi configurado. Rode a função "configurar" no Apps Script.');
  if (!senha || hash_(String(senha)) !== certo) {
    cache.put('falhas', String(falhas + 1), 900);
    throw new Error('Senha incorreta.');
  }
}

function trocarSenha_(nova) {
  if (!nova || String(nova).length < 6) throw new Error('A nova senha precisa ter pelo menos 6 caracteres.');
  PropertiesService.getScriptProperties().setProperty('SENHA_HASH', hash_(String(nova)));
  return { ok: true };
}

/* ─────────────── Planilha ─────────────── */

function aba_(nome) {
  const sh = SpreadsheetApp.getActive().getSheetByName(nome);
  if (!sh) throw new Error('Aba "' + nome + '" não encontrada. Rode a função "configurar".');
  return sh;
}

function lerAba_(nome) {
  const valores = aba_(nome).getDataRange().getDisplayValues();
  const cab = valores.shift() || [];
  return valores
    .filter(function (l) { return l.some(function (c) { return c !== ''; }); })
    .map(function (l) {
      const o = {};
      cab.forEach(function (h, i) { if (h) o[h] = l[i]; });
      return o;
    });
}

function escreverAba_(nome, objetos) {
  const sh = aba_(nome), cab = ABAS[nome];
  const linhas = [cab].concat(objetos.map(function (o) {
    return cab.map(function (h) { return o[h] == null ? '' : String(o[h]); });
  }));
  sh.clearContents();
  const faixa = sh.getRange(1, 1, linhas.length, cab.length);
  faixa.setNumberFormat('@'); // tudo como texto: "02" continua "02"
  faixa.setValues(linhas);
}

function lerConfig_() {
  const config = {};
  lerAba_('Config').forEach(function (l) { if (l.chave) config[l.chave] = l.valor; });
  return config;
}

function lerTudo_() {
  return { config: lerConfig_(), secoes: lerAba_('Secoes'), videos: lerAba_('Videos') };
}

function salvarTudo_(d) {
  if (!d || !Array.isArray(d.videos) || !Array.isArray(d.secoes) || typeof d.config !== 'object') {
    throw new Error('Dados incompletos. Nada foi salvo.');
  }
  d.videos.forEach(function (v) {
    if (!v.alta) throw new Error('O vídeo "' + (v.titulo || v.id) + '" está sem o arquivo principal (Alta). Nada foi salvo.');
  });
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    escreverAba_('Secoes', d.secoes);
    escreverAba_('Videos', d.videos);
    escreverAba_('Config', Object.keys(d.config).map(function (k) { return { chave: k, valor: d.config[k] }; }));
    SpreadsheetApp.flush();
    CacheService.getScriptCache().remove(CACHE_PUBLICO);
  } finally {
    lock.releaseLock();
  }
  return { ok: true, salvoEm: new Date().toISOString() };
}

function catalogoPublico_() {
  const cache = CacheService.getScriptCache();
  const salvo = cache.get(CACHE_PUBLICO);
  if (salvo) return salvo;
  const t = lerTudo_();
  const texto = JSON.stringify({
    config: t.config,
    secoes: t.secoes,
    videos: t.videos.filter(function (v) { return v.oculto !== 'sim'; })
  });
  try { cache.put(CACHE_PUBLICO, texto, 21600); } catch (e) { /* catálogo grande demais para o cache */ }
  return texto;
}

/* ─────────────── Drive ─────────────── */

function idDoDrive_(texto) {
  const s = String(texto || '').trim();
  const m = s.match(/\/(?:d|folders)\/([\w-]{20,})/) || s.match(/[?&]id=([\w-]{20,})/) || s.match(/^([\w-]{20,})$/);
  return m ? m[1] : '';
}

function pastaPrincipal_() {
  return DriveApp.getFolderById(idDoDrive_(lerConfig_().pastaDrive) || PASTA_PADRAO);
}

function ehPublico_(f) {
  try {
    const a = f.getSharingAccess();
    return a === DriveApp.Access.ANYONE || a === DriveApp.Access.ANYONE_WITH_LINK;
  } catch (e) { return false; }
}

// Lista todos os vídeos da pasta; o painel compara com o catálogo que está na tela
function sincronizar_() {
  const arquivos = [];
  percorrer_(pastaPrincipal_(), '', arquivos);
  return { arquivos: arquivos };
}

function percorrer_(pasta, caminho, saida) {
  const arquivos = pasta.getFiles();
  while (arquivos.hasNext()) {
    const f = arquivos.next();
    if (String(f.getMimeType()).indexOf('video/') !== 0) continue;
    saida.push({
      id: f.getId(),
      nome: f.getName(),
      tamanho: f.getSize(),
      pasta: caminho,
      criado: f.getDateCreated().toISOString(),
      publico: ehPublico_(f)
    });
  }
  const pastas = pasta.getFolders();
  while (pastas.hasNext()) {
    const p = pastas.next();
    if (p.getName() === PASTA_CAPAS) continue;
    percorrer_(p, caminho ? caminho + ' / ' + p.getName() : p.getName(), saida);
  }
}

function infoArquivo_(texto) {
  const id = idDoDrive_(texto);
  if (!id) throw new Error('Não reconheci esse link do Drive.');
  let f;
  try { f = DriveApp.getFileById(id); } catch (e) { throw new Error('Arquivo não encontrado ou sem acesso para esta conta.'); }
  return { id: id, nome: f.getName(), tamanho: f.getSize(), tipo: f.getMimeType(), publico: ehPublico_(f) };
}

function compartilhar_(ids) {
  const falhas = [];
  ids.forEach(function (id) {
    try { DriveApp.getFileById(id).setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); }
    catch (e) { falhas.push(id); }
  });
  return { ok: falhas.length === 0, falhas: falhas };
}

function enviarImagem_(req) {
  if (!req.base64 || !/^image\//.test(req.tipo || '')) throw new Error('Envie um arquivo de imagem (JPG, PNG ou WebP).');
  const principal = pastaPrincipal_();
  const it = principal.getFoldersByName(PASTA_CAPAS);
  const pasta = it.hasNext() ? it.next() : principal.createFolder(PASTA_CAPAS);
  const blob = Utilities.newBlob(Utilities.base64Decode(req.base64), req.tipo, req.nome || 'capa.jpg');
  const f = pasta.createFile(blob);
  try { f.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch (e) { /* herda da pasta */ }
  return { id: f.getId() };
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
