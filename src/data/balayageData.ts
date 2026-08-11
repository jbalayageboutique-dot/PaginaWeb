import { BeforeAfterCase, ServiceItem, GoogleBusinessInfo, GoogleReview, SeoSettings } from '../types';

export const GOOGLE_BUSINESS_DATA: GoogleBusinessInfo = {
  name: 'JB Balayaje Peluqueria boutique',
  headline: 'Especialista Máster en Balayage, Morenas Iluminadas & Corrección de Color',
  address: 'Alonso de Ercilla 0157',
  city: 'Punta Arenas, Magallanes y la Antártica Chilena, Chile',
  rating: 5.0,
  totalReviews: 64,
  googleProfileUrl: 'https://maps.google.com/?q=Alonso+de+Ercilla+0157,+Punta+Arenas,+Magallanes+y+la+Ant%C3%A1rtica+Chilena,+Chile',
  phone: '+56 9 8558 0190',
  whatsappNumber: '56985580190',
  whatsappFormatted: '+56 9 8558 0190',
  openingHours: [
    { days: 'Lunes a Viernes', hours: '09:00 - 19:00 hs' },
    { days: 'Sábados', hours: '09:00 - 18:00 hs' },
    { days: 'Domingos', hours: 'Cerrado' }
  ],
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2342.946!2d-70.90161!3d-53.14171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDA4JzMwLjIiUyA3MMKwNTUnMjQuMCJX!5e0!3m2!1ses!2scl!4v1620000000000!5m2!1ses!2scl'
};

export const INITIAL_SEO_SETTINGS: SeoSettings = {
  pageTitle: 'JB Balayaje Peluqueria boutique Punta Arenas | Especialista en Balayage & Coloración Profesional',
  metaDescription: 'Estudio especializado en Balayage Rubio, Morena Iluminada y Corrección de Color en Punta Arenas, Magallanes. Ubicados en Alonso de Ercilla 0157.',
  targetKeywords: [
    'Balayage Punta Arenas',
    'Peluquería Punta Arenas',
    'Especialista en Balayage Magallanes',
    'Morena iluminada Punta Arenas',
    'Colorista profesional Punta Arenas',
    'Balayage Alonso de Ercilla 0157',
    'Peluquería Alonso de Ercilla Punta Arenas'
  ],
  canonicalUrl: 'https://estudiobalayage.com',
  businessName: 'JB Balayaje Peluqueria boutique Punta Arenas',
  geoRegion: 'CL-MA',
  placeAddress: 'Alonso de Ercilla 0157, Punta Arenas, Magallanes y la Antártica Chilena, Chile'
};

export const BEFORE_AFTER_CASES: BeforeAfterCase[] = [
  {
    id: 'carolina-balayage-rubio-calido-olaplex',
    title: 'Carolina Rubio: balayage rubio cálido con tratamiento Olaplex',
    category: 'balayage-rubio',
    categoryLabel: 'Balayage Rubio',
    beforeImage: 'maison-balayage/casos/carolina-balayage-rubio-calido-olaplex-punta-arenas/maison-balayage-punta-arenas-carolina-balayage-rubio-calido-antes-del-cambio-01',
    afterImage: 'maison-balayage/casos/carolina-balayage-rubio-calido-olaplex-punta-arenas/maison-balayage-punta-arenas-carolina-balayage-rubio-calido-portada-despues-01',
    startingBase: 'Cabello oscuro natural y sano',
    techniqueUsed: 'Balayage completo con contorno iluminado en tonos cálidos. Protocolo completo de Olaplex en mezcla para cuidar la fibra, sellado de cutícula y tratamiento de hidratación profunda.',
    finalTone: 'Rubio cálido multidimensional con brillo espejo',
    durationHours: '5 horas',
    maintenanceFrequency: 'Retoque de contorno a los 3 meses y matización regular',
    hairTexture: 'Cabello natural oscuro',
    description: 'Carolina llegó al atelier con su hermoso cabello oscuro natural con el deseo de pasar a rubio. Diseñamos un balayage completo con contorno cálido para aportar luz y suavidad a su rostro. Cuidamos al máximo la integridad capilar aplicando el protocolo completo de Olaplex, sellado de cutícula y tratamiento de hidratación profunda. El brillo y la sedosidad finales demuestran que es posible alcanzar un rubio espectacular sin comprometer la salud del cabello.',
    clientName: 'Carolina (Rubio)',
    rating: 5,
    clientReview: 'Espectacular el brillo y la suavidad del pelo gracias al tratamiento Olaplex. El color cálido me encantó.',
    galleryImages: [
      {
        src: 'maison-balayage/casos/carolina-balayage-rubio-calido-olaplex-punta-arenas/maison-balayage-punta-arenas-carolina-balayage-rubio-calido-espejo-ia-01',
        alt: 'Resultado final rubio de Carolina visto en espejo'
      },
      {
        src: 'maison-balayage/casos/carolina-balayage-rubio-calido-olaplex-punta-arenas/maison-balayage-punta-arenas-carolina-balayage-rubio-calido-detalle-ia-02',
        alt: 'Detalle del sellado de cutícula e hidratación'
      },
      {
        src: 'maison-balayage/casos/carolina-balayage-rubio-calido-olaplex-punta-arenas/maison-balayage-punta-arenas-carolina-balayage-rubio-calido-despues-01',
        alt: 'Resultado balayage rubio cálido desde atrás'
      },
      {
        src: 'maison-balayage/casos/carolina-balayage-rubio-calido-olaplex-punta-arenas/maison-balayage-punta-arenas-carolina-balayage-rubio-calido-despues-02',
        alt: 'Vista lateral del degradado rubio cálido'
      }
    ],
    videos: [
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/q_auto/v1786261111/maison-balayage/casos/carolina-balayage-rubio-calido-olaplex-punta-arenas/maison-balayage-punta-arenas-carolina-balayage-rubio-calido-movimiento-01.mov',
        title: 'Movimiento y brillo después de Olaplex'
      },
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/q_auto/v1786261119/maison-balayage/casos/carolina-balayage-rubio-calido-olaplex-punta-arenas/maison-balayage-punta-arenas-carolina-balayage-rubio-calido-movimiento-03.mov',
        title: 'Brillo y suavidad final'
      }
    ],
    seoKeywords: [
      'balayage rubio calido Punta Arenas',
      'olaplex para cabello rubio',
      'sellado de cuticula e hidratacion',
      'cabello oscuro natural a rubio',
      'peluqueria Punta Arenas',
      'JB Balayaje Peluqueria boutique'
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
      'JB Balayaje Peluqueria boutique'
    ]
  },
  {
    id: 'roxana-balayage-cobrizo',
    title: 'Roxana: Mechas con Babylights e iluminación de contorno',
    category: 'balayage-rubio',
    categoryLabel: 'Balayage Rubio',
    beforeImage: 'maison-balayage/casos/roxana-balayage-cobrizo-punta-arenas/maison-balayage-punta-arenas-roxana-balayage-cobrizo-antes-del-cambio-01',
    afterImage: 'maison-balayage/casos/roxana-balayage-cobrizo-punta-arenas/maison-balayage-punta-arenas-roxana-balayage-cobrizo-portada-despues-01',
    startingBase: 'Base natural clara',
    techniqueUsed: 'Trabajo de mechas con papel combinadas con babylights muy finas e iluminación de contorno facial para resaltar el rostro.',
    finalTone: 'Rubio luminoso y vibrante, muy natural',
    durationHours: '4.5 horas',
    maintenanceFrequency: 'Matización regular y retoque a los 4 meses',
    hairTexture: 'Cabello de grosor medio',
    description: 'Roxana llegó buscando iluminar su cabello con un rubio radiante. Diseñamos un trabajo de mechas con papel y babylights muy finas con iluminación de contorno para aportar luz y relieve. Realizamos un sellado de cutícula e hidratación profunda al finalizar. El resultado es un rubio espectacular, brillante y sumamente sano.',
    clientName: 'Roxana',
    rating: 5,
    clientReview: 'Encantada con mis mechas y babylights. El pelo me quedó súper brillante y con un contorno muy iluminado.',
    galleryImages: [
      {
        src: 'maison-balayage/casos/roxana-balayage-cobrizo-punta-arenas/maison-balayage-punta-arenas-roxana-balayage-cobrizo-espejo-ia-01',
        alt: 'Resultado final de mechas de Roxana visto en espejo'
      },
      {
        src: 'maison-balayage/casos/roxana-balayage-cobrizo-punta-arenas/maison-balayage-punta-arenas-roxana-balayage-cobrizo-espejo-ia-02',
        alt: 'Reflejo en espejo de las mechas y babylights'
      },
      {
        src: 'maison-balayage/casos/roxana-balayage-cobrizo-punta-arenas/maison-balayage-punta-arenas-roxana-balayage-cobrizo-detalle-ia-01',
        alt: 'Detalle de brillo y sellado de cutícula'
      },
      {
        src: 'maison-balayage/casos/roxana-balayage-cobrizo-punta-arenas/maison-balayage-punta-arenas-roxana-balayage-cobrizo-despues-01',
        alt: 'Vista posterior de las mechas y babylights'
      }
    ],
    videos: [
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/q_auto/v1786392853/maison-balayage/casos/roxana-balayage-cobrizo-punta-arenas/maison-balayage-punta-arenas-roxana-balayage-cobrizo-movimiento-01.mov',
        title: 'Movimiento y reflejos rubios muy luminosos'
      }
    ],
    seoKeywords: [
      'mechas con papel Punta Arenas',
      'babylights rubio Punta Arenas',
      'iluminacion contorno facial',
      'peluqueria Punta Arenas',
      'JB Balayaje Peluqueria boutique'
    ]
  },
  {
    id: 'nicole-morena-iluminada',
    title: 'Nicole: Balayage Morena Iluminada',
    category: 'correccion-color',
    categoryLabel: 'Corrección de Color',
    beforeImage: 'maison-balayage/casos/nicole-morena-iluminada-punta-arenas/maison-balayage-punta-arenas-nicole-morena-iluminada-antes-del-cambio-01',
    afterImage: 'maison-balayage/casos/nicole-morena-iluminada-punta-arenas/maison-balayage-punta-arenas-nicole-morena-iluminada-portada-despues-01',
    startingBase: 'Cabello oscuro teñido con acumulación previa de tintura negra y roja artificial y alta porosidad',
    techniqueUsed: 'Prueba de mechas previa para diagnosticar la resistencia y altura de decoloración segura en cabello poroso, diseño de Balayage Morena Iluminada a mano alzada, sellado de cutícula y tratamiento de hidratación profunda.',
    finalTone: 'Castaño iluminado avellana y caramelo multidimensional',
    durationHours: '5 horas',
    maintenanceFrequency: 'Baño de brillo y matiz cada 2-3 meses',
    hairTexture: 'Cabello poroso previamente teñido de negro y rojo',
    description: 'Nicole llegó buscando un cambio luminoso, pero con antecedentes de acumulación de tintura negra y roja (los pigmentos más difíciles de extraer) y una fibra capilar altamente porosa. Realizamos una prueba de mechas de diagnóstico fundamental para evaluar la resistencia y salud del cabello, determinando con precisión científica hasta qué altura de decoloración podíamos llegar de forma segura. En base a ese diagnóstico, optamos por diseñar un Balayage Morena Iluminada en tonos avellana y caramelo. Finalizamos con sellado de cutícula e hidratación profunda para recuperar la elasticidad, sedosidad y brillo del cabello.',
    clientName: 'Nicole',
    rating: 5,
    clientReview: 'Súper contenta con el resultado. Agradezco mucho la honestidad de la prueba de mechas para cuidar mi pelo, quedó brillante y hermoso.',
    galleryImages: [
      {
        src: 'maison-balayage/casos/nicole-morena-iluminada-punta-arenas/maison-balayage-punta-arenas-nicole-morena-iluminada-despues-01',
        alt: 'Morena iluminada avellana y caramelo vista posterior'
      },
      {
        src: 'maison-balayage/casos/nicole-morena-iluminada-punta-arenas/maison-balayage-punta-arenas-nicole-morena-iluminada-espejo-ia-01',
        alt: 'Reflejo en espejo del balayage avellana'
      },
      {
        src: 'maison-balayage/casos/nicole-morena-iluminada-punta-arenas/maison-balayage-punta-arenas-nicole-morena-iluminada-espejo-ia-02',
        alt: 'Luminosidad del contorno facial Morena Iluminada'
      },
      {
        src: 'maison-balayage/casos/nicole-morena-iluminada-punta-arenas/maison-balayage-punta-arenas-nicole-morena-iluminada-detalle-ia-01',
        alt: 'Textura suave y brillo tridimensional'
      }
    ],
    videos: [
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/q_auto/v1786402185/maison-balayage/casos/nicole-morena-iluminada-punta-arenas/maison-balayage-punta-arenas-nicole-morena-iluminada-movimiento-01.mov',
        title: 'Movimiento y relieve morena iluminada'
      },
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/q_auto/v1786402188/maison-balayage/casos/nicole-morena-iluminada-punta-arenas/maison-balayage-punta-arenas-nicole-morena-iluminada-movimiento-02.mov',
        title: 'Suavidad y brillo al movimiento'
      },
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/q_auto/v1786402189/maison-balayage/casos/nicole-morena-iluminada-punta-arenas/maison-balayage-punta-arenas-nicole-morena-iluminada-movimiento-03.mov',
        title: 'Resultado final brillante'
      }
    ],
    seoKeywords: [
      'morena iluminada Punta Arenas',
      'decolorar tintura negra y roja',
      'prueba de mechas peluqueria',
      'balayage avellana Punta Arenas',
      'peluqueria Punta Arenas',
      'JB Balayaje Peluqueria boutique'
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
      'JB Balayaje Peluqueria boutique'
    ]
  },
  {
    id: 'milena-mechas-babylights-rubio-calido',
    title: 'Milena Rubio Cálido: mechas con papel y babylights de contorno',
    category: 'balayage-rubio',
    categoryLabel: 'Balayage Rubio',
    beforeImage: 'maison-balayage/casos/milena-mechas-babylights-rubio-calido-punta-arenas/maison-balayage-punta-arenas-milena-mechas-babylights-antes-del-cambio-01',
    afterImage: 'maison-balayage/casos/milena-mechas-babylights-rubio-calido-punta-arenas/maison-balayage-punta-arenas-milena-mechas-babylights-rubio-calido-portada-despues-01',
    startingBase: 'Rubio previo desgastado y opaco con crecimiento de raíz',
    techniqueUsed: 'Mechas con papel de plata combinadas con babylights muy finas de contorno facial para máxima luminosidad',
    finalTone: 'Rubio cálido luminoso y vibrante, altura 9',
    durationHours: '4.5 horas',
    maintenanceFrequency: 'Retoque de contorno cada 3-4 meses',
    hairTexture: 'Cabello rubio natural con aclaración previa',
    description: 'Milena es clienta de nuestra peluquería desde hace 3 años. En esta sesión, decidimos realizar una transición hacia un rubio más cálido y luminoso. Aplicamos mechas con papel de plata combinadas con la técnica de babylights muy finas enfocadas en el contorno del rostro (contouring) para resaltar sus rasgos. Logramos alcanzar una altura de decoloración 9, finalizando con matices cálidos espectaculares que aportan luz y vitalidad.',
    clientName: 'Milena',
    rating: 5,
    clientReview: 'Feliz con el cambio a tonos cálidos y el contorno súper iluminado que destaca el rostro.',
    galleryImages: [
      {
        src: 'maison-balayage/casos/milena-mechas-babylights-rubio-calido-punta-arenas/maison-balayage-punta-arenas-milena-mechas-babylights-rubio-calido-espejo-01',
        alt: 'Resultado final rubio cálido de Milena visto en espejo'
      },
      {
        src: 'maison-balayage/casos/milena-mechas-babylights-rubio-calido-punta-arenas/maison-balayage-punta-arenas-milena-mechas-babylights-rubio-calido-detalle-01',
        alt: 'Detalle de las mechas y babylights de contorno'
      }
    ],
    videos: [
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/q_auto/v1786257631/maison-balayage/casos/milena-mechas-babylights-rubio-calido-punta-arenas/maison-balayage-punta-arenas-milena-mechas-babylights-movimiento-brillo-despues-01.mov',
        title: 'Movimiento y brillo del rubio cálido final'
      }
    ],
    seoKeywords: [
      'mechas con papel Punta Arenas',
      'babylights rubio calido',
      'iluminacion de contorno facial',
      'rubio altura 9',
      'peluqueria Punta Arenas',
      'JB Balayaje Peluqueria boutique'
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
      'JB Balayaje Peluqueria boutique'
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
    popularBadge: false,
    seoTag: 'Matizado Balayage'
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
