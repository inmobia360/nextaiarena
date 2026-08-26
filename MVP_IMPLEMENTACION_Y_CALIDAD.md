# NextAI Arena — marco de implementación del MVP

## Decisión de producto

NextAI Arena se validará primero en España, pero se diseñará desde el inicio para crecer internacionalmente y atender tanto a B2B como a B2C. No se crearán dos productos separados: el núcleo será común y la experiencia se adaptará mediante segmentos, casos de uso, filtros y permisos.

La prioridad no es construir un directorio genérico, sino validar una plataforma donde las personas descubren, comparan y prueban herramientas de IA con información estructurada, transparencia y señales comunitarias.

## Alcance funcional del MVP

### Debe incluir

- Catálogo estructurado de herramientas.
- Las cinco categorías confirmadas y sus casos de uso.
- Búsqueda por necesidad, problema, sector y tecnología.
- Filtros por precio, idioma, dificultad, integraciones y público.
- Ficha verificable de cada herramienta.
- Comparación básica entre dos herramientas.
- Registro de usuarios y preferencias.
- Guardados y seguimiento.
- Votos y reseñas moderadas con controles básicos contra fraude.
- Founding Season sencilla, con parte de la operación manual.
- Formularios para marcas, especialistas y solicitudes de ayuda.
- Backoffice mínimo para catálogo, moderación y temporadas.
- Analítica segmentada B2B/B2C.
- Etiquetado visible de publicidad, afiliación y selección editorial.

### Queda fuera inicialmente

- Marketplace completo de contratación.
- Custodia o reparto automático de pagos.
- App móvil nativa.
- RAG, agentes autónomos y recomendaciones opacas.
- Subastas avanzadas.
- Traducción completa multiidioma.
- Certificaciones propias de cumplimiento o seguridad.
- Automatización masiva de contenido de terceros.

## Principios técnicos

- Continuar con Next.js App Router y TypeScript estricto en este repositorio; no cambiar a WordPress sin una decisión explícita basada en coste, velocidad y necesidades editoriales.
- Separar componentes de servidor y cliente según necesidad real.
- Validar entradas en servidor y cliente con Zod cuando se incorpore persistencia.
- Mantener separadas las capas de interfaz, dominio, acceso a datos e integraciones.
- Modelar desde el inicio país, idioma, moneda, región, zona horaria y fuente de verificación.
- Usar identificadores estables y fechas de última comprobación para herramientas, precios, integraciones y claims.
- Mantener el ranking orgánico independiente de patrocinio, afiliación y publicidad.
- No introducir infraestructura de IA avanzada hasta estabilizar catálogo, usuarios, votos y métricas.

## Modelo de datos inicial previsto

`User`, `Tool`, `Category`, `Tag`, `Integration`, `ToolPlan`, `Review`, `Vote`, `SavedTool`, `Season`, `SeasonEntry`, `Specialist`, `Lead`, `SponsorPlacement`, `AffiliateLink`, `Event` y `ModerationCase`.

La primera versión puede operar con altas, moderación y temporadas parcialmente manuales, pero los identificadores, estados, fechas y motivos de invalidación deben quedar preparados para una futura automatización.

## Calidad mínima para considerar terminada una funcionalidad

Toda funcionalidad crítica debe incluir:

- Estados de carga, vacío, error y éxito.
- Validación de datos y mensajes claros.
- Control de permisos.
- Accesibilidad básica y navegación por teclado.
- Diseño responsive.
- Tests unitarios o de integración cuando exista lógica de negocio.
- Al menos un flujo Playwright cuando afecte a una ruta crítica.
- Documentación breve de uso y decisiones.

## Orden de ejecución

1. Definir segmentos prioritarios, casos de uso y criterios de aceptación.
2. Diseñar el modelo de datos y contratos de API.
3. Crear catálogo, categorías, búsqueda, filtros y fichas.
4. Añadir registro, guardados, votaciones y moderación básica.
5. Construir comparación y primera Founding Season.
6. Añadir perfiles de especialistas y solicitudes de ayuda.
7. Incorporar analítica segmentada y panel editorial.
8. Automatizar lint, tipos, tests y build con GitHub Actions.
9. Revisar seguridad, privacidad, rendimiento y accesibilidad.
10. Validar el piloto antes de pagos, IA avanzada o expansión internacional.

## Métricas de aceptación

No se considerará validado el MVP solo por tráfico o registros. Se medirán búsquedas, búsquedas sin resultados, fichas vistas, comparaciones, guardados, votos válidos, retorno, clics externos, solicitudes de demo o implantación, participación de marcas y disposición a pagar.

Las métricas B2B y B2C se conservarán separadas, además de una visión global.

## Puerta de decisión

Antes de ampliar categorías, países o automatizaciones se revisará si existe:

- Uso repetido por una necesidad concreta.
- Catálogo suficiente y actualizado.
- Participación comunitaria no manipulada.
- Marcas y especialistas interesados.
- Señales de conversión o disposición a pagar.

La expansión técnica debe responder a evidencia del piloto, no a funcionalidades hipotéticas.
