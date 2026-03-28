export const auditorios = [
  {
    id: 1,
    nombre: "Gran Auditorio UBE",
    capacidad: 1200,
    tipo: "Auditorio Principal",
    ubicacion: "Campus Durán — Edificio Central",
    descripcion: "Con 1.600 m², tres pisos y capacidad para 1.200 personas, el Gran Auditorio UBE es el epicentro de graduaciones, congresos y grandes eventos de la comunidad universitaria. Equipado con tecnología de última generación y paneles solares, es el espacio más importante del campus de Durán.",
    imagen: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    disponible: true,
    destacado: true,
    badge: "Recién inaugurado",
    equipamiento: {
      incluido: ["Pantalla de proyección principal 12m","Sistema de proyección 4K","Sistema de sonido profesional de gran formato","8 micrófonos inalámbricos","Sistema de traducción simultánea","Iluminación escénica LED full-color","Consola de mezcla profesional","Podio institucional con micrófono","Pantallas secundarias laterales","Aire acondicionado centralizado (3 pisos)","Internet WiFi de alta capacidad","Camerinos y sala VIP","Paneles solares — energía sostenible","Sistema de seguridad y control de acceso"],
      extras: ["Producción y transmisión en vivo (streaming)","Grabación profesional multiángulo","Cobertura del Canal TV UBE","Técnico de sonido y luces dedicado","Servicio de catering","Escenario adicional desmontable"],
      noIncluido: ["Decoración y flores","Impresión de material","Transporte de equipos externos"]
    },
    horarioDisponible: "Lunes a Domingo, 07:00 – 22:00",
    anticipacionMinima: "72 horas",
    tags: ["Graduaciones","Congresos","Grandes eventos","Transmisión en vivo"]
  },
  {
    id: 2,
    nombre: "Sala Manuela Sáenz",
    capacidad: 120,
    tipo: "Sala de Conferencias",
    ubicacion: "Bloque B — Primer Piso",
    descripcion: "Sala multipropósito ideal para seminarios, talleres, presentaciones académicas y reuniones de alto nivel. Configuración flexible con mesas modulares.",
    imagen: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
    disponible: true,
    destacado: true,
    equipamiento: {
      incluido: ["Pantalla interactiva 98\"","Proyector Full HD","Sistema de sonido integrado","4 micrófonos de mesa","Videoconferencia (Zoom/Teams)","Pizarrón digital","Aire acondicionado","Internet WiFi","Coffee station"],
      extras: ["Grabación de sesión","Streaming en vivo","Servicio de catering completo","Técnico de soporte"],
      noIncluido: ["Material de oficina","Impresión","Decoración especial"]
    },
    horarioDisponible: "Lunes a Viernes, 07:00 – 21:00",
    anticipacionMinima: "24 horas",
    tags: ["Seminarios","Talleres","Videoconferencias","Reuniones"]
  },
  {
    id: 3,
    nombre: "Auditorio CRAI",
    capacidad: 200,
    tipo: "Auditorio Secundario",
    ubicacion: "CRAI Dr. Gabriel Galarza — Planta Baja",
    descripcion: "Auditorio moderno integrado al Centro de Recursos para el Aprendizaje e Investigación. Perfecto para presentaciones de investigación, defensa de tesis y eventos académicos medianos.",
    imagen: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80",
    disponible: true,
    destacado: false,
    equipamiento: {
      incluido: ["Pantalla doble de proyección","Proyector 6.000 lúmenes","Sistema de sonido (16 canales)","4 micrófonos inalámbricos","Podio digital","Iluminación LED regulable","Aire acondicionado","Internet WiFi"],
      extras: ["Grabación de video HD","Streaming","Técnico de soporte","Catering"],
      noIncluido: ["Decoración","Impresión de material"]
    },
    horarioDisponible: "Lunes a Sábado, 07:00 – 20:00",
    anticipacionMinima: "48 horas",
    tags: ["Investigación","Tesis","Conferencias","Seminarios"]
  },
  {
    id: 4,
    nombre: "Sala Antonio José de Sucre",
    capacidad: 60,
    tipo: "Sala Ejecutiva",
    ubicacion: "Bloque Administrativo — Segundo Piso",
    descripcion: "Sala ejecutiva de alta gama para reuniones de dirección, consejos académicos y encuentros con organismos externos.",
    imagen: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    disponible: true,
    destacado: false,
    equipamiento: {
      incluido: ["Smart TV 85\" 4K","Sistema de videoconferencia ejecutivo","Mesa de reuniones para 20 personas","Micrófonos de ambiente","Pizarrón de vidrio","Cafetera profesional","Aire acondicionado silencioso","Internet WiFi dedicado"],
      extras: ["Catering ejecutivo","Facilitador tecnológico","Grabación de reunión"],
      noIncluido: ["Material impreso","Decoración"]
    },
    horarioDisponible: "Lunes a Viernes, 08:00 – 20:00",
    anticipacionMinima: "24 horas",
    tags: ["Reuniones ejecutivas","Consejo académico","Visitas institucionales"]
  },
  {
    id: 5,
    nombre: "Aula Magna Francisco de Miranda",
    capacidad: 300,
    tipo: "Aula Magna",
    ubicacion: "Bloque C — Planta Baja",
    descripcion: "Espacio académico de gran capacidad para clases magistrales, simposios y eventos educativos. Diseñada con acústica optimizada.",
    imagen: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80",
    disponible: false,
    disponibleDesde: "2026-04-15",
    destacado: false,
    equipamiento: {
      incluido: ["Pantalla de proyección 6m","Proyector 7.000 lúmenes","Sistema de sonido académico","3 micrófonos inalámbricos","Podio con micrófono","Iluminación regulable","Aire acondicionado","Internet WiFi"],
      extras: ["Streaming","Grabación","Técnico de soporte"],
      noIncluido: ["Decoración","Catering","Material impreso"]
    },
    horarioDisponible: "Lunes a Viernes, 07:00 – 21:00",
    anticipacionMinima: "48 horas",
    tags: ["Clases magistrales","Simposios","Posgrado","Eventos académicos"]
  },
  {
    id: 6,
    nombre: "Sala Andrés Bello",
    capacidad: 40,
    tipo: "Sala de Seminario",
    ubicacion: "Bloque D — Primer Piso",
    descripcion: "Sala íntima formato U ideal para talleres participativos, grupos focales y capacitaciones.",
    imagen: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    disponible: true,
    destacado: false,
    equipamiento: {
      incluido: ["Smart TV 75\"","Sistema de audio integrado","2 micrófonos inalámbricos","Pizarrón blanco doble","Marcadores y material básico","Aire acondicionado","Internet WiFi"],
      extras: ["Proyector adicional","Grabación","Catering liviano"],
      noIncluido: ["Impresión","Decoración","Equipos externos"]
    },
    horarioDisponible: "Lunes a Sábado, 07:00 – 20:00",
    anticipacionMinima: "12 horas",
    tags: ["Talleres","Grupos focales","Capacitaciones"]
  },
  {
    id: 7,
    nombre: "Sala de Prensa y Medios",
    capacidad: 80,
    tipo: "Sala de Prensa",
    ubicacion: "Canal TV UBE — Planta Baja",
    descripcion: "Espacio especializado para ruedas de prensa, entrevistas y transmisiones en vivo. Equipada con iluminación profesional de TV.",
    imagen: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80",
    disponible: true,
    destacado: true,
    equipamiento: {
      incluido: ["Fondo institucional UBE","Iluminación profesional de TV","3 cámaras de transmisión HD","Sistema de sonido profesional","Micrófono corbatero y boom","Teleprompter","Control de transmisión","Internet de fibra dedicada"],
      extras: ["Operador de cámara","Director de transmisión","Edición de video post-evento","Streaming simultáneo en redes"],
      noIncluido: ["Maquillaje y estilismo","Diseño gráfico","Producción externa"]
    },
    horarioDisponible: "Lunes a Viernes, 08:00 – 18:00",
    anticipacionMinima: "48 horas",
    tags: ["Rueda de prensa","Entrevistas","Transmisión en vivo","Grabación institucional"]
  },
  {
    id: 8,
    nombre: "Terraza Evento Bolívar",
    capacidad: 250,
    tipo: "Espacio al Aire Libre",
    ubicacion: "Bloque Central — Tercer Piso",
    descripcion: "Terraza panorámica del campus ideal para eventos sociales, graduaciones al aire libre y actividades culturales. Incluye carpa estructural permanente.",
    imagen: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
    disponible: true,
    destacado: false,
    equipamiento: {
      incluido: ["Carpa estructural permanente","Sistema de sonido para exterior","2 micrófonos inalámbricos","Proyector para exterior","Pantalla para exteriores","Iluminación ambiental LED","Generador de respaldo","Internet WiFi exterior"],
      extras: ["Escenario desmontable","Sillas y mesas adicionales","Decoración temática","Catering completo","Técnico de sonido"],
      noIncluido: ["Toldos adicionales","Calefacción extra","Equipos especiales de iluminación"]
    },
    horarioDisponible: "Lunes a Domingo, 09:00 – 22:00",
    anticipacionMinima: "72 horas",
    tags: ["Eventos sociales","Graduaciones","Actividades culturales"]
  }
]

export const tiposEvento = [
  "Conferencia magistral","Seminario / Taller","Defensa de tesis","Reunión académica","Reunión ejecutiva / Directiva","Evento de graduación","Rueda de prensa","Transmisión en vivo","Concierto / Evento cultural","Capacitación interna","Visita institucional","Otro"
]