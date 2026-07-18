/* ═══════════════════════════════════════════════════════
   AMARUKI — Blog Data (artículos)
   ═══════════════════════════════════════════════════════
   Para agregar un nuevo artículo, solo agrega un objeto
   al array ARTICULOS con los campos requeridos.
   ═══════════════════════════════════════════════════════ */

const ARTICULOS = [
  {
    id: 'mindfulness-cotidiano',
    titulo: 'Mindfulness en la vida cotidiana: cómo empezar',
    extracto: 'La atención plena no requiere horas de meditación. Te comparto prácticas sencillas para incorporar mindfulness en tu día a día, desde que te despiertas hasta que te duermes.',
    fecha: '15 Julio, 2026',
    autor: 'Patricio Almendra',
    imagen: '', // placeholder: se muestra un gradiente
    tags: ['mindfulness', 'bienestar', 'práctica diaria'],
    contenido: `
      <p>Cuando escuchamos la palabra "mindfulness", a menudo imaginamos a alguien sentado en silencio durante horas, con la mente completamente en blanco. Esta imagen, aunque romántica, puede resultar intimidante y poco realista para quienes intentamos incorporar esta práctica en nuestras vidas ocupadas.</p>

      <p>La buena noticia es que el mindfulness no requiere un cojín de meditación especial ni una habitación silenciosa. Se trata, fundamentalmente, de <strong>prestar atención al momento presente con intención y sin juicio</strong>. Y esto podemos hacerlo en cualquier momento y lugar.</p>

      <h2>¿Por qué mindfulness?</h2>
      <p>Vivimos en un mundo que nos empuja constantemente hacia el futuro (planificando, preocupándonos) o hacia el pasado (rumiando, arrepintiéndonos). El mindfulness nos ancla en el único momento que realmente existe: el ahora.</p>

      <p>Los beneficios están respaldados por la ciencia: reducción de estrés y ansiedad, mejora en la calidad del sueño, mayor claridad mental, regulación emocional y una sensación general de bienestar.</p>

      <h2>Tres prácticas para empezar hoy</h2>

      <h3>1. El primer minuto del día</h3>
      <p>Antes de tomar el teléfono, antes de saltar de la cama, quédate un minuto. Siente el peso de tu cuerpo sobre el colchón. Escucha los sonidos a tu alrededor. Siente el aire entrando y saliendo de tus pulmones. Son solo 60 segundos, pero marcan la diferencia.</p>

      <h3>2. La pausa del café o té</h3>
      <p>Cuando tomes tu próxima bebida caliente, no lo hagas mientras miras el teléfono o trabajas. Solo bebe. Siente la temperatura de la taza en tus manos. Observa el vapor. Percibe los sabores. Si tu mente se distrae (y lo hará), simplemente vuelve a traerla a la experiencia de beber.</p>

      <h3>3. El semáforo como recordatorio</h3>
      <p>Cada vez que te detengas en un semáforo, en lugar de impacientarte, úsalo como un recordatorio para respirar. Tres respiraciones conscientes. Eso es todo.</p>

      <h2>La clave: constancia, no perfección</h2>
      <p>No se trata de hacerlo perfecto. Se trata de volver, una y otra vez, con amabilidad. Cada vez que notas que tu mente se fue y la traes de regreso, estás fortaleciendo el músculo de la atención. Y eso, con el tiempo, transforma tu relación con la vida.</p>

      <blockquote><p>"Mindfulness no es vaciar la mente, es darse cuenta de lo que ya está ahí, con amabilidad y curiosidad."</p></blockquote>
    `,
  },
  {
    id: 'terapia-transpersonal',
    titulo: '¿Qué es la Terapia Transpersonal y cómo puede ayudarte?',
    extracto: 'Más allá de los síntomas y los diagnósticos, la terapia transpersonal te invita a conectar con tu esencia, tu propósito y tu dimensión más profunda como ser humano.',
    fecha: '8 Julio, 2026',
    autor: 'Patricio Almendra',
    imagen: '',
    tags: ['terapia transpersonal', 'crecimiento', 'autoconocimiento'],
    contenido: `
      <p>La Terapia Transpersonal es un enfoque psicológico que va más allá (trans) de la persona (personal). Mientras que otras corrientes se centran en aliviar síntomas o resolver conflictos del pasado, la terapia transpersonal integra estas dimensiones con algo más: <strong>la conexión con tu ser esencial, tu propósito y tu dimensión espiritual o trascendente</strong>.</p>

      <h2>¿Qué la hace diferente?</h2>
      <p>La psicología tradicional tiende a mirar a la persona desde sus carencias, sus síntomas o sus diagnósticos. La transpersonal, sin ignorar estos aspectos, también reconoce el potencial innato de cada ser humano para la sanación, la expansión de la conciencia y la autorrealización.</p>

      <p>No se trata de "arreglar" algo que está mal, sino de recordar y reconectar con la totalidad de quien eres.</p>

      <h2>¿Para quién es?</h2>
      <p>La terapia transpersonal es para ti si:</p>
      <ul>
        <li>Sientes que hay algo más en la vida que lo que ves en la superficie</li>
        <li>Has pasado por terapias convencionales y sientes que no abordaron algo profundo</li>
        <li>Estás pasando por una crisis existencial o espiritual</li>
        <li>Buscas un sentido más profundo a tu vida</li>
        <li>Quieres sanar heridas emocionales desde una mirada integral</li>
        <li>Sientes una llamada a conocerte más allá de tus roles y máscaras</li>
      </ul>

      <h2>¿Cómo es una sesión?</h2>
      <p>Cada proceso es único, pero generalmente integramos herramientas de diversas corrientes según lo que necesites en cada momento: diálogo abierto, exploración de creencias, trabajo corporal, visualizaciones guiadas, meditación, trabajo con sueños, entre otras.</p>

      <p>El objetivo no es que te conviertas en alguien nuevo, sino que <strong>recuerdes la totalidad de quien siempre has sido</strong>.</p>

      <blockquote><p>"No se trata de llegar a ser alguien mejor, sino de deshacer todo lo que te impide ser quien ya eres."</p></blockquote>

      <p>Si sientes que este enfoque resuena contigo, te invito a una sesión exploratoria gratuita. Conversamos, resuelvo tus dudas y, si sientes que es el momento, comenzamos tu proceso.</p>
    `,
  },
  {
    id: 'gestion-ansiedad',
    titulo: '5 herramientas para gestionar la ansiedad en momentos difíciles',
    extracto: 'La ansiedad no es tu enemiga. Aprende a reconocerla, acogerla y transformarla con estas herramientas prácticas basadas en mindfulness y PNL.',
    fecha: '1 Julio, 2026',
    autor: 'Patricio Almendra',
    imagen: '',
    tags: ['ansiedad', 'mindfulness', 'PNL', 'herramientas'],
    contenido: `
      <p>La ansiedad es una de las experiencias más comunes en el mundo actual. Antes de ver cómo gestionarla, quiero invitarte a mirarla de una manera distinta: <strong>la ansiedad no es tu enemiga</strong>. Es una señal de tu sistema nervioso intentando protegerte. El problema no es la ansiedad en sí misma, sino nuestra relación con ella.</p>

      <p>Cuando aprendemos a relacionarnos con la ansiedad desde la comprensión y no desde el miedo, podemos transformarla.</p>

      <h2>1. Anclaje al presente (5-4-3-2-1)</h2>
      <p>Cuando la ansiedad aparece, tu mente se va al futuro (escenarios catastróficos). Tráela de vuelta al ahora con este ejercicio sensorial:</p>
      <ul>
        <li><strong>5</strong> cosas que puedas ver a tu alrededor</li>
        <li><strong>4</strong> cosas que puedas tocar</li>
        <li><strong>3</strong> sonidos que puedas escuchar</li>
        <li><strong>2</strong> olores que puedas percibir</li>
        <li><strong>1</strong> cosa que puedas saborear</li>
      </ul>
      <p>En 60 segundos, este ejercicio activa tu sistema nervioso parasimpático y te devuelve al presente.</p>

      <h2>2. Respiración 4-7-8</h2>
      <p>Conocida como la "respiración relajante", esta técnica es especialmente útil para momentos de ansiedad intensa:</p>
      <ul>
        <li>Inhala por la nariz contando hasta <strong>4</strong></li>
        <li>Sostén la respiración contando hasta <strong>7</strong></li>
        <li>Exhala lentamente por la boca contando hasta <strong>8</strong></li>
      </ul>
      <p>Repite 3-4 veces. Esta respiración activa el nervio vago y le envía una señal de calma a todo tu sistema.</p>

      <h2>3. Reestructuración de pensamientos (PNL)</h2>
      <p>La PNL nos enseña que no son los eventos los que determinan cómo nos sentimos, sino el significado que les damos. Cuando notes pensamientos ansiosos, pregúntate:</p>
      <ul>
        <li>"¿Este pensamiento es un hecho o una interpretación?"</li>
        <li>"¿Qué evidencia tengo de que esto realmente va a pasar?"</li>
        <li>"¿Hay otras formas de ver esta situación?"</li>
        <li>"¿Qué le diría a un amigo que estuviera pasando por esto?"</li>
      </ul>

      <h2>4. Movimiento consciente</h2>
      <p>La ansiedad es energía en el cuerpo. En lugar de intentar calmarte forzadamente, permite que esa energía se mueva. Camina, estírate, baila, sacude el cuerpo. El movimiento consciente ayuda a procesar y liberar la tensión acumulada.</p>

      <h2>5. La pregunta del observador</h2>
      <p>Finalmente, una de las herramientas más poderosas: date cuenta de que <strong>tú no eres tu ansiedad</strong>. Eres el observador de la ansiedad. Hay una parte de ti que puede notar "estoy sintiendo ansiedad" sin fundirse con ella. Esa parte es tu conciencia, y desde ahí tienes más libertad de la que crees.</p>

      <blockquote><p>"No puedes detener las olas, pero puedes aprender a surfear." — Jon Kabat-Zinn</p></blockquote>

      <p>Si la ansiedad está afectando tu calidad de vida, recuerda que no tienes que enfrentarlo solo. Una terapia puede darte un espacio seguro para entenderla y transformarla.</p>
    `,
  },
  {
    id: 'sueño-reparador',
    titulo: 'Cómo mejorar tu sueño de forma natural',
    extracto: 'Dormir bien no es un lujo, es una necesidad. Te comparto hábitos y prácticas para recuperar un sueño reparador sin recurrir a medicamentos.',
    fecha: '24 Junio, 2026',
    autor: 'Patricio Almendra',
    imagen: '',
    tags: ['sueño', 'bienestar', 'rutina', 'salud'],
    contenido: `
      <p>Dormir bien es uno de los pilares fundamentales de nuestra salud física, mental y emocional. Sin embargo, para muchas personas, el sueño reparador se ha vuelto esquivo. Las pantallas, el estrés y las preocupaciones nos mantienen en un estado de alerta que no nos permite descansar profundamente.</p>

      <p>La buena noticia es que hay muchas cosas que podemos hacer para recuperar un sueño saludable, sin recurrir a soluciones farmacológicas.</p>

      <h2>La hora dorada: 60 minutos antes de dormir</h2>
      <p>Lo que haces en la hora previa a acostarte determina en gran medida la calidad de tu sueño. Crea una rutina que le indique a tu cerebro que es momento de desconectar:</p>
      <ul>
        <li><strong>Pantallas fuera:</strong> La luz azul de los dispositivos suprime la melatonina. Apaga teléfonos, tablets y computadores al menos 30 minutos antes de dormir.</li>
        <li><strong>Luz tenue:</strong> Reduce la intensidad de las luces de tu hogar. Una luz cálida y tenue prepara tu sistema nervioso para el descanso.</li>
        <li><strong>Temperatura fresca:</strong> La temperatura ideal para dormir está entre 18-21°C. Un ambiente fresco favorece el sueño profundo.</li>
      </ul>

      <h2>Mindfulness antes de dormir</h2>
      <p>Una práctica sencilla que puedes hacer ya acostado: lleva tu atención a diferentes partes de tu cuerpo, desde los pies hasta la cabeza, y conscientemente relájalas. Este "escáner corporal" es una de las técnicas más efectivas para conciliar el sueño.</p>

      <h2>El diario de preocupaciones</h2>
      <p>Si tu mente no deja de pensar en todo lo que tienes que hacer, mantén un cuaderno al lado de tu cama. Antes de dormir, escribe todo lo que te preocupa. Al ponerlo en papel, le dices a tu cerebro que ya está "archivado" y puede soltarlo hasta mañana.</p>

      <h2>Qué evitar</h2>
      <ul>
        <li><strong>Cafeína después de las 3 PM:</strong> Su vida media es de 5-6 horas, así que un café a las 4 PM aún está activo a las 10 PM.</li>
        <li><strong>Comidas pesadas cerca de la hora de dormir:</strong> La digestión compite con el sueño.</li>
        <li><strong>Ejercicio intenso en la noche:</strong> El ejercicio matutino o vespertino es mejor para el sueño que el nocturno.</li>
        <li><strong>Mirar el reloj:</strong> Contar las horas que faltan para despertar solo genera más ansiedad.</li>
      </ul>

      <p>Recuerda: una mala noche no es una catástrofe. Todas las personas tienen noches de sueño irregular. Lo importante son los patrones a largo plazo. Si los problemas de sueño persisten, puede ser útil explorar si hay aspectos emocionales o de estrés que están interfiriendo.</p>
    `,
  },
  {
    id: 'gestalt-ahora',
    titulo: 'Terapia Gestalt: el poder del aquí y ahora',
    extracto: 'La Gestalt nos invita a dejar de vivir en el pasado o el futuro, y a encontrarnos con lo que realmente está sucediendo en este momento.',
    fecha: '17 Junio, 2026',
    autor: 'Patricio Almendra',
    imagen: '',
    tags: ['gestalt', 'terapia', 'conciencia', 'presente'],
    contenido: `
      <p>"El pasado ya fue, el futuro aún no llega, solo existe el ahora." Esta frase, que escuchamos tantas veces, es el corazón de la Terapia Gestalt. Pero, ¿qué significa realmente vivir en el presente y cómo puede esto sanarnos?</p>

      <h2>¿Qué es la Terapia Gestalt?</h2>
      <p>La Terapia Gestalt es un enfoque terapéutico vivencial y humanista que se centra en el <strong>darse cuenta</strong> (awareness). A diferencia de terapias que se enfocan en interpretar el pasado, la Gestalt trabaja con lo que está sucediendo en el momento presente: cómo te sientes, qué piensas, cómo respiras, qué gestos haces.</p>

      <p>Fue desarrollada por Fritz Perls en la década de 1950 y se basa en la idea de que <strong>la conciencia del presente, por sí misma, tiene un poder curativo</strong>.</p>

      <h2>Principios fundamentales</h2>

      <h3>El aquí y ahora</h3>
      <p>Todo lo que realmente existe es este momento. Cuando traemos al presente lo que nos pasó (a través del recuerdo, la emoción, la sensación corporal), podemos integrarlo y sanarlo. No se trata de ignorar el pasado, sino de traerlo al presente para trabajarlo.</p>

      <h3>La responsabilidad personal</h3>
      <p>La Gestalt nos invita a pasar de "me pasó" a "hago con esto". A reconocer nuestra capacidad de elegir cómo responder a las circunstancias, incluso cuando no podemos elegir las circunstancias mismas.</p>

      <h3>La conciencia corporal</h3>
      <p>El cuerpo no miente. Mientras nuestra mente puede engañarnos, el cuerpo siempre está hablando. Una tensión en los hombros, un nudo en el estómago, una respiración superficial — el cuerpo nos muestra lo que a veces no queremos ver.</p>

      <h2>¿Cómo es una sesión?</h2>
      <p>En una sesión de Gestalt, no te recostarás en un diván a hablar de tu infancia (a menos que eso surja). En cambio, trabajaremos con experimentos guiados: diálogos, juego de roles, exploración de sueños, trabajo con silla vacía, movimiento y conciencia corporal.</p>

      <p>Mi rol no es interpretar o darte respuestas, sino acompañarte para que <strong>te des cuenta por ti mismo</strong>. Porque lo que descubres por ti mismo tiene un poder que ninguna explicación externa puede igualar.</p>

      <blockquote><p>"No puedes hacer que el río fluya mejor, puedes simplemente dejar de interponerte en su camino y permitir que fluya naturalmente."</p></blockquote>

      <p>Si sientes que hay aspectos de tu vida donde te sientes "atorado", la Gestalt puede ofrecerte un camino para moverte, para darte cuenta y para elegir desde la conciencia, no desde el hábito.</p>
    `,
  },
  {
    id: 'sanar-heridas',
    titulo: 'Sanar las heridas de la infancia: un camino de regreso a ti',
    extracto: 'Nuestras experiencias tempranas moldean cómo nos relacionamos con nosotros mismos y con los demás. La buena noticia: podemos sanar.',
    fecha: '10 Junio, 2026',
    autor: 'Patricio Almendra',
    imagen: '',
    tags: ['sanación', 'infancia', 'heridas emocionales', 'terapia regresiva'],
    contenido: `
      <p>Todos llevamos una historia. Y en esa historia, hay momentos que marcaron cómo aprendimos a relacionarnos con nosotros mismos, con los demás y con el mundo. Algunas de esas marcas son recuerdos amorosos que nos sostienen. Otras son heridas que, sin saberlo, seguimos cargando.</p>

      <p>Sanar las heridas de la infancia no significa borrar el pasado ni culpar a quienes nos criaron. Significa <strong>reconocer que algo dolió, darle un lugar y, desde el adulto que hoy eres, ofrecerte lo que necesitaste y no tuviste</strong>.</p>

      <h2>¿Qué son las heridas de la infancia?</h2>
      <p>Son patrones emocionales y de comportamiento que desarrollamos como mecanismos de adaptación en la infancia. Lo que en su momento fue una estrategia para sobrevivir emocionalmente, en la adultez puede convertirse en una limitación.</p>

      <p>Las heridas más comunes incluyen:</p>
      <ul>
        <li><strong>Herida de abandono:</strong> Miedo a quedarse solo, necesidad de aprobación, dificultad para estar con uno mismo.</li>
        <li><strong>Herida de rechazo:</strong> Sentirse no merecedor de amor, autocrítica constante, búsqueda de perfección.</li>
        <li><strong>Herida de humillación:</strong> Dificultad para expresar necesidades, sentirse pequeño o avergonzado de uno mismo.</li>
        <li><strong>Herida de traición:</strong> Desconfianza, control, miedo a la intimidad.</li>
        <li><strong>Herida de injusticia:</strong> Rigidez, exigencia, dificultad para disfrutar.</li>
      </ul>

      <h2>¿Cómo sanan estas heridas?</h2>
      <p>La sanación no es lineal, pero hay algunas etapas que suelen cruzarse en el camino:</p>

      <h3>1. Reconocimiento</h3>
      <p>El primer paso es darse cuenta: "esto que siento o hago tiene una historia". No para justificarlo, sino para comprenderlo con compasión.</p>

      <h3>2. Validación</h3>
      <p>Permitirte sentir lo que sentiste. Muchas veces minimizamos nuestro dolor: "no fue para tanto", "otros la pasaron peor". Tu dolor merece ser escuchado, sin comparaciones.</p>

      <h3>3. Reparación desde el adulto</h3>
      <p>Hoy eres adulto. Puedes darte lo que aquel niño o niña necesitaba: seguridad, contención, amor incondicional, permiso para ser.</p>

      <h3>4. Integración</h3>
      <p>La herida no desaparece, pero se transforma. Ya no es una fuente de dolor, sino una fuente de sabiduría. Te ha hecho quien eres.</p>

      <h2>Herramientas que pueden acompañar este proceso</h2>
      <p>En mi práctica, utilizo diversas herramientas para el trabajo con heridas de la infancia: la terapia regresiva para acceder a las memorias, la hipnosis terapéutica para trabajar con el niño interior, la Gestalt para integrar las emociones, y el mindfulness para cultivar la compasión hacia uno mismo.</p>

      <p>Si este tema resuena contigo, quiero que sepas que <strong>no tienes que hacer este camino solo</strong>. Un espacio terapéutico seguro puede ser el lugar donde finalmente esas heridas encuentren la escucha y la sanación que merecen.</p>

      <blockquote><p>"La sanación no es convertirte en alguien nuevo, sino reconciliarte con quien siempre has sido."</p></blockquote>
    `,
  },
];
