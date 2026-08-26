# AI Tools Arena

## Buenas prácticas y decisiones estratégicas

Este documento complementa el informe técnico-funcional del proyecto y recoge las decisiones que deben mantenerse durante el diseño, desarrollo, validación y expansión de AI Tools Arena.

## 1. Posicionamiento del producto

AI Tools Arena será una plataforma internacional de descubrimiento, evaluación y promoción de herramientas de inteligencia artificial y automatización.

España será el mercado inicial de validación. El lanzamiento español debe servir para comprobar:

- Si existe demanda real.
- Qué perfiles de usuario participan.
- Qué categorías y casos de uso generan más interés.
- Si las marcas están dispuestas a pagar por visibilidad y adquisición.
- Si los rankings, temporadas y valoraciones generan confianza.
- Qué operaciones manuales deben automatizarse posteriormente.

España es, por tanto, el mercado piloto, no el límite geográfico ni estratégico del producto.

## 2. Alcance B2B y B2C

La plataforma no debe definirse exclusivamente como B2B. Debe admitir dos grandes líneas de uso:

### B2B

Empresas, departamentos, responsables de innovación, equipos de ventas, marketing, operaciones, atención al cliente y tecnología que buscan soluciones aplicables a problemas empresariales.

### B2C y usuarios profesionales

Particulares, autónomos, creadores, estudiantes, docentes y profesionales que buscan herramientas para productividad, educación, creación de contenido, organización, desarrollo o tareas personales.

El núcleo de producto será común para ambos públicos:

- Catálogo de herramientas.
- Búsqueda y navegación por necesidades.
- Filtros y comparaciones.
- Valoraciones y opiniones.
- Temporadas y rankings.
- Contenidos y guías.
- Guardados, seguimiento y alertas.

Las experiencias específicas deberán adaptarse al tipo de usuario:

- B2B: sectores, tamaño de empresa, integraciones, seguridad, cumplimiento, presupuesto, implantación, demo y especialistas.
- B2C: facilidad de uso, precio, plan gratuito, rapidez de prueba, dispositivo, idioma, curva de aprendizaje y casos personales.

## 3. Principio de arquitectura

Diseñar un único producto con capacidad multi-audiencia, no dos plataformas independientes.

La arquitectura debe permitir diferenciar posteriormente:

- Perfiles y necesidades de usuario.
- Taxonomías y casos de uso.
- Filtros y recomendaciones.
- Formularios de contacto.
- Planes comerciales.
- Paneles y métricas.
- Mensajes y contenidos.

No se deben crear estructuras rígidas que obliguen a elegir desde el principio entre B2B o B2C. La clasificación debe ser configurable mediante segmentos, etiquetas, casos de uso y reglas de visibilidad.

## 4. Internacionalización desde el inicio

Aunque la primera versión opere en España, deben evitarse decisiones que hagan costosa la expansión internacional.

Buenas prácticas mínimas:

- Separar contenido, traducciones y entidades principales.
- No fijar España como país por defecto en la lógica de negocio.
- Modelar país, idioma, moneda, zona horaria y región.
- No incrustar precios, impuestos o formatos fiscales en el código.
- Preparar dominios, slugs y URLs localizables.
- Permitir reglas de disponibilidad por país.
- Registrar la fuente y la fecha de comprobación de cada dato.
- Diseñar textos y componentes preparados para traducciones más largas.
- Evitar depender de proveedores que no puedan operar en futuras regiones objetivo.

La internacionalización técnica no implica lanzar varios países a la vez. Implica no tener que reescribir el producto cuando llegue el momento de hacerlo.

## 5. Estrategia de validación

La primera etapa debe validar el problema y el comportamiento antes de automatizar todo el sistema.

Se recomienda:

1. Lanzar una versión inicial en España.
2. Seleccionar pocas categorías y casos de uso.
3. Probar simultáneamente usuarios B2B y B2C, con mensajes diferenciados.
4. Operar manualmente altas, selección, moderación y seguimiento cuando sea más eficiente.
5. Medir búsquedas, perfiles vistos, clics, pruebas, votos, valoraciones, solicitudes y conversiones.
6. Entrevistar a usuarios y marcas para entender el motivo de compra, rechazo o abandono.
7. Ampliar categorías y países solo después de identificar señales repetibles.

No se debe interpretar tráfico o registros como validación suficiente. La validación debe demostrar utilidad, participación de calidad, retención y disposición a pagar cuando corresponda.

## 6. Monetización por segmentos

La monetización puede ser diferente para cada audiencia.

### Ingresos B2B

- Suscripciones profesionales.
- Perfiles verificados o ampliados.
- Campañas de captación.
- Posiciones patrocinadas.
- Solicitudes de demostración.
- Servicios de implantación mediante especialistas.
- Analítica y reporting para marcas.

### Ingresos B2C

- Afiliación declarada.
- Patrocinios y publicidad contextual.
- Planes premium para usuarios avanzados.
- Promociones o ventajas de herramientas.
- Contenidos, comparadores o experiencias de descubrimiento premium.

El ranking comunitario y la posición orgánica no deben venderse. La publicidad debe estar siempre identificada y separada visual y metodológicamente del resultado orgánico.

## 7. Métricas separadas

No mezclar automáticamente los resultados B2B y B2C. Deben existir métricas segmentadas y métricas globales.

### Métricas comunes

- Usuarios activos.
- Búsquedas y búsquedas sin resultados.
- Perfiles vistos.
- Clics salientes.
- Guardados y seguimientos.
- Votos y valoraciones válidas.
- Retorno y retención.

### Métricas B2B

- Solicitudes de demo.
- Solicitudes de implantación.
- Leads cualificados.
- Conversión de marca a pago.
- Renovaciones.
- Valor de campaña.
- Coste por oportunidad atribuida.

### Métricas B2C

- Activación tras el primer descubrimiento.
- Pruebas o registros en herramientas.
- Uso repetido por caso de uso.
- Conversión afiliada.
- Retención por categoría.
- Conversión a funciones premium.

## 8. Diseño de experiencia

La entrada principal no debe obligar al visitante a entender la diferencia entre B2B y B2C. La plataforma debe comenzar por la necesidad del usuario.

Ejemplos de entrada:

- “Quiero automatizar la atención al cliente”.
- “Necesito crear vídeos para redes sociales”.
- “Busco una herramienta para resumir documentos”.
- “Quiero implantar IA en mi empresa”.

Después se pueden solicitar datos adicionales para mejorar los resultados: tipo de usuario, sector, tamaño de empresa, presupuesto, nivel técnico o finalidad personal.

La interfaz debe evitar que el usuario confunda:

- Resultado orgánico.
- Selección editorial.
- Posición patrocinada.
- Afiliación.
- Verificación de identidad o información.

## 9. MVP recomendado

El MVP debe validar el núcleo del negocio y no intentar resolver todas las posibilidades internacionales desde el primer día.

### Núcleo prioritario

- Catálogo de herramientas.
- Búsqueda por necesidades y categorías.
- Fichas verificadas de forma limitada.
- Experiencia responsive para B2B y B2C.
- Guardados y seguimiento.
- Temporada comunitaria sencilla.
- Votos y valoraciones con controles básicos contra fraude.
- Primeras solicitudes de demo o ayuda.
- Backoffice de contenidos y moderación.
- Analítica segmentada.

### Funciones que pueden entrar después

- Suscripciones complejas.
- Posiciones patrocinadas avanzadas.
- Portal completo de especialistas.
- Afiliación automatizada.
- Recomendaciones personalizadas sofisticadas.
- Expansión multi-país.
- Aplicaciones móviles nativas.

## 10. Errores que deben evitarse

- Presentar el proyecto como un simple directorio.
- Encerrarlo desde el principio en el mercado español.
- Elegir B2B o B2C como decisión irreversible.
- Mezclar publicidad pagada con ranking comunitario.
- Construir funcionalidades comerciales antes de demostrar uso real.
- Medir solo visitas y registros sin medir utilidad o retorno.
- Diseñar una arquitectura internacional excesivamente compleja antes de validar España.
- Crear dos productos independientes para B2B y B2C sin necesidad demostrada.
- Introducir recomendaciones opacas difíciles de explicar.
- Prometer certificación legal, técnica o de seguridad de las herramientas listadas.

## 11. Decisiones que deben cerrarse antes del desarrollo principal

- Primeras categorías y casos de uso.
- Segmentos B2B y B2C prioritarios en España.
- Qué experiencia se lanzará primero para cada segmento.
- Qué acciones demostrarán aceptación real.
- Presupuesto y fecha límite del piloto.
- Fórmula inicial del ranking.
- Modelo de patrocinio y reglas de sustitución.
- Política de afiliación.
- Responsables de contenido, moderación, soporte y captación.
- Países previstos para la segunda etapa.
- Proveedores aceptables de pagos, analítica, correo y alojamiento.

## 12. Redacción recomendada para el documento maestro

La descripción estratégica del informe debería utilizar una fórmula similar a esta:

> AI Tools Arena es una plataforma internacional de descubrimiento, evaluación y promoción de herramientas de inteligencia artificial y automatización. Comenzará en España como mercado piloto para validar la aceptación, la funcionalidad, la participación comunitaria y la viabilidad económica. Su diseño permitirá atender tanto a empresas como a profesionales y usuarios particulares, mediante experiencias y modelos de monetización adaptados a cada segmento.

Esta definición mantiene el foco inicial en España, pero evita limitar el producto a un solo país o a un único tipo de cliente.
