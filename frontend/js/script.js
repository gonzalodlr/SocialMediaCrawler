/** @format */
const URL_BACKEND = "http://127.0.0.1:5000/";
let links = [];

function analizarURL() {
  var urlInput = document.getElementById("urlInput").value;
  var resultsDiv = document.getElementById("results");

  // Validación del formato del enlace (se puede mejorar)
  if (!urlInput.startsWith("http://") && !urlInput.startsWith("https://")) {
    resultsDiv.innerHTML =
      "<p>Por favor, ingresa un enlace válido comenzando con 'http://' o 'https://'</p>";
    return;
  }

  fetch(URL_BACKEND + "search-url?searchTerm=" + urlInput)
    .then((response) => response.json())
    .then((data) => {
      const linksData = JSON.parse(data);
      console.log(linksData);
      linksData.forEach((link) => {
        links.push(link);
        console.log(link);
      });
    })
    .catch((error) => {
      console.error("Error al buscar url:", error);
    });
}
