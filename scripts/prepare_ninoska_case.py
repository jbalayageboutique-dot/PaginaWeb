#!/usr/bin/env python3
import os
import shutil
import json
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
    "id": "ninoska-balayage-babylights-miel",
    "title": "Balayage y Babylights Tono Miel | Caso Ninoska",
    "description": "Trabajo de balayage y babylights en color miel, iluminando el contorno del rostro (contouring) en Punta Arenas. Cuidado de la salud capilar con sellado de cuticula e hidratacion profunda para un cabello sano y brilloso en Maison Balayage Studio.",
    "keywords": "balayage miel Punta Arenas, babylights Punta Arenas, iluminacion contorno rostro, peluqueria Punta Arenas, Maison Balayage Studio, jb balayage boutique, sellado cuticula, hidratacion profunda",
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

def main():
    src_dir = Path("/Users/janet/Downloads/balayage y baby lightcarpeta sin título")
    if not src_dir.exists():
        print(f"Error: Source directory {src_dir} does not exist.")
        return

    # Workspace paths
    ws_dir = Path("/Users/janet/Documents/IA/WEBSITE JBALAYAGE/ninoska-balayage-babylights-miel-punta-arenas")
    ws_fotos = ws_dir / "fotos"
    ws_videos = ws_dir / "videos"
    
    ws_fotos.mkdir(parents=True, exist_ok=True)
    ws_videos.mkdir(parents=True, exist_ok=True)
    
    # Destination directory in Downloads
    dl_dest_dir = Path("/Users/janet/Downloads/ninoska-balayage-babylights-miel-punta-arenas")
    dl_fotos = dl_dest_dir / "fotos"
    dl_videos = dl_dest_dir / "videos"
    dl_fotos.mkdir(parents=True, exist_ok=True)
    dl_videos.mkdir(parents=True, exist_ok=True)

    mappings = [
        # BEFORE
        {"src": "IMG_4406.jpg", "type": "photo", "new_name": "maison-balayage-punta-arenas-ninoska-balayage-babylights-miel-antes-del-cambio-01.jpg"},
        # AFTER PORTADA
        {"src": "IMG_4404.JPG", "type": "photo", "new_name": "maison-balayage-punta-arenas-ninoska-balayage-babylights-miel-portada-despues-01.jpg"},
        
        # GALLERY IMAGES
        {"src": "IMG_4405.JPG", "type": "photo", "new_name": "maison-balayage-punta-arenas-ninoska-balayage-babylights-miel-despues-01.jpg"},
        {"src": "IMG_4433.jpg", "type": "photo", "new_name": "maison-balayage-punta-arenas-ninoska-balayage-babylights-miel-despues-02.jpg"},
        {"src": "IMG_4440.JPG", "type": "photo", "new_name": "maison-balayage-punta-arenas-ninoska-balayage-babylights-miel-despues-03.jpg"},
        
        # VIDEO
        {"src": "IMG_4413.mov", "type": "video", "new_name": "maison-balayage-punta-arenas-ninoska-balayage-babylights-miel-movimiento-01.mov"},
    ]

    manifest = []
    
    print("Iniciando procesamiento de archivos para el caso Ninoska...")
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
    manifest_path = ws_dir / "metadata-manifest-ninoska.json"
    manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False))
    
    # Write README.md to workspace
    readme_content = f"""# Caso Ninoska — Balayage y Babylights en Tono Miel

## Resumen del Caso

- **Nombre del Cliente:** Ninoska
- **Problemática/Objetivo:** Ninoska buscaba un cambio luminoso aplicando un balayage color miel (el tono furor de la temporada) complementado con babylights de contorno.
- **Procedimiento técnico:**
  - Balayage completo combinado con babylights muy finas de contorno facial para iluminar el rostro.
  - Priorizacion absoluta de la salud capilar.
  - Tratamiento completo de sellado de cuticula posterior.
  - Masaje de hidratacion profunda para lograr un acabado brilloso, suave y sano.

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
