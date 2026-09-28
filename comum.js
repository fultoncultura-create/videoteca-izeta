/* Funções comuns ao site e ao painel */
window.Videoteca = (() => {
  const PASTA_PADRAO = "1sWEqbZydUPLoa3PkiMvOfyojE3KP282r";
  const CONFIG_PADRAO = {
    nomeSite: "Videoteca Izeta",
    subtitulo: "",
    logo: "",
    cor: "#0b7a75",
    downloadAtivo: "sim",
    pastaDrive: PASTA_PADRAO
  };

  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = s => String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

  // Aceita link do Drive ou ID puro
  function idDoDrive(texto) {
    const s = String(texto || "").trim();
    const m = s.match(/\/(?:d|folders)\/([\w-]{20,})/) || s.match(/[?&]id=([\w-]{20,})/) || s.match(/^([\w-]{20,})$/);
    return m ? m[1] : "";
  }

  // Imagem: caminho no site (capas/x.jpg), endereço completo, ou ID de arquivo no Drive
  function urlImagem(valor, largura = 640) {
    const v = String(valor || "").trim();
    if (!v) return "";
    if (/^(https?:|data:|blob:)/.test(v) || /[./]/.test(v)) return v;
    return `https://drive.google.com/thumbnail?id=${v}&sz=w${largura}`;
  }
  const capaDoVideo = (v, largura) => urlImagem(v.capa || v.alta, largura);

  function formatarBytes(n) {
    n = Number(n) || 0;
    if (!n) return "";
    if (n >= 1e9) return (n / 1e9).toFixed(1).replace(".", ",") + " GB";
    return Math.max(1, Math.round(n / 1e6)) + " MB";
  }

  // Cor de destaque personalizada: versão clara para o tema escuro e texto legível sobre ela
  function aplicarCor(hex) {
    const root = document.documentElement.style;
    if (!/^#[0-9a-f]{6}$/i.test(hex || "")) {
      ["--accent-base", "--accent-dark", "--accent-ink-base", "--accent-ink-dark"].forEach(p => root.removeProperty(p));
      return;
    }
    const rgb = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
    const lum = c => { c /= 255; return c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4; };
    const L = ([r, g, b]) => .2126 * lum(r) + .7152 * lum(g) + .0722 * lum(b);
    const claro = rgb.map(c => Math.round(c + (255 - c) * .35));
    const hexDe = a => "#" + a.map(c => c.toString(16).padStart(2, "0")).join("");
    root.setProperty("--accent-base", hex);
    root.setProperty("--accent-dark", hexDe(claro));
    root.setProperty("--accent-ink-base", L(rgb) > .45 ? "#0f2130" : "#ffffff");
    root.setProperty("--accent-ink-dark", L(claro) > .45 ? "#06201f" : "#ffffff");
  }

  // Converte o catálogo antigo (videos.js) para o formato da planilha
  function doArquivoLocal() {
    const lista = window.VIDEOS || [];
    const nomes = [...new Set(lista.map(v => v.categoria))];
    const idSecao = n => "s-" + norm(n).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return {
      config: { ...CONFIG_PADRAO },
      secoes: nomes.map(n => ({ id: idSecao(n), nome: n })),
      videos: lista.map(v => ({
        id: v.versoes.alta,
        titulo: v.titulo,
        descricao: v.descricao || "",
        secao: idSecao(v.categoria),
        formato: v.formato || "horizontal",
        alta: v.versoes.alta,
        media: v.versoes.media || "",
        baixa: v.versoes.baixa || "",
        tamanho: v.tamanho || "",
        capa: v.capa || "",
        oculto: "",
        download: ""
      }))
    };
  }

  return { PASTA_PADRAO, CONFIG_PADRAO, esc, norm, idDoDrive, urlImagem, capaDoVideo, formatarBytes, aplicarCor, doArquivoLocal };
})();
