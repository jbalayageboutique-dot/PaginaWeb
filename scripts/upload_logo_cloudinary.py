#!/usr/bin/env python3
"""
=============================================================
  JB Balayage Boutique — Script de Subida a Cloudinary
  Agrega metadatos SEO + Geolocalización y sube a Cloudinary
=============================================================
"""

import os, sys, json, hashlib, struct, zlib, time, requests
from pathlib import Path

# ── CONFIGURACIÓN PELUQUERÍA ─────────────────────────────────
SALON_INFO = {
    "full_name":  "Maison Balayage Studio — JB Balayage Boutique Punta Arenas",
    "address":    "esquina Iris Muñoz - Roberto Rasmussen Fernández 187, 6200000 Punta Arenas, Magallanes y la Antártica Chilena, Chile",
    "city":       "Punta Arenas",
    "region":     "Magallanes y la Antártica Chilena",
    "country":    "Chile",
    "phone":      "+56 9 8558 0190",
    "website":    "https://estudiobalayage.com",
    "lat":        "-53.13529",
    "lon":        "-70.94159",
    "copyright":  "© JB Balayage Boutique — Maison Balayage Studio Punta Arenas",
    "artist":     "JB Balayage Boutique",
}

# ── CLOUDINARY ───────────────────────────────────────────────
CLOUD_NAME  = os.environ.get("CLOUDINARY_CLOUD_NAME",  "apssuuqy")
API_KEY     = os.environ.get("CLOUDINARY_API_KEY",     "714586942776954")
API_SECRET  = os.environ.get("CLOUDINARY_API_SECRET",  "")

# ── METADATOS DEL LOGO ───────────────────────────────────────
LOGO_TAGS = [
    "logo","JB Balayage","JB Balayage Boutique","Balayage Boutique",
    "peluqueria Punta Arenas","Maison Balayage Studio",
    "balayage punta arenas","peluqueria magallanes",
    "colorista profesional","balayage chile",
    "salon de belleza punta arenas","branding",
]

LOGO_CONTEXT = {
    "alt":           "Logo JB Balayage Boutique Peluquería Punta Arenas",
    "caption":       "JB Balayage Boutique | Maison Balayage Studio | Punta Arenas Chile",
    "business_name": "JB Balayage Boutique — Maison Balayage Studio",
    "address":       SALON_INFO["address"],
    "city":          SALON_INFO["city"],
    "region":        SALON_INFO["region"],
    "country":       SALON_INFO["country"],
    "phone":         SALON_INFO["phone"],
    "website":       SALON_INFO["website"],
    "geo_lat":       SALON_INFO["lat"],
    "geo_lon":       SALON_INFO["lon"],
    "copyright":     SALON_INFO["copyright"],
    "seo_keywords":  "logo JB Balayage, peluqueria Punta Arenas, Balayage Boutique, Maison Balayage",
}

# ── HELPERS PNG ──────────────────────────────────────────────

def write_chunk(ctype, data):
    l = struct.pack(">I", len(data))
    crc = struct.pack(">I", zlib.crc32(ctype + data) & 0xFFFFFFFF)
    return l + ctype + data + crc

def inject_metadata(png_bytes, meta):
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

def add_png_meta(src, dst, meta):
    raw = Path(src).read_bytes()
    out = inject_metadata(raw, {k: str(v) for k, v in meta.items()})
    Path(dst).write_bytes(out)
    return len(out)

# ── CLOUDINARY SIGN + UPLOAD ─────────────────────────────────

def cld_sign(params, secret):
    s = "&".join(f"{k}={v}" for k, v in sorted(params.items())
                 if k not in ("file","api_key","resource_type","cloud_name"))
    return hashlib.sha1((s + secret).encode()).hexdigest()

def upload(file_path):
    ts   = str(int(time.time()))
    tags = ",".join(LOGO_TAGS)
    ctx  = "|".join(f"{k}={v}" for k, v in LOGO_CONTEXT.items())
    sp = {
        "context":      ctx,
        "display_name": "Logo JB Balayage Boutique Peluquería",
        "folder":       "maison-balayage/branding",
        "overwrite":    "true",
        "public_id":    "maison-balayage-studio-logo-jb-balayage-boutique-punta-arenas",
        "tags":         tags,
        "timestamp":    ts,
    }
    sig = cld_sign(sp, API_SECRET)
    url = f"https://api.cloudinary.com/v1_1/{CLOUD_NAME}/image/upload"
    with open(file_path, "rb") as f:
        r = requests.post(url,
            files={"file": ("maison-balayage-studio-logo-jb-balayage-boutique-punta-arenas.png", f, "image/png")},
            data={**sp, "api_key": API_KEY, "signature": sig},
            timeout=60)
    return r.json()

# ── MAIN ─────────────────────────────────────────────────────

def main():
    base = Path(__file__).parent.parent
    src  = base / "maison-balayage-studio-logo-jb-balayage-boutique-punta-arenas.png"
    dst  = base / "assets" / "maison-balayage-studio-logo-jb-balayage-boutique-punta-arenas.png"
    dst.parent.mkdir(parents=True, exist_ok=True)

    if not src.exists():
        print(f"❌ No encontré el logo en: {src}"); sys.exit(1)

    print("=" * 60)
    print("  JB Balayage Boutique — Logo → Metadatos → Cloudinary")
    print("=" * 60)

    # PASO 1 – Metadatos PNG
    print("\n📝 PASO 1 — Inyectando metadatos SEO y Geolocalización...")
    meta = {
        "Title":            "Logo JB Balayage Boutique Peluquería Punta Arenas",
        "Description":      "Logo oficial de JB Balayage Boutique. Especialista en Balayage, Morena Iluminada y Corrección de Color — Punta Arenas, Magallanes, Chile.",
        "Keywords":         "logo JB Balayage, JB Balayage Boutique, peluqueria Punta Arenas, balayage boutique, Maison Balayage Studio, colorista magallanes",
        "Author":           SALON_INFO["artist"],
        "Copyright":        SALON_INFO["copyright"],
        "Comment":          f"Peluquería boutique en Punta Arenas, Magallanes, Chile.",
        "Business.Name":    SALON_INFO["full_name"],
        "Business.Address": SALON_INFO["address"],
        "Business.City":    SALON_INFO["city"],
        "Business.Region":  SALON_INFO["region"],
        "Business.Country": SALON_INFO["country"],
        "Business.Phone":   SALON_INFO["phone"],
        "Business.Website": SALON_INFO["website"],
        "Geo.Latitude":     SALON_INFO["lat"],
        "Geo.Longitude":    SALON_INFO["lon"],
        "Geo.Region":       "CL-MA",
        "Geo.PlaceName":    "Punta Arenas, Magallanes, Chile",
        "og:title":         "JB Balayage Boutique — Maison Balayage Studio Punta Arenas",
        "og:description":   "Especialistas en Balayage en Punta Arenas. Agenda tu consulta al +56 9 8558 0190.",
        "og:type":          "business.business",
    }
    sb = src.stat().st_size
    sa = add_png_meta(str(src), str(dst), meta)
    print(f"   ✅ Guardado: assets/maison-balayage-studio-logo-jb-balayage-boutique-punta-arenas.png")
    print(f"   📦 Orig: {sb:,}B ({sb/1024:.1f}KB) → Con meta: {sa:,}B ({sa/1024:.1f}KB)")

    # PASO 2 – Cloudinary
    print("\n☁️  PASO 2 — Subiendo a Cloudinary...")
    if not API_SECRET:
        print("\n⚠️  Falta CLOUDINARY_API_SECRET. Ejecuta así:")
        print("   CLOUDINARY_API_SECRET='tu_secret_aqui' \\")
        print("   python3 scripts/upload_logo_cloudinary.py")
        print("\n✅ El logo con metadatos ya está listo localmente.")
        return

    res = upload(str(dst))
    if "error" in res:
        print(f"\n❌ Error: {res['error'].get('message', res)}"); sys.exit(1)

    su  = res.get("secure_url","")
    opt = su.replace("/image/upload/", "/image/upload/q_auto:best,f_auto/")
    sm  = su.replace("/image/upload/", "/image/upload/w_300,q_auto:best,f_auto/")

    print(f"\n✅ ¡Logo subido a Cloudinary!")
    print(f"   Public ID:   {res.get('public_id')}")
    print(f"   Dimensiones: {res.get('width')}×{res.get('height')}px")
    print(f"   Tamaño:      {res.get('bytes',0)/1024:.1f} KB")
    print(f"\n   🔗 URL original:\n      {su}")
    print(f"\n   ⚡ URL optimizada (WebP/AVIF):\n      {opt}")
    print(f"\n   🖼️  URL pequeña (300px):\n      {sm}")

    cfg = {
        "public_id": res.get("public_id"), "secure_url": su,
        "optimized_url": opt, "small_url": sm,
        "width": res.get("width"), "height": res.get("height"),
        "bytes": res.get("bytes"),
        "alt":     LOGO_CONTEXT["alt"],
        "caption": LOGO_CONTEXT["caption"],
        "uploaded_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }
    cfg_path = base / "src" / "data" / "logoConfig.json"
    cfg_path.write_text(json.dumps(cfg, ensure_ascii=False, indent=2))
    print(f"\n   💾 Config guardada en: src/data/logoConfig.json")
    print(f"\n{'='*60}")
    print("  ¡Listo! Logo en Cloudinary con SEO + geolocalización.")
    print(f"{'='*60}\n")

if __name__ == "__main__":
    main()
