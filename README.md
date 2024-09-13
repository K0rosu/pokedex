# Pokedex Web App

## Descrição

Esta é uma aplicação web de Pokedex que permite aos usuários visualizar e buscar por Pokémon até a geração 5 (649 Pokémon). A aplicação exibe uma lista de Pokémon e fornece detalhes individuais para cada um deles. Os dados são recuperados da [PokeAPI](https://pokeapi.co/) e incluem informações como número, nome, tipos, habilidades e estatísticas de base de cada Pokémon.

## Funcionalidades

- **Visualização de Lista de Pokémon**: Exibe todos os Pokémon até a geração 5 com imagens, nomes e números.
- **Detalhes do Pokémon**: Ao clicar em um Pokémon, os usuários são redirecionados para uma página de detalhes que contém mais informações sobre aquele Pokémon.
- **Busca**: Funcionalidade de pesquisa que permite aos usuários procurar por um Pokémon usando seu nome ou número.
- **Ordenação**: Opção para ordenar a lista de Pokémon por número ou nome.
- **Navegação**: É possível navegar entre os detalhes dos Pokémon diretamente na página de detalhes.

## Tecnologias Utilizadas

- **HTML5**: Para estruturar as páginas da aplicação.
- **CSS3**: Para estilizar a interface da aplicação e torná-la responsiva.
- **JavaScript**: Para implementar a lógica da aplicação e interagir com a PokeAPI.
- **PokeAPI**: Uma API pública usada para buscar os dados dos Pokémon.
- **Git**: Para controle de versão do código.

## Estrutura do Projeto

- `index.html`: Página principal que exibe a lista de Pokémon e permite a busca.
- `detalhes.html`: Página de detalhes onde informações mais profundas sobre o Pokémon são exibidas.
- `style.css`: Folha de estilo para formatar o layout e a aparência da aplicação.
- `pokemon.js`: Script que gerencia a busca e exibição da lista de Pokémon.
- `pokemon-detail.js`: Script responsável pela exibição dos detalhes de um Pokémon específico.
- `search.js`: Gerencia a funcionalidade de pesquisa e filtros.
- `assets/`: Pasta contendo os ícones e imagens utilizados na aplicação.

## Como Executar

1. Clone este repositório para sua máquina local:

   ```bash
   git clone https://github.com/seuusuario/pokedex-web-app.git
   ```

2. Navegue até a pasta do projeto:
    
    ```bash
   cd pokedex-web-app
   ```

3. Abra o arquivo index.html no navegador para visualizar a aplicação.

## Uso

- `Navegar pela Lista`: Ao carregar a página principal, a lista completa de Pokémon será exibida.
- `Pesquisar um Pokémon`: Digite o nome ou número de um Pokémon na barra de pesquisa para encontrá-lo rapidamente.
- `Ver Detalhes do Pokémon`: Clique em qualquer Pokémon na lista para ver mais detalhes sobre ele, como habilidades, tipos e estatísticas de batalha.
- `Navegar Entre os Pokémon`: Use as setas de navegação na página de detalhes para visualizar o Pokémon anterior ou o próximo.

## Contribuindo

1. Faça um fork do repositório.
2. Crie uma nova branch com sua funcionalidade ou correção: git checkout -b minha-feature.
3. Faça commit das suas alterações: git commit -m 'Adiciona minha nova funcionalidade'.
4. Faça o push para a branch: git push origin minha-feature.
5. Abra um Pull Request.

## Licença

   Este projeto está licenciado sob a MIT License.
