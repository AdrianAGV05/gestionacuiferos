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
<<<<<<< HEAD
}
function notfoperador(){
  Swal.fire({
    title:'Se envio una notificación al operador',
    icon:'success',
    timer: 3000
  })
  setTimeout(() => {
    console.log("6 Segundo esperado")
    document.location = "Gestion_de_Operacion.html";
  }, 3500);
}

function notfoperadorr(){
  Swal.fire({
    title:'Se envio una notificación al operador',
    icon:'success',
    timer: 3000
  })
  setTimeout(() => {
    console.log("6 Segundo esperado")
    document.location = "Gestion_de_mtto.html";
  }, 3500);
}

function menu_desp(){
  let listElements = document.querySelectorAll('.list_button--click');

  listElements.forEach(listElement => {
    listElement.addEventListener('click', ()=>{
  
         listElement.classList.toggle('arrow');
  
         let height = 0;
         let menu = listElement.nextElementSibling;
         if(menu.clientHeight == "0"){
          height=menu.scrollHeight;
         }
         menu.style.height = `${height}px`;
    })
  });
}
=======
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
>>>>>>> 99e87597bc71c5a56fdf4d5b331b9a549c50fac1
