var dqj = document.getElementById('dqj');
dqj.onclick = abrirListado;
dqj.enabled = true;


function abrirListado(){
	if(this.enabled){
		pedirListado(recibirListado);
	}
	
}








function pedirListado(callback){
	var request = ajaxRequest();
	request.open("GET",'listadonojuegan.php');
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



function recibirListado(json){
	dqj.enabled = false;
	
	var listado = document.createElement('div');
	listado.className = 'listadonojuegan';
	listado.id = 'listadonojuegan';
	listado.enabled = true;
	
	
	for(var i=0; i<json.length;i++){
	
	var contenedor = document.createElement('div');
	var contenedorimagen = document.createElement('div');
	var contenedorinfo = document.createElement('div');
	
	contenedorimagen.className = 'contenedorimagenlistado';
	contenedorinfo.className = 'contenedorinfo';
	
	var imagen = document.createElement('img');
	var nombre = document.createElement('p');
	var apellido = document.createElement('p');
	var email = document.createElement('p');
	var boton = document.createElement('button');
	
	boton.className = 'dqj-btn';
	imagen.src = json[i]['foto'];
	nombre.innerHTML = json[i]['nombre'];
	apellido.innerHTML =json[i]['apellido'];

	
	contenedorimagen.appendChild(imagen);
	
	contenedorinfo.appendChild(nombre);
	contenedorinfo.appendChild(apellido);
	contenedorinfo.appendChild(boton);
	
	contenedor.appendChild(contenedorimagen);
	contenedor.appendChild(contenedorinfo)
	
	listado.appendChild(contenedor);
	
	
	boton.onclick = enviarToque;
	boton.mail = json[i]['email'];
	
	
	
	}
	
	var cerrar = document.createElement('h4');
	cerrar.className = 'cerrarlistado';
	cerrar.onclick = function(){
	
		principal.removeChild(listado);
		dqj.enabled = true;
		}
	
	listado.appendChild(cerrar);
	
	
	document.getElementById('principal').appendChild(listado);
	

}



function enviarToque(){
	var listado = document.getElementById('listadonojuegan')

	if(listado.enabled){
		listado.enabled = false;
		mostrarPreloader();
		enviarDatosToque(usuario,this.mail,respuestaToque,'enviartoque.php')
	}
}


function respuestaToque(rta){
	sacarPreloader();
	cerrarListado();
	//alert(rta);

}

function cerrarListado(){
	var listado = document.getElementById('listadonojuegan')
	listado.parentNode.removeChild(listado);
	dqj.enabled = true;
}




function enviarDatosToque(usuario,mail,callback,url){
	var request = ajaxRequest();
	request.open("GET",url+'?usuario='+usuario+'&destinatario='+mail);
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
