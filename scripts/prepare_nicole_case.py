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
    "id": "nicole-morena-iluminada",
    "title": "Morena Iluminada y Corrección de Tonos | Caso Nicole",
    "description": "Trabajo de transicion a Morena Iluminada en base oscura con acumulacion de tintura negra y roja. Prueba de mechas previa para evaluar la salud de la fibra capilar, diseno de balayage personalizado, sellado de cuticula e hidratacion profunda en Maison Balayage Studio, Punta Arenas.",
    "keywords": "morena iluminada Punta Arenas, correccion de color negro rojo, prueba de mechas peluqueria, balayage avellana, peluqueria Punta Arenas, Maison Balayage Studio, jb balayage boutique",
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
    src_dir1 = Path("/Users/janet/Downloads/carpeta sin título")
    src_dir2 = Path("/Users/janet/Downloads/carpeta sin título 2")

    # Workspace paths
    ws_dir = Path("/Users/janet/Documents/IA/WEBSITE JBALAYAGE/nicole-morena-iluminada-punta-arenas")
    ws_fotos = ws_dir / "fotos"
    ws_videos = ws_dir / "videos"
    
    ws_fotos.mkdir(parents=True, exist_ok=True)
    ws_videos.mkdir(parents=True, exist_ok=True)
    
    # Destination directory in Downloads
    dl_dest_dir = Path("/Users/janet/Downloads/nicole-morena-iluminada-punta-arenas")
    dl_fotos = dl_dest_dir / "fotos"
    dl_videos = dl_dest_dir / "videos"
    dl_fotos.mkdir(parents=True, exist_ok=True)
    dl_videos.mkdir(parents=True, exist_ok=True)

    mappings = [
        # BEFORE
        {"src": src_dir2 / "IMG_3372 2.jpg", "type": "photo", "new_name": "maison-balayage-punta-arenas-nicole-morena-iluminada-antes-del-cambio-01.jpg"},
        # AFTER PORTADA
        {"src": src_dir1 / "IMG_3399 2.jpg", "type": "photo", "new_name": "maison-balayage-punta-arenas-nicole-morena-iluminada-portada-despues-01.jpg"},
        
        # GALLERY IMAGES
        {"src": src_dir1 / "IMG_3381 2.jpg", "type": "photo", "new_name": "maison-balayage-punta-arenas-nicole-morena-iluminada-despues-01.jpg"},
        
        # PNG ESPEJOS / DETALLES IA
        {"src": src_dir1 / "863B3BA2-84FF-4FEA-8D46-B77014FFD9FB.PNG", "type": "photo", "new_name": "maison-balayage-punta-arenas-nicole-morena-iluminada-espejo-ia-01.png"},
        {"src": src_dir1 / "9CCBC054-1D3E-4A2B-9945-C8C37F512A06.PNG", "type": "photo", "new_name": "maison-balayage-punta-arenas-nicole-morena-iluminada-espejo-ia-02.png"},
        {"src": src_dir1 / "F577D744-972D-4904-85CE-A7D5D5E88445.PNG", "type": "photo", "new_name": "maison-balayage-punta-arenas-nicole-morena-iluminada-detalle-ia-01.png"},
        
        # VIDEOS
        {"src": src_dir1 / "IMG_3383 2.MOV", "type": "video", "new_name": "maison-balayage-punta-arenas-nicole-morena-iluminada-movimiento-01.mov"},
        {"src": src_dir1 / "IMG_3394 2.mov", "type": "video", "new_name": "maison-balayage-punta-arenas-nicole-morena-iluminada-movimiento-02.mov"},
        {"src": src_dir1 / "IMG_3395 2.mov", "type": "video", "new_name": "maison-balayage-punta-arenas-nicole-morena-iluminada-movimiento-03.mov"},
    ]

    manifest = []
    
    print("Iniciando procesamiento de archivos para el caso Nicole...")
    for item in mappings:
        file_src = Path(item["src"])
        if not file_src.exists():
            print(f"Advertencia: No se encontró el archivo original {file_src.name}")
            continue
            
        print(f"Procesando {file_src.name} -> {item['new_name']}")
        
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
            "original": file_src.name,
            "new": item["new_name"],
            "type": item["type"],
            "path_workspace": str(ws_target.relative_to(ws_dir.parent)),
            "path_downloads": str(dl_target)
        })

    # Write manifest JSON to workspace
    manifest_path = ws_dir / "metadata-manifest-nicole.json"
    manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False))
    
    # Write README.md to workspace
    readme_content = f"""# Caso Nicole — Morena Iluminada y Corrección de Tonos

## Resumen del Caso

- **Nombre del Cliente:** Nicole
- **Problemática/Objetivo:** Nicole llegó con una acumulación muy difícil de retirar de tintura negra y tintura roja previa.
- **Procedimiento técnico:**
  - Realización previa de una prueba de mecha (diagnóstico fundamental) para evaluar el estado y resistencia de la fibra.
  - Con base en el diagnóstico, se determinó que el cabello no resistía un rubio claro sin comprometer la fibra capilar.
  - Se diseñó una transición progresiva hacia una Morena Iluminada en tonos cálidos y avellana, cuidando al máximo la salud capilar.
  - Hidratación profunda y sellado de cutícula final para recuperar elasticidad, suavidad y brillo espejo.

## Metadatos y Ubicación

- **Ubicación:** Maison Balayage Studio, Punta Arenas, Chile.
- **Coordenadas de Geolocalización (EXIF):** `{LAT}, {LON}`.
- **Autor y Derechos:** JB Balayage Boutique.
"""
    (ws_dir / "README-CLOUDINARY.md").write_text(readme_content)
    print("Procesamiento terminado con éxito.")

    # Remove the old un-renamed folders in Downloads to keep it clean
    for folder in [src_dir1, src_dir2]:
        try:
            if folder.exists():
                shutil.rmtree(folder)
                print(f"Eliminada carpeta original '{folder.name}' en Downloads.")
        except Exception as e:
            print(f"Error al eliminar carpeta original '{folder.name}': {e}")

if __name__ == "__main__":
    main()
