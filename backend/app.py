import os
from flask import Flask, send_from_directory
from flask_cors import CORS
from routes.crawler_route import crawler_bp

app = Flask(__name__)
CORS(app)

# Registrar las rutas 
app.register_blueprint(crawler_bp)

@app.route('/')
def index():
    return send_from_directory('../frontend/html/', 'index.html')

# Configurar ruta estática frontend
@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('../frontend', path)

if __name__ == "__main__":
    app.run(debug=True)