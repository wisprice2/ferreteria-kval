import zipfile
import xml.etree.ElementTree as ET
import re
import json

def get_image_mapping(docx_path):
    ns_w = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
    ns_r = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'
    ns_a = '{http://schemas.openxmlformats.org/drawingml/2006/main}'
    ns_pic = '{http://schemas.openxmlformats.org/drawingml/2006/picture}'
    
    try:
        document = zipfile.ZipFile(docx_path)
        
        # Read relationships to map rId to image target
        rels_xml = document.read('word/_rels/document.xml.rels')
        rels_tree = ET.fromstring(rels_xml)
        rels_map = {}
        for rel in rels_tree:
            rId = rel.attrib.get('Id')
            target = rel.attrib.get('Target')
            if target and target.startswith('media/'):
                rels_map[rId] = target.split('/')[-1]
                
        # Read document.xml
        doc_xml = document.read('word/document.xml')
        doc_tree = ET.fromstring(doc_xml)
        
        body = doc_tree.find(f'{ns_w}body')
        
        items = []
        current_text_blocks = []
        
        for elem in body.iter():
            if elem.tag == f'{ns_w}p':
                # Extract text
                text = "".join([t.text for t in elem.iter(f'{ns_w}t') if t.text])
                text = text.strip()
                if text:
                    current_text_blocks.append(text)
                    
            elif elem.tag == f'{ns_w}drawing':
                # Find the blip which contains the rId
                for blip in elem.iter(f'{ns_a}blip'):
                    rId = blip.attrib.get(f'{ns_r}embed')
                    if rId and rId in rels_map:
                        img_name = rels_map[rId]
                        # We associate this image with the recent text block, or next text block
                        # Let's save the current context
                        items.append({
                            'text_before': " | ".join(current_text_blocks[-3:]),
                            'image': img_name
                        })
                        current_text_blocks = []
                        
        print(f"\n=== Mapping for {docx_path} ===")
        for item in items:
            print(f"IMG: {item['image']} <--> TEXT_BEFORE: {item['text_before']}")
            
    except Exception as e:
        print(f"Error parsing {docx_path}: {e}")

if __name__ == '__main__':
    get_image_mapping('PRODUCTOS VENTA.docx')
    get_image_mapping('PRODUCTOS VENTA 2.docx')
