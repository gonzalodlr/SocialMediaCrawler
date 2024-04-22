/** @format */
const URL_BACKEND = "http://127.0.0.1:5000/";
let links = [];

function limpiarResultados() {
  // Obtener el elemento donde se muestran los resultados de vista previa
  var vistaPreviaContainer = document.getElementById("vistaPreviaContainer");
  
  // Eliminar todos los elementos con la clase preview-container dentro de vistaPreviaContainer
  var previewContainers = vistaPreviaContainer.querySelectorAll('.preview-container');
  previewContainers.forEach(container => {
      container.remove();
  });

  // Limpiar el contenido del elemento resumenRedesSociales si es necesario
  var resumenRedesSociales = document.getElementById("resumenRedesSociales");
  if (resumenRedesSociales) {
      resumenRedesSociales.innerHTML = "";
  }

  // Limpiar el array de enlaces
  links = [];
}


function analizarURL() {
  // Llamar a la función para limpiar los resultados anteriores
  limpiarResultados();

  var urlInput = document.getElementById("urlInput").value;
  var resumenRedesSociales = document.getElementById("resumenRedesSociales");

  // Validación del formato del enlace (se puede mejorar)
  if (!urlInput.startsWith("http://") && !urlInput.startsWith("https://")) {
    resumenRedesSociales.innerHTML =
      "<p>Por favor, ingresa un enlace válido comenzando con 'http://' o 'https://'</p>";
    return;
  }

  fetch(URL_BACKEND + "search-url?searchTerm=" + urlInput)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach((link) => {
        links.push(link);
        console.log(link);
        obtenerVistaPrevia(link);
      });

      // Iterar sobre la lista de redes sociales y agregarlas al resumen
      links.forEach(function (redSocial) {
        resumenRedesSociales.innerHTML += "<a href='" + redSocial + "'>" + redSocial + "</a><br>";
      });
    })
    .catch((error) => {
      console.error("Error al buscar url:", error);
    });
}

const obtenerVistaPrevia = async (url) => {
  try {
    const response = await fetch(`http://localhost:3000/get-preview?url=${encodeURIComponent(url)}`);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      mostrarVistaPrevia(data);
    } else {
      console.error('Error obteniendo vista previa:', response.statusText);
    }
  } catch (error) {
    console.error('Error obteniendo vista previa:', error);
  }
};

const mostrarVistaPrevia = (data) => {
  // Obtener el elemento en el HTML donde quieres mostrar la vista previa
  const vistaPreviaContainer = document.getElementById('vistaPreviaContainer');

  // Crear un contenedor para cada vista previa
  const previewContainer = document.createElement('div');
  previewContainer.classList.add('preview-container');

  // Crear elementos HTML para mostrar la vista previa
  const tituloElement = document.createElement('h2');
  tituloElement.textContent = data.title;

  const descripcionElement = document.createElement('p');
  descripcionElement.textContent = data.description;

  // Crear elementos para mostrar las imágenes de la vista previa
  const imagenesContainer = document.createElement('div');
  imagenesContainer.classList.add('imagenes-container');
  data.images.forEach((imagenUrl) => {
    const imagenElement = document.createElement('img');
    imagenElement.src = imagenUrl;
    imagenesContainer.appendChild(imagenElement);
  });

  // Agregar elementos al contenedor de vista previa en el HTML
  previewContainer.appendChild(tituloElement);
  previewContainer.appendChild(descripcionElement);
  previewContainer.appendChild(imagenesContainer);

  // Agregar el contenedor de vista previa al contenedor principal en el HTML
  vistaPreviaContainer.appendChild(previewContainer);
};