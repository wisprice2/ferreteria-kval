import zipfile
import os

def extract_images(docx_path, output_dir, prefix):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    try:
        document = zipfile.ZipFile(docx_path)
        images = [f for f in document.namelist() if f.startswith('word/media/')]
        print(f"=== Images in {docx_path} ===")
        for img in images:
            print(img)
            # Extract and rename
            ext = img.split('.')[-1]
            basename = img.split('/')[-1].split('.')[0]
            out_name = f"{prefix}_{basename}.{ext}"
            out_path = os.path.join(output_dir, out_name)
            
            source = document.open(img)
            target = open(out_path, "wb")
            with source, target:
                target.write(source.read())
                
        document.close()
    except Exception as e:
        print(f"Error reading {docx_path}: {e}")

if __name__ == '__main__':
    public_dir = r"c:\Users\WinterOS\Desktop\proyectos de pago\ferreteria\public\images"
    extract_images('PRODUCTOS VENTA.docx', public_dir, 'd1')
    extract_images('PRODUCTOS VENTA 2.docx', public_dir, 'd2')
