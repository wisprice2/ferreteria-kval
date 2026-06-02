import os
import re

def extract_numbers(filename):
    match = re.search(r'image(\d+)', filename)
    if match:
        return int(match.group(1))
    return 0

d1_images = [f for f in os.listdir(r'c:\Users\WinterOS\Desktop\proyectos de pago\ferreteria\public\images') if f.startswith('d1_')]
d2_images = [f for f in os.listdir(r'c:\Users\WinterOS\Desktop\proyectos de pago\ferreteria\public\images') if f.startswith('d2_')]

d1_images.sort(key=extract_numbers)
d2_images.sort(key=extract_numbers)

print("D1 Images:", d1_images)
print("D2 Images:", d2_images)
