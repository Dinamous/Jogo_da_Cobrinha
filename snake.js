
var canvas 
var context 
var largura 
var altura
var tam_quadro 
var direcao
var comida
var pontuacao
var cobrarray
// =======================================
var barra = document.getElementById('barra');

function Aumenta_Barra(){
	barra.value +=1;
}


$("#botao").click(function(){
	console.log("aaaaaaa")
	 canvas = $('#canvas')[0];
	 context = canvas.getContext('2d');
	 largura = $('#canvas').width();
	 altura = $('#canvas').height();	
	 tam_quadro = 15;
	 
	start()
});
 
 
	function Cria_Cobra(){
		var tam_cobra = 2;
		cobrarray = [];
		for(var m = 0; m < tam_cobra; m++){
			cobrarray.push({x: 45, y: 14});//posição inicial em q a cobra surgirá
		}
	}
 
	function Cria_Comida(){
		//gera a comida em posição aleatoria dentro do quadro
		comida = {
			x: Math.round(Math.random() * (largura - tam_quadro) / tam_quadro),
			y: Math.round(Math.random() * (altura - tam_quadro) / tam_quadro)
		};
	}
 
	function config(){
 
		Cor_fundo();
 
		var pop_x = cobrarray[0].x;
		var pop_y = cobrarray[0].y;
 
		switch(direcao){
			case "right":
				pop_x++;
				break;
			case "left":
				pop_x--;
				break;
			case "down":
				pop_y++;
				break;
			case "up":
				pop_y--;
				break;
		}
 
 
		if(pop_x == -1 || pop_x == largura / tam_quadro || pop_y == -1 || pop_y == altura / tam_quadro || Colidiu(pop_x, pop_y, cobrarray)){
			start();
			return;
		}
 
		if(pop_x == comida.x && pop_y == comida.y){//se colidiu com a comida
			var cobra_rabo = {x: pop_x, y: pop_y};
			Aumenta_Barra();
			// adicioa na barra 
			Cria_Comida();
		}else{
			var cobra_rabo = cobrarray.pop();//senão comeu apenas movimenta
			cobra_rabo.x = pop_x;
			cobra_rabo.y = pop_y;
 
		}
 
		cobrarray.unshift(cobra_rabo);//(unshift) adiona ao inicio do vetor
 
		//responsável por fazer o corpo perseguir a cabeça
		for (var i = 0; i < cobrarray.length; i++){
			var c = cobrarray[i];
			Corpo_Cobra(c.x, c.y);
		}
 
		//FAz a comida aparecer
		Corpo_Cobra(comida.x, comida.y);
 
		
	}
 
	function Cor_fundo(){//colore o canvas
		context.fillStyle = "white";
		context.fillRect(0, 0, largura, altura);
		context.strokeStyle = "#000000";
		context.strokeRect(0, 0, largura, altura);
 
	}
 
	function Corpo_Cobra(x, y){
		context.fillStyle = "#209CCE";
		context.fillRect(x * tam_quadro, y * tam_quadro, tam_quadro, tam_quadro);
		context.strokeStyle = "#000000";	
		context.strokeRect(x * tam_quadro, y * tam_quadro, tam_quadro, tam_quadro);
	}
 
	function Colidiu(x, y, array){
		for(var i = 0; i < array.length; i++){
			if(array[i].x == x && array[i].y == y){
				return true;
			}
		}
		return false;
	}
 
	$(document).keydown(function(e){
		var key = e.which;
		if(key == "40" && direcao != "up"){
			direcao = "down";
		}
		else if(key == "39" && direcao != "left"){
			direcao = "right";
		}
		else if(key == "38" && direcao != "down"){
			direcao = "up";
		}
		else if(key == "37" && direcao != "right"){
			direcao = "left";
		}
	});
 

function start(){
	direcao = "left";
	Cria_Cobra();
	Cria_Comida();
	pontuacao = 0;


	
	if(typeof game_start != "undefined")clearInterval(game_start);
	game_start = setInterval(config, 100);
	

	
}