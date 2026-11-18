# Aisora Tattoo · site v2

Site da Aisora (@aisora.ink), tatuadora de Blackwork, geek/anime e oriental no Ipiranga (SP). Parceria L R G Z. Mantém a identidade do site original: preto e off-white, fumaça WebGL, Archivo expandida, Plex Mono, capítulos 01–04, menu de tela cheia e abertura com o 愛空.

- **01 Orçamento:** o configurador original da Aisora (modelo do corpo feminino/masculino, 4 passos: corpo, local, estilo, enviar), em `js/orcamento.js` + `js/zn.js` + `img/orc/`. Otimizado: só a região é obrigatória (lado e posição são opcionais) e a mensagem do WhatsApp sai em blocos (nome/idade, projeto, ideia).
- **02 Trabalhos:** 73 peças, sem título, só o estilo embaixo de cada foto do Instagram em 3 estilos (Blackwork, Geek / Anime, Oriental), com filtro, "ver mais" e visualizador (setas, arrasto, "Quero uma assim" abre o orçamento já com o estilo). Três peças usam as fotos originais em alta; a Lua vermelha mostra também o desenho no iPad.
- **03 Disponíveis:** Retratos I e Athena, com "Quero tatuar essa arte".
- **04 Contato:** endereço, Instagram, WhatsApp e mapa do Google de verdade (ampliar, como chegar, abrir no app).

Imagens geradas por `tools/prep.py`, logo por `tools/logo.py`, página por `tools/monta.py` (pasta do projeto, fora do repo). `noindex` enquanto não for aprovado.

## O que mudou em relação ao site original
- O menu rola a página até cada seção. Antes, cada item abria uma "tela" separada que escondia o resto do site.
- Os cartões das artes não ficam mais invisíveis: antes, a animação de entrada era ligada depois que o observador já tinha rodado.
- As imagens não usam mais carregamento preguiçoso (lazy).
- O código e o CSS que não eram mais usados saíram.
- Fumaça de volta: o fundo do body cobria o canvas (agora igual ao original, com mistura screen).
- Cabeçalho ganha fundo sólido fora da abertura (não passa mais por cima dos textos); WhatsApp fixo some no fim da página.
- O arquivo com tudo embutido (3 MB) virou arquivos separados.

## CONFIRMAR com a Aisora
- Se a Athena (post de rascunho) está mesmo disponível.
- As 8 "Ideias Oriental" do destaque DISPONÍVEL não entraram. Confirmar se entram.
