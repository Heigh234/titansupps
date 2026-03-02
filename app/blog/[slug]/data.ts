/**
 * app/blog/[slug]/data.ts
 *
 * Base de datos de artículos del blog (mock estático).
 * En producción se reemplazaría por llamadas a una API/CMS/DB.
 *
 * Exporta:
 *   POSTS          → Array completo de artículos
 *   getPost()      → Busca un post por slug
 *   getRelatedPosts() → Resuelve slugs relacionados a objetos BlogPost
 */

import type { BlogPost } from './types';

export const POSTS: BlogPost[] = [

  /* ══════════════════════════════════════════════════════════════════════
     1. CREATINA — GUÍA DEFINITIVA 2026
  ══════════════════════════════════════════════════════════════════════ */
  {
    slug: 'creatina-guia-definitiva-2026',
    title: 'Creatina: La Guía Definitiva de 2026 Basada en Evidencia',
    category: 'Suplementación',
    categoryValue: 'suplementacion',
    excerpt: 'Después de revisar más de 300 estudios sobre creatina monohidratada, aquí está todo lo que necesitas saber: qué hace, cuánto tomar, cuándo tomarla y por qué es el suplemento más respaldado por la ciencia.',
    image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=1400&auto=format&fit=crop',
    author: 'Dr. Marcos Villanueva',
    authorRole: 'Director de Formulación',
    authorInitial: 'M',
    date: '20 Feb 2026',
    readTime: '12 min',
    tags: ['Creatina', 'Fuerza', 'Evidencia Nivel A'],
    toc: ['¿Qué es la creatina exactamente?', 'El mecanismo real detrás del rendimiento', '¿Cuánta tomar y cuándo?', 'Fase de carga: sí o no', 'Mitos que necesitan morir', 'Conclusión'],
    relatedSlugs: ['zinc-magnesio-testosterona', 'ventana-anabolica-mito', 'proteina-whey-vs-caseina'],
    body: [
      { type: 'paragraph', content: 'Si solo pudieras tomar un suplemento, debería ser la creatina. No es marketing. Es el suplemento con más evidencia científica acumulada de toda la historia de la suplementación deportiva, con más de 1.000 estudios publicados y más de 300 ensayos clínicos controlados que confirman su eficacia y seguridad.' },
      { type: 'h2', content: '¿Qué es la creatina exactamente?' },
      { type: 'paragraph', content: 'La creatina es un compuesto nitrogenado que el cuerpo produce de forma natural en el hígado, riñones y páncreas a partir de los aminoácidos glicina y arginina. El 95% de la creatina corporal se almacena en el músculo esquelético en forma de fosfocreatina (PCr). El otro 5% se encuentra en el cerebro, el corazón y los testículos.' },
      { type: 'paragraph', content: 'La dieta aporta entre 1 y 2 g diarios (principalmente de carne y pescado), pero los depósitos musculares suelen estar al 60-80% de su capacidad máxima. La suplementación permite saturar esos depósitos, lo que tiene consecuencias directas en el rendimiento.' },
      { type: 'h2', content: 'El mecanismo real detrás del rendimiento' },
      { type: 'paragraph', content: 'El ATP (adenosín trifosfato) es la moneda energética del cuerpo. Durante el ejercicio de alta intensidad, el ATP se agota en segundos. Aquí entra la fosfocreatina: dona un grupo fosfato al ADP para regenerar ATP rápidamente, permitiendo mantener el esfuerzo máximo durante más tiempo.' },
      { type: 'highlight', content: 'Con los depósitos de creatina saturados, puedes mantener la potencia máxima entre un 10% y un 20% más de tiempo. En términos prácticos: más repeticiones, más peso, más sprints, mejor recuperación entre series.' },
      { type: 'paragraph', content: 'Más allá del rendimiento, la creatina tiene efectos secundarios positivos documentados: mayor volumen celular (las células musculares retienen más agua intracelular), aumento en la síntesis de IGF-1, reducción del daño muscular post-entrenamiento y, en estudios más recientes, mejoras en función cognitiva bajo privación de sueño o situaciones de estrés.' },
      { type: 'h2', content: '¿Cuánta tomar y cuándo?' },
      { type: 'paragraph', content: 'El protocolo estándar validado por la mayoría de estudios es simple: 3 a 5 g diarios de creatina monohidratada. Eso es todo. Sin complicaciones.' },
      { type: 'list', items: ['3-5 g/día mantiene los depósitos saturados una vez llenos', 'El momento de ingesta (pre o post entreno) tiene un efecto marginal', 'Con comida mejora la absorción (especialmente con carbohidratos + proteínas)', 'No es necesario ciclar: la creatina es segura en uso continuo'] },
      { type: 'h2', content: 'Fase de carga: sí o no' },
      { type: 'paragraph', content: 'La "fase de carga" (20 g/día durante 5-7 días) permite saturar los depósitos en una semana en lugar de 3-4 semanas. El resultado final es idéntico. La diferencia es solo la velocidad.' },
      { type: 'warning', label: 'Considera esto', content: 'La fase de carga puede causar molestias gastrointestinales en personas sensibles. Si tienes estómago delicado, ve directo a 5 g diarios sin carga. Llegarás al mismo punto en menos de un mes.' },
      { type: 'h2', content: 'Mitos que necesitan morir' },
      { type: 'paragraph', content: 'La creatina no daña los riñones en personas sanas. No es un esteroide. No causa pérdida de cabello (ese estudio de 2009 midió DHT, no pérdida capilar, y nunca se replicó). No necesitas "cargarla" con azúcar. No pierde efectividad si la tomas sola.' },
      { type: 'callout', label: 'Evidencia Nivel A', content: 'La ISSN (International Society of Sports Nutrition) clasifica la creatina monohidratada como el suplemento más efectivo y seguro disponible para aumentar la capacidad de ejercicio de alta intensidad y la masa muscular magra.' },
      { type: 'h2', content: 'Conclusión' },
      { type: 'paragraph', content: 'La creatina monohidratada es barata, segura, respaldada por décadas de investigación y efectiva para prácticamente cualquier disciplina deportiva que requiera esfuerzos explosivos o repetidos. Si no la estás tomando, estás dejando resultados sobre la mesa sin razón.' },
    ],
  },

  /* ══════════════════════════════════════════════════════════════════════
     2. WHEY VS CASEÍNA
  ══════════════════════════════════════════════════════════════════════ */
  {
    slug: 'proteina-whey-vs-caseina',
    title: 'Whey vs. Caseína: ¿Cuál Proteína Necesitas Realmente?',
    category: 'Nutrición',
    categoryValue: 'nutricion',
    excerpt: 'La velocidad de absorción importa, pero no de la manera en que el marketing te ha dicho. Analizamos la ciencia real detrás de cada proteína.',
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=1400&auto=format&fit=crop',
    author: 'Lic. Andrea Solís',
    authorRole: 'Nutricionista Deportiva',
    authorInitial: 'A',
    date: '15 Feb 2026',
    readTime: '8 min',
    tags: ['Proteína', 'Whey', 'Caseína', 'Nutrición'],
    toc: ['La diferencia real entre ambas', 'El mito de la "ventana anabólica proteica"', '¿Cuándo usar cada una?', 'La combinación que sí tiene sentido', 'El veredicto práctico'],
    relatedSlugs: ['ventana-anabolica-mito', 'creatina-guia-definitiva-2026', 'carga-carbohidratos-protocolo'],
    body: [
      { type: 'paragraph', content: 'Durante años el marketing del sector ha intentado convencerte de que el whey es para antes/después del entreno y la caseína para la noche. La realidad es más matizada, y las diferencias prácticas son menos dramáticas de lo que te han dicho.' },
      { type: 'h2', content: 'La diferencia real entre ambas' },
      { type: 'paragraph', content: 'Ambas provienen de la leche de vaca (que es un 80% caseína y un 20% whey). La diferencia fundamental es la velocidad de digestión y el patrón de aminoácidos en sangre que generan.' },
      { type: 'highlight', content: 'El whey produce un pico de aminoácidos en sangre a los 60-90 minutos de la ingesta. La caseína genera un aumento más gradual que se mantiene durante 5-7 horas. Ambas producen la misma síntesis proteica total a las 24 horas.' },
      { type: 'paragraph', content: 'El whey es especialmente rico en leucina (el aminoácido que más directamente activa la síntesis proteica muscular). La caseína tiene un perfil más equilibrado y es más saciante por su consistencia gelatinosa en el estómago.' },
      { type: 'h2', content: 'El mito de la "ventana anabólica proteica"' },
      { type: 'paragraph', content: 'La idea de que tienes una ventana de 30 minutos post-entreno para tomar whey o perder todos los beneficios del entrenamiento es una simplificación excesiva que la investigación moderna ha relativizado considerablemente. La síntesis proteica muscular permanece elevada entre 24 y 48 horas después del entrenamiento.' },
      { type: 'warning', label: 'Contexto importante', content: 'Si entrenas en ayunas o más de 4-5 horas después de tu última comida, sí tiene sentido priorizar proteína de rápida absorción cerca del entrenamiento. Si entrenas con comidas recientes, la urgencia es mucho menor.' },
      { type: 'h2', content: '¿Cuándo usar cada una?' },
      { type: 'list', items: ['Whey post-entreno: sí tiene lógica si buscas un pico rápido de leucina para activar mTOR', 'Caseína antes de dormir: modesta ventaja en retención de nitrógeno nocturna (diferencia real ~5%)', 'Whey a cualquier hora del día: perfectamente válido como fuente proteica general', 'Caseína como snack: más saciante, útil en déficit calórico'] },
      { type: 'h2', content: 'La combinación que sí tiene sentido' },
      { type: 'paragraph', content: 'Si el presupuesto es limitado, el whey es la opción más versátil. Si puedes permitirte ambas, una pequeña dosis de caseína (20-30 g) antes de dormir junto a un contexto de alto volumen de entrenamiento podría aportar algo de ventaja marginal en recuperación nocturna.' },
      { type: 'callout', label: 'Takeaway práctico', content: 'Lo que realmente importa es tu ingesta proteica total del día (1.6-2.2 g/kg de peso corporal). Si llegas a ese número con cualquier fuente de proteína completa, el tipo de proteína específica tiene impacto marginal en los resultados.' },
      { type: 'h2', content: 'El veredicto práctico' },
      { type: 'paragraph', content: 'Elige el sabor que más te guste y el que mejor se adapte a tu presupuesto. Asegúrate de alcanzar tu objetivo proteico diario. Todo lo demás es ruido de marketing.' },
    ],
  },

  /* ══════════════════════════════════════════════════════════════════════
     3. PRE-WORKOUT SIN CRASH
  ══════════════════════════════════════════════════════════════════════ */
  {
    slug: 'pre-workout-sin-crash',
    title: 'Cómo Elegir un Pre-Workout Sin el Crash Post-Entreno',
    category: 'Energía',
    categoryValue: 'energia',
    excerpt: 'Los picos de cafeína son el problema, no la cafeína en sí. Aquí está el sistema correcto.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1400&auto=format&fit=crop',
    author: 'Dr. Marcos Villanueva',
    authorRole: 'Director de Formulación',
    authorInitial: 'M',
    date: '10 Feb 2026',
    readTime: '6 min',
    tags: ['Pre-Workout', 'Cafeína', 'Energía', 'Rendimiento'],
    toc: ['El problema real con los pre-workouts modernos', '¿Qué produce el crash?', 'Los ingredientes que importan', 'La dosis correcta de cafeína', 'Ingredientes trampa que evitar'],
    relatedSlugs: ['sleep-recuperacion-muscular', 'creatina-guia-definitiva-2026', 'zinc-magnesio-testosterona'],
    body: [
      { type: 'paragraph', content: 'El mercado de pre-workouts está lleno de productos que te prometen energía extrema y rendimiento sobrehumano. La mayoría funcionan durante los primeros 45 minutos y te dejan peor que antes una hora después. Eso no es un bug, es una consecuencia directa de cómo están formulados.' },
      { type: 'h2', content: 'El problema real con los pre-workouts modernos' },
      { type: 'paragraph', content: 'La industria ha optimizado para la percepción inmediata, no para el rendimiento sostenido. Un producto que te da un hormigueo intenso, te hace sentir invencible en los primeros 20 minutos y te genera dependencia psicológica vende mejor que uno que simplemente funciona durante las 2 horas que dura tu entrenamiento.' },
      { type: 'h2', content: '¿Qué produce el crash?' },
      { type: 'paragraph', content: 'El crash post-cafeína tiene dos causas principales: una dosis demasiado alta que sobrepasa tu tolerancia y una absorción demasiado rápida que genera un pico y caída aguda en los niveles plasmáticos. Añade azúcares rápidos a la mezcla (presentes en muchos pre-workouts) y tienes el combo perfecto para un crash a los 90 minutos.' },
      { type: 'highlight', content: 'La cafeína en sí no causa el crash. La manera en que se formula y la dosis son el problema. Con la formulación correcta, la cafeína puede proporcionar energía estable durante 4-6 horas sin caída brusca.' },
      { type: 'h2', content: 'Los ingredientes que importan' },
      { type: 'list', items: ['Cafeína anhidra (3-6 mg/kg): el gold standard, bien dosificada', 'L-Teanina (2:1 con cafeína): suaviza los picos y reduce la ansiedad', 'L-Citrulina (6-8 g): vasodilatación real, no parestesia de beta-alanina', 'Creatina monohidratada (3-5 g): sí, en un pre-workout tiene sentido', 'Tirosina (1-2 g): soporte cognitivo y de dopamina bajo estrés'] },
      { type: 'h2', content: 'La dosis correcta de cafeína' },
      { type: 'paragraph', content: 'La dosis efectiva mínima de cafeína es 3 mg/kg de peso corporal. Para una persona de 80 kg, son 240 mg. Más de 6 mg/kg aumenta el riesgo de efectos adversos sin aportar beneficios adicionales de rendimiento. Muchos pre-workouts del mercado contienen 300-400 mg en una sola dosis, lo que es excesivo para la mayoría de personas.' },
      { type: 'warning', label: 'Tolerancia a la cafeína', content: 'Si eres consumidor habitual de café (2+ tazas diarias), considera reducir el consumo de cafeína las 48 horas antes de tomar un pre-workout para restablecer la sensibilidad a sus efectos ergogénicos.' },
      { type: 'h2', content: 'Ingredientes trampa que evitar' },
      { type: 'list', items: ['Beta-alanina en dosis altas: el hormigueo (parestesia) no indica que "funciona", es solo irritación nerviosa', 'Matriz propietaria sin dosis individuales: opacidad que esconde underdosing', 'Azúcares añadidos o dextrosa: favorecen el crash glucémico', 'Niacina en dosis altas: provoca el "flush" que muchos confunden con efecto del pre-workout'] },
      { type: 'callout', label: 'Protocolo recomendado', content: 'Toma tu pre-workout 20-30 minutos antes del entrenamiento, con el estómago semi-vacío. Hidrátate bien (la cafeína es diurética). Evita tomarlo después de las 14:00 si entrenas por la tarde y quieres dormir bien esa noche.' },
    ],
  },

  /* ══════════════════════════════════════════════════════════════════════
     4. VENTANA ANABÓLICA — MITO
  ══════════════════════════════════════════════════════════════════════ */
  {
    slug: 'ventana-anabolica-mito',
    title: 'La "Ventana Anabólica": Mito vs. Realidad en 2026',
    category: 'Entrenamiento',
    categoryValue: 'entrenamiento',
    excerpt: '¿Tienes realmente 30 minutos para tomar proteína después de entrenar? La respuesta te va a sorprender.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1400&auto=format&fit=crop',
    author: 'Lic. Diego Ferreira',
    authorRole: 'Especialista en Rendimiento',
    authorInitial: 'D',
    date: '5 Feb 2026',
    readTime: '7 min',
    tags: ['Entrenamiento', 'Nutrición Deportiva', 'Síntesis Proteica'],
    toc: ['El origen del mito', 'Lo que dice la evidencia actual', 'Cuándo SÍ importa el timing', 'La regla práctica que funciona', '¿Y los carbohidratos post-entreno?'],
    relatedSlugs: ['proteina-whey-vs-caseina', 'sleep-recuperacion-muscular', 'carga-carbohidratos-protocolo'],
    body: [
      { type: 'paragraph', content: 'Durante más de una década, la industria del fitness ha vivido obsesionada con la "ventana anabólica": esa ventana de 30-45 minutos post-entrenamiento durante la cual, supuestamente, tienes que consumir proteína y carbohidratos o perder gran parte de los beneficios de tu sesión. Es uno de los conceptos más repetidos y, en su forma más extrema, uno de los más exagerados.' },
      { type: 'h2', content: 'El origen del mito' },
      { type: 'paragraph', content: 'La idea proviene de estudios de los años 90 que observaron que la síntesis proteica muscular (MPS) se elevaba significativamente después del ejercicio y que la nutrición peri-entrenamiento podía potenciarla. El problema fue la extrapolación: de "la nutrición post-entrenamiento es importante" se pasó a "tienes exactamente 30 minutos o pierdes todo".' },
      { type: 'h2', content: 'Lo que dice la evidencia actual' },
      { type: 'paragraph', content: 'La investigación más reciente, incluyendo los trabajos de Brad Schoenfeld (probablemente el investigador más citado en ciencia del ejercicio aplicada), muestra que la síntesis proteica muscular permanece elevada entre 24 y 48 horas después de una sesión de entrenamiento de fuerza. Eso no es una ventana de 30 minutos. Es una ventana de un día o más.' },
      { type: 'highlight', content: 'Un meta-análisis de 2013 que analizó 23 estudios encontró que el efecto del timing nutricional, cuando se controla la ingesta proteica total del día, es mínimo o no significativo en la mayoría de los casos.' },
      { type: 'paragraph', content: 'Lo que realmente importa es tu ingesta proteica total a lo largo del día (distribuida en 3-5 comidas con al menos 20-40 g de proteína de alta calidad cada una) y tu ingesta calórica total en relación con tus objetivos.' },
      { type: 'h2', content: 'Cuándo SÍ importa el timing' },
      { type: 'paragraph', content: 'El timing nutricional sí tiene relevancia en contextos específicos que la investigación ha validado.' },
      { type: 'list', items: ['Entrenas en ayunas o más de 5 horas después de tu última comida', 'Realizas sesiones dobles en el mismo día y necesitas maximizar la recuperación entre ellas', 'Eres atleta de élite con alta demanda de volumen y el margen de optimización importa', 'Eres principiante total: en este caso todo tiene mayor impacto relativo'] },
      { type: 'warning', label: 'No confundas marginal con inexistente', content: 'Una ventaja del 2-3% en síntesis proteica por el timing puede ser irrelevante para alguien que entrena 3 días a la semana, pero puede ser significativa para un atleta profesional. El contexto importa.' },
      { type: 'h2', content: 'La regla práctica que funciona' },
      { type: 'paragraph', content: 'En lugar de obsesionarte con los 30 minutos post-entreno, asegúrate de tener una comida con proteína completa dentro de las 2 horas antes o después de tu entrenamiento. Eso es suficiente para la inmensa mayoría de practicantes recreativos y semi-competitivos.' },
      { type: 'h2', content: '¿Y los carbohidratos post-entreno?' },
      { type: 'paragraph', content: 'La resíntesis de glucógeno muscular tiene mayor urgencia que la síntesis proteica en deportes de resistencia o cuando haces dos sesiones al día. Para quien entrena fuerza una vez al día, la reposición de glucógeno en las horas siguientes es completamente suficiente.' },
      { type: 'callout', label: 'La conclusión práctica', content: 'Deja de mirarte el reloj. Come bien durante el día, llega a tu objetivo proteico y calórico, y entrena duro. Eso moverá la aguja mucho más que cronometrar tu batido post-entreno.' },
    ],
  },

  /* ══════════════════════════════════════════════════════════════════════
     5. SUEÑO Y RECUPERACIÓN MUSCULAR
  ══════════════════════════════════════════════════════════════════════ */
  {
    slug: 'sleep-recuperacion-muscular',
    title: 'Por Qué el Sueño es el Suplemento Más Poderoso que Existe',
    category: 'Recuperación',
    categoryValue: 'recuperacion',
    excerpt: 'Sin 7-9 horas de sueño de calidad, ningún suplemento, por caro que sea, va a optimizar tu recuperación. La ciencia del sueño aplicada al atleta moderno.',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1400&auto=format&fit=crop',
    author: 'Lic. Andrea Solís',
    authorRole: 'Nutricionista Deportiva',
    authorInitial: 'A',
    date: '28 Ene 2026',
    readTime: '10 min',
    tags: ['Recuperación', 'Sueño', 'Hormona de Crecimiento', 'Cortisol'],
    toc: ['Lo que ocurre en tu cuerpo mientras duermes', 'El precio de la privación de sueño', 'Cuánto necesitas realmente', 'Protocolos para mejorar la calidad del sueño', 'Suplementos que sí tienen evidencia'],
    relatedSlugs: ['zinc-magnesio-testosterona', 'pre-workout-sin-crash', 'ventana-anabolica-mito'],
    body: [
      { type: 'paragraph', content: 'Puedes tomar la pila de suplementos más cara y sofisticada del mercado, seguir el programa de entrenamiento más avanzado y comer de manera perfectamente optimizada. Si duermes mal, estás construyendo sobre arena. El sueño no es un complemento de la recuperación. Es su cimiento.' },
      { type: 'h2', content: 'Lo que ocurre en tu cuerpo mientras duermes' },
      { type: 'paragraph', content: 'El sueño no es un estado pasivo de inconsciencia. Es el período de mayor actividad anabólica de tu ciclo de 24 horas. Durante el sueño de ondas lentas (fases 3 y 4), la hipófisis libera entre el 60% y el 70% de la hormona de crecimiento diaria total. Esta hormona estimula directamente la síntesis proteica, la lipólisis y la reparación de tejidos musculares dañados por el entrenamiento.' },
      { type: 'paragraph', content: 'Al mismo tiempo, el cortisol (la hormona catabólica que destruye tejido muscular en exceso) alcanza sus niveles más bajos durante la madrugada y comienza a subir hacia el amanecer para preparar el cuerpo para el despertar. Una noche de sueño insuficiente interrumpe este patrón y eleva el cortisol durante más horas.' },
      { type: 'highlight', content: 'Un estudio de la Universidad de Chicago encontró que sujetos que durmieron 5.5 horas durante 2 semanas perdieron un 60% menos de grasa y un 60% más de masa muscular en comparación con el grupo que durmió 8.5 horas, con la misma dieta y entrenamiento.' },
      { type: 'h2', content: 'El precio de la privación de sueño' },
      { type: 'paragraph', content: 'Después de 24 horas sin dormir, los niveles de testosterona caen entre un 10% y un 15%. Después de una semana durmiendo menos de 5 horas, la caída puede ser del 10-15% adicional. En términos de rendimiento: mayor percepción del esfuerzo, peor toma de decisiones en el deporte, mayor tiempo de reacción, mayor riesgo de lesión y menor capacidad de síntesis proteica.' },
      { type: 'h2', content: 'Cuánto necesitas realmente' },
      { type: 'paragraph', content: 'El rango de 7-9 horas aplica a la mayoría de adultos. Los atletas en períodos de alto volumen de entrenamiento pueden necesitar 9-10 horas. Los estudios en jugadores de baloncesto de la NBA y nadadores de élite han mostrado mejoras de rendimiento significativas simplemente aumentando el tiempo de sueño de 6-7 a 8-10 horas.' },
      { type: 'warning', label: 'El "compensar" el fin de semana no funciona', content: 'La deuda de sueño acumulada durante la semana no se cancela completamente durmiendo 10-12 horas el sábado. Algunos parámetros cognitivos y metabólicos pueden tardar más de una semana de sueño normal en recuperarse.' },
      { type: 'h2', content: 'Protocolos para mejorar la calidad del sueño' },
      { type: 'list', items: ['Temperatura ambiente: 18-19°C es el rango óptimo para el sueño profundo', 'Oscuridad total: la exposición a luz artificial reduce la melatonina hasta un 50%', 'Consistencia de horario: acostarse y levantarse a la misma hora todos los días, incluido fin de semana', 'Eliminar pantallas 60-90 min antes de dormir (o usar filtros de luz azul)', 'Evitar cafeína después de las 14:00 si duermes a las 22:30-23:00', 'Temperatura corporal: un baño o ducha caliente 1-2 horas antes favorece la bajada de temperatura post-baño que induce el sueño'] },
      { type: 'h2', content: 'Suplementos que sí tienen evidencia' },
      { type: 'paragraph', content: 'Una vez optimizados los comportamientos, estos suplementos tienen evidencia de calidad razonable para mejorar la calidad del sueño:' },
      { type: 'list', items: ['Magnesio glicinato (200-400 mg): mejora el sueño profundo y reduce el cortisol nocturno', 'Ashwagandha (300-600 mg de KSM-66): reduce la latencia del sueño y mejora la calidad subjetiva', 'L-Teanina (200-400 mg): favorece la relajación sin sedación, reduce el tiempo en dormirse', 'Melatonina (0.5-1 mg): útil para regular el ciclo circadiano, no como sedante'] },
      { type: 'callout', label: 'Prioridad número uno', content: 'Antes de comprar cualquier suplemento de recuperación, evalúa honestamente tu sueño. Si duermes menos de 7 horas consistentemente, ningún stack de recuperación compensará ese déficit. Empieza por lo fundamental.' },
    ],
  },

  /* ══════════════════════════════════════════════════════════════════════
     6. ZINC Y MAGNESIO — TESTOSTERONA
  ══════════════════════════════════════════════════════════════════════ */
  {
    slug: 'zinc-magnesio-testosterona',
    title: 'Zinc y Magnesio: El Dúo Olvidado que Afecta tu Testosterona',
    category: 'Suplementación',
    categoryValue: 'suplementacion',
    excerpt: 'La deficiencia de estos dos micronutrientes es más común de lo que crees, especialmente en atletas. Y las consecuencias en hormonas y sueño son medibles.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1400&auto=format&fit=crop',
    author: 'Dr. Marcos Villanueva',
    authorRole: 'Director de Formulación',
    authorInitial: 'M',
    date: '22 Ene 2026',
    readTime: '9 min',
    tags: ['Zinc', 'Magnesio', 'Testosterona', 'Micronutrientes'],
    toc: ['Por qué los atletas son más propensos a la deficiencia', 'El rol del zinc en la testosterona', 'Magnesio: el mineral de 300 procesos', 'Cómo saber si tienes deficiencia', 'Formas y dosis que funcionan'],
    relatedSlugs: ['sleep-recuperacion-muscular', 'creatina-guia-definitiva-2026', 'pre-workout-sin-crash'],
    body: [
      { type: 'paragraph', content: 'Existe una categoría entera de suplementos que produce beneficios reales sin el marketing agresivo de los best-sellers. El zinc y el magnesio están en esa categoría. No generan sensaciones inmediatas ni efectos espectaculares visibles en semanas. Pero su deficiencia suprime silenciosamente la testosterona, deteriora el sueño y compromete la recuperación de maneras que puedes medir si sabes dónde buscar.' },
      { type: 'h2', content: 'Por qué los atletas son más propensos a la deficiencia' },
      { type: 'paragraph', content: 'El ejercicio intenso aumenta la excreción de zinc y magnesio a través del sudor y la orina. Un estudio en atletas de resistencia encontró que el 43% mostraba niveles subóptimos de zinc. Para el magnesio, estudios en deportistas de fuerza reportan deficiencia en hasta el 60% de los casos cuando se mide intracelularmente (el análisis sérico estándar subestima la deficiencia porque el cuerpo prioriza mantener los niveles en sangre a expensas del magnesio intracelular).' },
      { type: 'h2', content: 'El rol del zinc en la testosterona' },
      { type: 'paragraph', content: 'El zinc es cofactor esencial de la enzima que convierte el colesterol en testosterona. También inhibe la aromatasa (la enzima que convierte testosterona en estrógeno). La deficiencia de zinc reduce directamente los niveles de testosterona libre: un estudio clínico clásico mostró que 20 semanas de restricción de zinc en hombres jóvenes redujo la testosterona a niveles similares a los de hombres de 70 años.' },
      { type: 'highlight', content: 'La suplementación con zinc en personas con deficiencia documentada puede restaurar los niveles de testosterona al rango normal. En personas sin deficiencia, el efecto es mínimo. Esta distinción es crucial: el zinc no es un booster de testosterona; es un corrector de deficiencias.' },
      { type: 'h2', content: 'Magnesio: el mineral de 300 procesos' },
      { type: 'paragraph', content: 'El magnesio participa como cofactor en más de 300 reacciones enzimáticas, incluyendo la síntesis de ATP, la regulación del calcio intracelular, la función neuromuscular y la síntesis proteica. Su deficiencia se manifiesta como calambres musculares, calidad de sueño reducida, mayor fatiga percibida y elevación del cortisol basal.' },
      { type: 'paragraph', content: 'Un meta-análisis de 2021 encontró que la suplementación con magnesio mejoraba significativamente los niveles de testosterona en atletas con deficiencia, con mayor efecto en aquellos con mayor déficit inicial.' },
      { type: 'h2', content: 'Cómo saber si tienes deficiencia' },
      { type: 'list', items: ['Analítica de zinc sérico: <70 mcg/dL indica deficiencia probable', 'RBC magnesio (eritrocitos): más preciso que el magnesio sérico para detectar déficits intracelulares', 'Síntomas orientativos de magnesio bajo: calambres nocturnos, insomnio, irritabilidad, fatiga persistente', 'Síntomas orientativos de zinc bajo: cicatrización lenta, alteraciones en gusto/olfato, mayor susceptibilidad a infecciones'] },
      { type: 'warning', label: 'Consulta antes de suplementar', content: 'Si sospechas deficiencia, lo correcto es hacer una analítica antes de suplementar. El zinc en exceso interfiere con la absorción de cobre. No tomes dosis altas de zinc sin supervisión.' },
      { type: 'h2', content: 'Formas y dosis que funcionan' },
      { type: 'list', items: ['Zinc: bisglicinato o gluconato (mejor absorción que el óxido), 15-30 mg/día con comida', 'Magnesio: glicinato o malato (mejor tolerancia gastrointestinal que el citrato o el óxido), 200-400 mg/día en la noche', 'ZMA (zinc + magnesio + B6): la formulación clásica, tomar 30-60 min antes de dormir, fuera de las comidas'] },
      { type: 'callout', label: 'La clave', content: 'El zinc y el magnesio no son suplementos para personas que ya están optimizadas. Son el punto de partida obligatorio para cualquier atleta que entrena con frecuencia alta. Corregir deficiencias básicas antes de añadir suplementos de rendimiento más sofisticados.' },
    ],
  },

  /* ══════════════════════════════════════════════════════════════════════
     7. CARGA DE CARBOHIDRATOS
  ══════════════════════════════════════════════════════════════════════ */
  {
    slug: 'carga-carbohidratos-protocolo',
    title: 'Protocolo de Carga de Carbohidratos para Competencia',
    category: 'Nutrición',
    categoryValue: 'nutricion',
    excerpt: 'Guía práctica de 7 días para maximizar el glucógeno muscular sin retención excesiva de agua.',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1400&auto=format&fit=crop',
    author: 'Lic. Andrea Solís',
    authorRole: 'Nutricionista Deportiva',
    authorInitial: 'A',
    date: '18 Ene 2026',
    readTime: '11 min',
    tags: ['Nutrición', 'Carbohidratos', 'Competencia', 'Glucógeno'],
    toc: ['Qué es la carga y para quién aplica', 'La fisiología del glucógeno muscular', 'Protocolo moderno de 7 días', 'Los errores más comunes', 'El día de la competencia'],
    relatedSlugs: ['proteina-whey-vs-caseina', 'ventana-anabolica-mito', 'sleep-recuperacion-muscular'],
    body: [
      { type: 'paragraph', content: 'La carga de carbohidratos es una de las estrategias nutricionales con mayor evidencia en deportes de resistencia. Sin embargo, el concepto ha sido malinterpretado, mal ejecutado y mal aplicado por generaciones de atletas que terminan el día anterior a la competencia hinchados, pesados y peor que si no hubieran hecho nada.' },
      { type: 'h2', content: 'Qué es la carga y para quién aplica' },
      { type: 'paragraph', content: 'La carga de carbohidratos consiste en manipular la dieta y el entrenamiento en los días previos a una competencia para maximizar las reservas de glucógeno muscular y hepático. El glucógeno es el combustible principal en ejercicios de intensidad media-alta (>70% VO2max), y su depleción está directamente relacionada con la fatiga y el famoso "golpe del muro" en eventos de resistencia.' },
      { type: 'warning', label: 'Para quién NO aplica', content: 'Si tu evento dura menos de 60-75 minutos o no requiere esfuerzo continuo de alta intensidad (halterofilia, sprints, sports de equipo con muchas pausas), la carga de carbohidratos tiene escaso beneficio y puede perjudicarte por el peso extra del glucógeno hidratado.' },
      { type: 'h2', content: 'La fisiología del glucógeno muscular' },
      { type: 'paragraph', content: 'Cada gramo de glucógeno se almacena junto a ~3 gramos de agua. Una carga efectiva puede aumentar las reservas de glucógeno de los niveles basales (~80-100 mmol/kg músculo húmedo) hasta niveles supracompensados (~180-200 mmol/kg). Esto se traduce en un aumento de peso de 1-2 kg, lo que en atletas de resistencia es completamente irrelevante frente al beneficio energético.' },
      { type: 'highlight', content: 'En eventos de más de 90 minutos, la carga de carbohidratos puede mejorar el rendimiento entre un 2% y un 3%. En una maratón o triatlón, eso puede ser la diferencia entre un récord personal y una carrera promedio.' },
      { type: 'h2', content: 'Protocolo moderno de 7 días' },
      { type: 'paragraph', content: 'El protocolo clásico de depleción severa (3 días de dieta muy baja en carbohidratos + entrenamiento agotador) ha sido reemplazado por versiones más amables que consiguen niveles de glucógeno similares con menos estrés fisiológico.' },
      { type: 'list', items: ['Días 7-5 (3 días antes): carbohidratos normales (5-6 g/kg), entrenamiento de volumen moderado-alto para vaciar parcialmente los depósitos', 'Días 4-3: reducir volumen de entrenamiento al 40-50%, mantener carbohidratos en 6-7 g/kg', 'Días 2-1 (víspera): carbohidratos 8-12 g/kg, entrenamiento muy ligero o descanso, fuentes bajas en fibra y grasas para evitar molestias GI', 'Día de competencia: carbohidratos 1-4 g/kg las 1-4 horas previas al inicio, bien practicado en entrenamientos'] },
      { type: 'h2', content: 'Los errores más comunes' },
      { type: 'list', items: ['Introducir alimentos nuevos el día de la competencia: solo usa fuentes que ya has probado en entrenamientos', 'Exceso de fibra en las 24-48 horas previas: arroz blanco, pasta blanca y pan blanco son tus amigos en esos días', 'Comer demasiado la noche anterior hasta sentirte incómodo: no es necesario, el glucógeno ya estará cargado', 'No practicar el protocolo antes: el primer ensayo de carga nunca debe ser en competencia real'] },
      { type: 'h2', content: 'El día de la competencia' },
      { type: 'paragraph', content: 'Desayuno 3-4 horas antes: 1-2 g/kg de carbohidratos de fácil digestión + proteína moderada + poca grasa. Si el evento es por la mañana y el desayuno es a las 5-6 AM, opta por algo ligero que ya hayas probado: un par de tostadas con mermelada, plátano maduro, arroz con miel.' },
      { type: 'callout', label: 'Regla de oro', content: 'Nada nuevo el día de la competencia. La carga de carbohidratos debe haberse practicado al menos 2-3 veces en entrenamientos largos antes de aplicarla en un evento que importa.' },
    ],
  },

];

/* ─── HELPERS ──────────────────────────────────────────────────────────── */

/**
 * Busca un post por slug. Devuelve undefined si no existe,
 * lo que provoca notFound() en la page.
 */
export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

/**
 * Resuelve un array de slugs relacionados a objetos BlogPost completos,
 * filtrando silenciosamente cualquier slug que no exista en POSTS.
 */
export function getRelatedPosts(slugs: string[]): BlogPost[] {
  return slugs.map((s) => POSTS.find((p) => p.slug === s)).filter(Boolean) as BlogPost[];
}
