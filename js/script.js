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
