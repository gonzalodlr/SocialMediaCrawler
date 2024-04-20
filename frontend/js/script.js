/** @format */
const URL_BACKEND = "http://127.0.0.1:5000/";
let links = [];

function limpiarResultados() {
  // Obtener el elemento donde se muestran los resultados
  var resumenRedesSociales = document.getElementById("resumenRedesSociales");
  // Limpiar el contenido del elemento
  resumenRedesSociales.innerHTML = "";
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
      });

      // Iterar sobre la lista de redes sociales y agregarlas al resumen
      links.forEach(function (redSocial) {
        resumenRedesSociales.innerHTML += "<p>" + redSocial + "</p>";
      });
    })
    .catch((error) => {
      console.error("Error al buscar url:", error);
    });
}
