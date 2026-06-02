import zipfile
import xml.etree.ElementTree as ET

def dump_docx_content(docx_path):
    ns_w = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
    ns_r = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'
    ns_a = '{http://schemas.openxmlformats.org/drawingml/2006/main}'
    
    try:
        document = zipfile.ZipFile(docx_path)
        rels_xml = document.read('word/_rels/document.xml.rels')
        rels_tree = ET.fromstring(rels_xml)
        rels_map = {}
        for rel in rels_tree:
            rId = rel.attrib.get('Id')
            target = rel.attrib.get('Target')
            if target and target.startswith('media/'):
                rels_map[rId] = target.split('/')[-1]
                
        doc_xml = document.read('word/document.xml')
        doc_tree = ET.fromstring(doc_xml)
        body = doc_tree.find(f'{ns_w}body')
        
        print(f"\n=== DUMP FOR {docx_path} ===")
        for elem in body.iter():
            if elem.tag == f'{ns_w}p' or elem.tag == f'{ns_w}tbl':
                text = "".join([t.text for t in elem.iter(f'{ns_w}t') if t.text])
                text = text.strip()
                if text:
                    print(f"TEXT: {text}")
            elif elem.tag == f'{ns_w}drawing':
                for blip in elem.iter(f'{ns_a}blip'):
                    rId = blip.attrib.get(f'{ns_r}embed')
                    if rId and rId in rels_map:
                        print(f"--> IMAGE: {rels_map[rId]}")
                        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    dump_docx_content('PRODUCTOS VENTA.docx')
