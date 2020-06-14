import xml.etree.ElementTree
import json, io, base64, deflatedecompress, urllib.parse

def decompress_data(compressed_data):
    compressed_bytes = io.BytesIO(
        base64.b64decode(compressed_data)
    )

    urlencoded_diagram = deflatedecompress.Decompressor.decompress_to_bytes(
        deflatedecompress.BitInputStream(compressed_bytes)
    )

    diagram_xml = urllib.parse.unquote(
        urlencoded_diagram.decode('utf-8')
    )

    return(
        io.BytesIO(
            bytes(diagram_xml, 'utf-8')
        )
    )
if __name__ == "__main__":

    decompressed_xml = []
    tree = xml.etree.ElementTree.parse("dfd.xml")
    root = tree.getroot()

    shapes = json.loads(root.text)
    for shape in shapes:
        shape_xml = decompress_data(shape['xml']).read()
        decompressed_xml.append(shape_xml)
    
    outfile = open('library.py', 'w')

    for line in decompressed_xml:
        outfile.write("{}\n".format(line.decode('utf-8')))

    import pdb; pdb.set_trace()


