var contador_faltan = document.getElementById('contador');
var principal = document.getElementById('principal');

var mostrarcosas = document.getElementById('debugger');

var usuario = document.getElementById('usrname').innerHTML;
var botonPrincipal = document.getElementById('jugar');
var cancha = document.getElementById('cancha');
var posiciones = cancha.getElementsByClassName('posicion');

var posicionlibre = [];
var agregar_activado = false;
var patron = /[0-9]+/;


botonPrincipal.onclick = agregarOquitar;




setearEstadoPosiciones();
chequearDisponibilidad();
actualizarContador();


for(var i=0; i<posiciones.length;i++){
posiciones[i].onmouseover = overPosiciones;
posiciones[i].onmouseout = outPosiciones;
posiciones[i].onclick = agregarUsuario;
}










//setear el estado de las posiciones 
function setearEstadoPosiciones(){
	for(i=0; i<posiciones.length;i++){
		
		if(posiciones[i].firstChild){
			posiciones[i].estado = 'ocupado';
			posiciones[i].style.backgroundImage = 'url(imgs/ocupado'+parseInt(posiciones[i].id.match(patron),10)+'.jpg)'
		}
		else{
			posiciones[i].estado = 'libre';
		}
	}
}













//chequear el estado del boton principal
chequearEstado(posiciones);



//over posiciones cuando esta activado 
function overPosiciones(evt){
	
	if(this.estado == 'libre' &&  agregar_activado == true){
		this.style.backgroundImage = 'url(imgs/over'+parseInt(this.id.match(patron),10)+'.jpg)';
		this.style.cursor = 'pointer';

	}
	
	else if(this.estado =='ocupado'){
		var tooltip = this.firstChild.firstChild;
		tooltip.ancho = 62;
		tooltip.alto = 72;
		var caja = this.getBoundingClientRect();
		var cajaX = caja.left;
		var cajaY = caja.top;
		tooltip.style.display = 'block';
		this.onmousemove = function(evt){
			tooltip.style.left = (parseInt(evt.clientX,10) - cajaX +2 ) + 'px';
			tooltip.style.top = (parseInt(evt.clientY,10) - cajaY - tooltip.alto -5)+ 'px';
		}
	}
	

}



//out posiciones cuando esta activado
function outPosiciones(){
	var patron = /[0-9]+/;
	if(this.estado == 'libre' &&  agregar_activado == true){
		this.style.cursor = 'default';
		this.style.backgroundImage = 'url(imgs/habilitar'+parseInt(this.id.match(patron),10)+'.png)';
	}
	else if(this.estado =='ocupado'){
	//alert('juera');
	var tooltip = this.firstChild.firstChild;
	tooltip.style.display = 'none';
	}

}









//funcion principal agregarOquitar

function agregarOquitar(){
	if(this.estado == 'agregar'){
	agregar();
	}
	else if(this.estado =='quitar'){
	quitar();
	}

}






//funcion agregar
function agregar(){
	
	if(chequearDisponibilidad() == 0){
		//mostrarError('nolugar');
	}
	else{
		//si hay lugar en la cancha habilitar las posiciones libres
		habilitarPosicionesLibres();
	
	}

}





function quitar(){
	var posicion;
	for(var i=0; i<posiciones.length;i++){
		if(posiciones[i].estado == 'ocupado' && posiciones[i].firstChild.id == usuario){
			posicion = parseInt(posiciones[i].id.match(patron),10);
			break;
		}
		
	}
	mostrarPreloader();
	enviarOquitarUsuario(usuario,posicion,rtaQuitar,'quitar.php');

}





function habilitarPosicionesLibres(){
	agregar_activado = true;
	cambiarColorLibres();

}


function deshabilitarPosicionesLibres(){
	agregar_activado = false;
	restablecerColoresLibres();
}





function cambiarColorLibres(){
	var patron = /[0-9]+/;
	for(i=0; i<posiciones.length;i++){
		if(posiciones[i].estado == 'libre'){
			posiciones[i].style.backgroundImage = 'url(imgs/habilitar'+parseInt(posiciones[i].id.match(patron),10)+'.png)';
		}
	
	}

}



function restablecerColoresLibres(){
	var patron = /[0-9]+/;
	for(i=0; i<posiciones.length;i++){
		if(posiciones[i].estado == 'libre'){
			posiciones[i].style.backgroundImage = 'url(imgs/pos'+parseInt(posiciones[i].id.match(patron),10)+'.png)';
		}
	
	}


}












//chequear el estado del boton principal
function chequearEstado(objeto){
	for(var i=0; i<objeto.length;i++){
		if(objeto[i].estado =='ocupado' && objeto[i].firstChild.id == usuario){
			botonPrincipal.estado = 'quitar';
			botonPrincipal.className = 'mebajo';
			break;
		}
		else{
			botonPrincipal.estado = 'agregar';		
			botonPrincipal.className = 'juego';
		}

	}

} 













function chequearDisponibilidad(){
	posicionlibre.length = 0;
	var patron = /[0-9]+/;
	
	for(var i=0; i<posiciones.length;i++){
		if(posiciones[i].estado == 'libre') {
			posicionlibre.push(parseInt(posiciones[i].id.match(patron),10));
		}
	}
	
	
	return posicionlibre.length;
}






function actualizarContador(){
	var libres = chequearDisponibilidad();
	contador_faltan.innerHTML = libres.toString();

}







function agregarUsuario(){
	if(this.estado == 'libre' &&  agregar_activado == true){
		var posicion = parseInt(this.id.match(patron),10);
		
		if(chequearPosicion('checkposicion.php',posicion)){
			deshabilitarPosicionesLibres()
			var posicion = parseInt(this.id.match(patron),10);
			mostrarPreloader();
			enviarOquitarUsuario(usuario,posicion,rtaAgregar,'agregaracancha.php');
		}else{
		alert('alguien te gano de mano');
		//alguien te gano de mano justooo!!!
		//o error en la bd!
		}
				
	}


}

















//funcion sincronica para cuando clickeas una posicion en el momento ver si esta ocupada en el server
//para controlar el paralelismo rapidamente.

function chequearPosicion(url,posicion){
	var request = ajaxRequest();
	request.open("GET",url+'?posicion='+posicion,false);
	request.send(null);
	
	if(request.readyState == 4 && request.status == 200){
		if(request.responseText == 'false'){
			return true;
			
		}
		else{
			return false;
		}
		
			
	}

}






















function rtaAgregar(respuesta){
	if(respuesta.charAt(0) == "{"){
		var json = JSON.parse(respuesta);
		var posicion = document.getElementById('pos'+json['posicion']);
		var usuario = json['usuario'];
		var nombre = json['nombre'];
		var apellido = json['apellido'];
		var foto = json['foto'];
		posicion.estado = 'ocupado';
		insertarJugadorNuevo(posicion,usuario,nombre,apellido,foto);
		
		posicion.style.backgroundImage = 'url(imgs/ocupado'+parseInt(posicion.id.match(patron),10)+'.jpg)'
	
		sacarPreloader();
		chequearEstado(posiciones);
		actualizarContador()
		
	}
	else{
		//mostrar error no se pudo agregar. o sea, no devolvio un json.
		//por error en la conexion
	}

}




function rtaQuitar(respuesta){
	if(respuesta.charAt(0) == "{"){
		var json = JSON.parse(respuesta);
		var posicion = document.getElementById('pos'+json['posicion']);
		posicion.estado = 'libre';
		posicion.style.backgroundImage = 'url(imgs/pos'+parseInt(posicion.id.match(patron),10)+'.png)'
		posicion.removeChild(posicion.firstChild);
		sacarPreloader();
		chequearEstado(posiciones);
		//alert(respuesta);
		actualizarContador()
		
	}
	else{
		//mostrar error no se pudo agregar. o sea, no devolvio un json.
		//por error en la conexion
	}
	
}







function respuesta (json){

	var server_posiciones_ocupadas= new Array();

	for(var i=0; i<posiciones.length;i++){
		var posicionactual = i+1;
	
		if(posiciones[i].estado == 'libre'){
			for(var j=0; j<json.length;j++){
				if(json[j]['posicion'] == posicionactual){
				server_posiciones_ocupadas.push(posicionactual);
				posiciones[i].estado = 'ocupado';
				posiciones[i].style.backgroundImage = 'url(imgs/ocupado'+parseInt(posiciones[i].id.match(patron),10)+'.jpg)'
				insertarJugadorNuevo(posiciones[i],json[j]['usuario'],json[j]['nombre'],json[j]['apellido'],json[j]['foto']);
	
				}
			}
		}
		else if(posiciones[i].estado == 'ocupado'){
		
			for(var j=0; j<json.length;j++){
				if(json[j]['posicion'] == posicionactual){
					server_posiciones_ocupadas.push(posicionactual);
				}
			}
		
			if(!versiExiste(posicionactual,server_posiciones_ocupadas)){
				posiciones[i].removeChild(posiciones[i].getElementsByTagName('div')[0]);
				posiciones[i].estado ='libre';
				if(agregar_activado){
				posiciones[i].style.backgroundImage = 'url(imgs/habilitar'+parseInt(posiciones[i].id.match(patron),10)+'.png)';
				}
				else{
				posiciones[i].style.backgroundImage = 'url(imgs/pos'+parseInt(posiciones[i].id.match(patron),10)+'.png)';
				}
			}
		
		
	
		}
	
	

	}
	
	chequearEstado(posiciones);
	actualizarContador();
	
	


}










function versiExiste(elemento,arraycete){
    for(var i=0; i<arraycete.length;i++){
        if(arraycete[i] == elemento){
            return true;
        }
    }
    
    return false;
}






function insertarJugadorNuevo(posicion,id,nombrebd,apellidobd,fotodb){
	var div = document.createElement('div');
	var nombre = document.createElement('p');
	var apellido = document.createElement('p');
	
	var divfoto = document.createElement('div');
	divfoto.className = "tooltip";
	
	var imagen = document.createElement('img');
	imagen.src = fotodb;
	
	divfoto.appendChild(imagen);
	
	div.id = id;
	div.className = "usuarioposicion";
	nombre.innerHTML = nombrebd;
	apellido.innerHTML = apellidobd;
	
	div.appendChild(divfoto);
	div.appendChild(nombre);
	div.appendChild(apellido);
	
	
	posicion.appendChild(div);
	
}








function pedirCanchaJSON(callback){
	var request = ajaxRequest();
	request.open("GET",'traercancha.php');
	request.onreadystatechange = function(){
		if(request.readyState == 4 && request.status == 200){
			var type = request.getResponseHeader("Content-Type");
			//if(type === "aplication/json"){
				
				return callback (JSON.parse(request.responseText));
				
			//}
			
		}
	}
	request.send(null);
}









function enviarOquitarUsuario(usuario,posicion,callback,url){
	var request = ajaxRequest();
	request.open("GET",url+'?usuario='+usuario+'&posicion='+posicion);
		request.onreadystatechange = function(){
		if(request.readyState == 4 && request.status == 200){
			var type = request.getResponseHeader("Content-Type");
			//alert(type);
			//if(type === "aplication/json"){
				return callback (request.responseText);
			//}
			
		}
	}
	request.send(null);
}






function ajaxRequest(){
	var peticion_http;
	 
    if(window.XMLHttpRequest) {
   		peticion_http = new XMLHttpRequest();
    }
  	else if(window.ActiveXObject) {
   		 peticion_http = new ActiveXObject("Microsoft.XMLHTTP");
  	}  
  
  return peticion_http;  
}





var preloader = document.createElement('div');
preloader.className = 'preloader';

function mostrarPreloader(){
principal.appendChild(preloader);
}

function sacarPreloader(){
principal.removeChild(preloader);
}



var desplegardatos = document.getElementById('desplegardatos');
desplegardatos.desplegado = false;

desplegardatos.onclick = desplegarOcerrar;

function desplegarOcerrar(){
	var datos = document.getElementById('datospersonales')
	if(!this.desplegado){
		this.desplegado = true;
		this.style.backgroundImage= 'url(imgs/desplegable-up.png)';
		datos.style.display = 'block';
	}
	else{
		this.desplegado = false;
		this.style.backgroundImage= 'url(imgs/desplegable-down.png)';
		datos.style.display = 'none';
	}

}











//modulo para cambiar password


var chngpass = document.getElementById('chngpass');
chngpass.onclick = desplegarCambiarPassword;


function desplegarCambiarPassword(){
		var contenedor_principal = document.createElement('div');
		contenedor_principal.className = 'contenedor_subirimagen';
		contenedor_principal.id = 'cambiarpassword';
		
		var contenedor_hijo = document.createElement('div');
		contenedor_hijo.className = 'contenedor_hijo_subirimagen';
		
		
		var label1 = document.createElement('h2');
		label1.innerHTML= 'ingresa tu nueva contrase&ntilde;a';
		
		var label2 = document.createElement('h2');
		label2.innerHTML= 'ingresala nuevamente';
		
		var input1 = document.createElement('input');
		input1.type = 'password';
		input1.value ='';
		
		var input2 = document.createElement('input');
		input2.type = 'password';
		input2.value = '';
		
		var boton = document.createElement('div');
		boton.className = 'comprobarpassword';
		
		var linea = document.createElement('div');
		linea.className = "linea";
		
		
		var error = document.createElement('p');
		error.className = 'errorsubida';
		
		var cerrar = document.createElement('h4');
		cerrar.className = 'cerrarlistado';
		cerrar.onclick = cerrarBox;


		contenedor_principal.appendChild(contenedor_hijo);
		contenedor_principal.appendChild(cerrar);
		
		contenedor_hijo.appendChild(label1);
		contenedor_hijo.appendChild(input1);
		
		contenedor_hijo.appendChild(label2);
		contenedor_hijo.appendChild(input2);
		contenedor_hijo.appendChild(error);
		contenedor_hijo.appendChild(boton);
		
		principal.appendChild(contenedor_principal);
		
		boton.onclick = comprobarPassword;
		
		
		
		function comprobarPassword(){
			var patron =/\s/;
			error.innerHTML = '';
			if(input1.value.match(patron) || input2.value.match(patron) || input1.value == "" || input2.value == ""){
				error.innerHTML = 'no puede tener espacios';
			}
			else if(input1.value != input2.value){
					error.innerHTML = 'no hay coincidencia';
			}
			else{
				mostrarPreloader(); 
				enviarNewPassword(usuario,input1.value,respuestaPassword)
			}
		
		}
		



		function enviarNewPassword(usuario,password,callback){
			var request = ajaxRequest();
			request.open("GET","cambiarpassword.php?usuario="+usuario+"&password="+password);
			request.onreadystatechange = function(){
			if(request.readyState == 4 && request.status == 200){
				var type = request.getResponseHeader("Content-Type");
				//alert(type);
				//if(type === "aplication/json"){
					return callback (request.responseText);
				//}
			
				}
			}
			request.send(null);
		
		
		}
		
		
		
		




		function respuestaPassword(rta){
			
			sacarPreloader();
			
			if(rta == "true"){
				cerrarBox();
			}
			else{
			error.innerHTML = rta;
			}

		}
		
		
		
		function cerrarBox(){
				contenedor_principal.parentNode.removeChild(contenedor_principal);
		}






}






