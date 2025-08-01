import pytesseract
from PIL import Image
import os

# Ensure Tesseract is in PATH or specify the path directly
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Path to the image you want to process
image_path = 'path_to_your_image.jpg'

if not os.path.isfile(image_path):
    raise FileNotFoundError(f"No file found at {image_path}")

# Open the image using PIL
img = Image.open(image_ss.png)

# Use pytesseract to do OCR on the image
text = pytesseract.image_to_string(img)

# Print the extracted text
print(text)
