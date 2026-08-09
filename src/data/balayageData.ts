import { BeforeAfterCase, ServiceItem, GoogleBusinessInfo, GoogleReview, SeoSettings } from '../types';

export const GOOGLE_BUSINESS_DATA: GoogleBusinessInfo = {
  name: 'Maison Balayage Studio',
  headline: 'Especialista Máster en Balayage, Morenas Iluminadas & Corrección de Color',
  address: 'esquina Iris Muñoz - Roberto Rasmussen Fernández 187',
  city: '6200000 Punta Arenas, Magallanes y la Antártica Chilena, Chile',
  rating: 4.9,
  totalReviews: 128,
  googleProfileUrl: 'https://maps.google.com/?q=esquina+Iris+Mu%C3%B1oz+-+Roberto+Rasmussen+Fern%C3%A1ndez+187,+6200000+Punta+Arenas,+Magallanes+y+la+Ant%C3%A1rtica+Chilena,+Chile',
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
  pageTitle: 'Maison Balayage Punta Arenas | Especialista en Balayage & Coloración Profesional',
  metaDescription: 'Estudio especializado en Balayage Rubio, Morena Iluminada y Corrección de Color en Punta Arenas, Magallanes. Ubicados en esquina Iris Muñoz - Roberto Rasmussen Fernández 187.',
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
  businessName: 'Maison Balayage Studio Punta Arenas',
  geoRegion: 'CL-MA',
  placeAddress: 'esquina Iris Muñoz - Roberto Rasmussen Fernández 187, 6200000 Punta Arenas, Magallanes y la Antártica Chilena, Chile'
};

export const BEFORE_AFTER_CASES: BeforeAfterCase[] = [
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
