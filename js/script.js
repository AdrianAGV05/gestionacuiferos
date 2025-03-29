let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-images img');
    const totalSlides = slides.length;

    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    const offset = -currentSlide * 100;
    
    if(document.querySelector('.carousel-images')!=null){
      document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
    }
    
}

function moveSlide(step) {
    showSlide(currentSlide + step);
}

// Initialize
showSlide(currentSlide);

// Optional: Auto-slide
setInterval(() => moveSlide(1), 5000);

function saludos(){
  Swal.fire({
    title:'Datos enviados y en espera, la confirmación puede tardar entre uno y tres días hábiles'
  })
}

function confirmacion(){
  Swal.fire({
    title:'Datos enviados para almacenamiento',
    icon:'success',
    timer:2500
  })
}

function confirmacion2(){
  Swal.fire({
    title:'Datos enviados y en espera, la confirmación puede tardar entre uno y tres días hábiles',
    icon:'success',
    timer:2500
  })
}

function iraSelectAcuyOp(){
  
  document.location = 'Selec_acu_y_op.html';
  
}

function inisesionprueba(){
  
  document.location = 'inicio-sesion-prueba.html';
  
}

function menumain(){
  
  document.location = 'Menu_MAIN.html';
  
}


function crearcuenta(){
   // Obtener los valores de los campos
   const nombre = document.getElementById('nombre').value;
   const correo = document.getElementById('correo').value;
   const contrasena = document.getElementById('contrasena').value;
   const telefono = document.getElementById('telefono').value;
   const tipoUsuaro = document.getElementById('tipoUsuario').value;
   
   // Crear el objeto con los datos
   const nuevoUsuario = {
       us_nombre: nombre,
       us_correo: correo,
       us_contrasena: contrasena,
       us_telefono: telefono,
       us_tipo: tipoUsuario 

   };

   // Enviar los datos al servidor utilizando una solicitud POST
   fetch('http://localhost:8080/api/operadores', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify(nuevoOperador)
   })
   .then(response => response.json())
   .then(data => {
       alert('Operador agregado con éxito');
       // Redirigir a otra página si es necesario
       //window.location.href = 'operador_agregado.html';//
   })
   .catch(error => console.error('Error al insertar datos:', error));
}
  
  document.location = 'index.html';
  
}

function listadopozos(){
  
  document.location = 'Listado_pozos.html';
  
}

function listadoOperadores(){
  
  document.location = 'Listado_operadores.html';
  
}

function gestiondeOperacion(){
  
  document.location = 'Gestion_de_Operacion.html';
  
}

function gestiondemtto(){
  
  document.location = 'Gestion_de_mtto.html';
  
}

function selectacuyop(){
  
  document.location = 'Selec_acu_y_op.html';
  
}
function listadopozo(){
  
  document.location = 'Listado_pozos.html';
  
}

function borraoperador(idOperador){
  Swal.fire({
    title: "Estas seguro?",
  text: "Esta acción no se podra revertir!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Si, borrar!",
  cancelButtonText: "No, cancelar!",
  }).then((result) => {
    console.table(result);
    console.log(result.value);
    if (result.value) {
      fetch('http://localhost:8080/api/operadores/'+idOperador, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },

    })
    .then(response => response.json())
   
      Swal.fire("Borrado!"+idOperador, "", "success");

    }
  })
}
function modificaciondatos(){
  Swal.fire({
    title:'Datos modificados con exito',
    icon:'success',
    timer:2500
  })
}
function modificacionoperador(){
  var valores= window.location.search;
  const urlParams=new URLSearchParams(valores);
  var id_operador=urlParams.get("id");
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('email').value;
    const contrasena = document.getElementById('pwd').value;
    const telefono = document.getElementById('tel').value;
            
    // Crear el objeto con los datos
    const actualizaOperador = {
        o_nombre: nombre,
        o_correo: correo,
        o_contrasena: contrasena,
        o_telefono: telefono
    };

  fetch('http://localhost:8080/api/operadores/'+id_operador, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',

    },
    body: JSON.stringify(actualizaOperador)
})
.then(response => response.json())
.then(data => {
  Swal.fire({
    title:'Datos de operador modificados con éxito',
    icon:'success',
    timer:2500
  })
  document.location="Listado_operadores.html";
})
  
}

function cargardatos(){
  console.log("cargando")
  var valores= window.location.search;
  const urlParams=new URLSearchParams(valores);
  var id_operador=urlParams.get("id");
  console.log(id_operador)
  fetch('http://localhost:8080/api/operadores/'+id_operador, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})
.then(response => response.json())
.then(data => {
  console.log(data.o_nombre);
  document.getElementById("nombre").value=data.o_nombre;
  document.getElementById("email").value=data.o_correo;
  document.getElementById("pwd").value=data.o_contrasena;
  document.getElementById("tel").value=data.o_telefono;
})
}