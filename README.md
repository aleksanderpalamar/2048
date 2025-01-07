# Jogo 2048 com Níveis de Dificuldade

## Descrição

Este projeto é uma implementação do popular jogo 2048, criado usando HTML, CSS e JavaScript. O jogo inclui três níveis de dificuldade (Fácil, Médio e Difícil) e suporta controles tanto por teclado quanto por mouse/toque, utilizando padrões de projeto como MVC e Strategy.

## Características

- Jogo 2048 clássico
- Três níveis de dificuldade:
  - Fácil: Cronômetro com 30 minutos
  - Médio: Cronômetro com 15 minutos
  - Difícil: Cronômetro com 10 minutos
- Controles por teclado (setas) e mouse/toque (swipe)
- Design responsivo
- Implementação usando padrões MVC e Strategy

## Como Jogar

1. Abra o arquivo `index.html` em seu navegador
2. Selecione o nível de dificuldade desejado
3. Clique em "Iniciar Jogo"
4. Use as setas do teclado ou deslize com o mouse/dedo para mover as peças
5. Combine peças com o mesmo número para criar uma peça com o valor da soma
6. O objetivo é criar uma peça com o valor 2048

## Instalação

1. Clone este repositório:
   ```
   git clone https://github.com/aleksanderpalamar/2048.git
   ```
2. Navegue até o diretório do projeto:
   ```
   cd 2048
   ```
3. Abra o arquivo `index.html` em seu navegador preferido

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- Padrões de Projeto (MVC, Strategy)

## Estrutura do Projeto
```
projeto/
├── js/
│   ├── controllers/
│   │   └── GameController.js
│   ├── models/
│   │   └── GameModel.js
│   ├── strategies/
│   │   └── MoveStrategies.js
│   ├── utils/
│   │   ├── boardUtils.js
│   │   ├── inputUtils.js
│   │   ├── moveUtils.js
│   │   └── timerUtils.js
│   ├── views/
│   │   └── GameView.js
│   ├── constants.js
│   └── game.js
├── styles/
│   └── style.css
├── index.html
├── LICENSE
└── README.md
```
### Descrição dos Componentes

- `controllers/`: Contém a lógica de controle do jogo
  - `GameController.js`: Gerencia a lógica principal do jogo
- `models/`: Contém as estruturas de dados
  - `GameModel.js`: Gerencia o estado do jogo
- `strategies/`: Implementa o padrão Strategy para movimentos
  - `MoveStrategies.js`: Define as estratégias de movimento
- `utils/`: Funções utilitárias
  - `boardUtils.js`: Utilitários para manipulação do tabuleiro
  - `inputUtils.js`: Gerenciamento de entrada do usuário
  - `moveUtils.js`: Funções auxiliares para movimentos
  - `timerUtils.js`: Funções relacionadas ao cronômetro
- `views/`: Componentes de interface
  - `GameView.js`: Renderização do jogo
- `constants.js`: Constantes globais
- `game.js`: Ponto de entrada da aplicação

## Como Contribuir

1. Faça um fork do projeto
2. Crie uma nova branch (\`git checkout -b feature/nova-funcionalidade\`)
3. Faça commit das suas alterações (\`git commit -am 'Adiciona nova funcionalidade'\`)
4. Faça push para a branch (\`git push origin feature/nova-funcionalidade\`)
5. Crie um novo Pull Request

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo \`LICENSE\` para mais detalhes.

## Autor

[Aleksander Palamar](https://aleksanderpalamar.dev)

## Agradecimentos

- Inspirado no jogo original 2048 criado por Gabriele Cirulli
- Agradecimentos a todos os contribuidores e à comunidade open-source