var foto = document.getElementById('foto');
foto.enabled = true;
foto.onclick = desplegarForm;


function desplegarForm(){
	if(this.enabled){
		this.enabled = false;
		
		var input = document.createElement('input');
		input.type = 'file';
		input.name = 'archivo';
		
		
		
		var contenedor_principal = document.createElement('div');
		contenedor_principal.className = 'contenedor_subirimagen';
		contenedor_principal.id = 'subirimagen';
		
		var contenedor_hijo = document.createElement('div');
		contenedor_hijo.className = 'contenedor_hijo_subirimagen';
		
		var titulo = document.createElement('p');
		titulo.innerHTML ='SUBI TU FOTO';
		
		var linea = document.createElement('div');
		linea.className = "linea";
		
		var error = document.createElement('p');
		error.className = 'errorsubida';
		
		var cerrar = document.createElement('div');
		cerrar.className = 'cerrarbtn';
		
		

		
		
		cerrar.onclick = cerrarBox;
		


		
		
		contenedor_principal.appendChild(contenedor_hijo);
		contenedor_hijo.appendChild(titulo);
		contenedor_hijo.appendChild(linea);
		contenedor_hijo.appendChild(input);
		contenedor_hijo.appendChild(error);
		contenedor_hijo.appendChild(cerrar);
		
		principal.appendChild(contenedor_principal);
	
		input.onchange = function(){
      	  var file = this.files[0];
      	  if(validarArchivo(file['type'],file['size'])){
				var formData = new FormData();
				formData.append(input.name, file);
				var request = ajaxRequest();
        		request.open("POST", 'subirimagen.php');
        	
        		request.onreadystatechange = function(){
					if(request.readyState == 4 && request.status == 200){
						var type = request.getResponseHeader("Content-Type");
						return respuestaImagen (request.responseText);
					}
				}
				
				mostrarPreloader(); //prueba
        		request.send(formData);         
        	
       	 	}
       		else{
        		error.innerHTML ='Error de extension o tama&ntilde;o';
        	}
	
   		}
	
	}
    
}    




function validarArchivo(extension,tamanio){
	var patron = /[jpg|gif|png]$/;
	var tam_max = 1000000;
		
	if(extension.match(patron) && tamanio <= tam_max){
	return true;
	}
	else{
	return false;
	}

}


function cerrarBox(){
	var box = document.getElementById('subirimagen')
	box.parentNode.removeChild(box);
	foto.enabled = true;
}




function respuestaImagen(json){
	sacarPreloader();
	cerrarBox();
	//alert(json);
	foto.getElementsByTagName('img')[0].src = json;
	//alert(foto.getElementsByTagName('img')[0].src);
	
}
