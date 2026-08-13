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
    "id": "gisela-barrido-color-borgona",
    "title": "Barrido de Color y Borgoña Espectacular | Caso Gisela",
    "description": "Trabajo de barrido de color para retirar tonos anteriores y aplicacion de un color borgoña intenso y luminoso en un cabello voluptuoso y largo. Hidratacion profunda para sellar cuticula y dar brillo en Maison Balayage Studio, Punta Arenas.",
    "keywords": "barrido de color Punta Arenas, cabello color borgona, cabello largo borgoña, peluqueria Punta Arenas, Maison Balayage Studio, colorista Punta Arenas",
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
    # Workspace paths
    ws_dir = Path("/Users/janet/Documents/IA/WEBSITE JBALAYAGE/gisela-barrido-color-borgona-punta-arenas")
    ws_fotos = ws_dir / "fotos"
    ws_videos = ws_dir / "videos"
    
    ws_fotos.mkdir(parents=True, exist_ok=True)
    ws_videos.mkdir(parents=True, exist_ok=True)
    
    # Destination directory in Downloads
    dl_dest_dir = Path("/Users/janet/Downloads/gisela-barrido-color-borgona-punta-arenas")
    dl_fotos = dl_dest_dir / "fotos"
    dl_videos = dl_dest_dir / "videos"
    dl_fotos.mkdir(parents=True, exist_ok=True)
    dl_videos.mkdir(parents=True, exist_ok=True)

    # File sources
    source_mappings = [
        # BEFORE
        {"src": "/Users/janet/Downloads/color borgona/047965e0-8fc4-4b8e-a9e9-2c97b7c3b1c1.jpg", "type": "photo", "new_name": "maison-balayage-punta-arenas-gisela-barrido-color-borgona-antes-del-cambio-01.jpg"},
        # AFTER PORTADA
        {"src": "/Users/janet/Downloads/color borgona/IMG_3618.jpg", "type": "photo", "new_name": "maison-balayage-punta-arenas-gisela-barrido-color-borgona-portada-despues-01.jpg"},
        # GALLERY AFTER 1
        {"src": "/Users/janet/Downloads/carpeta sin título/IMG_3619 2.jpg", "type": "photo", "new_name": "maison-balayage-punta-arenas-gisela-barrido-color-borgona-despues-01.jpg"},
        # GALLERY AFTER 2
        {"src": "/Users/janet/Downloads/carpeta sin título/IMG_3621.jpg", "type": "photo", "new_name": "maison-balayage-punta-arenas-gisela-barrido-color-borgona-despues-02.jpg"},
        
        # SHORTER VIDEOS
        # IMG_4382.mov (3.97s)
        {"src": "/Users/janet/Downloads/carpeta sin título/IMG_4382.mov", "type": "video", "new_name": "maison-balayage-punta-arenas-gisela-barrido-color-borgona-movimiento-01.mov"},
        # IMG_4381.mov (5.66s)
        {"src": "/Users/janet/Downloads/carpeta sin título/IMG_4381.mov", "type": "video", "new_name": "maison-balayage-punta-arenas-gisela-barrido-color-borgona-movimiento-02.mov"},
        # IMG_3626.mov (5.93s)
        {"src": "/Users/janet/Downloads/color borgona/IMG_3626.mov", "type": "video", "new_name": "maison-balayage-punta-arenas-gisela-barrido-color-borgona-movimiento-03.mov"},
    ]

    manifest = []
    
    print("Filtrando copias y estructurando caso Gisela Borgoña...")
    for item in source_mappings:
        src_path = Path(item["src"])
        if not src_path.exists():
            print(f"Advertencia: No se encontró el archivo {src_path}")
            continue
            
        print(f"Procesando {src_path.name} -> {item['new_name']}")
        
        # Target paths
        if item["type"] == "photo":
            ws_target = ws_fotos / item["new_name"]
            dl_target = dl_fotos / item["new_name"]
            
            # Apply metadata
            set_jpg_metadata(src_path, ws_target)
            set_jpg_metadata(src_path, dl_target)
        else:
            ws_target = ws_videos / item["new_name"]
            dl_target = dl_videos / item["new_name"]
            
            # Copy videos
            shutil.copy2(src_path, ws_target)
            shutil.copy2(src_path, dl_target)
            
        manifest.append({
            "original_path": str(src_path),
            "new_name": item["new_name"],
            "type": item["type"],
            "path_workspace": str(ws_target.relative_to(ws_dir.parent)),
            "path_downloads": str(dl_target)
        })

    # Write manifest JSON to workspace
    manifest_path = ws_dir / "metadata-manifest-gisela.json"
    manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False))
    
    # Write README.md to workspace
    readme_content = f"""# Caso Gisela — Barrido de Color y Borgoña Espectacular

## Resumen del Caso

- **Nombre del Cliente:** Gisela
- **Problemática/Objetivo:** Gisela llegó con una melena voluptuosa y muy larga, con acumulaciones de color anterior. Deseaba un cambio profundo hacia un borgoña vibrante e intenso.
- **Procedimiento técnico:**
  - Barrido de color completo para retirar reflejos y acumulaciones de tinte anteriores de forma uniforme.
  - Aplicación de un tono borgoña profundo y luminoso, formulado para aportar tridimensionalidad a su cabello voluptuoso.
  - Hidratación profunda y sellado de cutícula para garantizar brillo máximo y sedosidad en toda la longitud de su cabello.

## Metadatos y Ubicación

- **Ubicación:** Maison Balayage Studio, Punta Arenas, Chile.
- **Coordenadas de Geolocalización (EXIF):** `{LAT}, {LON}`.
- **Autor y Derechos:** JB Balayage Boutique.
"""
    (ws_dir / "README-CLOUDINARY.md").write_text(readme_content)
    print("Procesamiento terminado con éxito.")

    # Remove the old folders in Downloads to keep it clean
    for folder_to_remove in ["color borgona", "carpeta sin título"]:
        path_to_remove = Path("/Users/janet/Downloads") / folder_to_remove
        try:
            if path_to_remove.exists():
                shutil.rmtree(path_to_remove)
                print(f"Eliminada carpeta original '{folder_to_remove}' en Downloads.")
        except Exception as e:
            print(f"Error al eliminar carpeta '{folder_to_remove}': {e}")

if __name__ == "__main__":
    main()
