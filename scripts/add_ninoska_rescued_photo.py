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
        print(f"Metadatos EXIF insertados en {dst}")
    except Exception as e:
        print(f"Error al insertar EXIF en {dst}: {e}")

def main():
    src_file = Path("/Users/janet/.gemini/antigravity/brain/12946587-c948-4da4-aa8d-9c108831f104/.user_uploaded/media_1786400550951.jpg")
    if not src_file.exists():
        print("Error: El archivo de imagen subido no existe en la ruta esperada.")
        return

    new_name = "maison-balayage-punta-arenas-ninoska-balayage-babylights-miel-despues-04.jpg"

    # Destination paths
    ws_dst = Path("/Users/janet/Documents/IA/WEBSITE JBALAYAGE/ninoska-balayage-babylights-miel-punta-arenas/fotos") / new_name
    dl_dst = Path("/Users/janet/Downloads/ninoska-balayage-babylights-miel-punta-arenas/fotos") / new_name

    ws_dst.parent.mkdir(parents=True, exist_ok=True)
    dl_dst.parent.mkdir(parents=True, exist_ok=True)

    print(f"Rescatando foto {src_file}...")
    set_jpg_metadata(src_file, ws_dst)
    set_jpg_metadata(src_file, dl_dst)

    # Append to metadata manifest if exists
    manifest_path = Path("/Users/janet/Documents/IA/WEBSITE JBALAYAGE/ninoska-balayage-babylights-miel-punta-arenas/metadata-manifest-ninoska.json")
    if manifest_path.exists():
        manifest = json.loads(manifest_path.read_text())
        manifest.append({
            "original": src_file.name,
            "new": new_name,
            "type": "photo",
            "path_workspace": str(ws_dst.relative_to(ws_dst.parents[1])),
            "path_downloads": str(dl_dst)
        })
        manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False))
        print("Manifiesto actualizado.")

if __name__ == "__main__":
    main()
