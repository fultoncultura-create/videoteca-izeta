# Videoteca Izeta

Menu online dos vídeos da Izeta hospedados no Google Drive.

- Site: https://fultoncultura-create.github.io/videoteca-izeta/
- Painel: https://fultoncultura-create.github.io/videoteca-izeta/admin.html

## Como funciona

| Arquivo | Para que serve |
|---|---|
| `index.html` | O menu público de vídeos |
| `admin.html` | O painel administrativo (entra com senha) |
| `apps-script/Codigo.gs` | O "servidor" do painel, que roda no Google Apps Script |
| `config.js` | Endereço do Apps Script. Vazio = o site usa `videos.js` |
| `videos.js` | Catálogo antigo, usado só enquanto a planilha não estiver ligada |
| `capas/` | Capas extraídas dos vídeos que começavam com tela preta |

Os dados (vídeos, seções e configurações) ficam numa **Planilha Google**. O painel lê e grava
nessa planilha pelo Apps Script, e o site público lê a mesma planilha. Salvou no painel, o site
já mostra a mudança.

## Ligar o painel (uma vez só, uns 10 minutos)

1. **Crie a planilha.** Em https://sheets.new crie uma planilha e dê o nome de
   `Videoteca Izeta – Dados`. Use a mesma conta Google dona da pasta de vídeos.
2. **Abra o Apps Script.** Na planilha: **Extensões → Apps Script**.
3. **Cole o código.** Apague o que estiver no editor e cole todo o conteúdo de
   [`apps-script/Codigo.gs`](apps-script/Codigo.gs).
4. **Defina a senha.** Na linha `const SENHA_INICIAL = 'TROQUE-ESTA-SENHA';`, troque o texto
   entre aspas pela senha do painel (mínimo 6 caracteres). Salve (ícone de disquete).
5. **Rode a configuração.** No topo do editor, escolha a função `configurar` e clique em
   **Executar**. O Google vai pedir autorização: escolha sua conta → **Avançado** →
   **Acessar [nome do projeto] (não seguro)** → **Permitir**. Isso aparece porque o script é seu
   e não passou por revisão do Google. Ele só acessa esta planilha e o seu Drive.
6. **Publique.** **Implantar → Nova implantação** → no ícone de engrenagem escolha
   **App da Web** →
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**

   Clique em **Implantar** e copie o **URL do app da Web** (termina em `/exec`).
7. **Ligue o site.** Cole esse endereço em `config.js`, entre as aspas de
   `window.VIDEOTECA_API = "";`, e salve no GitHub.
8. **Primeiro acesso.** Abra o painel e entre com a senha. Na primeira vez ele carrega o
   catálogo atual automaticamente; confira e clique em **Salvar e publicar**.

### Se você mudar o código do Apps Script depois

Use **Implantar → Gerenciar implantações → editar (lápis) → Versão: Nova versão → Implantar**.
Assim o endereço `/exec` continua o mesmo.

## O que dá para fazer no painel

- **Vídeos:** editar título, descrição, seção, formato e capa (enviar imagem, colar link do
  Drive ou voltar à capa automática); cadastrar versões Média/Baixa; ocultar sem apagar;
  remover do menu; arrastar para reordenar ou mudar de seção.
- **Sincronizar com o Drive:** procura vídeos novos na pasta e subpastas, sugere título,
  seção e formato, e compartilha o arquivo como "qualquer pessoa com o link" se precisar.
  Também avisa quando um vídeo do menu sumiu da pasta.
- **Seções:** criar, renomear, reordenar e excluir (movendo os vídeos para outra seção).
- **Configurações:** nome do site, subtítulo, logo, cor de destaque, botão de download
  (geral e por vídeo), pasta do Drive e troca de senha.

Nada é publicado até você clicar em **Salvar e publicar** (ou Ctrl+S). A troca de senha é a
única ação que vale na hora.
