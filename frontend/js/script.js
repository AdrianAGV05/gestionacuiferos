// ==========================================
// CONFIGURACIÓN GLOBAL
// ==========================================
// Declaramos la URL base de tu API una sola vez.
const API_BASE_URL = 'http://localhost:8080/api';


// ==========================================
// CARRUSEL DE IMÁGENES
// ==========================================
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
    const carouselContainer = document.querySelector('.carousel-images');
    
    // Evitamos errores si estamos en una página sin carrusel
    if (carouselContainer) {
      carouselContainer.style.transform = `translateX(${offset}%)`;
    }
}

function moveSlide(step) {
    showSlide(currentSlide + step);
}

showSlide(currentSlide);
// Cambio de imagen automático cada 5 segundos
setInterval(() => moveSlide(1), 5000);


// ==========================================
// ALERTAS UNIFICADAS (Reutilización de código)
// ==========================================
// Función maestra para SweetAlert
function mostrarAlerta(titulo, icono = 'info', temporizador = null) {
    const config = { title: titulo, icon: icono };
    if (temporizador) config.timer = temporizador;
    Swal.fire(config);
}

// Mantenemos los nombres originales para no romper tu HTML, enlazados a la nueva función
const saludos = () => mostrarAlerta('Datos enviados y en espera, la confirmación puede tardar entre uno y tres días hábiles');
const confirmacion = () => mostrarAlerta('Datos enviados para almacenamiento', 'success', 2500);
const confirmacion2 = () => mostrarAlerta('Datos enviados y en espera, la confirmación puede tardar entre uno y tres días hábiles', 'success', 2500);
const confirmacion3 = () => mostrarAlerta('Alerta Resuelta', 'success', 2500);
const modificaciondatos = () => mostrarAlerta('Datos modificados con exito', 'success', 2500);
const notfoperadorr = () => {
    mostrarAlerta('Se envio una notificación al operador', 'success', 3000);
    setTimeout(() => { document.location = "Gestion_de_mtto.html"; }, 3500);
};


// ==========================================
// NAVEGACIÓN
// ==========================================
const iraMenu_Main = () => document.location = 'Menu_MAIN.html';
const inisesionprueba = () => document.location = 'inicio-sesion-prueba.html';
const menumain = () => document.location = 'Menu_MAIN.html';
const listadopozos = () => document.location = 'Listado_pozos.html';
const listadopozo = () => document.location = 'Listado_pozos.html';
const listadoOperadores = () => document.location = 'Listado_operadores.html';
const gestiondeOperacion = () => document.location = 'Gestion_de_Operacion.html';
const gestiondemtto = () => document.location = 'Gestion_de_mtto.html';
const selectacuyop = () => document.location = 'nvo-usuario-prueba.html';
const gestiondeAlerta = () => document.location = "Gestion_de_alerta.html";


// ==========================================
// PETICIONES A LA API: USUARIOS Y OPERADORES
// ==========================================

function cargaoperadores() {
  fetch(`${API_BASE_URL}/operadores`)
      .then(response => response.json())
      .then(data => {
          const tablaOperadores = document.getElementById("tabla-operadores");
          if (!tablaOperadores) return; 
          
          tablaOperadores.innerHTML = ''; 

          data.forEach(operador => {
              const fila = document.createElement("tr");
              fila.innerHTML = `
                  <td>${operador.o_nombre}</td>
                  <td>${operador.o_correo}</td>
                  <td>${operador.o_contrasena}</td>
                  <td>${operador.o_telefono}</td>
                  <td>
                      <a href="Modificar_operador.html?id=${operador.id}" class="edit-operador">
                       <i class="fa-solid fa-user-pen" style="color: blue;"></i>
                      </a>
                      <a href="#" onclick="borraoperador(${operador.id_o})">
                          <i class="fa-solid fa-trash" style="color: blue;"></i>
                      </a>
                  </td>
              `;
              tablaOperadores.appendChild(fila);
          });
      })
      .catch(error => console.error('Error al cargar datos:', error));
}

function borraoperador(idOperador) {
  Swal.fire({
      title: "¿Estas seguro?",
      text: "Esta acción no se podra revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, borrar!",
      cancelButtonText: "No, cancelar!"
  }).then((result) => {
      if (result.value) {
        fetch(`${API_BASE_URL}/operadores/${idOperador}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(() => {
            Swal.fire("Borrado!", `El operador ha sido eliminado`, "success");
            cargaoperadores();  
        })
        .catch(error => console.error('Error al borrar:', error));
      }
  });
}

function cargardatos() {
  const urlParams = new URLSearchParams(window.location.search);
  const id_operador = urlParams.get("id");
  
  if (!id_operador) return;

  fetch(`${API_BASE_URL}/operadores/${id_operador}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
  })
  .then(response => response.json())
  .then(data => {
      document.getElementById("nombre").value = data.o_nombre;
      document.getElementById("email").value = data.o_correo;
      document.getElementById("pwd").value = data.o_contrasena;
      document.getElementById("tel").value = data.o_telefono;
  })
  .catch(error => console.error('Error al cargar operador:', error));
}

function modificacionoperador() {
  const urlParams = new URLSearchParams(window.location.search);
  const id_operador = urlParams.get("id");
  
  const actualizaOperador = {
      o_nombre: document.getElementById('nombre').value,
      o_correo: document.getElementById('email').value,
      o_contrasena: document.getElementById('pwd').value,
      o_telefono: document.getElementById('tel').value
  };

  fetch(`${API_BASE_URL}/operadores/${id_operador}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(actualizaOperador)
  })
  .then(response => response.json())
  .then(() => {
      mostrarAlerta('Datos de operador modificados con éxito', 'success', 2500);
      setTimeout(() => { document.location = "Listado_operadores.html"; }, 2500);
  })
  .catch(error => console.error('Error al modificar:', error));
}

function crearcuenta() {
  const nuevoUsuario = {
      us_nombre: document.getElementById('nombre').value,
      us_correo: document.getElementById('correo').value,
      us_contrasena: document.getElementById('contrasena').value,
      us_telefono: document.getElementById('telefono').value,
      us_tipo: document.getElementById('tipoUsuario').value 
  };

  fetch(`${API_BASE_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoUsuario)
  })
  .then(response => response.json())
  .then(() => {
      alert('Datos enviados y en espera, la confirmación puede tardar entre uno y tres días hábiles');
  })
  .catch(error => console.error('Error al crear cuenta:', error));
}


// ==========================================
// PETICIONES A LA API: POZOS Y MANTENIMIENTO
// ==========================================

function agregarregistromtto() {
  const clavePozo = document.getElementById('dropdown').value;
  if (!clavePozo) {
      mostrarAlerta('Por favor complete los campos requeridos.', 'error');
      return;
  }

  const nvoregMtto = {
      mtto_clave_pozo: clavePozo,
      mtto_motor_tipo: document.getElementById('tipoMotor').value,
      mtto_motor_hp: document.getElementById('hpMotor').value,
      mtto_motor_kw: document.getElementById('kwMotor').value,
      mtto_motor_eficiencia: document.getElementById('eficienciaMotor').value,
      mtto_tablero_tipo: document.getElementById('tipoTablero').value,
      mtto_tablero_capacidad: document.getElementById('capacidadTablero').value,
      mtto_transformador_tipo: document.getElementById('tipoTransformador').value,
      mtto_transformador_capacidad: document.getElementById('capacidadTransformador').value,
      mtto_cable_calibre: document.getElementById('calibreCable').value,
      mtto_cable_longitud: document.getElementById('longitudCable').value,
      mtto_tuberia_diametro: document.getElementById('diamTuberia').value,
      mtto_tuberia_longitud: document.getElementById('longTuberia').value,
      mtto_observaciones: document.getElementById('obsmtto').value,
      mtto_fecha_captura: new Date(),
      mtto_operador: 1
  };

  Swal.fire({
      title: "¿Estas seguro que desea guardar los datos?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, Guardar",
      cancelButtonText: "No, cancelar!"
  }).then((result) => {
      if (result.value) {
        fetch(`${API_BASE_URL}/mantenimiento`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nvoregMtto)
        })
        .then(response => response.json())
        .then(() => {
            mostrarAlerta('El registro se guardó correctamente.', 'success');
            // Limpieza de inputs optimizada
            ['hpMotor', 'kwMotor', 'eficienciaMotor', 'capacidadTablero'].forEach(id => document.getElementById(id).value = 0);
            ['capacidadTransformador', 'longitudCable', 'diamTuberia', 'longTuberia'].forEach(id => document.getElementById(id).value = "0");
            document.getElementById('obsmtto').value = "";
        })
        .catch(error => {
            console.error('Error:', error);
            mostrarAlerta('Hubo un problema al guardar el registro.', 'error');
        });
      }
  });
}

function enviarAlerta() {
  const clavePozo = document.getElementById('dropdown').value;
  if (!clavePozo) {
      mostrarAlerta('Por favor complete los campos requeridos.', 'error');
      return;
  }

  const nvaAl = {
      al_clave_de_pozo: clavePozo,
      al_tipo_de_alerta: document.getElementById('alert_tipo').value,
      al_comentarios: document.getElementById('observaciones').value,
      al_fechacap: new Date(),
      al_operador: 1
  };

  Swal.fire({
      title: "Estas seguro?",
      text: "Esta acción no se podra revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, enviar!",
      cancelButtonText: "No, cancelar!"
  }).then((result) => {
      if (result.value) {
        fetch(`${API_BASE_URL}/alertas_pozos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nvaAl)
        })
        .then(response => response.json())
        .then(() => {
            mostrarAlerta('El registro se guardó correctamente.', 'success');
            document.getElementById('observaciones').value = "";
        })
        .catch(error => {
            console.error('Error:', error);
            mostrarAlerta('Hubo un problema al guardar el registro.', 'error');
        });
      }
  });
}

function agregarregistrooperacion() {
    const dropdown = document.getElementById('dropdown');
    // Captura el texto de la opción seleccionada de forma más segura
    const clavePozo = dropdown.options[dropdown.selectedIndex]?.text;
    
    if (!clavePozo) {
        mostrarAlerta('Por favor complete los campos requeridos.', 'error');
        return;
    }

    const nvoregOp = {
        idLp: parseInt(dropdown.value),
        op_cpozo: clavePozo,
        op_nestatico: document.getElementById('myRange').value,
        op_ndinamico: document.getElementById('myRange1').value,
        op_gasto: document.getElementById('myRange2').value,
        op_presion: document.getElementById('myRange3').value,
        op_tiempo_op: document.getElementById('tiempodeoperacion').value,
        op_observaciones: document.getElementById('Observaciones').value,
        op_fecha_captura: new Date(),
        op_operador: 1
    };

    Swal.fire({
        title: "¿Estas seguro?",
        text: "¿Los datos ingresados son correctos?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, enviar",
        cancelButtonText: "No ¡Corregir!"
    }).then((result) => {
        if (result.value) {
          fetch(`${API_BASE_URL}/operacion`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(nvoregOp)
          })
          .then(response => response.json())
          .then(() => {
              mostrarAlerta('El registro se guardó correctamente.', 'success');
              ['myRange', 'myRange1', 'myRange2', 'myRange3'].forEach(id => document.getElementById(id).value = 0);
              document.getElementById('Observaciones').value = "";
              document.getElementById('tiempodeoperacion').value = "";
          })
          .catch(error => {
              console.error('Error:', error);
              mostrarAlerta('Hubo un problema al guardar el registro.', 'error');
          });
        }
    });
}

// ==========================================
// UTILIDADES DE INTERFAZ
// ==========================================
function menu_desp() {
  let listElements = document.querySelectorAll('.list_button--click');

  listElements.forEach(listElement => {
    listElement.addEventListener('click', () => {
         listElement.classList.toggle('arrow');
         
         let height = 0;
         let menu = listElement.nextElementSibling;
         if (menu.clientHeight === 0) {
          height = menu.scrollHeight;
         }
         menu.style.height = `${height}px`;
    });
  });
}


// ==========================================
// LÓGICA DE MODALES (Nosotros y Contacto)
// ==========================================

// 1. Obtener los elementos HTML
const modalNosotros = document.getElementById("myModal");
const modalContacto = document.getElementById("myModal2");
const spanNosotros = document.getElementsByClassName("close")[0];
const spanContacto = document.getElementsByClassName("close")[1];

// 2. Funciones para abrir los modales (Llamadas desde el HTML)
function activar() {
  if(modalNosotros) modalNosotros.style.display = "block";
}

function activar2() {
  if(modalContacto) modalContacto.style.display = "block";
}

// 3. Funciones para cerrar con la "X"
if(spanNosotros) {
  spanNosotros.onclick = function() {
    modalNosotros.style.display = "none";
  }
}

if(spanContacto) {
  spanContacto.onclick = function() {
    modalContacto.style.display = "none";
  }
}

// 4. Cerrar modales al hacer clic fuera de ellos
window.onclick = function(event) {
  if (event.target == modalNosotros) {
      modalNosotros.style.display = "none";
  }
  if (event.target == modalContacto) {
      modalContacto.style.display = "none";
  }
}



// ==========================================
// LÓGICA DE NOTIFICACIONES (Menu_MAIN)
// ==========================================

function toggleNotifications() {
  const dropdown = document.getElementById('notificationDropdown');
  if (dropdown) {
    dropdown.classList.toggle('active'); 
  }
}

// Ocultar el buzón de notificaciones al hacer clic fuera de él
window.addEventListener('click', function (event) {
  const dropdown = document.getElementById('notificationDropdown');
  const icon = document.querySelector('.notification-icon');
  
  if (icon && dropdown) {
    if (!icon.contains(event.target) && !dropdown.contains(event.target)) {
      dropdown.classList.remove('active');
    }
  }
});