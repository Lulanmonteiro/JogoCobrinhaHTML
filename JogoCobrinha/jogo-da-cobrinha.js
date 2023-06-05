// Define o canvas e o contexto
var canvas = document.getElementById('campo-do-jogo');
var ctx = canvas.getContext('2d');

// Define a velocidade da cobra
var velocidade = 10;
// Define a posição inicial da cobras
var cobras = [{x: 200, y: 200}, {x: 190, y: 200}, {x: 180, y: 200}, {x: 170, y: 200}, {x: 160, y: 200}];
// Define a direção inicial da cobra
var direcao = 'direita';
// Define a pontuação inicial do jogo
var pontuacao = 0;

// Define o objeto de alimento
var comida = {
  x: Math.floor(Math.random() * (canvas.width - 10) / 10) * 10,
  y: Math.floor(Math.random() * (canvas.height - 10) / 10) * 10
};

// Função para desenhar a cobra
function desenharCobras() {
  for (let i = 0; i < cobras.length; i++) {
    ctx.fillStyle = (i == 0) ? 'green' : 'lightgreen';
    ctx.fillRect(cobras[i].x, cobras[i].y, 10, 10);
  }
}

// Função para desenhar o alimento
function desenharComida() {
  ctx.fillStyle = 'red';
  ctx.fillRect(comida.x, comida.y, 10, 10);
}

// Função principal do jogo
function jogoDaCobrinha() {
  // Apaga o campo de jogo antes de redesenhar
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move a cobra para a direção selecionada
  var cabecaCobras = {x: cobras[0].x, y: cobras[0].y};
  if (direcao == 'esquerda') cabecaCobras.x -= velocidade;
  if (direcao == 'cima') cabecaCobras.y -= velocidade;
  if (direcao == 'direita') cabecaCobras.x += velocidade;
  if (direcao == 'baixo') cabecaCobras.y += velocidade;

  // Adiciona a nova posição da cabeça da cobra
  cobras.unshift(cabecaCobras);

  // Detecta se a cobra comeu o alimento
  if (cobras[0].x == comida.x && cobras[0].y == comida.y) {
    pontuacao++;
    comida = {
      x: Math.floor(Math.random() * (canvas.width - 10) / 10) * 10,
      y: Math.floor(Math.random() * (canvas.height - 10) / 10) * 10
    };
  } else {
    // Remove a última posição da cobra se ela não comeu
    cobras.pop();
  }

  // Desenha a cobra e o alimento
  desenharCobras();
  desenharComida();

  // Verifica colisão da cobra com a parede e com o próprio corpo
  if (cobras[0].x < 0 || cobras[0].x > canvas.width - 10 || cobras[0].y < 0 || cobras[0].y > canvas.height - 10) {
    clearInterval(intervaloJogo);
    alert('Você perdeu! Renicie a Pagina para jogar novamente');
  }

  for (let i = 1; i < cobras.length; i++) {
    if (cobras[0].x == cobras[i].x && cobras[0].y == cobras[i].y) {
      clearInterval(intervaloJogo);
      alert('Você perdeu! Renicie a Pagina para jogar novamente');
    }
  }
}

// Define a direção da cobra com as teclas do teclado
document.addEventListener('keydown', function(evt) {
  if (evt.keyCode == 37 && direcao != 'direita') {
    direcao = 'esquerda';
  } else if (evt.keyCode == 38 && direcao != 'baixo') {
    direcao = 'cima';
  } else if (evt.keyCode == 39 && direcao != 'esquerda') {
    direcao = 'direita';
  } else if (evt.keyCode == 40 && direcao != 'cima') {
    direcao = 'baixo';
  }
});

// Define o intervalo para atualizar o jogo
var intervaloJogo = setInterval(jogoDaCobrinha, 100);