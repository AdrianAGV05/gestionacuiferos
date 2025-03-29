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
  
  document.location = 'inicio-sesion-prueba.html';
  
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
  Swal.fire({
    title:'Datos modificados de operador',
    icon:'success',
    timer:2500
  })
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
