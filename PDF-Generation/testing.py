from pdfminer.high_level import extract_text
from bs4 import BeautifulSoup

text = extract_text('deneme1.pdf')
soup = BeautifulSoup(text,'html.parser')
with open('modified.html', 'w', encoding='utf-8') as file:
    file.write(str(soup))
