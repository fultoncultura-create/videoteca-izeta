/*
  CATÁLOGO DE VÍDEOS
  ------------------
  Edite este arquivo para mudar nomes, descrições ou incluir vídeos novos.

  Cada vídeo:
    titulo     – nome exibido no menu
    descricao  – texto curto que aparece no card e no player
    categoria  – agrupa os vídeos nos filtros do topo
    formato    – "horizontal" (16:9), "vertical" (9:16) ou "quadrado" (4:5)
    versoes    – IDs dos arquivos no Google Drive, por qualidade.
                 O ID é o trecho entre /d/ e /view no link do Drive.
                 "alta" é obrigatória. "media" e "baixa" são opcionais:
                 quando preenchidas, os botões Média/Baixa passam a tocar
                 esses arquivos mais leves.
    capa       – (opcional) ID de uma imagem no Drive para usar como capa.
                 Sem ela, a página usa o quadro que o Drive gera do vídeo.
*/
window.VIDEOS = [
  // ── Izeta ─────────────────────────────────────────────
  {
    titulo: "Produtos Izeta",
    descricao: "Apresentação da linha de produtos e serviços da Izeta.",
    categoria: "Izeta",
    formato: "horizontal",
    versoes: { alta: "1tOkt2AncpCvVTkZdkUgvDvLplz-jg7Is" }
  },
  {
    titulo: "Organização e Serviços de Saúde",
    descricao: "Como a Izeta organiza e entrega seus serviços de saúde.",
    categoria: "Izeta",
    formato: "horizontal",
    versoes: { alta: "1eJxP4W1pBvI-yDbocsowK_4cWaufUPcz" }
  },
  {
    titulo: "Qualidade Izeta · Versão A",
    descricao: "Vídeo institucional sobre o padrão de qualidade Izeta (versão A).",
    categoria: "Izeta",
    formato: "horizontal",
    versoes: { alta: "1MSXZzfrk-HmNmPsqm-PC6yL3FsnLYK8U" }
  },
  {
    titulo: "Qualidade Izeta · Versão B",
    descricao: "Vídeo institucional sobre o padrão de qualidade Izeta (versão B).",
    categoria: "Izeta",
    formato: "horizontal",
    versoes: { alta: "1x0nT_lRcYZBeHX_CUe6OYURz1ydUIa_z" }
  },
  {
    titulo: "Podcast · Episódio 02",
    descricao: "Episódio completo do podcast, em vídeo.",
    categoria: "Podcast",
    formato: "horizontal",
    versoes: { alta: "1pRHfFR_q0qqglPebKol8bsjYk4K8Vhhc" }
  },

  // ── SESI ──────────────────────────────────────────────
  {
    titulo: "SESI · Treinamento Tópico 02",
    descricao: "Módulo 2 do treinamento SESI.",
    categoria: "SESI",
    formato: "horizontal",
    versoes: { alta: "1J2WtcSswhHVKcVh0VUkheCkfTfX9NVH-" }
  },
  {
    titulo: "SESI Odonto · Vídeo 01",
    descricao: "Primeiro vídeo da série SESI Odonto.",
    categoria: "SESI",
    formato: "horizontal",
    versoes: { alta: "14hZaqc_9IPwrk4V8-ccDNtJtPCYmD4eW" }
  },

  // ── ANAMT ─────────────────────────────────────────────
  {
    titulo: "Aprovação ANAMT",
    descricao: "Vídeo sobre a aprovação na prova da ANAMT.",
    categoria: "ANAMT",
    formato: "horizontal",
    versoes: { alta: "1E35PMm0PpkmmH416K5BJV8F2i_LVTXjr" }
  },
  {
    titulo: "Preparatório ANAMT",
    descricao: "Apresentação do preparatório para a prova da ANAMT.",
    categoria: "ANAMT",
    formato: "horizontal",
    versoes: { alta: "1UNUZopXAbBjSJN_ArRZD-pPF5rSGSn8F" }
  },
  {
    titulo: "ANAMT · Vídeo vertical",
    descricao: "Versão vertical para Reels e Stories.",
    categoria: "ANAMT",
    formato: "vertical",
    versoes: { alta: "1PuQ3jkf5ux3u8OYQkervZgYerbJcQ7aH" }
  },
  {
    titulo: "ANAMT · Carrossel animado",
    descricao: "Carrossel animado para o feed (formato 4:5).",
    categoria: "ANAMT",
    formato: "quadrado",
    versoes: { alta: "1MxDS7cBg_6J_ObZ9ISDT1MGkmWeEAXNU" }
  },

  // ── APS ───────────────────────────────────────────────
  {
    titulo: "Trailer APS · Tablet",
    descricao: "Trailer da Atenção Primária à Saúde, versão tablet.",
    categoria: "APS",
    formato: "horizontal",
    versoes: { alta: "16OM8ZvpDV4eSnGgTE03vELcN2Jph4Yui" }
  },
  {
    titulo: "Trailer APS · Papel",
    descricao: "Trailer da Atenção Primária à Saúde, versão papel.",
    categoria: "APS",
    formato: "horizontal",
    versoes: { alta: "12rcGOKB6iCc_JDSPYmDhs-cciu746kUC" }
  },

  // ── Zeta · Avatar ────────────────────────────────────
  {
    titulo: "Zeta · Intro e 4 dicas",
    descricao: "A Zeta se apresenta e dá 4 dicas em sequência.",
    categoria: "Zeta · Avatar",
    formato: "vertical",
    versoes: { alta: "1wDUn1vy3HQVWl-hgk3-Dl41IDDteJWA4" }
  },
  { titulo: "Zeta 01 · Intro", descricao: "Apresentação da Zeta, a avatar da Izeta.", categoria: "Zeta · Avatar", formato: "vertical", versoes: { alta: "1E9wR039VnHvVnT1Xc4sKZdwCgTKBnu1J" } },
  { titulo: "Zeta 02", descricao: "Pílula 02 da série Zeta.", categoria: "Zeta · Avatar", formato: "vertical", versoes: { alta: "1TPCIeqojp3u4tTqCnO_FPjpDYgGH7Y5O" } },
  { titulo: "Zeta 03", descricao: "Pílula 03 da série Zeta.", categoria: "Zeta · Avatar", formato: "vertical", versoes: { alta: "1R7re68M7_wxI1BDVPS8z_ix238E7la9r" } },
  { titulo: "Zeta 04", descricao: "Pílula 04 da série Zeta.", categoria: "Zeta · Avatar", formato: "vertical", versoes: { alta: "169CkiHIBLub4m6YLZj3qqb6seVhT2bQv" } },
  { titulo: "Zeta 05", descricao: "Pílula 05 da série Zeta.", categoria: "Zeta · Avatar", formato: "vertical", versoes: { alta: "1P5CnLqxyXQ43Zzz3vFtwVvjvxqPqenO8" } },
  { titulo: "Zeta 06", descricao: "Pílula 06 da série Zeta.", categoria: "Zeta · Avatar", formato: "vertical", versoes: { alta: "1nkhBldgIC7g-RJaSO8UuYaItsVG8JXSX" } },
  { titulo: "Zeta 07", descricao: "Pílula 07 da série Zeta.", categoria: "Zeta · Avatar", formato: "vertical", versoes: { alta: "1SokbYkY_MuSTplNKWgcfFiAkL7k41HZl" } },
  { titulo: "Zeta 08", descricao: "Pílula 08 da série Zeta.", categoria: "Zeta · Avatar", formato: "vertical", versoes: { alta: "1tivggrJ-3PnGJAvAdC0ttZ2dGzaD5K9h" } },
  { titulo: "Zeta 09", descricao: "Pílula 09 da série Zeta.", categoria: "Zeta · Avatar", formato: "vertical", versoes: { alta: "1aUHWvY5h8tq2dJ2yNacwhr07RENS7fvv" } },
  { titulo: "Zeta 10", descricao: "Pílula 10 da série Zeta.", categoria: "Zeta · Avatar", formato: "vertical", versoes: { alta: "1hgwmrcnGKdarvsoNP71Ca1ZgNtjISxOt" } },
  { titulo: "Zeta 11", descricao: "Pílula 11 da série Zeta.", categoria: "Zeta · Avatar", formato: "vertical", versoes: { alta: "1CfHVEG4-BebK0GD88ZouehW9HsAkqpzh" } },
  { titulo: "Zeta 12", descricao: "Pílula 12 da série Zeta.", categoria: "Zeta · Avatar", formato: "vertical", versoes: { alta: "19bFOxjihMFjhH5tPT9n8NSgjtrmYENlj" } },
  { titulo: "Zeta 13", descricao: "Pílula 13 da série Zeta.", categoria: "Zeta · Avatar", formato: "vertical", versoes: { alta: "1mBhf2u6sS8LEywd5z9L4tLpn7wjj-vP0" } },
  { titulo: "Zeta 14", descricao: "Pílula 14 da série Zeta.", categoria: "Zeta · Avatar", formato: "vertical", versoes: { alta: "16ZNJXMIaV4cXDJ6A5mGT7BMgFSdZelvu" } },
  { titulo: "Zeta 15", descricao: "Pílula 15 da série Zeta.", categoria: "Zeta · Avatar", formato: "vertical", versoes: { alta: "1Om8vsVjjpKYcb8-NzPmUDpa-xtVx5mY3" } }
];
