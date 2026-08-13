#!/usr/bin/env python3
import os
import shutil
import json
import struct
import zlib
from pathlib import Path
import piexif

# Geolocation coordinates
LAT = -53.13529
LON = -70.94159

SALON_INFO = {
    "name": "Maison Balayage Studio",
    "address": "esquina Iris Muñoz / Roberto Rasmussen Fernández 187, Punta Arenas, Magallanes, Chile",
    "gps": f"{LAT},{LON}",
    "artist": "JB Balayage Boutique",
    "copyright": "© JB Balayage Boutique — Maison Balayage Studio Punta Arenas",
}

CASE_INFO = {
    "id": "roxana-balayage-cobrizo",
    "title": "Balayage Cobrizo y Caramelo Multidimensional | Caso Roxana",
    "description": "Trabajo de diseño de balayage cobrizo con reflejos caramelo en base oscura, logrando luminosidad y tridimensionalidad con maxima proteccion de la fibra capilar, sellado de cuticula y brillo espejo en Maison Balayage Studio, Punta Arenas.",
    "keywords": "balayage cobrizo Punta Arenas, balayage caramelo, morena iluminada cobriza, peluqueria Punta Arenas, Maison Balayage Studio, colorista Punta Arenas",
}

def to_deg(value, loc):
    if value < 0:
        loc_value = loc[0]
    else:
        loc_value = loc[1]
    abs_value = abs(value)
    deg = int(abs_value)
    t1 = (abs_value - deg) * 60
    min_val = int(t1)
    sec = round((t1 - min_val) * 60, 4)
    return (deg, min_val, sec, loc_value)

def get_exif_gps(lat, lon):
    lat_deg, lat_min, lat_sec, lat_ref = to_deg(lat, ["S", "N"])
    lon_deg, lon_min, lon_sec, lon_ref = to_deg(lon, ["W", "E"])
    
    gps_ifd = {
        piexif.GPSIFD.GPSLatitudeRef: lat_ref.encode('utf-8'),
        piexif.GPSIFD.GPSLatitude: ((lat_deg, 1), (lat_min, 1), (int(lat_sec * 10000), 10000)),
        piexif.GPSIFD.GPSLongitudeRef: lon_ref.encode('utf-8'),
        piexif.GPSIFD.GPSLongitude: ((lon_deg, 1), (lon_min, 1), (int(lon_sec * 10000), 10000)),
    }
    return gps_ifd

def set_jpg_metadata(src, dst):
    exif_dict = {"0th": {}, "Exif": {}, "GPS": get_exif_gps(LAT, LON), "1st": {}, "thumbnail": None}
    
    exif_dict["0th"][piexif.ImageIFD.ImageDescription] = CASE_INFO["description"].encode('utf-8')
    exif_dict["0th"][piexif.ImageIFD.Artist] = SALON_INFO["artist"].encode('utf-8')
    exif_dict["0th"][piexif.ImageIFD.Copyright] = SALON_INFO["copyright"].encode('utf-8')
    exif_dict["0th"][piexif.ImageIFD.Software] = b"Maison Balayage Studio"
    
    exif_bytes = piexif.dump(exif_dict)
    
    shutil.copy2(src, dst)
    try:
        piexif.insert(exif_bytes, str(dst))
    except Exception as e:
        print(f"Error al insertar EXIF en {dst}: {e}")

# PNG helper functions
def write_chunk(ctype, data):
    l = struct.pack(">I", len(data))
    crc = struct.pack(">I", zlib.crc32(ctype + data) & 0xFFFFFFFF)
    return l + ctype + data + crc

def inject_png_metadata(png_bytes, meta):
    HDR = b"\x89PNG\r\n\x1a\n"
    if not png_bytes.startswith(HDR):
        raise ValueError("No es un PNG válido")
    pos = 8
    before, rest = [], b""
    while pos < len(png_bytes):
        n = struct.unpack(">I", png_bytes[pos:pos+4])[0]
        ct = png_bytes[pos+4:pos+8]
        full = png_bytes[pos:pos+12+n]
        pos += 12 + n
        if ct in (b"IDAT", b"IEND") or rest:
            rest += full
        else:
            before.append(full)
    txt_chunks = b""
    for k, v in meta.items():
        txt_chunks += write_chunk(b"tEXt",
            k.encode("latin-1","replace")[:79] + b"\x00" +
            v.encode("latin-1","replace"))
    return HDR + b"".join(before) + txt_chunks + rest

def set_png_metadata(src, dst):
    meta = {
        "Title": CASE_INFO["title"],
        "Description": CASE_INFO["description"],
        "Keywords": CASE_INFO["keywords"],
        "Author": SALON_INFO["artist"],
        "Copyright": SALON_INFO["copyright"],
        "Business.Name": SALON_INFO["name"],
        "Business.Address": SALON_INFO["address"],
        "Geo.Latitude": str(LAT),
        "Geo.Longitude": str(LON),
    }
    raw = Path(src).read_bytes()
    out = inject_png_metadata(raw, meta)
    Path(dst).write_bytes(out)

def main():
    src_dir = Path("/Users/janet/Downloads/carpeta sin título")
    if not src_dir.exists():
        print(f"Error: Source directory {src_dir} does not exist.")
        return

    # Workspace paths
    ws_dir = Path("/Users/janet/Documents/IA/WEBSITE JBALAYAGE/roxana-balayage-cobrizo-punta-arenas")
    ws_fotos = ws_dir / "fotos"
    ws_videos = ws_dir / "videos"
    
    ws_fotos.mkdir(parents=True, exist_ok=True)
    ws_videos.mkdir(parents=True, exist_ok=True)
    
    # Destination directory in Downloads
    dl_dest_dir = Path("/Users/janet/Downloads/roxana-balayage-cobrizo-punta-arenas")
    dl_fotos = dl_dest_dir / "fotos"
    dl_videos = dl_dest_dir / "videos"
    dl_fotos.mkdir(parents=True, exist_ok=True)
    dl_videos.mkdir(parents=True, exist_ok=True)

    mappings = [
        # BEFORE
        {"src": "IMG_2430.JPG", "type": "photo", "new_name": "maison-balayage-punta-arenas-roxana-balayage-cobrizo-antes-del-cambio-01.jpg"},
        # AFTER PORTADA
        {"src": "IMG_2495.JPG", "type": "photo", "new_name": "maison-balayage-punta-arenas-roxana-balayage-cobrizo-portada-despues-01.jpg"},
        
        # GALLERY IMAGES
        {"src": "IMG_2508.JPG", "type": "photo", "new_name": "maison-balayage-punta-arenas-roxana-balayage-cobrizo-despues-01.jpg"},
        {"src": "IMG_2474.JPG", "type": "photo", "new_name": "maison-balayage-punta-arenas-roxana-balayage-cobrizo-despues-02.jpg"},
        {"src": "IMG_2482.JPG", "type": "photo", "new_name": "maison-balayage-punta-arenas-roxana-balayage-cobrizo-despues-03.jpg"},
        {"src": "IMG_2486.JPG", "type": "photo", "new_name": "maison-balayage-punta-arenas-roxana-balayage-cobrizo-despues-04.jpg"},
        
        # PNG ESPEJOS / DETALLES IA
        {"src": "1524036B-F6AF-4791-BF62-E268E71A51C4.PNG", "type": "photo", "new_name": "maison-balayage-punta-arenas-roxana-balayage-cobrizo-espejo-ia-01.png"},
        {"src": "1E3A7B71-C310-4024-B3F8-F392172982A1.PNG", "type": "photo", "new_name": "maison-balayage-punta-arenas-roxana-balayage-cobrizo-espejo-ia-02.png"},
        {"src": "52A6ACD6-EE83-4B62-BA0F-70511D29A339.PNG", "type": "photo", "new_name": "maison-balayage-punta-arenas-roxana-balayage-cobrizo-detalle-ia-01.png"},
        
        # VIDEO
        {"src": "IMG_2458.mov", "type": "video", "new_name": "maison-balayage-punta-arenas-roxana-balayage-cobrizo-movimiento-01.mov"},
    ]

    manifest = []
    
    print("Iniciando procesamiento de archivos para el caso Roxana...")
    for item in mappings:
        file_src = src_dir / item["src"]
        if not file_src.exists():
            print(f"Advertencia: No se encontró el archivo original {item['src']}")
            continue
            
        print(f"Procesando {item['src']} -> {item['new_name']}")
        
        # Determine targets
        if item["type"] == "photo":
            ws_target = ws_fotos / item["new_name"]
            dl_target = dl_fotos / item["new_name"]
            
            # Apply metadata and copy
            if item["new_name"].lower().endswith(".png"):
                set_png_metadata(file_src, ws_target)
                set_png_metadata(file_src, dl_target)
            else:
                set_jpg_metadata(file_src, ws_target)
                set_jpg_metadata(file_src, dl_target)
        else:
            ws_target = ws_videos / item["new_name"]
            dl_target = dl_videos / item["new_name"]
            
            # Copy videos
            shutil.copy2(file_src, ws_target)
            shutil.copy2(file_src, dl_target)
            
        manifest.append({
            "original": item["src"],
            "new": item["new_name"],
            "type": item["type"],
            "path_workspace": str(ws_target.relative_to(ws_dir.parent)),
            "path_downloads": str(dl_target)
        })

    # Write manifest JSON to workspace
    manifest_path = ws_dir / "metadata-manifest-roxana.json"
    manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False))
    
    # Write README.md to workspace
    readme_content = f"""# Caso Roxana — Balayage Cobrizo y Caramelo Multidimensional

## Resumen del Caso

- **Nombre del Cliente:** Roxana
- **Problemática/Objetivo:** Roxana deseaba iluminar su cabello con una base oscura mediante reflejos cálidos y vibrantes.
- **Procedimiento técnico:**
  - Balayage a mano alzada en tonos cobrizo y caramelo.
  - Protección de la fibra capilar, sellado de cutícula posterior y tratamiento intensivo para brillo espejo.

## Metadatos y Ubicación

- **Ubicación:** Maison Balayage Studio, Punta Arenas, Chile.
- **Coordenadas de Geolocalización (EXIF):** `{LAT}, {LON}`.
- **Autor y Derechos:** JB Balayage Boutique.
"""
    (ws_dir / "README-CLOUDINARY.md").write_text(readme_content)
    print("Procesamiento terminado con éxito.")

    # Remove the old un-renamed folder in Downloads to keep it clean
    try:
        shutil.rmtree(src_dir)
        print("Eliminada carpeta original sin renombrar en Downloads.")
    except Exception as e:
        print(f"Error al eliminar carpeta original: {e}")

if __name__ == "__main__":
    main()
