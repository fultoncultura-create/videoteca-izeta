# Videoteca Izeta

Menu online dos vídeos da Izeta hospedados no Google Drive.

## Como adicionar ou editar um vídeo

1. Abra o arquivo `videos.js` aqui no GitHub e clique no lápis (Edit).
2. Copie um bloco existente e troque:
   - `titulo`, `descricao`, `categoria`
   - `formato`: `horizontal`, `vertical` ou `quadrado`
   - `versoes.alta`: o ID do vídeo no Drive (o trecho entre `/d/` e `/view` no link)
3. Clique em **Commit changes**. A página atualiza sozinha em cerca de 1 minuto.

O vídeo precisa estar compartilhado no Drive como "Qualquer pessoa com o link".

## Qualidade (Alta / Média / Baixa)

Se houver versões mais leves do vídeo no Drive, preencha `versoes.media` e `versoes.baixa`
com os IDs delas. Sem isso, a pessoa pode reduzir a qualidade pela engrenagem do player do Drive.
