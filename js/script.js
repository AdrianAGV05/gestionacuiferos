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

function iraMenu_Main_prueba(){
  
  document.location = 'Menu_MAIN.html';
  
}

function inisesionprueba(){
  
  document.location = 'inicio-sesion-prueba.html';
  
}

function menumain(){
  
  document.location = 'Menu_MAIN.html';
  
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

function crearcuenta(){
  console.log("aqui mero")
  // Obtener los valores de los campos
  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;
  const contrasena = document.getElementById('contrasena').value;
  const telefono = document.getElementById('telefono').value;
  const tipoUsuario = document.getElementById('tipoUsuario').value;
  //para ler el archivo de documentos de acuifero
  //const fileInput=document.getElementById("limites");
  //const file=fileInput.files[0];
  console.log("creando cuenta")
  // Crear el objeto con los datos
  const nuevoUsuario = {
      us_nombre: nombre,
      us_correo: correo,
      us_contrasena: contrasena,
      us_telefono: telefono,
      us_tipo: tipoUsuario 
      //const formData= new FormData();
      //formData.append("us_nombre",nombre);
      //formData.append("limites",file)
      //body:formData
  };

  console.log(nuevoUsuario);
  // Enviar los datos al servidor utilizando una solicitud POST
  fetch('http://localhost:8080/api/usuarios', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoUsuario)
  })
  .then(response => response.json())
  .then(data => {
      alert('Datos enviados y en espera, la confirmación puede tardar entre uno y tres días hábiles');
      // Redirigir a otra página si es necesario
      //window.location.href = 'operador_agregado.html';//
  })
  .catch(error => console.error('Error al insertar datos:', error));
}


function agregarregistromtto(){
  // Obtener los valores del formulario
  const clavePozo = document.getElementById('dropdown').value;
  const tipoMotor = document.getElementById('tipoMotor').value;
  const hpMotor = document.getElementById('hpMotor').value;
  const kwMotor = document.getElementById('kwMotor').value;
  const eficienciaMotor = document.getElementById('eficienciaMotor').value;
  const tipoTablero = document.getElementById('tipoTablero').value;
  const capacidadTablero = document.getElementById('capacidadTablero').value;
  const tipoTransformador = document.getElementById('tipoTransformador').value;
  const capacidadTransformador = document.getElementById('capacidadTransformador').value;
  const calibreCable = document.getElementById('calibreCable').value;
  const longitudCable = document.getElementById('longitudCable').value;
  const diamTuberia = document.getElementById('diamTuberia').value;
  const longTuberia = document.getElementById('longTuberia').value;
  const obsmtto = document.getElementById('obsmtto').value;
  const fecha_captura = new Date();
  const operador = 1;

  // Validar campos obligatorios
  if (!clavePozo) {
      Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Por favor complete los campos requeridos.',
      });
      return;
  }

  // Crear el objeto de datos a enviar
  const nvoregMtto = {
      mtto_clave_pozo: clavePozo,
      mtto_motor_tipo: tipoMotor,
      mtto_motor_hp: hpMotor,
      mtto_motor_kw: kwMotor,
      mtto_motor_eficiencia: eficienciaMotor,
      mtto_tablero_tipo: tipoTablero,
      mtto_tablero_capacidad: capacidadTablero,
      mtto_transformador_tipo:tipoTransformador,
      mtto_transformador_capacidad: capacidadTransformador,
      mtto_cable_calibre: calibreCable,
      mtto_cable_longitud: longitudCable,
      mtto_tuberia_diametro: diamTuberia,
      mtto_tuberia_longitud: longTuberia,
      mtto_observaciones:obsmtto,
      mtto_fecha_captura: fecha_captura,
      mtto_operador: operador
  };

  // Enviar los datos al servidor
  fetch('http://localhost:8080/api/mantenimiento', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(nvoregMtto)
  })
  .then(response => response.json())
  .then(data => {
      // Mostrar mensaje de éxito
      Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'El registro se guardó correctamente.',
      });
      //limpiar los valores del formulario
      document.getElementById('hpMotor').value=0;
      document.getElementById('kwMotor').value=0;
      document.getElementById('eficienciaMotor').value=0;
      document.getElementById('capacidadTablero').value=0;
      document.getElementById('capacidadTransformador').value="0";
      document.getElementById('longitudCable').value="0";
      document.getElementById('diamTuberia').value="0";
      document.getElementById('longTuberia').value="0";
      document.getElementById('obsmtto').value="";

  })
  .catch(error => {
      console.error('Error al guardar el registro:', error);
      Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Hubo un problema al guardar el registro.',
      });
  });
}


function enviarAlerta() {
  // Obtener los valores del formulario
  const clavePozo = document.getElementById('dropdown').value;
  const tipoAlerta = document.getElementById('alert_tipo').value;
  const observaciones = document.getElementById('observaciones').value;
  const fechacap = new Date();
  const operador = 1;

  console.log("Clave de pozo seleccionada:", clavePozo);
  console.log("Tipo de alerta seleccionada:", tipoAlerta);
  console.log("Observaciones:", observaciones);

  // Validar campos obligatorios
  if (!clavePozo) {
      Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Por favor complete los campos requeridos.',
      });
      return;
  }

  // Crear el objeto de datos a enviar
  const nvaAl = {
      al_clave_de_pozo: clavePozo,
      al_tipo_de_alerta: tipoAlerta,
      al_comentarios: observaciones,
      al_fechacap: fechacap,
      al_operador: operador
  };

  // Enviar los datos al servidor
  fetch('http://localhost:8080/api/alertas_pozos', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(nvaAl)
  })
  .then(response => response.json())
  .then(data => {
      // Mostrar mensaje de éxito
      Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'El registro se guardó correctamente.',
      });
      //limpiar los valores del formulario

      document.getElementById('observaciones').value="";
     

  })
  .catch(error => {
      console.error('Error al guardar el registro:', error);
      Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Hubo un problema al guardar el registro.',
      });
  });
}