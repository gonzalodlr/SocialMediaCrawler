import requests
from bs4 import BeautifulSoup
import re

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

            # Expresiones regulares mejoradas para los enlaces de redes sociales
            social_media_regex = {
                'facebook': r'https?://(www\.)?facebook\.com/.*',
                'twitter': r'https?://(www\.)?twitter\.com/.*',
                'instagram': r'https?://(www\.)?instagram\.com/.*',
                'github': r'https?://(www\.)?github\.com/.*',
                'tiktok': r'https?://(www\.)?tiktok\.com/.*',
                'linkedin': r'https?://(www\.)?linkedin\.com/.*'
            }

            # Conjunto para almacenar enlaces de redes sociales únicos
            social_links = set()

            # Filtrar los enlaces de redes sociales y evitar duplicados
            for link in links:
                href = link.get('href')
                if href:
                    for network, regex_pattern in social_media_regex.items():
                        if re.match(regex_pattern, href):
                            if not any(network_link in social_links for network_link in social_links if network in network_link):
                                social_links.add(href)

            # Imprimir los enlaces de redes sociales únicos encontrados
            for social_link in social_links:
                print(social_link)

    except Exception as e:
        print(f"Error: {e}")

# Ejecutar el crawl desde la url dada
url = input("Ingrese la dirección web a analizar: ")
simple_crawler(url)
