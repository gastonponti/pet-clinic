var actualizarcancha = setInterval(pedirCanchaJSON,30000,respuesta);

var timer = setTimeout(cancelarTransferencia,60000);

onmousemove = reiniciar;


function reiniciar(){
	clearTimeout(timer);
	timer = setTimeout(cancelarTransferencia,60000);
}

function cancelarTransferencia(){
	mostrarMensajeReiniciar();
	clearInterval(actualizarcancha);
	clearTimeout(timer);

}


function mostrarMensajeReiniciar(){

	onmousemove = function(){return false;}
	
	var fondo = document.createElement('div');
	fondo.id = 'cancelartransferencia';
	var contenedor = document.createElement('div');
	var contenedorhijo = document.createElement('div')
	var texto = document.createElement('p');
	var botonseguir = document.createElement('div');
	botonseguir.id = 'botonseguir';
	
	contenedor.className = 'contenedor_subirimagen';
	contenedorhijo.className = 'contenedor_hijo_subirimagen'
	
	texto.innerHTML = 'Estas ahi?? <br/> Hace rato que no te moves man!!';
	contenedor.appendChild(contenedorhijo);
	
	contenedorhijo.appendChild(texto);
	contenedorhijo.appendChild(botonseguir);
	
	fondo.appendChild(contenedor);
	
	document.getElementsByTagName('body')[0].insertBefore(fondo,document.getElementById('principal'));
	
	botonseguir.onclick = reiniciarActualizarCancha;


}
	
	

function reiniciarActualizarCancha(){
	var box = document.getElementById('cancelartransferencia');
	box.parentNode.removeChild(box);
	actualizarcancha = setInterval(pedirCanchaJSON,30000,respuesta);
	timer = setTimeout(cancelarTransferencia,60000);
}