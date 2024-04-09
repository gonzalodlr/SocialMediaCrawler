function analizarURL() {
    var urlInput = document.getElementById("urlInput").value;
    var resultsDiv = document.getElementById("results");
  
    // Validación del formato del enlace (se puede mejorar)
    if (!urlInput.startsWith("http://") && !urlInput.startsWith("https://")) {
      resultsDiv.innerHTML = "<p>Por favor, ingresa un enlace válido comenzando con 'http://' o 'https://'</p>";
      return;
    }
  
    // Recopilación de datos de redes sociales (ejemplo básico)
    var redesSociales = ["Twitter", "Facebook", "Instagram", "LinkedIn", "GitHub"];
    var resultadosHTML = "<h2>Resultados del análisis para: " + urlInput + "</h2>";
    resultadosHTML += "<ul>";
    redesSociales.forEach(function(red) {
      resultadosHTML += "<li>" + red + ": Datos recopilados</li>";
    });
    resultadosHTML += "</ul>";
  
    resultsDiv.innerHTML = resultadosHTML;
  }
  