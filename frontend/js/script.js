function analizarURL() {
    var urlInput = document.getElementById("urlInput").value;
    var resultsDiv = document.getElementById("results");
  
    // Validación del formato del enlace (se puede mejorar)
    if (!urlInput.startsWith("http://") && !urlInput.startsWith("https://")) {
      resultsDiv.innerHTML = "<p>Por favor, ingresa un enlace válido comenzando con 'http://' o 'https://'</p>";
      return;
    }
    fetch("http://localhost:5000/search-url?searchTerm=" + urlInput)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      mostrarResultados(data);
    });

    resultsDiv.innerHTML = resultadosHTML;

  }