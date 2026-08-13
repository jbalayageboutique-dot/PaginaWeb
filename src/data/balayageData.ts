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
    title: 'Carolina: Balayage & Babylights',
    category: 'balayage-rubio',
    categoryLabel: 'Balayage Rubio',
    beforeImage: 'maison-balayage/casos/carolina-balayage-rubio-calido-olaplex-punta-arenas/maison-balayage-punta-arenas-carolina-balayage-rubio-calido-antes-del-cambio-01',
    afterImage: 'maison-balayage/casos/carolina-balayage-rubio-calido-olaplex-punta-arenas/maison-balayage-punta-arenas-carolina-balayage-rubio-calido-portada-despues-01',
    startingBase: 'Cabello oscuro natural',
    techniqueUsed: 'Combinación de Balayage con Babylights muy finas para contorno iluminado. Sellado de cutícula e hidratación profunda.',
    finalTone: 'Rubio multidimensional con brillo espejo',
    durationHours: '5 horas',
    maintenanceFrequency: 'Retoque de contorno a los 3 meses y matización regular',
    hairTexture: 'Cabello natural oscuro',
    description: 'Carolina llegó con el deseo de realizar una transición hacia un rubio luminoso. Diseñamos un trabajo personalizado combinando la técnica de Balayage con Babylights muy finitas de contorno. Finalizamos la sesión con un protocolo de sellado de cutícula e hidratación profunda para restaurar, sellar y aportarle un brillo y suavidad excepcionales al cabello.',
    clientName: 'Carolina',
    rating: 5,
    clientReview: 'Espectacular el brillo y la suavidad del pelo gracias al sellado de cutícula. El rubio con las babylights súper finas me encantó.',
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
        alt: 'Resultado balayage y babylights rubio desde atrás'
      },
      {
        src: 'maison-balayage/casos/carolina-balayage-rubio-calido-olaplex-punta-arenas/maison-balayage-punta-arenas-carolina-balayage-rubio-calido-despues-02',
        alt: 'Vista lateral del degradado y mechas rubias finas'
      }
    ],
    videos: [
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/q_auto/v1786261111/maison-balayage/casos/carolina-balayage-rubio-calido-olaplex-punta-arenas/maison-balayage-punta-arenas-carolina-balayage-rubio-calido-movimiento-01.mov',
        title: 'Movimiento y brillo del cabello'
      },
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/q_auto/v1786261119/maison-balayage/casos/carolina-balayage-rubio-calido-olaplex-punta-arenas/maison-balayage-punta-arenas-carolina-balayage-rubio-calido-movimiento-03.mov',
        title: 'Brillo y suavidad con sellado de cutícula'
      }
    ],
    seoKeywords: [
      'balayage rubio Punta Arenas',
      'babylights rubio Punta Arenas',
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
    durationHours: 'Sesión técnico extendida',
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
        alt: 'Reflejo en espejo del contorno iluminado and babylights rubias'
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
    id: 'barrido-color-turquesa-corte-escalonado',
    title: 'Elena: Barrido de Color Turquesa & Corte Escalonado',
    category: 'correccion-color',
    categoryLabel: 'Corrección de Color',
    beforeImage: 'maison-balayage/casos/barrido-color-turquesa-punta-arenas/IMG_1858',
    afterImage: 'maison-balayage/casos/barrido-color-turquesa-punta-arenas/IMG_1870',
    startingBase: 'Cabello castaño previo con restos de tinturas anteriores y tono desigual',
    techniqueUsed: 'Barrido de color completo para una aclaración limpia y uniforme a altura 9-10. Aplicación de tono turquesa parejo. Corte escalonado técnico diseñado a medida para dar volumen, ligereza y destacar el movimiento del nuevo color.',
    finalTone: 'Turquesa pastel parejo, vibrante y de gran movimiento',
    durationHours: '6 horas',
    maintenanceFrequency: 'Retoque de raíz y matización cada 1.5 a 2 meses',
    hairTexture: 'Cabello de grosor medio con corte escalonado',
    description: 'Elena buscaba un cambio de impacto con un tono turquesa parejo y vibrante. Para lograrlo, realizamos un barrido de color técnico completo, logrando llevar su base oscura a una altura de decoloración limpia entre 9 y 10 de forma totalmente uniforme. Sobre esta base perfecta, aplicamos el pigmento turquesa fantasía. Finalmente, realizamos un corte de cabello escalonado técnico diseñado específicamente para resaltar la fluidez, volumen y brillo tridimensional del nuevo tono.',
    clientName: 'Elena',
    rating: 5,
    clientReview: 'Increíble el trabajo que me hicieron. El color turquesa quedó súper parejo y brillante, y el corte escalonado le dio un movimiento hermoso al pelo. Recomiendo totalmente el salón en Punta Arenas!',
    galleryImages: [
      {
        src: 'maison-balayage/casos/barrido-color-turquesa-punta-arenas/IMG_1872',
        alt: 'Resultado del barrido turquesa en detalle'
      },
      {
        src: 'maison-balayage/casos/barrido-color-turquesa-punta-arenas/IMG_1875',
        alt: 'Brillo y uniformidad del tono turquesa'
      },
      {
        src: 'maison-balayage/casos/barrido-color-turquesa-punta-arenas/IMG_1877',
        alt: 'Movimiento del corte escalonado turquesa'
      }
    ],
    seoKeywords: [
      'barrido de color turquesa',
      'decoloracion altura 10',
      'corte escalonado Punta Arenas',
      'color de fantasia turquesa',
      'JB Balayage Peluqueria boutique'
    ]
  },
  {
    id: 'carolina-balayage-rubio-nuevo',
    title: 'Carolina: Balayage con Babylights en Tonos Cálidos y Miel',
    category: 'balayage-rubio',
    categoryLabel: 'Balayage Rubio',
    afterImage: 'maison-balayage/casos/carolina-balayage-rubio-nacar-punta-arenas/maison-balayage-punta-arenas-carolina-rubio-nacar-espejo-ia-01',
    startingBase: 'Cabello natural oscuro',
    techniqueUsed: 'Técnica de mechas con papel combinadas con babylights extra finas en todo el contorno para iluminar el rostro (contouring) en tonos cálidos y miel. Protocolo completo de Olaplex integrado en la aclaración para el cuidado capilar, finalizando con sellado de cutícula e hidratación profunda.',
    finalTone: 'Rubio cálido y miel, luminoso, saludable y de gran brillo',
    durationHours: '4.5 horas',
    maintenanceFrequency: 'Matización regular y retoque a los 4 meses',
    hairTexture: 'Cabello natural de grosor medio',
    description: 'En esta sesión de diseño para Carolina, realizamos un trabajo detallado de mechas con papel combinadas con babylights extra finas para aportar iluminación cálida y tonos miel en todo el contorno de su rostro. Cuidando estrictamente la salud de su cabello, incorporamos el tratamiento de Olaplex durante todo el proceso de aclarado. Para coronar la transformación, aplicamos un protocolo de sellado de cutícula e hidratación profunda, dando como resultado una melena rubia extremadamente brillante, sedosa y en perfectas tonalidades cálidas.',
    clientName: 'Carolina',
    rating: 5,
    clientReview: 'Me encantaron las babylights súper finas de contorno en tonos miel. El pelo me quedó sanísimo gracias a Olaplex y con un brillo espectacular por el sellado de cutícula.',
    galleryImages: [
      {
        src: 'maison-balayage/casos/carolina-balayage-rubio-nacar-punta-arenas/maison-balayage-punta-arenas-carolina-rubio-nacar-despues-01',
        alt: 'Reflejo del balayage rubio cálido y miel de Carolina'
      },
      {
        src: 'maison-balayage/casos/carolina-balayage-rubio-nacar-punta-arenas/maison-balayage-punta-arenas-carolina-rubio-nacar-despues-02',
        alt: 'Luz y relieve del contorno rubio cálido de perfil'
      },
      {
        src: 'maison-balayage/casos/carolina-balayage-rubio-nacar-punta-arenas/maison-balayage-punta-arenas-carolina-rubio-nacar-despues-03',
        alt: 'Textura suave y brillo tridimensional'
      }
    ],
    videos: [
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/v1786548798/maison-balayage/casos/carolina-balayage-rubio-nacar-punta-arenas/maison-balayage-punta-arenas-carolina-rubio-nacar-movimiento-01.mov',
        title: 'Movimiento y relieve del rubio miel'
      },
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/v1786548800/maison-balayage/casos/carolina-balayage-rubio-nacar-punta-arenas/maison-balayage-punta-arenas-carolina-rubio-nacar-movimiento-02.mov',
        title: 'Suavidad y brillo al movimiento'
      },
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/v1786548802/maison-balayage/casos/carolina-balayage-rubio-nacar-punta-arenas/maison-balayage-punta-arenas-carolina-rubio-nacar-movimiento-03.mov',
        title: 'Resultado final brillante con ondas'
      },
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/v1786548806/maison-balayage/casos/carolina-balayage-rubio-nacar-punta-arenas/maison-balayage-punta-arenas-carolina-rubio-nacar-movimiento-04.mov',
        title: 'Elasticidad y caída del rubio cálido y miel'
      }
    ],
    seoKeywords: [
      'mechas con papel Punta Arenas',
      'babylights rubio miel',
      'iluminacion contorno facial',
      'tratamiento olaplex Punta Arenas',
      'sellado cuticula cabello',
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
    id: 'gabriela-balayage-crespo-largo',
    title: 'Gabriela: Balayage Rubio en Cabello Crespo y Extralargo',
    category: 'balayage-rubio',
    categoryLabel: 'Balayage Rubio',
    beforeImage: 'maison-balayage/casos/gabriela-balayage-crespo-largo-punta-arenas/maison-balayage-punta-arenas-gabriela-balayage-crespo-antes-del-cambio-01',
    afterImage: 'maison-balayage/casos/gabriela-balayage-crespo-largo-punta-arenas/maison-balayage-punta-arenas-gabriela-balayage-crespo-despues-03',
    startingBase: 'Castaño oscuro natural con cabello crespo extralargo',
    techniqueUsed: 'Balayage manual diseñado específicamente para definir y resaltar la estructura tridimensional del rizo. Protocolo de protección molecular activa Olaplex integrado en la decoloración, seguido de masaje de cutícula y superhidratación.',
    finalTone: 'Rubio luminoso multidimensional en rizos definidos',
    durationHours: '6 horas',
    maintenanceFrequency: 'Retoque de balayage cada 5-6 meses y nutrición mensual',
    hairTexture: 'Cabello crespo, muy abundante y extralargo',
    description: 'Gabriela llegó buscando iluminar su melena crespa y extralarga sin perder la definición ni la salud de sus rizos. Diseñamos un balayage rubio personalizado a mano alzada. Para nosotros, cuidar la salud capilar es fundamental: trabajamos integrando el tratamiento completo de Olaplex en todo el proceso de decoloración. Finalizamos con un sellado de cutícula e hidratación extrema para aportar nutrición profunda, brillo espejo y una definición elástica espectacular a sus rizos.',
    clientName: 'Gabriela',
    rating: 5,
    clientReview: 'Increíble el cambio. Mis rizos quedaron súper definidos, suaves y con un rubio brillante gracias al tratamiento Olaplex. Cuidar la salud de mi pelo largo era mi prioridad y ellos lo hicieron perfecto.',
    galleryImages: [
      {
        src: 'maison-balayage/casos/gabriela-balayage-crespo-largo-punta-arenas/maison-balayage-punta-arenas-gabriela-balayage-crespo-despues-01',
        alt: 'Detalle de rizos rubios definidos con Olaplex'
      },
      {
        src: 'maison-balayage/casos/gabriela-balayage-crespo-largo-punta-arenas/maison-balayage-punta-arenas-gabriela-balayage-crespo-despues-02',
        alt: 'Brillo y volumen de melena crespa extralarga'
      },
      {
        src: 'maison-balayage/casos/gabriela-balayage-crespo-largo-punta-arenas/maison-balayage-punta-arenas-gabriela-balayage-crespo-portada-despues-01',
        alt: 'Resultado final rubio brillante del rizo'
      }
    ],
    videos: [
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/v1786551878/maison-balayage/casos/gabriela-balayage-crespo-largo-punta-arenas/maison-balayage-punta-arenas-gabriela-balayage-crespo-movimiento-01.mp4',
        title: 'Movimiento y rebote elástico de los rizos rubios con Olaplex'
      }
    ],
    seoKeywords: [
      'balayage cabello crespo Punta Arenas',
      'rubio cabello rizado largo',
      'olaplex rizos definidos',
      'peluqueria rasmussen punta arenas',
      'JB Balayage Peluqueria boutique'
    ]
  },
  {
    id: 'nicole-morena-iluminada-peru',
    title: 'Nicole: Balayage Morena Iluminada',
    category: 'morena-iluminada',
    categoryLabel: 'Morena Iluminada',
    afterImage: 'maison-balayage/casos/nicole-morena-iluminada-peru-punta-arenas/maison-balayage-punta-arenas-nicole-morena-iluminada-peru-portada-despues-01',
    startingBase: 'Castaño oscuro natural con alta densidad',
    techniqueUsed: 'Técnica de balayage con papel de plata para un aclarado limpio y uniforme. Diseño estratégico de mechas para morena iluminada, masaje de sellado de cutícula e hidratación capilar.',
    finalTone: 'Castaño avellana y caramelo suave tridimensional',
    durationHours: '5 horas',
    maintenanceFrequency: 'Retoque de puntos de luz cada 4-5 meses',
    hairTexture: 'Cabello castaño oscuro abundante',
    description: 'Nicole nos visitó desde el Perú a nuestro salón en Punta Arenas. Diseñamos para ella una técnica de balayage con papeles de plata para lograr una morena iluminada súper sutil y elegante en tonos avellana y caramelo. Cuidamos al máximo la fibra capilar, finalizando el proceso con un sellado de cutícula profundo para dejar el cabello ultra suave, dócil y con un brillo espectacular.',
    clientName: 'Nicole',
    rating: 5,
    clientReview: 'Vine a Punta Arenas desde el Perú y busqué el mejor salón para una morena iluminada. El trabajo con papeles de plata quedó perfecto, mi pelo se siente muy suave y brillante.',
    galleryImages: [
      {
        src: 'maison-balayage/casos/nicole-morena-iluminada-peru-punta-arenas/maison-balayage-punta-arenas-nicole-morena-iluminada-peru-despues-01',
        alt: 'Balayage morena iluminada en detalle'
      },
      {
        src: 'maison-balayage/casos/nicole-morena-iluminada-peru-punta-arenas/maison-balayage-punta-arenas-nicole-morena-iluminada-peru-despues-02',
        alt: 'Luz y relieve del contorno morena iluminada'
      },
      {
        src: 'maison-balayage/casos/nicole-morena-iluminada-peru-punta-arenas/maison-balayage-punta-arenas-nicole-morena-iluminada-peru-despues-03',
        alt: 'Textura suave y brillo tridimensional'
      },
      {
        src: 'maison-balayage/casos/nicole-morena-iluminada-peru-punta-arenas/maison-balayage-punta-arenas-nicole-morena-iluminada-peru-despues-04',
        alt: 'Detalle de puntas y brillo'
      }
    ],
    videos: [
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/v1786549580/maison-balayage/casos/nicole-morena-iluminada-peru-punta-arenas/maison-balayage-punta-arenas-nicole-morena-iluminada-peru-movimiento-01.mov',
        title: 'Movimiento y caída del balayage caramelo'
      }
    ],
    seoKeywords: [
      'morena iluminada Punta Arenas',
      'balayage avellana Punta Arenas',
      'tecnica papel de plata balayage',
      'peluqueria cerca de rasmussen',
      'JB Balayage Peluqueria boutique'
    ]
  },
  {
    id: 'valentina-balayage-rubio-luminoso',
    title: 'Valentina: Balayage Rubio Ultra Luminoso',
    category: 'balayage-rubio',
    categoryLabel: 'Balayage Rubio',
    beforeImage: 'maison-balayage/casos/valentina-balayage-rubio-luminoso-punta-arenas/maison-balayage-punta-arenas-valentina-balayage-rubio-antes-del-cambio-01',
    afterImage: 'maison-balayage/casos/valentina-balayage-rubio-luminoso-punta-arenas/maison-balayage-punta-arenas-valentina-balayage-rubio-despues-01',
    startingBase: 'Cabello castaño oscuro natural',
    techniqueUsed: 'Balayage de alta precisión con mechas difuminadas para evitar marcas. Tratamiento de nutrición capilar profunda y sellado térmico de cutícula.',
    finalTone: 'Rubio extra claro luminoso, sedoso y con brillo espejo',
    durationHours: '5 horas',
    maintenanceFrequency: 'Retoque cada 4-5 meses y matización mensual',
    hairTexture: 'Cabello lacio natural de grosor medio',
    description: 'Valentina deseaba lograr una iluminación rubia de gran impacto sin perder la salud de su melena. Realizamos una transición limpia y difuminada de balayage rubio ultra luminoso. Para garantizar la docilidad y el brillo espejo característico de nuestro salón, finalizamos con un protocolo intensivo de hidratación profunda y sellado técnico de cutículas.',
    clientName: 'Valentina',
    rating: 5,
    clientReview: 'El resultado final de mi balayage es maravilloso. Mi pelo se ve súper rubio y brillante, pero con una textura increíblemente suave y sana.',
    galleryImages: [
      {
        src: 'maison-balayage/casos/valentina-balayage-rubio-luminoso-punta-arenas/maison-balayage-punta-arenas-valentina-balayage-rubio-despues-02',
        alt: 'Brillo espejo y suavidad de Valentina de espaldas'
      }
    ],
    videos: [
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/v1786553472/maison-balayage/casos/valentina-balayage-rubio-luminoso-punta-arenas/maison-balayage-punta-arenas-valentina-balayage-rubio-movimiento-01.mp4',
        title: 'Movimiento, rebote y sedosidad del rubio luminoso'
      }
    ],
    seoKeywords: [
      'balayage rubio luminoso Punta Arenas',
      'rubio extra claro Punta Arenas',
      'sellado de cuticula cabello',
      'peluqueria cerca de rasmussen',
      'JB Balayage Peluqueria boutique'
    ]
  },
  {
    id: 'mechas-valentina-rubio-olaplex',
    title: 'Valentina: Mechas Rubio Extra Claro',
    category: 'balayage-rubio',
    categoryLabel: 'Balayage Rubio',
    afterImage: 'maison-balayage/casos/mechas-valentina-rubio-olaplex-punta-arenas/maison-balayage-punta-arenas-mechas-valentina-rubio-portada-despues-01',
    rotateAfterImage: 90,
    startingBase: 'Castaño claro natural con deseo de rubio global de alto impacto',
    techniqueUsed: 'Mechas de alta densidad con papel térmico e iluminación de contorno (contouring) facial para enmarcar el rostro. Incorporación del tratamiento de reconstrucción molecular Olaplex y sellado térmico de cutícula.',
    finalTone: 'Rubio extra claro perlado, brillante, tridimensional y ultra sano',
    durationHours: '5 horas',
    maintenanceFrequency: 'Retoque de raíz y contorno cada 3 meses',
    hairTexture: 'Cabello natural de grosor medio',
    description: 'Un diseño sumamente especial y con todo el cariño de una madre estilista: realizamos un trabajo de mechas rubio extra claro de alta densidad para mi hija Valentina. Para enmarcar su mirada y facciones, diseñamos un contorno iluminado (contouring) muy marcado. Cuidando meticulosamente la salud y elasticidad de su cabello, incorporamos el sistema reconstructor de puentes de disulfuro Olaplex durante toda la aclaración, logrando un rubio de impacto, sedoso y con brillo espejo.',
    clientName: 'Valentina (Hija)',
    rating: 5,
    clientReview: 'El trabajo más hermoso de todos hecho con todo el amor de mi mamá. Mis mechas rubias extra claras quedaron espectaculares, con una luz increíble y súper suaves gracias al tratamiento Olaplex.',
    galleryImages: [
      {
        src: 'maison-balayage/casos/mechas-valentina-rubio-olaplex-punta-arenas/maison-balayage-punta-arenas-mechas-valentina-rubio-despues-01',
        alt: 'Resultado final de mechas rubias extra claras visto de espaldas'
      },
      {
        src: 'maison-balayage/casos/mechas-valentina-rubio-olaplex-punta-arenas/maison-balayage-punta-arenas-mechas-valentina-rubio-despues-02',
        alt: 'Luz y relieve del contorno rubio de perfil',
        angle: 90
      },
      {
        src: 'maison-balayage/casos/mechas-valentina-rubio-olaplex-punta-arenas/maison-balayage-punta-arenas-mechas-valentina-rubio-despues-03',
        alt: 'Detalle de mechas de alta densidad rubio extra claro',
        angle: 90
      },
      {
        src: 'maison-balayage/casos/mechas-valentina-rubio-olaplex-punta-arenas/maison-balayage-punta-arenas-mechas-valentina-rubio-despues-04',
        alt: 'Textura suave, brillo espejo y ondas sueltas',
        angle: 90
      },
      {
        src: 'maison-balayage/casos/mechas-valentina-rubio-olaplex-punta-arenas/maison-balayage-punta-arenas-mechas-valentina-rubio-despues-05',
        alt: 'Caída y salud capilar de Valentina',
        angle: 90
      }
    ],
    seoKeywords: [
      'mechas rubias Punta Arenas',
      'rubio extra claro Punta Arenas',
      'iluminacion contorno facial',
      'contouring rubio Punta Arenas',
      'tratamiento olaplex Punta Arenas',
      'JB Balayage Peluqueria boutique'
    ]
  },
  {
    id: 'barrido-color-guinda-caramelo-miel',
    title: 'Corrección de Color: De Guinda a Caramelo Miel',
    category: 'correccion-color',
    categoryLabel: 'Corrección de Color',
    beforeImage: 'maison-balayage/casos/barrido-color-guinda-caramelo-miel-punta-arenas/maison-balayage-punta-arenas-barrido-color-guinda-caramelo-antes-del-cambio-01',
    afterImage: 'maison-balayage/casos/barrido-color-guinda-caramelo-miel-punta-arenas/maison-balayage-punta-arenas-barrido-color-guinda-caramelo-portada-despues-01',
    startingBase: 'Tono guinda artificial acumulado por más de 3 años',
    techniqueUsed: 'Barrido de color técnico y minucioso para eliminar pigmentación acumulada sin dañar la fibra. Diseño de mechas finas en tonos caramelo y miel, e incorporación del sistema Olaplex para la protección capilar. Tratamiento final de sellado térmico de cutículas.',
    finalTone: 'Caramelo miel sumamente luminoso, elegante, limpio y sin reflejos naranjos',
    durationHours: '6 horas',
    maintenanceFrequency: 'Retoque de raíz y matización cada 3 meses',
    hairTexture: 'Cabello procesado con acumulación de tinte',
    description: 'Nuestra clienta llegó buscando remover un tono guinda artificial acumulado por más de 3 años. Llevamos a cabo un minucioso barrido de color y diseño de mechas finas, logrando un tono caramelo miel sumamente elegante, lleno de luz y libre de reflejos naranjos no deseados. Para cuidar la integridad y salud de la fibra capilar, integramos el tratamiento completo de Olaplex en la decoloración, cerrando la sesión con un sellado térmico de cutículas para garantizar máxima suavidad y un brillo espectacular.',
    clientName: 'Corrección de Color',
    rating: 5,
    clientReview: 'Espectacular el cambio de guinda a caramelo miel. Con Olaplex y el sellado de cutícula el cabello quedó brillante, sedoso y con un color súper natural y luminoso.',
    galleryImages: [
      {
        src: 'maison-balayage/casos/barrido-color-guinda-caramelo-miel-punta-arenas/maison-balayage-punta-arenas-barrido-color-guinda-caramelo-despues-01',
        alt: 'Resultado final caramelo miel visto de perfil'
      },
      {
        src: 'maison-balayage/casos/barrido-color-guinda-caramelo-miel-punta-arenas/maison-balayage-punta-arenas-barrido-color-guinda-caramelo-despues-02',
        alt: 'Dimensión y brillo del caramelo miel'
      },
      {
        src: 'maison-balayage/casos/barrido-color-guinda-caramelo-miel-punta-arenas/maison-balayage-punta-arenas-barrido-color-guinda-caramelo-despues-03',
        alt: 'Suavidad y textura del cabello con Olaplex'
      },
      {
        src: 'maison-balayage/casos/barrido-color-guinda-caramelo-miel-punta-arenas/maison-balayage-punta-arenas-barrido-color-guinda-caramelo-despues-04',
        alt: 'Brillo espejo del color caramelo miel'
      },
      {
        src: 'maison-balayage/casos/barrido-color-guinda-caramelo-miel-punta-arenas/maison-balayage-punta-arenas-barrido-color-guinda-caramelo-despues-05',
        alt: 'Detalle de caída y salud capilar'
      }
    ],
    videos: [
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/v1786580883/maison-balayage/casos/barrido-color-guinda-caramelo-miel-punta-arenas/maison-balayage-punta-arenas-barrido-color-guinda-caramelo-movimiento-01.mov',
        title: 'Movimiento, rebote y elasticidad del cabello corregido'
      }
    ],
    seoKeywords: [
      'barrido de color Punta Arenas',
      'sacar tinte guinda del cabello',
      'balayage caramelo miel Punta Arenas',
      'tratamiento olaplex Punta Arenas',
      'sellado de cuticula cabello',
      'JB Balayage Peluqueria boutique'
    ]
  },
  {
    id: 'ninoska-balayage-babylights-miel',
    title: 'Ninoska: Balayage y Babylights',
    category: 'balayage-rubio',
    categoryLabel: 'Balayage Rubio',
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
    title: 'Sarah: Babylights Rubias (Sin Matizar) - Expedición África',
    category: 'balayage-rubio',
    categoryLabel: 'Balayage Rubio',
    afterImage: 'maison-balayage/casos/clienta-africa-expedicion/IMG_1392 2',
    startingBase: 'Rubio oscuro natural con puntas desgastadas por el sol y la sal marina',
    techniqueUsed: 'Micro-babylights ultra finas de alta densidad en todo el contorno y melena. Decoloración limpia (altura 9) sin necesidad de matizar. Tratamiento reconstructor Olaplex incorporado y sellado de cutícula profundo.',
    finalTone: 'Rubio natural, ultra luminoso y sin matiz',
    durationHours: '5 horas',
    maintenanceFrequency: 'Retoque de crecimiento a los 4-6 meses',
    hairTexture: 'Cabello expuesto a condiciones extremas de navegación',
    description: 'Nuestra cliente Sarah, quien se encontraba navegando en una expedición marítima internacional desde África, nos contactó a través de Google para restaurar e iluminar su cabello al llegar a Punta Arenas. Realizamos un diseño minucioso de micro-babylights extra finas para lograr la máxima claridad. Debido a la pureza del aclarado (altura 9), no hubo necesidad de aplicar matizante. Protegimos la fibra capilar con el tratamiento completo de Olaplex y finalizamos con un sellado de cutícula e hidratación profunda para contrarrestar el daño del viento y la sal del mar.',
    clientName: 'Sarah',
    rating: 5,
    clientReview: 'I found JB Balayage on Google while sailing on a maritime expedition from Africa to Patagonia. I needed a professional to brighten my hair in Punta Arenas, and the results exceeded all my expectations! The micro-babylights are extremely fine, and we did not even need to tone it. Thanks to the Olaplex treatment and cuticle sealing, my hair feels incredibly healthy, soft, and shiny despite the harsh sea conditions. An absolute gem of a salon in Patagonia!',
    galleryImages: [
      {
        src: 'maison-balayage/casos/clienta-africa-expedicion/IMG_1381',
        alt: 'Resultado de babylights rubias sin matizar'
      },
      {
        src: 'maison-balayage/casos/clienta-africa-expedicion/IMG_1387 2',
        alt: 'Resultado de babylights rubias sin matizar visto desde atrás'
      }
    ],
    videos: [
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/v1786464071/maison-balayage/casos/clienta-africa-expedicion/IMG_1380.mov',
        title: 'Brillo and movimiento natural del rubio sin matizar'
      },
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/v1786464077/maison-balayage/casos/clienta-africa-expedicion/IMG_1390.mov',
        title: 'Detalle de la elasticidad y suavidad con Olaplex'
      },
      {
        src: 'https://res.cloudinary.com/apssuuqy/video/upload/v1786464082/maison-balayage/casos/clienta-africa-expedicion/IMG_1393.mov',
        title: 'Movimiento y caída del rubio tridimensional'
      }
    ],
    seoKeywords: [
      'babylights sin matizar Punta Arenas',
      'rubio natural',
      'decoloracion limpia sin daño',
      'tratamiento olaplex Punta Arenas',
      'peluqueria cerca del puerto',
      'JB Balayage Peluqueria boutique'
    ]
  },
  {
    id: 'case-4',
    title: 'Cobrizo Cálido & Warm Balayage Melt',
    category: 'cobrizo-warm',
    categoryLabel: 'Cobrizo Cálido',
    beforeImage: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=800&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1584297091622-af8e5fda2a2f?q=80&w=800&auto=format&fit=crop',
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
    id: 'case-1',
    title: 'Balayage Rubio Miel Dimensión Signature',
    category: 'balayage-rubio',
    categoryLabel: 'Balayage Rubio',
    beforeImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=800&auto=format&fit=crop',
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
    beforeImage: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=800&auto=format&fit=crop',
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
    beforeImage: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=800&auto=format&fit=crop',
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
    id: 'case-5',
    title: 'Babylights & Melt Rubio Platinado Vainilla',
    category: 'babylights-melt',
    categoryLabel: 'Babylights & Melt',
    beforeImage: 'https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?q=80&w=800&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    startingBase: 'Rubio Oscuro natural (Altura 6)',
    techniqueUsed: 'Técnica Babylights micro-finas en todo el contorno + Esfumado de raíz',
    finalTone: 'Platinado Vainilla Luminoso con efecto solar',
    durationHours: '4.8 horas',
    maintenanceFrequency: 'Cada 5 meses',
    hairTexture: 'Liso medium',
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
  },
  {
    id: 'olaplex-treatment-full',
    title: 'Tratamiento Reconstructor Premium Olaplex® Completo',
    shortSubtitle: 'El revolucionario sistema Nº.1 del mundo para revivir el cabello dañado',
    description: 'El tratamiento de reconstrucción capilar más prestigioso y demandado a nivel mundial. Olaplex® no es un simple baño de crema o hidratación cosmética; es una terapia química activa patentada que trabaja a nivel molecular. Su fórmula exclusiva reconecta los enlaces de disulfuro rotos por procesos químicos (decoloraciones, tinturas, alisados) y térmicos (planchas, secadores). Repara de forma inmediata la estructura interna de la fibra, devolviendo la fuerza, elasticidad y salud original a melenas extremadamente sensibilizadas.',
    includes: [
      'Paso Nº.1 Bond Multiplier: Concentrado puro para multiplicar y reconectar enlaces rotos',
      'Paso Nº.2 Bond Perfector: Crema selladora activa para consolidar e igualar la fibra',
      'Lavado de mantenimiento con Shampoo Nº.4 y Acondicionador Nº.5 Bond Maintenance',
      'Masaje capilar relajante con estimulación y alineación profunda de la cutícula',
      'Styling protector final con ondas balayage para lucir un brillo espejo tridimensional'
    ],
    duration: '1 - 1.5 horas',
    priceRange: 'Consulta personalizada',
    recommendedFor: 'Cabellos decolorados, sensibilizados, quebradizos o antes de un cambio de color importante para preparar la estructura capilar de forma 100% segura.',
    popularBadge: true,
    seoTag: 'Tratamiento Olaplex',
    imageUrl: 'https://res.cloudinary.com/apssuuqy/image/upload/f_auto,q_auto:best,e_enhance,e_sharpen:100/v1786631001/maison-balayage/tratamientos/tratamiento-olaplex-completo-jb-balayage.jpg'
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
