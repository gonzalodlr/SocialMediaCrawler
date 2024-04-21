const express = require('express')
const path = require('path'); // Necesitamos requerir el módulo path
const { getLinkPreview, getPreviewFromContent } = require('link-preview-js');


const options = {
  redirect: 'follow' // Configura la opción de redirección a 'follow'
};
app = express();
const PORT = 3000;
// Permitir solicitudes CORS desde cualquier origen
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Servir archivos estáticos desde la carpeta frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Ruta para servir el archivo index.html
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'frontend', 'html', 'index.html'));
});
// Ruta para obtener la vista previa de un enlace
app.get('/get-preview', async function (req, res) {
    const { url } = req.query;
    try {
        const preview = await getLinkPreview(url, {
            followRedirects: 'manual',
            handleRedirects: (redirectUrl) => {
                // Aquí puedes implementar la lógica para validar la seguridad de las redirecciones,
                // por ejemplo, verificar que el nuevo URL es seguro antes de seguir con la redirección.
                return redirectUrl; // En este ejemplo, simplemente permitimos todas las redirecciones.
            }
        });
        res.json(preview); // Envía la vista previa como JSON
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo vista previa del enlace' });
    }
});
app.listen(PORT, function () {
    console.log('Listening on Port 3000');
}); 
