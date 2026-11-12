/**
 * GLOSARIO MAESTRO DE SÍMBOLOS Y NOTACIÓN FORMAL
 * Práctica Calificada 5 (CM2A1 - Cálculo Diferencial e Integral Avanzado)
 * Escuela Profesional de Matemática - Universidad Nacional de Ingeniería (UNI)
 *
 * Estructura de cada entrada:
 * - id: Identificador único (ej. 't1-omega')
 * - topic: 't1' | 't2' | 't3' | 't4' | 't5'
 * - topicName: Nombre legible del subtema
 * - symbol: Notación matemática formal en KaTeX (¡Cero '<' inválidos!)
 * - name: Nombre oficial en español
 * - reading: Cómo se lee en voz alta en clase
 * - simple: Explicación intuitiva y visual en cristiano
 * - action: Qué hacer y escribir en tu cuadernillo de examen UNI
 * - trap: Trampa común y errores frecuentes en PC5
 */

if (typeof window === 'undefined') {
  var window = (typeof globalThis !== 'undefined') ? globalThis : this;
}

window.PC5_GLOSSARY_TOPICS = {
  t1: {
    id: 't1',
    name: 'Subtema 1: Regiones Generales en R², Medibilidad Jordan y Fubini',
    shortName: 'Regiones Generales & Fubini',
    count: 13,
    icon: '📐'
  },
  t2: {
    id: 't2',
    name: 'Subtema 2: Cambio de Variables en R² y Coordenadas Polares',
    shortName: 'Cambio de Variables & Polares',
    count: 11,
    icon: '🔄'
  },
  t3: {
    id: 't3',
    name: 'Subtema 3: Integrales Triples en Cartesianas y Fubini en R³',
    shortName: 'Integrales Triples Cartesianas',
    count: 10,
    icon: '🧊'
  },
  t4: {
    id: 't4',
    name: 'Subtema 4: Coordenadas Cilíndricas y Esféricas en R³',
    shortName: 'Cilíndricas & Esféricas',
    count: 10,
    icon: '🌐'
  },
  t5: {
    id: 't5',
    name: 'Subtema 5: Integrales en Rⁿ, Medida Jordan y Aplicaciones Físicas',
    shortName: 'Integrales en Rⁿ & Física',
    count: 13,
    icon: '⚖️'
  }
};

window.PC5_GLOSSARY_DATA = [
  {
    "id": "t1-omega",
    "topic": "t1",
    "topicName": "Regiones Generales en R² y Medibilidad Jordan",
    "symbol": "$\\Omega \\subset \\mathbb{R}^2$",
    "name": "Región o dominio de integración en $\\mathbb{R}^2$",
    "reading": "Omega contenido en R dos",
    "simple": "Es la figura geométrica plana (círculo, polígono, pétalo o triángulo) sobre la cual vas a calcular área, masa o volumen bajo una superficie. No tiene por qué ser un simple rectángulo alineado con los ejes coordenados.",
    "action": "Dibuja de inmediato la región en el plano cartesiano $XY$. Iguala las ecuaciones de las curvas que la encierran para hallar los puntos de corte (vértices) y sombrea con líneas el interior.",
    "trap": "Olvidar verificar que $\\Omega$ sea un conjunto acotado. Las integrales dobles de Riemann estándar solo se definen sobre conjuntos acotados; si la región se extiende al infinito, se trata de una integral impropia que requiere límites."
  },
  {
    "id": "t1-partial-omega",
    "topic": "t1",
    "topicName": "Regiones Generales en R² y Medibilidad Jordan",
    "symbol": "$\\partial\\Omega$",
    "name": "Frontera o borde topológico de $\\Omega$",
    "reading": "Parcial de Omega (o frontera de Omega)",
    "simple": "El cerco perimetral que separa los puntos de adentro de los de afuera. En el plano suele estar compuesto por curvas suaves pegadas unas con otras (tramos de parábolas, rectas, arcos de circunferencia).",
    "action": "Escribe las ecuaciones explícitas de cada curva que conforma el borde (ej. $y = x^2$, $y = 4$, $x = 0$) para identificar los pisos, techos y paredes laterales de la integral.",
    "trap": "Confundir la frontera con el interior. La integral doble se calcula sobre todo el cuerpo de $\\Omega$, no sobre el contorno $\\partial\\Omega$ (que solo es un alambre de área cero)."
  },
  {
    "id": "t1-indicator",
    "topic": "t1",
    "topicName": "Regiones Generales en R² y Medibilidad Jordan",
    "symbol": "$\\mathbf{1}_\\Omega(x,y)$",
    "name": "Función indicatriz o característica",
    "reading": "Uno sub Omega de equis ye (o indicatriz de Omega)",
    "simple": "Es un interruptor binario: vale 1 si el punto $(x,y)$ está dentro de $\\Omega$, y vale 0 si está afuera. Permite extender la integral sobre cualquier forma extraña a un rectángulo grande contenedor.",
    "action": "Escribe $f_\\Omega(x,y) = f(x,y) \\mathbf{1}_\\Omega(x,y)$ cuando el profesor pida la definición formal de integral doble sobre regiones generales a partir de un rectángulo $B \\supset \\Omega$.",
    "trap": "Esta función es discontinua en toda la frontera $\\partial\\Omega$. Por ello, para que sea Riemann-integrable, el borde $\\partial\\Omega$ debe ser despreciable (contenido nulo)."
  },
  {
    "id": "t1-content-zero",
    "topic": "t1",
    "topicName": "Regiones Generales en R² y Medibilidad Jordan",
    "symbol": "$\\operatorname{cont}(\\partial\\Omega) = 0$",
    "name": "Contenido nulo (Jordan) de la frontera",
    "reading": "Contenido de la frontera de Omega igual a cero",
    "simple": "Significa que el borde perimetral es tan delgado y limpio que puede encerrarse dentro de una cantidad finita de rectangulitos cuya área sumada es menor que cualquier $\\varepsilon \\gt 0$. No tiene grosor ni fractales.",
    "action": "Cita en tu examen: 'Como la frontera $\\partial\\Omega$ es unión finita de curvas regulares $C^1$ (o grafos continuos), tiene contenido bidimensional nulo; por ende $\\Omega$ es Jordan-medible y $f$ es integrable'.",
    "trap": "Confundir contenido nulo con medida de Lebesgue cero. El contenido nulo exige un cubrimiento FINITO de rectángulos. Un conjunto numerable como $\\mathbb{Q} \\cap [0,1]$ tiene medida cero pero NO contenido nulo."
  },
  {
    "id": "t1-jordan-algebra",
    "topic": "t1",
    "topicName": "Regiones Generales en R² y Medibilidad Jordan",
    "symbol": "$\\mathcal{J}(\\mathbb{R}^2)$",
    "name": "Álgebra de conjuntos Jordan-medibles",
    "reading": "Jota de R dos (familia de conjuntos medibles según Jordan)",
    "simple": "Es la colección de todas las figuras del plano a las que se les puede medir un área matemática indiscutible sin paradojas, mediante aproximación con cuadrículas de rectángulos.",
    "action": "Si te piden 'Pruebe que $\\Omega \\in \\mathcal{J}(\\mathbb{R}^2)$', tu única tarea es demostrar rigurosamente que su frontera tiene contenido nulo: $\\operatorname{cont}(\\partial\\Omega) = 0$.",
    "trap": "El conjunto de puntos con coordenadas racionales en el cuadrado unitario $\\mathbb{Q}^2 \\cap [0,1]^2$ NO pertenece a $\\mathcal{J}(\\mathbb{R}^2)$ porque su frontera es todo el cuadrado sólido $[0,1]^2$, cuyo contenido es 1."
  },
  {
    "id": "t1-double-integral",
    "topic": "t1",
    "topicName": "Regiones Generales en R² y Medibilidad Jordan",
    "symbol": "$\\iint_\\Omega f(x,y)\\,dA$",
    "name": "Integral doble de Riemann sobre $\\Omega$",
    "reading": "Doble integral sobre Omega de efe de equis ye diferencial de área",
    "simple": "Si $f(x,y) \\ge 0$, representa el volumen del sólido 3D atrapado entre la base plana $\\Omega$ y el techo ondulado $z = f(x,y)$. Si $f$ es una densidad superficial, representa la masa de la placa.",
    "action": "Descompón $\\Omega$ en regiones Tipo 1 o Tipo 2 y aplica el Teorema de Fubini para convertirla en dos integrales ordinarias consecutivas.",
    "trap": "Intentar integrar algebraicamente la doble integral sin transformarla antes en integrales iteradas con límites numéricos y funcionales bien ordenados."
  },
  {
    "id": "t1-area-element",
    "topic": "t1",
    "topicName": "Regiones Generales en R² y Medibilidad Jordan",
    "symbol": "$dA = dx\\,dy$",
    "name": "Elemento diferencial de área cartesiano",
    "reading": "Diferencial de área igual a de equis por de ye",
    "simple": "El área infinitesimal de una baldosa rectangular microscópica de ancho $dx$ y altura $dy$. Es la unidad mínima de área en el plano cartesiano.",
    "action": "Sustituye $dA$ por $dy\\,dx$ si vas a integrar primero verticalmente respecto a $y$, o por $dx\\,dy$ si vas a barrer horizontalmente respecto a $x$.",
    "trap": "Creer que $dA = dr\\,d\\theta$ en polares. En polares la baldosa se ensancha con el radio y requiere el factor $r$: $dA = r\\,dr\\,d\\theta$."
  },
  {
    "id": "t1-type1-region",
    "topic": "t1",
    "topicName": "Regiones Generales en R² y Medibilidad Jordan",
    "symbol": "$\\Omega_1 = \\{ (x,y) : a \\le x \\le b, \\ \\phi_1(x) \\le y \\le \\phi_2(x) \\}$",
    "name": "Región Tipo 1 (o $y$-simple / verticalmente simple)",
    "reading": "Región Tipo 1: equis entre a y b, ye entre fi uno de equis y fi dos de equis",
    "simple": "Una región que puedes barrer con varillas verticales: lanzas una flecha hacia arriba; entra por una única curva piso $y = \\phi_1(x)$ y sale por una única curva techo $y = \\phi_2(x)$ para todo $x \\in [a,b]$.",
    "action": "Halla los extremos numéricos $x=a$ y $x=b$ igualando las curvas. Escribe la integral iterada como $\\int_a^b \\left[ \\int_{\\phi_1(x)}^{\\phi_2(x)} f(x,y)\\,dy \\right] dx$.",
    "trap": "Poner variables en la integral de afuera. La integral exterior DEBE tener siempre cotas numéricas constantes $[a,b]$. Si dejas una variable afuera, tu resultado final dependerá de esa variable y el ejercicio quedará anulado."
  },
  {
    "id": "t1-type2-region",
    "topic": "t1",
    "topicName": "Regiones Generales en R² y Medibilidad Jordan",
    "symbol": "$\\Omega_2 = \\{ (x,y) : c \\le y \\le d, \\ \\psi_1(y) \\le x \\le \\psi_2(y) \\}$",
    "name": "Región Tipo 2 (o $x$-simple / horizontalmente simple)",
    "reading": "Región Tipo 2: ye entre c y d, equis entre psi uno de ye y psi dos de ye",
    "simple": "Una región que barres con varillas horizontales: lanzas una flecha hacia la derecha; entra por la curva pared izquierda $x = \\psi_1(y)$ y sale por la pared derecha $x = \\psi_2(y)$ para todo $y \\in [c,d]$.",
    "action": "Despeja $x$ en función de $y$ en las curvas que encierran la región y formula la integral como $\\int_c^d \\left[ \\int_{\\psi_1(y)}^{\\psi_2(y)} f(x,y)\\,dx \\right] dy$.",
    "trap": "Empeñarse en integrar siempre como Tipo 1. Si la región está delimitada por parábolas en $y$ como $x = y^2 - 1$ y $x = 2$, como Tipo 1 tendrías que partir en dos integrales con raíces $\\pm\\sqrt{x+1}$, mientras que como Tipo 2 sale directa en una sola integral."
  },
  {
    "id": "t1-fubini-iterated",
    "topic": "t1",
    "topicName": "Regiones Generales en R² y Medibilidad Jordan",
    "symbol": "$\\int_a^b \\left( \\int_{\\phi_1(x)}^{\\phi_2(x)} f(x,y)\\,dy \\right) dx$",
    "name": "Integral iterada (Teorema de Fubini en $\\mathbb{R}^2$)",
    "reading": "Integral de a hacia b de la integral de fi uno a fi dos de efe diferencial de ye, diferencial de equis",
    "simple": "El Teorema de Fubini dice que calcular una integral doble equivale a resolver dos integrales de una variable en cascada: primero integras en $y$ manteniendo $x$ congelada, y luego integras el resultado en $x$.",
    "action": "Integra la variable interior tratando a la otra como constante. Evalúa con la Regla de Barrow en las funciones límites y finalmente integra respecto a la variable exterior.",
    "trap": "Intentar resolver integrales no elementales como $\\int_0^1 \\int_y^1 e^{x^2} dx\\,dy$ en el orden original. El truco clásico de la UNI es invertir el orden dibujando primero la región triangular para integrar $dy\\,dx$."
  },
  {
    "id": "t1-graph-function",
    "topic": "t1",
    "topicName": "Regiones Generales en R² y Medibilidad Jordan",
    "symbol": "$\\Gamma(\\phi) = \\{ (x, \\phi(x)) : x \\in [a,b] \\}$",
    "name": "Grafo de una función continua",
    "reading": "Gamma de fi: grafo de la función fi sobre el intervalo cerrado a, b",
    "simple": "El dibujo de la curva de una función trazada de un solo trazo sobre el papel. Al ser continuo sobre un intervalo cerrado, no ocupa área en el plano bidimensional.",
    "action": "Para demostrar que una región limitada por curvas continuas es Jordan-medible, cita el teorema fundamental: 'El grafo de toda función continua $\\phi: [a,b] \\to \\mathbb{R}$ tiene contenido bidimensional nulo'.",
    "trap": "Pensar que cualquier curva tiene contenido nulo. Si la función oscila salvajemente o es discontinua densamente, su clausura puede tener área positiva (por ejemplo, la curva de Osgood o Peano)."
  },
  {
    "id": "t1-partition-norm",
    "topic": "t1",
    "topicName": "Regiones Generales en R² y Medibilidad Jordan",
    "symbol": "$\\|P\\| = \\max_{i,j} \\operatorname{diam}(B_{i,j})$",
    "name": "Norma o calibre de una partición bidimensional",
    "reading": "Norma de la partición P: máximo diámetro de los rectángulos",
    "simple": "La diagonal del rectángulo más grande de la cuadrícula con la que subdividiste la región. Para que las sumas converjan a la integral exacta, este tamaño máximo debe aproximarse a cero.",
    "action": "En demostraciones teóricas, construye una sucesión de particiones $P_n$ tales que $\\|P_n\\| \\to 0$ cuando $n \\to \\infty$.",
    "trap": "Confundir la cantidad de rectángulos con la norma. Que el número de rectangulitos tienda a infinito no garantiza integrabilidad si dejas un rectángulo grande sin subdividir."
  },
  {
    "id": "t1-darboux-sums",
    "topic": "t1",
    "topicName": "Regiones Generales en R² y Medibilidad Jordan",
    "symbol": "$U(f,P) - L(f,P) \\lt \\varepsilon$",
    "name": "Criterio de Riemann-Darboux para integrabilidad",
    "reading": "Suma superior de Darboux menos suma inferior menor que épsilon",
    "simple": "Aproximas el volumen por exceso con columnas altas $U(f,P)$ y por defecto con columnas bajas $L(f,P)$. Si la diferencia entre ambas aproximaciones puede hacerse menor que cualquier $\\varepsilon \\gt 0$, la función es integrable.",
    "action": "Separa los rectángulos de la partición en 'interiores' (donde la oscilación de $f$ es menor a $\\varepsilon$) y 'de frontera' (cuya área total sumada es menor a $\\varepsilon$ por tener contenido nulo).",
    "trap": "Olvidar que $L(f,P_1) \\le U(f,P_2)$ para cualesquiera dos particiones $P_1$ y $P_2$. La suma inferior nunca puede superar a ninguna suma superior."
  },
  {
    "id": "t2-transformation",
    "topic": "t2",
    "topicName": "Cambio de Variables en R² y Coordenadas Polares",
    "symbol": "$\\Phi: D^* \\to D, \\quad (x,y) = \\Phi(u,v)$",
    "name": "Transformación de coordenadas o difeomorfismo $C^1$",
    "reading": "Fi de D estrella en D, transforma u ve en equis ye",
    "simple": "Una deformación elástica y continua del plano que endereza regiones torcidas (rombos inclinados, elipses, sectores circulares) convirtiéndolas en rectángulos alineados $D^*$ donde integrar es facilísimo.",
    "action": "Define $u$ y $v$ igualándolos a las combinaciones que se repiten en las curvas del contorno (ej. $u = x+y$, $v = y/x$), despeja $x(u,v)$ e $y(u,v)$ y grafica el nuevo dominio $D^*$.",
    "trap": "Elegir una transformación que no sea biyectiva en el interior de la región. Si la transformación dobla el dominio sobre sí mismo, calcularías el doble del área real."
  },
  {
    "id": "t2-jacobian-matrix",
    "topic": "t2",
    "topicName": "Cambio de Variables en R² y Coordenadas Polares",
    "symbol": "$J_\\Phi(u,v) = \\begin{pmatrix} \\frac{\\partial x}{\\partial u} & \\frac{\\partial x}{\\partial v} \\\\[1mm] \\frac{\\partial y}{\\partial u} & \\frac{\\partial y}{\\partial v} \\end{pmatrix}$",
    "name": "Matriz Jacobiana de la transformación",
    "reading": "Matriz Jacobiana de Fi en u, v",
    "simple": "La matriz de derivadas parciales que indica cómo se estiran, rotan y deforman las direcciones elementales al pasar del plano auxiliar $(u,v)$ al plano físico $(x,y)$.",
    "action": "Deriva $x$ e $y$ respecto a $u$ y $v$, colocando las derivadas de $x$ en la primera fila y las de $y$ en la segunda fila.",
    "trap": "Mezclar variables directas e inversas en la misma matriz. Todas las entradas deben estar expresadas exclusivamente en términos de $u$ y $v$."
  },
  {
    "id": "t2-jacobian-determinant",
    "topic": "t2",
    "topicName": "Cambio de Variables en R² y Coordenadas Polares",
    "symbol": "$\\det J_\\Phi(u,v) = \\frac{\\partial(x,y)}{\\partial(u,v)}$",
    "name": "Determinante Jacobiano (Jacobiano funcional)",
    "reading": "Determinante jacobiano de equis ye respecto a u ve",
    "simple": "El factor de ampliación local: te dice cuánto se estira o comprime el área de una cuadrícula infinitesimal al ser transformada. Si es negativo, significa que además invirtió la orientación (como un espejo).",
    "action": "Calcula el determinante $2 \\times 2$: $\\frac{\\partial x}{\\partial u} \\frac{\\partial y}{\\partial v} - \\frac{\\partial x}{\\partial v} \\frac{\\partial y}{\\partial u}$.",
    "trap": "Olvidar que en la integral múltiple va el VALOR ABSOLUTO del determinante jacobiano. Si $\\det J = -5$, el factor en la integral es $|{-5}| = 5$, jamás un número negativo."
  },
  {
    "id": "t2-jacobian-absolute",
    "topic": "t2",
    "topicName": "Cambio de Variables en R² y Coordenadas Polares",
    "symbol": "$|\\det J_\\Phi(u,v)| = \\left| \\frac{\\partial(x,y)}{\\partial(u,v)} \\right|$",
    "name": "Factor de distorsión de área (Módulo del Jacobiano)",
    "reading": "Valor absoluto del determinante jacobiano",
    "simple": "Es el tipo de cambio oficial entre las monedas de área: si estiras una lámina al cuádruple de su tamaño original, debes multiplicar por 4 para que la suma total sea exacta.",
    "action": "Escribe siempre las barras de valor absoluto al plantear la fórmula de cambio de variables: $dx\\,dy = |\\det J_\\Phi(u,v)|\\,du\\,dv$.",
    "trap": "Integrar sin el jacobiano. Si omites el jacobiano, estás asumiendo falsamente que el cambio de variables no alteró las áreas locales, invalidando todo el examen."
  },
  {
    "id": "t2-area-change",
    "topic": "t2",
    "topicName": "Cambio de Variables en R² y Coordenadas Polares",
    "symbol": "$dx\\,dy = |\\det J_\\Phi(u,v)|\\,du\\,dv$",
    "name": "Relación diferencial del cambio de variables",
    "reading": "Diferencial de equis de ye igual a módulo del jacobiano por de u de ve",
    "simple": "La regla de sustitución geométrica: una porción de área $dx\\,dy$ se sustituye en la integral por el área deformada $|\\det J_\\Phi|\\,du\\,dv$.",
    "action": "Reemplaza simultáneamente tres cosas: 1) el dominio $D$ por $D^*$, 2) las variables de la función $f(x(u,v), y(u,v))$, y 3) $dx\\,dy$ por $|\\det J|\\,du\\,dv$.",
    "trap": "Cambiar el integrando y el dominio pero olvidar multiplicar por $|\\det J_\\Phi|$, o cambiar $dx\\,dy$ pero dejar la función original con $x$ e $y$."
  },
  {
    "id": "t2-inverse-jacobian",
    "topic": "t2",
    "topicName": "Cambio de Variables en R² y Coordenadas Polares",
    "symbol": "$\\frac{\\partial(x,y)}{\\partial(u,v)} = \\frac{1}{\\frac{\\partial(u,v)}{\\partial(x,y)}}$",
    "name": "Propiedad del Jacobiano de la función inversa",
    "reading": "Jacobiano de equis ye respecto a u ve igual a uno sobre el jacobiano de u ve respecto a equis ye",
    "simple": "Si despejar $x$ e $y$ en función de $u$ y $v$ es difícil o engorroso, deriva directamente $u(x,y)$ y $v(x,y)$, calcula su jacobiano y dale la vuelta como una fracción.",
    "action": "Calcula $\\det J_{\\Phi^{-1}} = \\frac{\\partial(u,v)}{\\partial(x,y)}$ derivando $u$ y $v$ respecto a $x$ e $y$, inviértelo $\\frac{1}{\\det J_{\\Phi^{-1}}}$ y finalmente reexpresa el resultado en términos de $u$ y $v$.",
    "trap": "Dejar el jacobiano invertido en términos de $x$ e $y$ dentro de la integral en $du\\,dv$. ¡Debes reemplazar $x$ e $y$ para que solo queden $u$ y $v$!"
  },
  {
    "id": "t2-polar-coordinates",
    "topic": "t2",
    "topicName": "Cambio de Variables en R² y Coordenadas Polares",
    "symbol": "$(r,\\theta): \\quad x = r\\cos\\theta, \\quad y = r\\sin\\theta$",
    "name": "Coordenadas polares estándar en $\\mathbb{R}^2$",
    "reading": "Coordenadas polares: equis igual a erre coseno de teta, ye igual a erre seno de teta",
    "simple": "Ubicar un punto en el plano mediante su distancia al origen $r$ y su ángulo de rotación $\\theta$. Es la herramienta perfecta para discos, coronas circulares y figuras con simetría rotacional.",
    "action": "Utilízalas cada vez que veas la expresión $x^2 + y^2$ en el integrando o cuando el contorno de la región esté formado por arcos de circunferencia o rectas que pasan por el origen.",
    "trap": "Permitir valores negativos de $r$. En el marco del cálculo multivariable estándar, el radio de integración siempre cumple $r \\ge 0$."
  },
  {
    "id": "t2-polar-jacobian",
    "topic": "t2",
    "topicName": "Cambio de Variables en R² y Coordenadas Polares",
    "symbol": "$dx\\,dy = r\\,dr\\,d\\theta$",
    "name": "Elemento de área en coordenadas polares",
    "reading": "Diferencial de área en polares igual a erre de erre de teta",
    "simple": "A distancia $r$, un pequeño incremento de ángulo $d\\theta$ produce un arco de longitud $r\\,d\\theta$. Al multiplicarlo por el grosor radial $dr$, el área del sector es $r\\,dr\\,d\\theta$. El factor $r$ compensa que los sectores se ensanchan al alejarse del centro.",
    "action": "Cada vez que transformes una integral a polares, escribe de inmediato el factor $r$ multiplicando al integrando: $\\iint f(r\\cos\\theta, r\\sin\\theta)\\, r\\,dr\\,d\\theta$.",
    "trap": "¡El error más común en la PC5! Olvidar incluir la $r$. Si no pones la $r$, no estás calculando en polares sino sobre un rectángulo ficticio, arruinando la integral por completo."
  },
  {
    "id": "t2-polar-radius",
    "topic": "t2",
    "topicName": "Cambio de Variables en R² y Coordenadas Polares",
    "symbol": "$r^2 = x^2 + y^2, \\quad \\theta = \\operatorname{atan2}(y,x)$",
    "name": "Relaciones inversas polar-cartesiana",
    "reading": "Erre cuadrado igual a equis cuadrado más ye cuadrado, teta igual a arcotangente dos de ye equis",
    "simple": "El teorema de Pitágoras te da la distancia al origen y la función trigonométrica te indica hacia dónde apunta el rayo.",
    "action": "Sustituye inmediatamente toda aparición de $x^2+y^2$ por $r^2$ y simplifica raíces cuadradas $\\sqrt{x^2+y^2} = r$.",
    "trap": "Calcular $\\theta = \\arctan(y/x)$ sin mirar el cuadrante. Si $x \\lt 0$ (segundo o tercer cuadrante), la fórmula clásica de arcotangente devuelve un ángulo erróneo en el cuarto o primer cuadrante; debes sumar $\\pi$."
  },
  {
    "id": "t2-shifted-circle-polar",
    "topic": "t2",
    "topicName": "Cambio de Variables en R² y Coordenadas Polares",
    "symbol": "$r = 2a\\cos\\theta \\iff (x-a)^2 + y^2 = a^2$",
    "name": "Circunferencia desplazada tangente al eje $Y$ en el origen",
    "reading": "Erre igual a dos a por coseno de teta",
    "simple": "Un círculo de radio $a$ recostado sobre el semieje positivo $X$ que toca el origen $(0,0)$. Un rayo que gira desde el origen barre todo el círculo con ángulos entre $-\\pi/2$ y $\\pi/2$.",
    "action": "Reemplaza $x^2+y^2 = 2ax$ por $r^2 = 2ar\\cos\\theta$, simplifica una $r$ y obtén el límite superior $r = 2a\\cos\\theta$ integrando $\\theta$ en $[-\\pi/2, \\pi/2]$.",
    "trap": "Integrar $\\theta$ de $0$ a $2\\pi$. En $[-\\pi/2, \\pi/2]$ el círculo ya se recorrió por completo; si integras hasta $2\\pi$ estarías recorriendo el círculo dos veces (la segunda con $r \\lt 0$), duplicando el área."
  },
  {
    "id": "t2-elliptic-polar",
    "topic": "t2",
    "topicName": "Cambio de Variables en R² y Coordenadas Polares",
    "symbol": "$x = ar\\cos\\theta, \\quad y = br\\sin\\theta \\implies dx\\,dy = abr\\,dr\\,d\\theta$",
    "name": "Coordenadas polares elípticas generalizadas",
    "reading": "Polares elípticas: equis igual a a erre coseno, ye igual a b erre seno, diferencial igual a a b erre de erre de teta",
    "simple": "Un truco de escalamiento que redondea una elipse estirada $\\frac{x^2}{a^2}+\\frac{y^2}{b^2} \\le 1$ convirtiéndola en un disco circular unitario $r \\le 1$.",
    "action": "Úsalas cuando la región sea una elipse sólida. Los límites son $r \\in [0,1]$ y $\\theta \\in [0,2\\pi]$, y el jacobiano es simplemente $abr$.",
    "trap": "Olvidar los semiejes $ab$ en el jacobiano y poner solo $r$. El estiramiento en los ejes $X$ e $Y$ multiplica el elemento diferencial por el producto $ab$."
  },
  {
    "id": "t3-omega-solid",
    "topic": "t3",
    "topicName": "Integrales Triples en Cartesianas y Fubini en R³",
    "symbol": "$\\Omega \\subset \\mathbb{R}^3$",
    "name": "Sólido o dominio acotado tridimensional",
    "reading": "Omega contenido en R tres (sólido espacial)",
    "simple": "Una porción cerrada y acotada del espacio tridimensional que tiene volumen físico (como un tetraedro, una bola, un cilindro truncado o una roca).",
    "action": "Realiza un bosquejo del sólido en el espacio 3D identificando las superficies que actúan como suelo, techo y paredes laterales.",
    "trap": "Integrar sobre regiones no acotadas sin usar límites impropios. La teoría de Riemann ordinaria exige que $\\Omega$ sea compacto (cerrado y acotado)."
  },
  {
    "id": "t3-triple-integral",
    "topic": "t3",
    "topicName": "Integrales Triples en Cartesianas y Fubini en R³",
    "symbol": "$\\iiint_\\Omega f(x,y,z)\\,dV$",
    "name": "Integral triple de Riemann",
    "reading": "Triple integral sobre Omega de efe de equis ye zeta diferencial de volumen",
    "simple": "La suma continua del valor de una función $f(x,y,z)$ (densidad de masa, temperatura o potencial) sobre todos los puntos interiores del sólido tridimensional.",
    "action": "Proyecta el sólido sobre uno de los planos coordenados para descomponer la triple integral en una integral simple interior y una doble exterior.",
    "trap": "Creer que la triple integral siempre da un volumen. Solo da volumen si $f(x,y,z) = 1$. Si $f$ es una densidad de masa variable, da la masa total en kilogramos."
  },
  {
    "id": "t3-volume-element",
    "topic": "t3",
    "topicName": "Integrales Triples en Cartesianas y Fubini en R³",
    "symbol": "$dV = dx\\,dy\\,dz$",
    "name": "Elemento diferencial de volumen cartesiano",
    "reading": "Diferencial de volumen igual a de equis por de ye por de zeta",
    "simple": "El volumen infinitesimal de un ladrillito o microcubo de dimensiones $dx$, $dy$ y $dz$ alineado con los ejes cartesianos.",
    "action": "Reemplaza $dV$ por el orden de integración que más facilite los cálculos (ej. $dz\\,dy\\,dx$ para sólidos $z$-simples).",
    "trap": "Desordenar las diferenciales respecto a los límites de las integrales. La diferencial más interna debe corresponder siempre a la variable de la integral interior."
  },
  {
    "id": "t3-jordan-volume",
    "topic": "t3",
    "topicName": "Integrales Triples en Cartesianas y Fubini en R³",
    "symbol": "$\\operatorname{Vol}(\\Omega) = \\iiint_\\Omega 1\\,dV$",
    "name": "Volumen según Jordan de un sólido tridimensional",
    "reading": "Volumen de Omega igual a la triple integral de uno diferencial de volumen",
    "simple": "El espacio total que ocupa el cuerpo, calculado rellenándolo con incontables cubitos microscópicos de volumen unitario.",
    "action": "Cuando el enunciado te pida 'Calcule el volumen del sólido...', pon $f(x,y,z) = 1$ en la integral y determina con precisión los límites del sólido.",
    "trap": "Olvidar restar volúmenes huecos cuando un sólido es perforado o vaciado por cilindros interiores o planos secantes."
  },
  {
    "id": "t3-projection-xy",
    "topic": "t3",
    "topicName": "Integrales Triples en Cartesianas y Fubini en R³",
    "symbol": "$\\operatorname{Proy}_{XY}(\\Omega) = D_{xy}$",
    "name": "Proyección ortogonal sobre el plano $XY$ (Sombra basal)",
    "reading": "Proyección en el plano equis ye de Omega, o sombra D sub equis ye",
    "simple": "La silueta o sombra que proyecta el sólido sobre el suelo $XY$ cuando se ilumina desde el infinito superior. Es el dominio plano de las dos integrales exteriores.",
    "action": "Iguala las superficies del techo $z = u_2(x,y)$ y del piso $z = u_1(x,y)$ para hallar la curva donde se tocan; esa curva encierra la región de la sombra $D_{xy}$.",
    "trap": "Olvidar que las paredes laterales verticales del sólido (ej. cilindros $x^2+y^2=4$) pueden fijar los límites de la sombra sin necesidad de igualar techo y piso."
  },
  {
    "id": "t3-type1-solid",
    "topic": "t3",
    "topicName": "Integrales Triples en Cartesianas y Fubini en R³",
    "symbol": "$\\Omega_{z\\text{-simple}} = \\{ (x,y,z) : (x,y) \\in D_{xy}, \\ u_1(x,y) \\le z \\le u_2(x,y) \\}$",
    "name": "Sólido Tipo 1 (o sólido $z$-simple)",
    "reading": "Sólido zeta-simple: equis ye en D sub equis ye, zeta acotada entre u uno y u dos",
    "simple": "Un sólido donde cualquier aguja vertical entra por una única superficie piso $z = u_1(x,y)$ y sale por una única superficie techo $z = u_2(x,y)$.",
    "action": "Formula la integral como $\\iint_{D_{xy}} \\left[ \\int_{u_1(x,y)}^{u_2(x,y)} f(x,y,z)\\,dz \\right] dA_{xy}$, integrando primero $z$ y luego resolviendo la doble integral en $D_{xy}$.",
    "trap": "Dejar la variable $z$ en los límites de $x$ o de $y$. Al integrar $z$ en el primer paso, esa variable desaparece por completo del problema."
  },
  {
    "id": "t3-type2-solid",
    "topic": "t3",
    "topicName": "Integrales Triples en Cartesianas y Fubini en R³",
    "symbol": "$\\Omega_{x\\text{-simple}} = \\{ (x,y,z) : (y,z) \\in D_{yz}, \\ v_1(y,z) \\le x \\le v_2(y,z) \\}$",
    "name": "Sólido Tipo 2 (o sólido $x$-simple)",
    "reading": "Sólido equis-simple: ye zeta en D sub ye zeta, equis entre ve uno y ve dos",
    "simple": "Un sólido donde una varilla horizontal disparada a lo largo del eje $X$ entra por una pared posterior $x = v_1(y,z)$ y sale por una pared frontal $x = v_2(y,z)$.",
    "action": "Elige este tipo cuando las superficies vengan despejadas naturalmente en términos de $x$ (ej. $x = y^2 + z^2$ y $x = 4$), proyectando el problema sobre el plano $YZ$.",
    "trap": "Empeñarte en proyectar siempre al suelo $XY$. Si el paraboloide se abre sobre el eje $X$, proyectar en $XY$ genera raíces cuadradas espantosas; proyectar en $YZ$ da un círculo limpio."
  },
  {
    "id": "t3-type3-solid",
    "topic": "t3",
    "topicName": "Integrales Triples en Cartesianas y Fubini en R³",
    "symbol": "$\\Omega_{y\\text{-simple}} = \\{ (x,y,z) : (x,z) \\in D_{xz}, \\ w_1(x,z) \\le y \\le w_2(x,z) \\}$",
    "name": "Sólido Tipo 3 (o sólido $y$-simple)",
    "reading": "Sólido ye-simple: equis zeta en D sub equis zeta, ye entre uve doble uno y dos",
    "simple": "Un sólido donde barres de izquierda a derecha perpendicularmente al plano $XZ$, entrando por una pared izquierda $y = w_1(x,z)$ y saliendo por la derecha $y = w_2(x,z)$.",
    "action": "Proyecta el sólido sobre la pared vertical $XZ$ y plantea $\\iint_{D_{xz}} \\left[ \\int_{w_1(x,z)}^{w_2(x,z)} f\\,dy \\right] dA_{xz}$.",
    "trap": "Confundir los ejes en el plano de proyección $XZ$. El eje horizontal estándar es $X$ y el vertical es $Z$, mientras que $Y$ es la variable integrada."
  },
  {
    "id": "t3-fubini-six-orders",
    "topic": "t3",
    "topicName": "Integrales Triples en Cartesianas y Fubini en R³",
    "symbol": "$\\iiint_\\Omega f\\,dV = \\int_a^b \\int_{g_1(x)}^{g_2(x)} \\int_{u_1(x,y)}^{u_2(x,y)} f\\,dz\\,dy\\,dx$",
    "name": "Teorema de Fubini en $\\mathbb{R}^3$ (Los 6 órdenes de integración)",
    "reading": "Teorema de Fubini en dimensión tres: iteración en cascada de tres integrales",
    "simple": "Existen 6 órdenes posibles para calcular la triple integral ($dz\\,dy\\,dx$, $dz\\,dx\\,dy$, $dy\\,dz\\,dx$, $dy\\,dx\\,dz$, $dx\\,dz\\,dy$, $dx\\,dy\\,dz$). Si la función es continua, los 6 caminos dan exactamente el mismo resultado.",
    "action": "Para cambiar el orden de integración, NO inviertas simplemente los signos de integración algebraicamente. Bosqueja el sólido geométrico y determina las nuevas entradas y salidas proyectando en los nuevos planos.",
    "trap": "Intercambiar límites algebraicamente como si fueran constantes. Los límites interiores dependen de las variables exteriores y deben recalcularse proyectando nuevamente el sólido."
  },
  {
    "id": "t3-boundary-content-3d",
    "topic": "t3",
    "topicName": "Integrales Triples en Cartesianas y Fubini en R³",
    "symbol": "$\\operatorname{cont}_3(\\partial\\Omega) = 0$",
    "name": "Contenido tridimensional nulo de la frontera",
    "reading": "Contenido tridimensional de la frontera de Omega igual a cero",
    "simple": "La cáscara o piel perimetral que envuelve al sólido es una superficie bidimensional tan delgada que no ocupa ningún volumen tridimensional.",
    "action": "Justifica en tu examen: 'Como la frontera $\\partial\\Omega$ está formada por unión finita de superficies suaves a trozos ($C^1$), tiene contenido tridimensional nulo; por ende $\\Omega$ es Jordan-medible en $\\mathbb{R}^3$'.",
    "trap": "Confundir área de superficie con volumen. La frontera de una bola tiene área $4\\pi R^2 \\gt 0$, pero su volumen en $\\mathbb{R}^3$ es exactamente cero."
  },
  {
    "id": "t4-cylindrical-system",
    "topic": "t4",
    "topicName": "Coordenadas Cilíndricas y Esféricas en R³",
    "symbol": "$(r,\\theta,z): \\quad x = r\\cos\\theta, \\quad y = r\\sin\\theta, \\quad z = z$",
    "name": "Sistema de coordenadas cilíndricas",
    "reading": "Coordenadas cilíndricas: erre, teta, zeta",
    "simple": "Son las coordenadas polares planas de siempre aplicadas en el suelo $XY$, complementadas con la altura vertical cartesiana $z$ que sube y baja de manera independiente.",
    "action": "Úsalas cuando el sólido presente simetría axial alrededor del eje $Z$ (cilindros circulares, paraboloides de revolución $z = x^2+y^2$ o conos $z^2 = x^2+y^2$).",
    "trap": "Intentar usar cilíndricas estándar cuando el cilindro está recostado sobre el eje $X$ (ej. $y^2+z^2 = 4$). En ese caso debes redefinir las variables como $y=r\\cos\\theta, z=r\\sin\\theta, x=x$."
  },
  {
    "id": "t4-cylindrical-volume",
    "topic": "t4",
    "topicName": "Coordenadas Cilíndricas y Esféricas en R³",
    "symbol": "$dV = r\\,dr\\,d\\theta\\,dz$",
    "name": "Elemento de volumen diferencial en cilíndricas",
    "reading": "Diferencial de volumen en cilíndricas igual a erre de erre de teta de zeta",
    "simple": "Un bloque prismático de base polar infinitesimal ($r\\,dr\\,d\\theta$) y altura vertical $dz$. El factor $r$ proviene del determinante jacobiano de la transformación.",
    "action": "Añade sin vacilar el factor $r$ al escribir la integral en cilíndricas: $\\iiint f(r\\cos\\theta, r\\sin\\theta, z)\\, r\\,dz\\,dr\\,d\\theta$.",
    "trap": "Olvidar la $r$ jacobiana. Al igual que en polares bidimensionales, omitir esta $r$ es el error fatal más sancionado en las evaluaciones de CM2A1."
  },
  {
    "id": "t4-cylindrical-surfaces",
    "topic": "t4",
    "topicName": "Coordenadas Cilíndricas y Esféricas en R³",
    "symbol": "$r = c \\quad \\text{(Cilindro)}, \\quad \\theta = \\alpha \\quad \\text{(Semiplano)}, \\quad z = k \\quad \\text{(Plano)}$",
    "name": "Superficies coordenadas cilíndricas canónicas",
    "reading": "Superficies coordenadas: cilindro circular, semiplano meridiano y plano horizontal",
    "simple": "Fijar una variable a una constante genera las geometrías básicas del sistema: $r=c$ es un tubo cilíndrico infinito; $\\theta=\\alpha$ es una página vertical que parte del eje $Z$; $z=k$ es un piso plano horizontal.",
    "action": "Identifica estas ecuaciones para reconocer de inmediato los límites de integración cuando el sólido esté delimitado por cilindros o planos verticales que cruzan el origen.",
    "trap": "Pensar que $\\theta = \\alpha$ es un plano completo. Como $r \\ge 0$, $\\theta = \\alpha$ representa únicamente un SEMIPLANO que nace en el eje $Z$; el plano entero requeriría considerar también $\\theta + \\pi$."
  },
  {
    "id": "t4-spherical-system",
    "topic": "t4",
    "topicName": "Coordenadas Cilíndricas y Esféricas en R³",
    "symbol": "$(\\rho,\\varphi,\\theta): \\quad \\rho \\ge 0, \\quad \\varphi \\in [0,\\pi], \\quad \\theta \\in [0,2\\pi]$",
    "name": "Sistema de coordenadas esféricas estándar",
    "reading": "Coordenadas esféricas: ro, fi, teta",
    "simple": "Ubicar un punto en el espacio mediante un radar esférico: $\\rho$ es la distancia recta al origen, $\\varphi$ es el ángulo de inclinación medido hacia abajo desde el polo norte $+Z$, y $\\theta$ es la brújula de giro azimutal en el suelo.",
    "action": "Elígelas cuando el sólido involucre esferas centradas en el origen, conos con vértice en el origen o expresiones con $x^2+y^2+z^2$.",
    "trap": "Confundir los dominios de los ángulos: $\\varphi$ (colatitud) va estrictamente de $0$ a $\\pi$ (del polo norte al polo sur); $\\theta$ (azimut) va de $0$ a $2\\pi$. Integrar $\\varphi$ hasta $2\\pi$ duplicaría todo el espacio."
  },
  {
    "id": "t4-spherical-formulas",
    "topic": "t4",
    "topicName": "Coordenadas Cilíndricas y Esféricas en R³",
    "symbol": "$x = \\rho\\sin\\varphi\\cos\\theta, \\quad y = \\rho\\sin\\varphi\\sin\\theta, \\quad z = \\rho\\cos\\varphi$",
    "name": "Fórmulas de transformación esféricas a cartesianas",
    "reading": "Equis igual a ro seno de fi coseno de teta, ye igual a ro seno de fi seno de teta, zeta igual a ro coseno de fi",
    "simple": "La altura vertical es la proyección directa $z = \\rho\\cos\\varphi$. El radio horizontal en el plano es $r = \\rho\\sin\\varphi$, que luego se descompone con $\\cos\\theta$ y $\\sin\\theta$.",
    "action": "Recuerda que bajo esta parametrización la suma de cuadrados colapsa limpiamente: $x^2 + y^2 + z^2 = \\rho^2$.",
    "trap": "Invertir senos y cosenos en $\\varphi$. En algunos libros extranjeros usan $\\theta$ para la colatitud; en la UNI el estándar obligatorio de CM2A1 es $\\varphi$ para colatitud ($z = \\rho\\cos\\varphi$) y $\\theta$ para azimut."
  },
  {
    "id": "t4-spherical-volume",
    "topic": "t4",
    "topicName": "Coordenadas Cilíndricas y Esféricas en R³",
    "symbol": "$dV = \\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta$",
    "name": "Elemento de volumen diferencial en esféricas",
    "reading": "Diferencial de volumen en esféricas igual a ro cuadrado por seno de fi por de ro de fi de teta",
    "simple": "Una porción microscópica de cáscara esférica: tiene grosor radial $d\\rho$, arco meridiano $\\rho\\,d\\varphi$ y arco paralelo $\\rho\\sin\\varphi\\,d\\theta$. Su producto da el volumen infinitesimal $\\rho^2\\sin\\varphi$.",
    "action": "Escribe de memoria el factor multiplicador $\\rho^2\\sin\\varphi$ cada vez que formules una integral triple en esféricas.",
    "trap": "Olvidar el término $\\sin\\varphi$ o escribir solo $\\rho^2$. El factor $\\sin\\varphi$ es indispensable porque modela cómo los meridianos se juntan y colapsan a cero cerca de los polos."
  },
  {
    "id": "t4-cone-spherical",
    "topic": "t4",
    "topicName": "Coordenadas Cilíndricas y Esféricas en R³",
    "symbol": "$z = \\sqrt{x^2+y^2} \\iff \\varphi = \\frac{\\pi}{4}$",
    "name": "Ecuación polar-esférica del cono circular recto",
    "reading": "Cono circular en esféricas: fi igual a constante pi cuartos",
    "simple": "Un cono con vértice en el origen es simplemente abrir el compás en un ángulo cenital fijo $\\varphi = \\alpha$ respecto al eje vertical y hacerlo rotar una vuelta completa.",
    "action": "Para cualquier cono de la forma $z = c\\sqrt{x^2+y^2}$, calcula $\\tan\\varphi = \\frac{\\sqrt{x^2+y^2}}{z} = \\frac{1}{c}$ para hallar el ángulo fijo $\\varphi$.",
    "trap": "Medir el ángulo $\\varphi$ desde el cono hacia el plano horizontal. Recuerda que $\\varphi = 0$ es el eje vertical $+Z$, no el plano horizontal."
  },
  {
    "id": "t4-shifted-sphere-spherical",
    "topic": "t4",
    "topicName": "Coordenadas Cilíndricas y Esféricas en R³",
    "symbol": "$x^2+y^2+z^2 = 2az \\iff \\rho = 2a\\cos\\varphi$",
    "name": "Esfera tangente al plano $XY$ en el origen",
    "reading": "Ro igual a dos a por coseno de fi",
    "simple": "Una esfera apoyada sobre el suelo que toca el origen $(0,0,0)$. Un rayo disparado desde el origen entra en ella en $\\rho = 0$ y sale por la pared esférica $\\rho = 2a\\cos\\varphi$.",
    "action": "Sustituye $x^2+y^2+z^2 = \\rho^2$ y $z = \\rho\\cos\\varphi$, cancela una $\\rho$ y obtén el límite superior $\\rho = 2a\\cos\\varphi$ con $\\varphi \\in [0, \\pi/2]$ y $\\theta \\in [0, 2\\pi]$.",
    "trap": "Integrar $\\varphi$ hasta $\\pi$. Toda la esfera está contenida en el semiespacio superior $z \\ge 0$; por lo tanto, el ángulo cenital $\\varphi$ termina en el plano horizontal $\\varphi = \\pi/2$."
  },
  {
    "id": "t4-ice-cream-cone",
    "topic": "t4",
    "topicName": "Coordenadas Cilíndricas y Esféricas en R³",
    "symbol": "$\\Omega = \\{ (\\rho,\\varphi,\\theta) : 0 \\le \\rho \\le R, \\ 0 \\le \\varphi \\le \\alpha, \\ 0 \\le \\theta \\le 2\\pi \\}$",
    "name": "Cono de helado (Sólido esférico-cónico canónico)",
    "reading": "Sólido cono de helado: ro de cero a R, fi de cero a alfa, teta de cero a dos pi",
    "simple": "Una bola esférica de helado montada sobre un barquillo cónico con punta en el origen. Es el dominio por excelencia donde las esféricas simplifican todo a límites constantes.",
    "action": "Al ser todos los límites constantes e independientes, descompón la triple integral en el producto de tres integrales simples inmediatas: $\\left(\\int_0^R \\rho^2 d\\rho\\right)\\left(\\int_0^\\alpha \\sin\\varphi d\\varphi\\right)\\left(\\int_0^{2\\pi} d\\theta\\right)$.",
    "trap": "Intentar resolver este sólido en coordenadas cilíndricas o cartesianas. Requeriría partir la región en dos trozos (la parte cónica y el casquete esférico) complicando innecesariamente el examen."
  },
  {
    "id": "t4-azimuth-limits",
    "topic": "t4",
    "topicName": "Coordenadas Cilíndricas y Esféricas en R³",
    "symbol": "$\\theta \\in [\\theta_1, \\theta_2] \\quad \\text{con} \\quad \\theta_2 - \\theta_1 \\le 2\\pi$",
    "name": "Límites angulares del azimut",
    "reading": "Teta perteneciente al intervalo teta uno a teta dos",
    "simple": "El sector circular que ocupa el sólido visto desde arriba en el suelo $XY$.",
    "action": "Analiza los signos de $x$ e $y$ en el enunciado para restringir $\\theta$. Por ejemplo, 'en el primer octante' exige estrictamente $\\theta \\in [0, \\pi/2]$ y $\\varphi \\in [0, \\pi/2]$.",
    "trap": "Poner $\\theta \\in [0, 2\\pi]$ por inercia cuando el problema especifica un octante o una región donde $x \\ge 0$, cuatriplicando el resultado."
  },
  {
    "id": "t5-vector-rn",
    "topic": "t5",
    "topicName": "Integrales en Rⁿ, Medida Jordan y Aplicaciones Físicas",
    "symbol": "$\\mathbf{x} = (x_1, x_2, \\dots, x_n) \\in \\mathbb{R}^n$",
    "name": "Punto o vector en el espacio euclídeo $n$-dimensional",
    "reading": "Vector equis en R n con n componentes",
    "simple": "Una posición en un espacio de $n$ dimensiones. Si en 2D tienes $(x,y)$ y en 3D $(x,y,z)$, en $n$ dimensiones tienes una lista ordenada de $n$ números reales.",
    "action": "Utiliza la notación vectorial $\\mathbf{x}$ y el índice $i \\in \\{1,\\dots,n\\}$ para abreviar sumas y productos en problemas teóricos de generalización.",
    "trap": "Creer que la teoría de integración falla en dimensiones altas. Las definiciones de sumas de Darboux, oscilación y contenido nulo funcionan exactamente igual en cualquier $\\mathbb{R}^n$."
  },
  {
    "id": "t5-n-box",
    "topic": "t5",
    "topicName": "Integrales en Rⁿ, Medida Jordan y Aplicaciones Físicas",
    "symbol": "$B = \\prod_{i=1}^n [a_i, b_i] = [a_1,b_1] \\times \\dots \\times [a_n, b_n]$",
    "name": "Hiper-rectángulo o bloque $n$-dimensional",
    "reading": "Bloque B: producto cartesiano de n intervalos cerrados",
    "simple": "El análogo de un rectángulo (2D) o una caja de zapatos (3D) en un universo de $n$ dimensiones. Es la celda elemental para armar particiones.",
    "action": "Calcula su volumen multiplicando las longitudes de sus $n$ aristas: $v(B) = \\prod_{i=1}^n (b_i - a_i)$.",
    "trap": "Confundir un bloque con una bola euclídea. El bloque tiene caras planas ortogonales; la bola es curva y simétrica."
  },
  {
    "id": "t5-n-volume",
    "topic": "t5",
    "topicName": "Integrales en Rⁿ, Medida Jordan y Aplicaciones Físicas",
    "symbol": "$v(B) = \\prod_{i=1}^n (b_i - a_i)$",
    "name": "Volumen elemental $n$-dimensional de un bloque",
    "reading": "Volumen de B igual a la productoria de b sub i menos a sub i",
    "simple": "El tamaño del hiper-bloque obtenido multiplicando largo por ancho por alto por cada una de sus $n$ dimensiones.",
    "action": "Utiliza $v(B_k)$ como el término de ponderación en las sumas de Riemann $n$-dimensionales $\\sum f(\\mathbf{t}_k) v(B_k)$.",
    "trap": "Si alguna de las aristas degenera a un solo punto ($a_i = b_i$), el volumen $n$-dimensional del bloque es exactamente cero."
  },
  {
    "id": "t5-n-integral",
    "topic": "t5",
    "topicName": "Integrales en Rⁿ, Medida Jordan y Aplicaciones Físicas",
    "symbol": "$\\int_\\Omega f(\\mathbf{x})\\,d^n\\mathbf{x} = \\int_\\Omega f(x_1,\\dots,x_n)\\,dx_1\\cdots dx_n$",
    "name": "Integral múltiple de Riemann en $\\mathbb{R}^n$",
    "reading": "Integral sobre Omega de efe de equis diferencial enésima de equis",
    "simple": "La generalización de la suma continua para campos escalares de $n$ variables sobre una región acotada $\\Omega \\subset \\mathbb{R}^n$.",
    "action": "Aplica el Teorema de Fubini iterado para transformarla en una cascada de $n$ integrales simples de cálculo en una variable.",
    "trap": "Perder el control del orden de las diferenciales. La diferencial más interna debe resolverse primero evaluando sus límites funcionales dependientes."
  },
  {
    "id": "t5-canonical-simplex",
    "topic": "t5",
    "topicName": "Integrales en Rⁿ, Medida Jordan y Aplicaciones Físicas",
    "symbol": "$\\Delta_n = \\left\\{ \\mathbf{x} \\in \\mathbb{R}^n : x_i \\ge 0, \\ \\sum_{i=1}^n x_i \\le 1 \\right\\}$",
    "name": "Símplex canónico unitario en $\\mathbb{R}^n$",
    "reading": "Símplex canónico delta n en R n",
    "simple": "En 1D es el segmento $[0,1]$; en 2D es el triángulo rectángulo estándar; en 3D es el tetraedro básico. En $n$ dimensiones es la pirámide elemental acotada por los hiperplanos coordenados.",
    "action": "Aplica de memoria su fórmula de volumen demostrable por inducción: $\\operatorname{Vol}(\\Delta_n) = \\frac{1}{n!}$.",
    "trap": "Olvidar el factorial en el denominador. En cada paso de integración consecutiva aparece una fracción $1/k$, acumulando $1/(1 \\cdot 2 \\cdots n) = 1/n!$."
  },
  {
    "id": "t5-n-ball",
    "topic": "t5",
    "topicName": "Integrales en Rⁿ, Medida Jordan y Aplicaciones Físicas",
    "symbol": "$B_n(R) = \\{ \\mathbf{x} \\in \\mathbb{R}^n : \\sum_{i=1}^n x_i^2 \\le R^2 \\}$",
    "name": "Bola euclídea cerrada $n$-dimensional de radio $R$",
    "reading": "Bola n-dimensional de radio R",
    "simple": "Un disco en 2D, una esfera sólida en 3D, y su contraparte perfectamente redonda en cualquier número de dimensiones $n$.",
    "action": "Calcula su volumen con la fórmula maestra de la función Gamma: $\\operatorname{Vol}(B_n(R)) = \\frac{\\pi^{n/2}}{\\Gamma(n/2 + 1)} R^n$.",
    "trap": "Asumir que el volumen siempre crece cuando aumenta la dimensión $n$. Para $R=1$, el volumen de la bola unitaria alcanza su máximo en $n=5$ y luego decrece asintóticamente a cero cuando $n \\to \\infty$."
  },
  {
    "id": "t5-euler-gamma",
    "topic": "t5",
    "topicName": "Integrales en Rⁿ, Medida Jordan y Aplicaciones Físicas",
    "symbol": "$\\Gamma(z) = \\int_0^\\infty t^{z-1} e^{-t}\\,dt \\quad (z \\gt 0)$",
    "name": "Función Gamma de Euler",
    "reading": "Función Gamma de zeta",
    "simple": "La extensión continua del factorial para números reales y fracciones. Satisface la relación fundamental $\\Gamma(z+1) = z\\Gamma(z)$, con $\\Gamma(n+1) = n!$ y $\\Gamma(1/2) = \\sqrt{\\pi}$.",
    "action": "Utilízala para evaluar volúmenes de bolas o integrales de Dirichlet: $\\Gamma(1)=1$, $\\Gamma(2)=1$, $\\Gamma(3)=2$, $\\Gamma(3/2)=\\frac{\\sqrt{\\pi}}{2}$, $\\Gamma(5/2)=\\frac{3\\sqrt{\\pi}}{4}$.",
    "trap": "El desfase de una unidad con el factorial entero: $\\Gamma(n) = (n-1)!$, mientras que $\\Gamma(n+1) = n!$."
  },
  {
    "id": "t5-density-mass",
    "topic": "t5",
    "topicName": "Integrales en Rⁿ, Medida Jordan y Aplicaciones Físicas",
    "symbol": "$M = \\iiint_\\Omega \\rho(x,y,z)\\,dV$",
    "name": "Masa total de un cuerpo tridimensional",
    "reading": "Masa total igual a la triple integral de la densidad volumétrica de masa",
    "simple": "Si un sólido tiene partes más densas o pesadas que otras (densidad variable $\\rho$), sumas la masa infinitesimal de cada partícula $dm = \\rho\\,dV$ para obtener la masa total del objeto.",
    "action": "Calcula siempre la masa $M$ en primer lugar, pues servirá como denominador común para hallar las coordenadas del centro de masa.",
    "trap": "Tratar a la densidad $\\rho$ como una constante cuando el enunciado indica que varía con la distancia (ej. $\\rho(x,y,z) = k z$ o $\\rho = k\\sqrt{x^2+y^2}$)."
  },
  {
    "id": "t5-center-of-mass",
    "topic": "t5",
    "topicName": "Integrales en Rⁿ, Medida Jordan y Aplicaciones Físicas",
    "symbol": "$\\bar{\\mathbf{x}} = (\\bar{x}, \\bar{y}, \\bar{z}) = \\frac{1}{M} \\left( \\iiint x\\rho\\,dV, \\ \\iiint y\\rho\\,dV, \\ \\iiint z\\rho\\,dV \\right)$",
    "name": "Centro de masa (o baricentro de un sólido)",
    "reading": "Centro de masa: equis barra, ye barra, zeta barra",
    "simple": "El punto de equilibrio perfecto del cuerpo. Si apoyas el objeto sobre la punta de una aguja colocada en $(\\bar{x},\\bar{y},\\bar{z})$, el objeto permanece en reposo sin volcarse.",
    "action": "Aprovecha la simetría: si el sólido y su función de densidad son simétricos respecto al plano $XY$ ($z=0$), puedes concluir directamente $\\bar{z} = 0$ sin calcular la integral.",
    "trap": "Olvidar dividir entre la masa total $M$. Calcular solo $\\iiint x\\rho\\,dV$ da el primer momento respecto al plano $YZ$ ($M_{yz}$), no la coordenada $\\bar{x}$."
  },
  {
    "id": "t5-moments-of-inertia",
    "topic": "t5",
    "topicName": "Integrales en Rⁿ, Medida Jordan y Aplicaciones Físicas",
    "symbol": "$I_z = \\iiint_\\Omega (x^2 + y^2) \\rho(x,y,z)\\,dV$",
    "name": "Momento de inercia respecto al eje $Z$",
    "reading": "Momento de inercia respecto al eje zeta",
    "simple": "Mide la inercia rotacional del cuerpo: cuánto se resiste a ser puesto a girar alrededor del eje $Z$. Cuanto más lejos del eje esté distribuida la masa ($r^2 = x^2+y^2$), más difícil es hacerlo rotar.",
    "action": "Recuerda la regla de las distancias perpendiculares: para $I_x$ el integrando lleva $y^2+z^2$; para $I_y$ lleva $x^2+z^2$; para $I_z$ lleva $x^2+y^2$.",
    "trap": "Poner únicamente $z^2$ en la fórmula de $I_z$. La distancia de un punto espacial al eje $Z$ es la distancia radial en el plano $XY$, es decir $\\sqrt{x^2+y^2}$, por lo que su cuadrado es $x^2+y^2$."
  },
  {
    "id": "t5-polar-moment",
    "topic": "t5",
    "topicName": "Integrales en Rⁿ, Medida Jordan y Aplicaciones Físicas",
    "symbol": "$I_0 = \\iiint_\\Omega (x^2 + y^2 + z^2) \\rho\\,dV = \\frac{1}{2}(I_x + I_y + I_z)$",
    "name": "Momento polar de inercia respecto al origen",
    "reading": "Momento polar de inercia respecto al origen",
    "simple": "Cuantifica la dispersión esférica de la masa de un cuerpo respecto al punto de origen $(0,0,0)$. Suma las contribuciones rotacionales de los tres ejes cartesianos.",
    "action": "En coordenadas esféricas es inmediato de integrar porque $x^2+y^2+z^2 = \\rho^2$, resultando en $\\iiint \\rho^4\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta$ para densidad homogénea.",
    "trap": "Confundir la relación tridimensional $I_0 = \\frac{1}{2}(I_x + I_y + I_z)$ con la fórmula bidimensional de láminas planas $I_0 = I_x + I_y$."
  },
  {
    "id": "t5-steiner-theorem",
    "topic": "t5",
    "topicName": "Integrales en Rⁿ, Medida Jordan y Aplicaciones Físicas",
    "symbol": "$I_L = I_{\\text{cm}} + M d^2$",
    "name": "Teorema de Steiner (Teorema de los ejes paralelos)",
    "reading": "Momento de inercia respecto al eje L igual al momento centroidal más masa por distancia al cuadrado",
    "simple": "Rotar un martillo sobre su centro de masa requiere mucho menos esfuerzo que rotarlo por la punta del mango. El término $M d^2$ mide el sobrecosto de inercia debido a la distancia de traslación $d$.",
    "action": "Calcula el momento de inercia sobre un eje central que pase por el centro de masa $I_{\\text{cm}}$, y trasládalo a cualquier eje paralelo sumando el producto de la masa total $M$ por el cuadrado de la distancia $d$.",
    "trap": "Intentar aplicar la fórmula entre dos ejes paralelos arbitrarios que no pasen por el centro de masa. El teorema SOLO funciona si uno de los dos ejes es el eje centroidal."
  },
  {
    "id": "t5-average-value",
    "topic": "t5",
    "topicName": "Integrales en Rⁿ, Medida Jordan y Aplicaciones Físicas",
    "symbol": "$f_{\\text{prom}} = \\frac{1}{\\operatorname{Vol}(\\Omega)} \\iiint_\\Omega f(x,y,z)\\,dV$",
    "name": "Valor promedio de un campo escalar sobre un sólido",
    "reading": "Efe promedio igual a uno sobre el volumen de Omega por la triple integral de efe",
    "simple": "Si trituraras y licuaras todo el sólido redistribuyendo uniformemente la propiedad $f$ (como la temperatura o la concentración), el valor homogéneo resultante sería este valor medio.",
    "action": "Calcula la triple integral de la función sobre el sólido y divídela entre el volumen total del sólido $\\operatorname{Vol}(\\Omega) = \\iiint 1\\,dV$.",
    "trap": "Olvidar dividir entre el volumen $\\operatorname{Vol}(\\Omega)$. La integral triple sola representa la magnitud total acumulada, no el valor promedio."
  }
];

// Mapeos auxiliares para indexación y consultas rápidas por subtema
window.PC5_GLOSSARY_BY_TOPIC = {
  t1: window.PC5_GLOSSARY_DATA.filter(function(item) { return item.topic === 't1'; }),
  t2: window.PC5_GLOSSARY_DATA.filter(function(item) { return item.topic === 't2'; }),
  t3: window.PC5_GLOSSARY_DATA.filter(function(item) { return item.topic === 't3'; }),
  t4: window.PC5_GLOSSARY_DATA.filter(function(item) { return item.topic === 't4'; }),
  t5: window.PC5_GLOSSARY_DATA.filter(function(item) { return item.topic === 't5'; })
};
