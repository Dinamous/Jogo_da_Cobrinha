$(document).ready(function(){
    var canvas = $('#canvas')[0]
    var dimensao = canvas.getContext('2d')
    var largura = $('#canvas').width()
    var altura = $('#canvas').height()

    var tamanho_quadro = 12
    var anda
    var comida
    var pontuacao
    var corpo_cobra

//função que gera a cobrinha pela pimeira vez
function Cria_Cobrinha(){
    var tamanho_cobrinha = 2
    corpo_cobra = [] // criando um array pra comportar todo o amanho da cobra
    for( var i =0; i < tamanho_cobrinha; i++){
        corpo_cobra.push({x:45,y:14})//posição onde a cobrinha nascerá
    }
}

//função que gera as comidas pelo campo de forma aleatoria dentro do canvas
function GeraComida(){
    comida = {
        x: Math.round(Math.random() * (largura - tamanho_quadro) / tamanho_quadro),
        y: Math.round(Math.random() * (largura - tamanho_quadro) / tamanho_quadro)
    }
}

//Gerando O corpo da cobrinha
function Corpo_Cobrinha(x, y){
    context.fillStyle = "#ffffff";
    context.fillRect(x * tamanho_quadro, y * tamanho_quadro, tamanho_quadro, tamanho_quadro);
    context.strokeStyle = "#000000";	
    context.strokeRect(x * tamanho_quadro, y * tamanho_quadro, tamanho_quadro, tamanho_quadro);
}

//Checando se a cobrinha bateu nela mesma
function Bateu(x,y,corpo){
    for(var i = 0; i < corpo.length; i++){
        if(corpo[i].x == x && corpo[i].y == y){ //bateu
          return true;
        }
      }
      return false;//não bateu
    }


    $(document).keydown(function(e){
        var botao = e.which;
          if(botao == "40" && anda != "cima"){ //apertou pra baixo
            anda = "baixo"; //return the string down
          }
          else if(botao == "39" && anda != "esquerda"){ //apertou pra direita
            anda = "direita"; //return the string right
          }
          else if(botao == "38" && ada != "baixo"){ //apertou pra cima
            anda = "cima"; //return the string up
          }
          else if(botao == "37" && anda != "direita"){//apertou pra esquerda
            anda = "esquerda";// return the string left
          }
    });

    start();
 
	function start(){
		anda = "left";
		Cria_Cobrinha();
		GeraComida();
		pontuacao = 0;
 
		if(typeof game_start != "undefined")clearInterval(game_start);
		game_start = setInterval(config, 60);
	}

})