import { BeforeAfterCase, ServiceItem, GoogleBusinessInfo, GoogleReview, SeoSettings } from '../types';

export const GOOGLE_BUSINESS_DATA: GoogleBusinessInfo = {
  name: 'JB Balayage Peluqueria boutique',
  headline: 'Especialista Máster en Balayage, Morenas Iluminadas & Corrección de Color',
  address: 'Roberto Rasmussen Fernández 187 (esquina Iris Muñoz), Valle Los Sauces',
  city: 'Punta Arenas, Magallanes y la Antártica Chilena, Chile',
  rating: 5.0,
  totalReviews: 64,
  googleProfileUrl: 'https://maps.google.com/?q=Roberto+Rasmussen+Fernandez+187,+esquina+Iris+Munoz,+Valle+Los+Sauces,+Punta+Arenas,+Magallanes,+Chile',
  phone: '+56 9 8558 0190',
  whatsappNumber: '56985580190',
  whatsappFormatted: '+56 9 8558 0190',
  openingHours: [
    { days: 'Lunes a Viernes', hours: '09:00 - 19:00 hs' },
    { days: 'Sábados', hours: '09:00 - 18:00 hs' },
    { days: 'Domingos', hours: 'Cerrado' }
  ],
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2342.3!2d-70.923!3d-53.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDA5JzAwLjAiUyA3MMKwNTUnMjQuMCJX!5e0!3m2!1ses!2scl!4v1620000000000!5m2!1ses!2scl'
};

export const INITIAL_SEO_SETTINGS: SeoSettings = {
  pageTitle: 'JB Balayage Peluqueria boutique Punta Arenas | Especialista en Balayage & Coloración Profesional',
  metaDescription: 'Estudio especializado en Balayage Rubio, Morena Iluminada y Corrección de Color en Punta Arenas, Magallanes. Ubicados en Roberto Rasmussen Fernández 187, Valle Los Sauces.',
  targetKeywords: [
    'Balayage Punta Arenas',
    'Peluquería Punta Arenas',
    'Especialista en Balayage Magallanes',
    'Morena iluminada Punta Arenas',
    'Colorista profesional Punta Arenas',
    'Balayage Roberto Rasmussen Fernández 187',
    'Peluquería Iris Muñoz Punta Arenas'
  ],
  canonicalUrl: 'https://estudiobalayage.com',
  businessName: 'JB Balayage Peluqueria boutique Punta Arenas',
  geoRegion: 'CL-MA',
  placeAddress: 'Roberto Rasmussen Fernández 187 (esquina Iris Muñoz), Valle Los Sauces, Punta Arenas, Magallanes y la Antártica Chilena, Chile'
};

export const BEFORE_AFTER_CASES: BeforeAfterCase[] = [
  {
    id: 'carolina-balayage-rubio-calido-olaplex',
    title: 'Carolina: Balayage & Babylights Rubio Cálido con Olaplex',
    category: 'balayage-rubio',
    categoryLabel: 'Balayage Rubio',
    beforeImage: 'maison-balayage/casos/carolina-balayage-rubio-calido-olaplex-punta-arenas/maison-balayage-punta-arenas-carolina-balayage-rubio-calido-antes-del-cambio-01',
    afterImage: 'maison-balayage/casos/carolina-balayage-rubio-calido-olaplex-punta-arenas/maison-balayage-punta-arenas-carolina-balayage-rubio-calido-portada-despues-01',
    startingBase: 'Cabello oscuro natural',
    techniqueUsed: 'Combinación de Balayage con Babylights muy finas para contorno iluminado en tonos cálidos. Protocolo con el tratamiento Olaplex integrado para cuidar la fibra capilar, seguido de sellado de cutícula e hidratación profunda.',
    finalTone: 'Rubio cálido multidimensional con brillo espejo',
    durationHours: '5 horas',
    maintenanceFrequency: 'Retoque de contorno a los 3 meses y matización regular',
    hairTexture: 'Cabello natural oscuro',
    description: 'Carolina llegó con el deseo de realizar una transición hacia un rubio luminoso pero cuidando al máximo la salud de su cabello. Diseñamos un trabajo personalizado combinando la técnica de Balayage con Babylights muy finitas de contorno. Durante todo el proceso de aclaración trabajamos con el tratamiento protector Olaplex para garantizar la integridad de la fibra capilar. Finalizamos la sesión con un protocolo de sellado de cutícula e hidratación profunda para restaurar, sellar y aportarle un brillo y suavidad excepcionales al cabello.',
    clientName: 'Carolina (Rubio)',
    rating: 5,
    clientReview: 'Espectacular el brillo y la suavidad del pelo gracias al tratamiento Olaplex y el sellado de cutícula. El rubio cálido con las babylights súper finas me encantó.',
    galleryImages: [
      {
        src: 'maison-balayage/casos/carolina-balayage-rubio-calido-olaplex-punta-arenas/maison-balayage-punta-arenas-carolina-balayage-rubio-calido-espejo-ia-01',
        alt: 'Resultado final rubio y babylights de Carolina visto en espejo'
      },
      {
        src: 'maison-balayage/casos/carolina-balayage-rubio-calido-olaplex-punta-arenas/maison-balayage-punta-arenas-carolina-balayage-rubio-calido-detalle-ia-02',
        alt: 'Detalle del sellado de cutícula e hidratación profunda'
      },
      {
        src: 'maison-balayage/casos/carolina-balayage-rubio-calido-olaplex-punta-arenas/maison-balayage-punta-arenas-carolina-balayage-rubio-calido-despues-01',
        alt: 'Resultado balayage y babylights rubio cálido desde atrás'
      },
      {
        src: 'maison-balayage/casos/carolina-balayage-rubio-calido-olaplex-punta-arenas/maison-balayage-punta-arenas-carolina-balayage-rubio-calido-despues-02',
        alt: 'Vista lateral del degradado y mechas rubias finas'
      }
    ],
    videos: [
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/q_auto/v1786261111/maison-balayage/casos/carolina-balayage-rubio-calido-olaplex-punta-arenas/maison-balayage-punta-arenas-carolina-balayage-rubio-calido-movimiento-01.mov',
        title: 'Movimiento y brillo después de Olaplex'
      },
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/q_auto/v1786261119/maison-balayage/casos/carolina-balayage-rubio-calido-olaplex-punta-arenas/maison-balayage-punta-arenas-carolina-balayage-rubio-calido-movimiento-03.mov',
        title: 'Brillo y suavidad con sellado de cutícula'
      }
    ],
    seoKeywords: [
      'balayage rubio calido Punta Arenas',
      'babylights rubio Punta Arenas',
      'olaplex para cabello rubio',
      'sellado de cuticula e hidratacion',
      'cabello oscuro natural a rubio',
      'JB Balayage Peluqueria boutique'
    ]
  },
  {
    id: 'carolina-cobrizo-correccion-color',
    title: 'Carolina Cobrizo: corrección de negro y rojo a cobrizo luminoso',
    category: 'correccion-color',
    categoryLabel: 'Corrección de Color',
    beforeImage: 'maison-balayage/casos/carolina-cobrizo-correccion-color-cobrizo-punta-arenas/maison-balayage-punta-arenas-carolina-cobrizo-barrido-color-negro-rojo-antes-del-cambio-01',
    afterImage: 'maison-balayage/casos/carolina-cobrizo-correccion-color-cobrizo-punta-arenas/maison-balayage-punta-arenas-carolina-cobrizo-cobrizo-final-portada-despues-02',
    startingBase: 'Tintura negra previa con acumulación de rojo artificial',
    techniqueUsed: 'Barrido de color, extracción progresiva de pigmentos rojo/negro y masaje técnico prolongado para emparejar la base',
    finalTone: 'Cobrizo luminoso, uniforme y cálido',
    durationHours: 'Sesión técnica extendida',
    maintenanceFrequency: 'Baño de brillo y matiz según diagnóstico',
    hairTexture: 'Cabello teñido con carga artificial acumulada',
    description: 'Carolina llegó buscando un cobrizo que no le habían podido lograr. Se realizó un barrido de color para retirar pigmentos negros y rojos, dos de los tonos más difíciles de limpiar, trabajando la fibra con paciencia hasta lograr una base pareja. El resultado fue un cobrizo uniforme, luminoso y muy favorecedor.',
    clientName: 'Carolina',
    rating: 5,
    clientReview: 'Se fue muy conforme y feliz porque se logró el color cobrizo que quería.',
    galleryImages: [
      {
        src: 'maison-balayage/casos/carolina-cobrizo-correccion-color-cobrizo-punta-arenas/maison-balayage-punta-arenas-carolina-cobrizo-cobrizo-final-espejo-01',
        alt: 'Resultado cobrizo de Carolina visto en espejo'
      },
      {
        src: 'maison-balayage/casos/carolina-cobrizo-correccion-color-cobrizo-punta-arenas/maison-balayage-punta-arenas-carolina-cobrizo-cobrizo-final-espejo-02',
        alt: 'Retrato en espejo del resultado cobrizo final'
      },
      {
        src: 'maison-balayage/casos/carolina-cobrizo-correccion-color-cobrizo-punta-arenas/maison-balayage-punta-arenas-carolina-cobrizo-cobrizo-final-frontal-01',
        alt: 'Vista frontal del cobrizo final luminoso'
      },
      {
        src: 'maison-balayage/casos/carolina-cobrizo-correccion-color-cobrizo-punta-arenas/maison-balayage-punta-arenas-carolina-cobrizo-cobrizo-final-perfil-01',
        alt: 'Vista de perfil del cobrizo uniforme'
      },
      {
        src: 'maison-balayage/casos/carolina-cobrizo-correccion-color-cobrizo-punta-arenas/maison-balayage-punta-arenas-carolina-cobrizo-cobrizo-final-perfil-luz-natural-03',
        alt: 'Cobrizo final visto con luz natural'
      },
      {
        src: 'maison-balayage/casos/carolina-cobrizo-correccion-color-cobrizo-punta-arenas/maison-balayage-punta-arenas-carolina-cobrizo-cobrizo-final-textura-perfil-04',
        alt: 'Textura y brillo del color cobrizo final'
      },
      {
        src: 'maison-balayage/casos/carolina-cobrizo-correccion-color-cobrizo-punta-arenas/maison-balayage-punta-arenas-carolina-cobrizo-detalle-cobrizo-uniforme-01',
        alt: 'Detalle de brillo y uniformidad del cobrizo'
      }
    ],
    videos: [
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/q_auto/v1786252970/maison-balayage/casos/carolina-cobrizo-correccion-color-cobrizo-punta-arenas/maison-balayage-punta-arenas-carolina-cobrizo-cobrizo-final-espejo-01.mov',
        title: 'Resultado cobrizo en espejo'
      },
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/q_auto/v1786252972/maison-balayage/casos/carolina-cobrizo-correccion-color-cobrizo-punta-arenas/maison-balayage-punta-arenas-carolina-cobrizo-cobrizo-final-frontal-01.mov',
        title: 'Vista frontal del resultado'
      },
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/q_auto/v1786252986/maison-balayage/casos/carolina-cobrizo-correccion-color-cobrizo-punta-arenas/maison-balayage-punta-arenas-carolina-cobrizo-movimiento-brillo-posterior-01.mov',
        title: 'Movimiento y brillo posterior'
      }
    ],
    seoKeywords: [
      'correccion de color cobrizo Punta Arenas',
      'barrido de color tintura negra',
      'sacar tintura roja del cabello',
      'color cobrizo uniforme',
      'peluqueria colorista Punta Arenas',
      'JB Balayage Peluqueria boutique'
    ]
  },
  {
    id: 'roxana-balayage-cobrizo',
    title: 'Roxana: Mechas con Babylights & Contouring Rubio',
    category: 'balayage-rubio',
    categoryLabel: 'Balayage Rubio',
    beforeImage: 'maison-balayage/casos/roxana-balayage-cobrizo-punta-arenas/maison-balayage-punta-arenas-roxana-balayage-cobrizo-antes-del-cambio-01',
    afterImage: 'maison-balayage/casos/roxana-balayage-cobrizo-punta-arenas/maison-balayage-punta-arenas-roxana-balayage-cobrizo-portada-despues-01',
    startingBase: 'Base clara natural',
    techniqueUsed: 'Mechas con papel y técnica de babylights con mechas muy finitas en todo el contorno para iluminar el rostro. Incorporación de Olaplex para cuidar la salud capilar.',
    finalTone: 'Rubio luminoso, vibrante y muy natural',
    durationHours: '4.5 horas',
    maintenanceFrequency: 'Matización regular y retoque a los 4 meses',
    hairTexture: 'Cabello de grosor medio',
    description: 'Roxana cuenta con una base clara natural. Diseñamos un trabajo de mechas con papel combinado con babylights extra finas en todo el contorno para aportar luminosidad estratégica al rostro. Durante todo el proceso de aclaración trabajamos con el tratamiento protector Olaplex para garantizar y cuidar la salud del cabello. Al finalizar, aplicamos un tratamiento de sellado de cutícula e hidratación profunda, logrando devolverle brillo, suavidad y salud excepcional a la fibra capilar.',
    clientName: 'Roxana',
    rating: 5,
    clientReview: 'Me encantaron mis mechas y las babylights súper finitas en el contorno. Gracias a Olaplex y el sellado de cutícula, mi pelo quedó ultra brillante, sano y suave.',
    galleryImages: [
      {
        src: 'maison-balayage/casos/roxana-balayage-cobrizo-punta-arenas/maison-balayage-punta-arenas-roxana-balayage-cobrizo-espejo-ia-01',
        alt: 'Resultado final de mechas rubias y babylights finas de Roxana visto en espejo'
      },
      {
        src: 'maison-balayage/casos/roxana-balayage-cobrizo-punta-arenas/maison-balayage-punta-arenas-roxana-balayage-cobrizo-espejo-ia-02',
        alt: 'Reflejo en espejo del contorno iluminado y babylights rubias'
      },
      {
        src: 'maison-balayage/casos/roxana-balayage-cobrizo-punta-arenas/maison-balayage-punta-arenas-roxana-balayage-cobrizo-detalle-ia-01',
        alt: 'Detalle de brillo con sellado de cutícula e hidratación'
      },
      {
        src: 'maison-balayage/casos/roxana-balayage-cobrizo-punta-arenas/maison-balayage-punta-arenas-roxana-balayage-cobrizo-despues-01',
        alt: 'Vista posterior de la melena rubia con ondas suaves'
      }
    ],
    videos: [
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/q_auto/v1786392853/maison-balayage/casos/roxana-balayage-cobrizo-punta-arenas/maison-balayage-punta-arenas-roxana-balayage-cobrizo-movimiento-01.mov',
        title: 'Brillo, movimiento y luminosidad del rubio con ondas'
      }
    ],
    seoKeywords: [
      'mechas con papel Punta Arenas',
      'babylights rubio Punta Arenas',
      'iluminacion contorno facial',
      'tratamiento olaplex Punta Arenas',
      'sellado cuticula cabello',
      'JB Balayage Peluqueria boutique'
    ]
  },
  {
    id: 'carolina-balayage-rubio-nuevo',
    title: 'Carolina: Mechas con Babylights & Contouring Rubio Nácar',
    category: 'balayage-rubio',
    categoryLabel: 'Balayage Rubio',
    beforeImage: 'maison-balayage/casos/nicole-morena-iluminada-punta-arenas/maison-balayage-punta-arenas-nicole-morena-iluminada-antes-del-cambio-01',
    afterImage: 'maison-balayage/casos/nicole-morena-iluminada-punta-arenas/maison-balayage-punta-arenas-nicole-morena-iluminada-portada-despues-01',
    startingBase: 'Base clara natural',
    techniqueUsed: 'Técnica de mechas con papel combinadas con babylights extra finas en todo el contorno para iluminar el rostro (contouring). Protocolo completo de Olaplex integrado en la aclaración para el cuidado capilar, finalizando con sellado de cutícula e hidratación profunda.',
    finalTone: 'Rubio nácar cálido, luminoso y sumamente brillante',
    durationHours: '4.5 horas',
    maintenanceFrequency: 'Matización regular y retoque a los 4 meses',
    hairTexture: 'Cabello de grosor medio',
    description: 'En esta sesión de diseño para Carolina, que cuenta con una base clara natural, realizamos un trabajo detallado de mechas con papel combinadas con babylights extra finas para aportar iluminación suave y directa en todo el contorno de su rostro. Cuidando estrictamente la salud de su cabello, incorporamos el tratamiento de Olaplex durante todo el proceso de aclarado. Para coronar la transformación, aplicamos un protocolo de sellado de cutícula e hidratación profunda, dando como resultado una melena rubia extremadamente brillante, sedosa y saludable.',
    clientName: 'Carolina',
    rating: 5,
    clientReview: 'Me encantaron las babylights súper finas de contorno. El pelo me quedó sanísimo gracias a Olaplex y con un brillo espectacular por el sellado de cutícula.',
    galleryImages: [
      {
        src: 'maison-balayage/casos/nicole-morena-iluminada-punta-arenas/maison-balayage-punta-arenas-nicole-morena-iluminada-despues-01',
        alt: 'Resultado final rubio y babylights visto desde atrás'
      },
      {
        src: 'maison-balayage/casos/nicole-morena-iluminada-punta-arenas/maison-balayage-punta-arenas-nicole-morena-iluminada-espejo-ia-01',
        alt: 'Reflejo en espejo del balayage rubio cálido'
      },
      {
        src: 'maison-balayage/casos/nicole-morena-iluminada-punta-arenas/maison-balayage-punta-arenas-nicole-morena-iluminada-espejo-ia-02',
        alt: 'Detalle de la luminosidad del contorno facial rubio'
      },
      {
        src: 'maison-balayage/casos/nicole-morena-iluminada-punta-arenas/maison-balayage-punta-arenas-nicole-morena-iluminada-detalle-ia-01',
        alt: 'Textura suave y brillo con sellado de cutícula e hidratación'
      }
    ],
    videos: [
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/q_auto/v1786402185/maison-balayage/casos/nicole-morena-iluminada-punta-arenas/maison-balayage-punta-arenas-nicole-morena-iluminada-movimiento-01.mov',
        title: 'Movimiento y relieve del rubio cálido'
      },
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/q_auto/v1786402188/maison-balayage/casos/nicole-morena-iluminada-punta-arenas/maison-balayage-punta-arenas-nicole-morena-iluminada-movimiento-02.mov',
        title: 'Suavidad y brillo al movimiento'
      },
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/q_auto/v1786402189/maison-balayage/casos/nicole-morena-iluminada-punta-arenas/maison-balayage-punta-arenas-nicole-morena-iluminada-movimiento-03.mov',
        title: 'Resultado final brillante con ondas'
      }
    ],
    seoKeywords: [
      'mechas con papel Punta Arenas',
      'babylights rubio calido',
      'iluminacion contorno facial',
      'tratamiento olaplex Punta Arenas',
      'sellado cuticula cabello',
      'JB Balayage Peluqueria boutique'
    ]
  },
{
    id: 'ninoska-balayage-babylights-miel',
    title: 'Ninoska: Balayage y Babylights',
    category: 'balayage-rubio',
    categoryLabel: 'Balayage Rubio',
    beforeImage: 'maison-balayage/casos/ninoska-balayage-babylights-miel-punta-arenas/maison-balayage-punta-arenas-ninoska-balayage-babylights-miel-antes-del-cambio-01',
    afterImage: 'maison-balayage/casos/ninoska-balayage-babylights-miel-punta-arenas/maison-balayage-punta-arenas-ninoska-balayage-babylights-miel-portada-despues-01',
    startingBase: 'Cabello castaño previo con deseo de mayor luminosidad sin efecto raíz',
    techniqueUsed: 'Balayage completo combinado con babylights muy finas de contorno facial (contouring) para enmarcar el rostro en tonos miel. Masaje de sellado de cutícula y tratamiento de hidratación profunda.',
    finalTone: 'Color miel tridimensional, cálido, brillante y de aspecto sumamente sano',
    durationHours: '4.5 horas',
    maintenanceFrequency: 'Retoque de contorno a los 3-4 meses',
    hairTexture: 'Cabello de grosor medio',
    description: 'Ninoska buscaba iluminar su rostro con un cambio sutil pero sumamente elegante. Diseñamos un trabajo combinado de balayage y babylights ultra finas de contorno en un tono miel, que es furor en esta temporada. Para nosotros, cuidar la salud del cabello es fundamental: finalizamos con un tratamiento completo de sellado de cutícula seguido de una hidratación profunda. El resultado es un cabello sumamente sedoso, con brillo espejo y un color miel perfectamente integrado.',
    clientName: 'Ninoska',
    rating: 5,
    clientReview: 'Feliz con mi color miel y el brillo increíble de mi pelo. Se siente muy sano e hidratado.',
    galleryImages: [
      {
        src: 'maison-balayage/casos/ninoska-balayage-babylights-miel-punta-arenas/maison-balayage-punta-arenas-ninoska-balayage-babylights-miel-despues-01',
        alt: 'Balayage y babylights color miel de Ninoska'
      },
      {
        src: 'maison-balayage/casos/ninoska-balayage-babylights-miel-punta-arenas/maison-balayage-punta-arenas-ninoska-balayage-babylights-miel-despues-02',
        alt: 'Luz y relieve del contorno miel de perfil'
      },
      {
        src: 'maison-balayage/casos/ninoska-balayage-babylights-miel-punta-arenas/maison-balayage-punta-arenas-ninoska-balayage-babylights-miel-despues-03',
        alt: 'Textura suave y brillo tridimensional'
      },
      {
        src: 'maison-balayage/casos/ninoska-balayage-babylights-miel-punta-arenas/maison-balayage-punta-arenas-ninoska-balayage-babylights-miel-despues-04',
        alt: 'Resultado final con el logo del salon de fondo'
      }
    ],
    videos: [
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/q_auto/v1786396560/maison-balayage/casos/ninoska-balayage-babylights-miel-punta-arenas/maison-balayage-punta-arenas-ninoska-balayage-babylights-miel-movimiento-01.mov',
        title: 'Movimiento y brillo del color miel'
      }
    ],
    seoKeywords: [
      'balayage miel Punta Arenas',
      'babylights Punta Arenas',
      'iluminacion contorno rostro',
      'sellado cuticula cabello',
      'hidratacion profunda Punta Arenas',
      'JB Balayage Peluqueria boutique'
    ]
  },
  {
    id: 'milena-mechas-babylights-rubio-calido',
    title: 'Milena: Mechas con Papel & Babylights (Sin Matizar)',
    category: 'balayage-rubio',
    categoryLabel: 'Balayage Rubio',
    beforeImage: 'maison-balayage/casos/milena-mechas-babylights-rubio-calido-punta-arenas/maison-balayage-punta-arenas-milena-mechas-babylights-antes-del-cambio-01',
    afterImage: 'maison-balayage/casos/milena-mechas-babylights-rubio-calido-punta-arenas/maison-balayage-punta-arenas-milena-mechas-babylights-rubio-calido-portada-despues-01',
    startingBase: 'Rubio previo desgastado y opaco con crecimiento de raíz',
    techniqueUsed: 'Mechas con papel y técnica de babylights muy finitas en todo el contorno para máxima luminosidad. Aclaración limpia (altura 9) sin necesidad de matizar. Cuidado con tratamiento Olaplex, sellado de cutícula e hidratación profunda.',
    finalTone: 'Rubio luminoso y natural, sin matizar (altura 9)',
    durationHours: '4.5 horas',
    maintenanceFrequency: 'Retoque de contorno cada 3-4 meses',
    hairTexture: 'Cabello rubio natural con aclaración previa',
    description: 'Milena es clienta de nuestra peluquería desde hace 3 años. En esta sesión, diseñamos un trabajo de mechas con papel combinadas con muchísimas babylights extra finas de contorno. Gracias a la precisión del aclarado, alcanzamos un nivel 9 tan limpio y perfecto que no hubo necesidad de matizar el cabello. Durante todo el proceso de decoloración trabajamos con el tratamiento protector Olaplex para cuidar la salud capilar. Finalizamos con sellado de cutícula e hidratación profunda, logrando un rubio de brillo espejo espectacular y sumamente sano.',
    clientName: 'Milena',
    rating: 5,
    clientReview: 'Feliz con el resultado de mis mechas y babylights finas, y lo mejor es que no hubo necesidad de matizar. Con Olaplex y el sellado de cutícula mi pelo quedó brillante, sano y muy suave.',
    galleryImages: [
      {
        src: 'maison-balayage/casos/milena-mechas-babylights-rubio-calido-punta-arenas/maison-balayage-punta-arenas-milena-mechas-babylights-rubio-calido-espejo-01',
        alt: 'Resultado final rubio y babylights sin matizar de Milena en espejo'
      },
      {
        src: 'maison-balayage/casos/milena-mechas-babylights-rubio-calido-punta-arenas/maison-balayage-punta-arenas-milena-mechas-babylights-rubio-calido-detalle-01',
        alt: 'Detalle de las mechas, babylights de contorno y sellado de cutícula'
      }
    ],
    videos: [
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/q_auto/v1786257631/maison-balayage/casos/milena-mechas-babylights-rubio-calido-punta-arenas/maison-balayage-punta-arenas-milena-mechas-babylights-movimiento-brillo-despues-01.mov',
        title: 'Movimiento y brillo natural del rubio sin matizar'
      }
    ],
    seoKeywords: [
      'mechas con papel Punta Arenas',
      'babylights rubio calido',
      'iluminacion de contorno facial',
      'decoloracion sin matizar',
      'tratamiento olaplex Punta Arenas',
      'sellado cuticula cabello',
      'JB Balayage Peluqueria boutique'
    ]
  },
  {
    id: 'clienta-africa-expedicion',
    title: 'Sarah: Babylights Platinadas (Sin Matizar) - Expedición África',
    category: 'balayage-rubio',
    categoryLabel: 'Balayage Rubio',
    beforeImage: 'maison-balayage/casos/clienta-africa-expedicion/IMG_1392 2',
    afterImage: 'maison-balayage/casos/clienta-africa-expedicion/IMG_1381',
    startingBase: 'Rubio oscuro natural con puntas desgastadas por el sol y la sal marina',
    techniqueUsed: 'Micro-babylights ultra finas de alta densidad en todo el contorno y melena. Decoloración limpia (altura 9) sin necesidad de matizar. Tratamiento reconstructor Olaplex incorporado y sellado de cutícula profundo.',
    finalTone: 'Rubio platino nórdico natural, ultra luminoso y sin matiz',
    durationHours: '5 horas',
    maintenanceFrequency: 'Retoque de crecimiento a los 4-6 meses',
    hairTexture: 'Cabello expuesto a condiciones extremas de navegación',
    description: 'Nuestra cliente Sarah, quien se encontraba navegando en una expedición marítima internacional desde África, nos contactó a través de Google para restaurar e iluminar su cabello al llegar a Punta Arenas. Realizamos un diseño minucioso de micro-babylights extra finas para lograr la máxima claridad. Debido a la pureza del aclarado (altura 9), no hubo necesidad de aplicar matizante. Protegimos la fibra capilar con el tratamiento completo de Olaplex y finalizamos con un sellado de cutícula e hidratación profunda para contrarrestar el daño del viento y la sal del mar.',
    clientName: 'Sarah',
    rating: 5,
    clientReview: 'I found JB Balayage on Google while sailing on a maritime expedition from Africa to Patagonia. I needed a professional to brighten my hair in Punta Arenas, and the results exceeded all my expectations! The micro-babylights are extremely fine, and we did not even need to tone it. Thanks to the Olaplex treatment and cuticle sealing, my hair feels incredibly healthy, soft, and shiny despite the harsh sea conditions. An absolute gem of a salon in Patagonia!',
    galleryImages: [
      {
        src: 'maison-balayage/casos/clienta-africa-expedicion/IMG_1387 2',
        alt: 'Resultado de babylights rubias sin matizar visto desde atrás'
      }
    ],
    videos: [
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/v1786464071/maison-balayage/casos/clienta-africa-expedicion/IMG_1380.mov',
        title: 'Brillo y movimiento natural del rubio sin matizar'
      },
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/v1786464077/maison-balayage/casos/clienta-africa-expedicion/IMG_1390.mov',
        title: 'Detalle de la elasticidad y suavidad con Olaplex'
      },
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/v1786464082/maison-balayage/casos/clienta-africa-expedicion/IMG_1393.mov',
        title: 'Movimiento y caída del rubio platino tridimensional'
      }
    ],
    seoKeywords: [
      'babylights sin matizar Punta Arenas',
      'rubio platino natural',
      'decoloracion limpia sin daño',
      'tratamiento olaplex Punta Arenas',
      'peluqueria cerca del puerto',
      'JB Balayage Peluqueria boutique'
    ]
  },
  {
    id: 'gisela-barrido-color-borgona',
    title: 'Gisela: barrido de color en tono borgoña',
    category: 'correccion-color',
    categoryLabel: 'Corrección de Color',
    beforeImage: 'maison-balayage/casos/gisela-barrido-color-borgona-punta-arenas/maison-balayage-punta-arenas-gisela-barrido-color-borgona-antes-del-cambio-01',
    afterImage: 'maison-balayage/casos/gisela-barrido-color-borgona-punta-arenas/maison-balayage-punta-arenas-gisela-barrido-color-borgona-portada-despues-01',
    startingBase: 'Melena voluptuosa y muy larga con acumulación de tintes previos desiguales',
    techniqueUsed: 'Barrido de color completo para homogeneizar la base, aplicación de color borgoña intenso formulado a medida, sellado de cutícula y tratamiento de hidratación profunda.',
    finalTone: 'Borgoña vibrante, profundo, luminoso y tridimensional',
    durationHours: '5.5 horas',
    maintenanceFrequency: 'Baño de color y brillo cada 1.5 a 2 meses',
    hairTexture: 'Cabello muy abundante y extralargo',
    description: 'Gisela llegó con una melena espectacularmente larga y voluptuosa, pero con acumulaciones de tinturas previas que daban un tono desigual. Realizamos un barrido de color técnico para limpiar las zonas oscuras y homogeneizar la fibra. Luego, aplicamos un borgoña intenso de alta luminosidad. Finalizamos con sellado de cutícula e hidratación profunda. Los resultados saltan a la vista: una melena sana, con un brillo extraordinario y un tono borgoña lleno de reflejos.',
    clientName: 'Gisela',
    rating: 5,
    clientReview: 'Espectacular el brillo y la uniformidad del color. Mi melena larga se siente súper sedosa y el borgoña le dio mucha vida.',
    galleryImages: [
      {
        src: 'maison-balayage/casos/gisela-barrido-color-borgona-punta-arenas/maison-balayage-punta-arenas-gisela-barrido-color-borgona-despues-01',
        alt: 'Melena larga borgoña vista de espalda con ondas'
      },
      {
        src: 'maison-balayage/casos/gisela-barrido-color-borgona-punta-arenas/maison-balayage-punta-arenas-gisela-barrido-color-borgona-despues-02',
        alt: 'Retrato de perfil mostrando el brillo tridimensional borgoña'
      }
    ],
    videos: [
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/q_auto/v1786331258/maison-balayage/casos/gisela-barrido-color-borgona-punta-arenas/maison-balayage-punta-arenas-gisela-barrido-color-borgona-movimiento-01.mov',
        title: 'Brillo y movimiento tridimensional borgoña'
      },
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/q_auto/v1786331260/maison-balayage/casos/gisela-barrido-color-borgona-punta-arenas/maison-balayage-punta-arenas-gisela-barrido-color-borgona-movimiento-02.mov',
        title: 'Movimiento en cabello extralargo'
      },
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/q_auto/v1786331262/maison-balayage/casos/gisela-barrido-color-borgona-punta-arenas/maison-balayage-punta-arenas-gisela-barrido-color-borgona-movimiento-03.mov',
        title: 'Resultado de brillo espejo final'
      }
    ],
    seoKeywords: [
      'barrido de color Punta Arenas',
      'cabello color borgona',
      'cabello largo borgoña',
      'peluqueria Punta Arenas',
      'JB Balayage Peluqueria boutique'
    ]
  },
  {
    id: 'case-1',
    title: 'Balayage Rubio Miel Dimensión Signature',
    category: 'balayage-rubio',
    categoryLabel: 'Balayage Rubio',
    beforeImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop', // Dark uneven hair
    afterImage: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=800&auto=format&fit=crop', // Beautiful golden balayage waves
    startingBase: 'Castaño Oscuro (Altura 4) con reflejos oxidados',
    techniqueUsed: 'Foilayage manual con matiz personalizado & esfumado de raíz',
    finalTone: 'Rubio Miel y Manteca Dimensión 3D (Altura 9)',
    durationHours: '4.5 horas',
    maintenanceFrequency: 'Cada 4 - 6 meses',
    hairTexture: 'O ondulado / Grosor medio',
    description: 'Transformación completa respetando la fibra capilar. Se realizó una decoloración progresiva con plex protector para lograr luz sin efecto raíz marcar.',
    clientName: 'Valeria R.',
    rating: 5,
    clientReview: 'El resultado superó mis expectativas. Mi pelo quedó súper brillante y el degradado es tan suave que no parece que tenga raíz crecida.',
    seoKeywords: ['balayage rubio miel', 'decoloracion sin daño', 'esfumado de raiz']
  },
  {
    id: 'case-2',
    title: 'Morena Iluminada Caramelo & Avellana',
    category: 'morena-iluminada',
    categoryLabel: 'Morena Iluminada',
    beforeImage: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800&auto=format&fit=crop', // Natural dark hair
    afterImage: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=800&auto=format&fit=crop', // Shiny warm highlighted dark hair
    startingBase: 'Base natural Castaño Profundo sin decoloraciones previas',
    techniqueUsed: 'Balayage a mano alzada (Freehand) & Gloss tonalizador',
    finalTone: 'Caramelo Cálido, Bronce y Avellana',
    durationHours: '3.5 horas',
    maintenanceFrequency: 'Cada 6 meses',
    hairTexture: 'Lacio natural / Cabello abundante',
    description: 'Aportamos dimensión y movimiento al cabello oscuro mediante puntos de luz estratégicos en el contorno del rostro (Face Framing) sin alterar la base natural.',
    clientName: 'Carolina M.',
    rating: 5,
    clientReview: 'Buscaba luz para mi pelo oscuro sin pasar a rubio. Ella entendió perfecto el tono caramelo exacto que quería.',
    seoKeywords: ['morena iluminada caramelo', 'face framing castaño', 'balayage pelo oscuro']
  },
  {
    id: 'case-3',
    title: 'Corrección de Color & Balayage Beige Icy',
    category: 'correccion-color',
    categoryLabel: 'Corrección de Color',
    beforeImage: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800&auto=format&fit=crop', // Brassiness/yellow tint
    afterImage: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=800&auto=format&fit=crop', // Clean ash beige blonde
    startingBase: 'Tinte de caja acumulado con manchas cobrizas amarillentas',
    techniqueUsed: 'Limpieza de color suave, Babylights micro-tejidas & Tonalización K18',
    finalTone: 'Rubio Beige Ceniza Nacarado con transición continua',
    durationHours: '5.5 horas',
    maintenanceFrequency: 'Matizado cada 2 meses',
    hairTexture: 'Fino / Ligeramente poroso',
    description: 'Diagnóstico minucioso para eliminar bandas de tinte viejo. Se neutralizaron tonos amarillentos y se reconstruyó la estructura capilar con péptidos.',
    clientName: 'Lucía G.',
    rating: 5,
    clientReview: 'Me habían arruinado el pelo en otro lugar con manchas naranjas. Ella salvó mi cabello y me dejó el beige soñado.',
    seoKeywords: ['correccion de color tinte', 'neutralizar cobrizo', 'rubio beige ceniza']
  },
  {
    id: 'case-4',
    title: 'Cobrizo Cálido & Warm Balayage Melt',
    category: 'cobrizo-warm',
    categoryLabel: 'Cobrizo Cálido',
    beforeImage: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=800&auto=format&fit=crop', // Straight dark hair
    afterImage: 'https://images.unsplash.com/photo-1584297091622-af8e5fda2a2f?q=80&w=800&auto=format&fit=crop', // Shiny copper balayage
    startingBase: 'Castaño Medio virgen',
    techniqueUsed: 'Color Melt con pigmentación orgánica & destellos cobrizos',
    finalTone: 'Cobre Dorado Dulce con degradado sutil',
    durationHours: '3.8 horas',
    maintenanceFrequency: 'Bañador de brillo cada 3 meses',
    hairTexture: 'Ondas suaves',
    description: 'Ideal para quienes desean reflejos vibrantes pero elegantes. Aporta calidez a la tez del rostro con una técnica de degradado sin demarcación.',
    clientName: 'Sofía B.',
    rating: 5,
    clientReview: 'El color cobre tiene un brillo increíble. En la luz del sol se ve radiante y súper sano.',
    seoKeywords: ['balayage cobrizo', 'color melt cobre', 'reflejos calidos']
  },
  {
    id: 'case-5',
    title: 'Babylights & Melt Rubio Platinado Vainilla',
    category: 'babylights-melt',
    categoryLabel: 'Babylights & Melt',
    beforeImage: 'https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?q=80&w=800&auto=format&fit=crop', // Dull brown root
    afterImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop', // Radiant blonde hair
    startingBase: 'Rubio Oscuro natural (Altura 6)',
    techniqueUsed: 'Técnica Babylights micro-finas en todo el contorno + Esfumado de raíz',
    finalTone: 'Platinado Vainilla Luminoso con efecto solar',
    durationHours: '4.8 horas',
    maintenanceFrequency: 'Cada 5 meses',
    hairTexture: 'Liso medio',
    description: 'Efecto de aclarado máximo simulando los reflejos que genera el sol de verano. Técnica de tejido ultra fino que no deja líneas marcadas.',
    clientName: 'Mariana P.',
    rating: 5,
    clientReview: 'Es increíble la técnica que usa. El crecimiento de mi raíz pasa totalmente desapercibido.',
    seoKeywords: ['babylights platinado', 'rubio vainilla', 'esfumado natural']
  }
];

export const SERVICES_MENU: ServiceItem[] = [
  {
    id: 'balayage-signature',
    title: 'Balayage Master Signature',
    shortSubtitle: 'Técnica personalizada de degradado continuo',
    description: 'Diseño exclusivo de color según la morfología del rostro, tipo de cabello y tono de piel. Incluye diseño de luz, decoloración protegida con Plex, esfumado de raíz, tonalizador personalizado, lavado nutritivo y peinado styling final.',
    includes: [
      'Diagnóstico capilar previo con mechón de prueba',
      'Protector de fibra capilar (Plex / K18)',
      'Esfumado de raíz (Root Melt) para durabilidad',
      'Gloss fijador de brillo & matizado',
      'Secado y peinado con ondas Balayage'
    ],
    duration: '3.5 - 4.5 horas',
    priceRange: 'Consulta personalizada',
    recommendedFor: 'Quienes buscan máxima luminosidad con crecimiento 100% natural sin retoques frecuentes.',
    popularBadge: true,
    seoTag: 'Balayage Personalizado'
  },
  {
    id: 'morena-iluminada-pack',
    title: 'Morena Iluminada (Caramelo / Avellana)',
    shortSubtitle: 'Luz sutil para cabellos oscuros y castaños',
    description: 'Técnica enfocada en aportar dimensión y destellos cálidos o fríos sin perder la identidad del cabello oscuro. Crea un efecto elegante de movimiento en melenas largas y medianas.',
    includes: [
      'Puntos de luz estratégicos en contorno (Face Framing)',
      'Tonalización personalizada Caramelo/Miel/Moka',
      'Tratamiento de nutrición intensa post-color',
      'Styling y fotos del resultado'
    ],
    duration: '3 - 3.5 horas',
    priceRange: 'Consulta personalizada',
    recommendedFor: 'Melenas castañas que nunca se aclararon o buscan un cambio elegante sin ser rubias.',
    popularBadge: false,
    seoTag: 'Morena Iluminada'
  },
  {
    id: 'correccion-color-rescue',
    title: 'Corrección de Color & Tinte',
    shortSubtitle: 'Especialista en resolver manchas y tonos no deseados',
    description: 'Servicio técnico especializado para corregir trabajos previos desiguales, bandas de color, tonos cobrizos/amarillos indeseados o decoloraciones desiguales.',
    includes: [
      'Limpieza suave de pigmentos acumulados',
      'Diagnóstico de porosidad y prueba de elasticidad',
      'Reconstrucción molecular de la fibra',
      'Igualación de tono y Balayage correctivo'
    ],
    duration: '4.5 - 6 horas',
    priceRange: 'Sujeto a diagnóstico previo',
    recommendedFor: 'Cabellos con tintes de caja, reflejos oxidados o trabajo previo con manchas.',
    popularBadge: false,
    seoTag: 'Corrección de Color'
  },
  {
    id: 'gloss-maintenance',
    title: 'Mantenimiento & Gloss Tonalizador',
    shortSubtitle: 'Refresca el brillo y matiz de tu Balayage',
    description: 'Servicio rápido entre visitas principales para renovar el matiz del rubio o caramelo, neutralizar reflejos y aportar un brillo de espejo deslumbrante.',
    includes: [
      'Baño de color Gloss sin amoníaco',
      'Mascarilla de nutrición profunda',
      'Peinado y acabado brillante'
    ],
    duration: '1.5 horas',
    priceRange: 'Servicio de Mantenimiento',
    recommendedFor: 'Realizar cada 2 o 3 meses para mantener el tono impecable.',
  },
  {
    id: 'olaplex-treatment-full',
    title: 'Protocolo Reconstructor Completo Olaplex',
    shortSubtitle: 'El estándar de oro internacional para la reconstrucción capilar',
    description: 'Protocolo completo de reconstrucción molecular en salón utilizando el sistema original de Olaplex (Pasos Nº.1 y Nº.2). Su tecnología patentada de multiplicación de enlaces reconecta los enlaces de disulfuro rotos en el cabello dañado por procesos químicos, térmicos o ambientales, devolviendo la fuerza, elasticidad e integridad estructural desde el primer uso.',
    includes: [
      'Olaplex Nº.1 Bond Multiplier (concentrado activo en salón)',
      'Olaplex Nº.2 Bond Perfector (fijación molecular)',
      'Lavado reparador con Olaplex Shampoo & Acondicionador',
      'Masaje capilar relajante y estimulación de cutícula',
      'Styling protector final para dar suavidad y brillo espejo'
    ],
    duration: '1 - 1.5 horas',
    priceRange: 'Consulta personalizada',
    recommendedFor: 'Cabellos decolorados, sensibilizados, quebradizos o antes de un cambio de color importante para preparar la fibra capilar de forma segura.',
    popularBadge: true,
    seoTag: 'Tratamiento Olaplex',
    imageUrl: 'https://res.cloudinary.com/apssuuqy/image/upload/v1786466085/maison-balayage/tratamientos/tratamiento-olaplex-completo-jb-balayage.jpg'
  }
];

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 'rev-1',
    authorName: 'Camila Mendizábal',
    rating: 5,
    relativeTime: 'Hace 1 semana',
    text: 'La mejor especialista en Balayage sin dudas. Me explicó todo el proceso, cuidó muchísimo mi pelo que estaba muy sensible y el degradado quedó tal cual la foto de referencia que le llevé. ¡100% recomendable!',
    serviceMentioned: 'Balayage Rubio Miel'
  },
  {
    id: 'rev-2',
    authorName: 'Andrea Fernández',
    rating: 5,
    relativeTime: 'Hace 3 semanas',
    text: 'Fui por una Morena Iluminada y quedé enamorada. El ambiente del estudio es muy tranquilo, súper profesional y el resultado antes y después me dejó sin palabras.',
    serviceMentioned: 'Morena Iluminada'
  },
  {
    id: 'rev-3',
    authorName: 'Lorena Rossi',
    rating: 5,
    relativeTime: 'Hace 1 mes',
    text: 'Tenía un color naranja espantoso de una peluquería anterior. Ella tuvo la paciencia de hacerme la corrección de color respetando la salud de mi pelo. Gracias por la dedicación.',
    serviceMentioned: 'Corrección de Color'
  }
];

export const FAQ_ITEMS = [
  {
    question: '¿Qué diferencia hay entre el Balayage y las mechas tradicionales?',
    answer: 'El Balayage es una técnica de barrido a mano alzada que crea un degradado continuo y suave, con las raíces más oscuras y las puntas más luminosas. A diferencia de las mechas tradicionales en papel de aluminio, no deja una línea de crecimiento marcada, lo que permite pasar de 4 a 6 meses sin necesidad de retocar la raíz.'
  },
  {
    question: '¿El procedimiento de Balayage maltrata el cabello?',
    answer: 'En nuestro estudio trabajamos con productos de decoloración de alta gama e incorporamos aditivos protectores de la fibra capilar (Plex / K18) en cada formulación. Realizamos un diagnóstico inicial del estado de tu cabello y, si es necesario, adaptamos la aclaración para preservar 100% la salud capilar.'
  },
  {
    question: '¿Cada cuánto tiempo se debe retocar el Balayage?',
    answer: 'Esa es una de sus principales ventajas: la estructura del Balayage está diseñada para crecer de manera armoniosa. La aclaración completa se retoca en promedio solo 2 veces al año (cada 5 a 6 meses). Se aconseja realizar un Gloss Tonalizador cada 2 a 3 meses para mantener los reflejos brillantes.'
  },
  {
    question: '¿Puedo hacerme un Balayage si tengo el cabello oscuro o teñido?',
    answer: '¡Por supuesto! Para melenas oscuras realizamos la técnica de "Morena Iluminada" usando matices caramelo, avellana o miel que aportan calidez y movimiento. En cabellos previamente teñidos, realizamos un diagnóstico con prueba de mechón previa para determinar la viabilidad del aclarado.'
  },
  {
    question: '¿Cuánto tiempo dura la sesión en el salón?',
    answer: 'Una sesión completa de Balayage abarca entre 3.5 y 5 horas, ya que incluye el diagnóstico personalizado, la aplicación detallada mechón a mechón, tiempos de exposición pausados, esfumado de raíz, matizado con Gloss y peinado final styling.'
  }
];
