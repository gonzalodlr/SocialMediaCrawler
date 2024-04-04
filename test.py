import requests
from bs4 import BeautifulSoup

def simple_crawler(url):
    try:
        # Realizar una solicitud HTTP a la URL
        response = requests.get(url)

        # Verificar que la solicitud fue exitosa (código de estado 200)
        if response.status_code == 200:
            # Analizar el contenido HTML de la página
            soup = BeautifulSoup(response.text, 'html.parser')

            # Encontrar todos los enlaces en la página
            links = soup.find_all('a')

            # Conjunto para almacenar enlaces de redes sociales únicos
            social_links = set()

            # Filtrar los enlaces de redes sociales
            for link in links:
                href = link.get('href')
                if href:
                    if 'facebook' in href or 'twitter' in href or 'instagram' in href or 'github' in href or 'tiktok' in href or 'linkedin' in href:
                        social_links.add(href)

            # Imprimir los enlaces de redes sociales únicos encontrados
            for social_link in social_links:
                print(social_link)

    except Exception as e:
        print(f"Error: {e}")
# Ejecutar el crawl desde la url dada
url = input("Ingrese la dirección web a analizar: ")
simple_crawler(url)