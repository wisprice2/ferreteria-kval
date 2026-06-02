# Resumen del Proyecto
Catálogo web y portafolio profesional para ferretería industrial KVAL, especializada en suministros técnicos, herramientas, y ejecución de obras en tuberías HDPE y geosintéticos.

## Arquitectura y Stack
- **Stack:** React, Vite, Tailwind CSS.
- **Estructura:** Aplicación de Página Única (SPA). Toda la lógica central y de UI (incluyendo el catálogo de productos y manejo de estado de cotizaciones) está contenida en `src/App.jsx`.

## Sistema UI/UX
- **Colores corporativos:** Predominio de modo limpio, detalles en gris oscuro (`slate-900`) y acentos corporativos de alto contraste (`amber-500` a `orange-500`).
- **Tipografía e Interacción:** Estilos robustos y gruesos (font-black) para destacar los encabezados. Micro-interacciones integradas: botones dinámicos con sombras resplandecientes, cursores temáticos (`cursor-zoom-in`), y efectos de escalado pronunciado (`hover:scale-[1.8]`, `z-50`) en la galería de fotos.
- **Diseño General:** Apariencia Premium e industrial, descartando visualizaciones complejas innecesarias en favor de galerías limpias y flujos de usuario directos hacia la cotización.

## Componentes y Funcionalidades
- **Catálogo Principal:** Lista unificada bajo la categoría "Ferretería Industrial". Permite visualizar fichas técnicas y agregar productos a una orden de compra temporal.
- **Cotizador Integrado:** Sistema de "carrito" para almacenar insumos seleccionados y enviar una solicitud formal de cotización junto a un formulario de contacto.
- **División de Obras (Servicios):** Sección dedicada a mostrar la experiencia en terreno con HDPE y geosintéticos. Cuenta con un listado detallado de especialidades y una vitrina interactiva de 12 fotografías reales, junto a los hitos de proyectos ejecutados.
- **Formulario de Contacto:** Segmento inferior para canalizar prospectos comerciales que soliciten asesoría de ingeniería.

## Estado Actual y Cambios Recientes
- Extracción limpia de 58 imágenes desde documentos internos `.docx` del cliente (Fijaciones, Brocas, Eslingas, Lijas, Herramientas y Diluyentes) y mapeo dinámico.
- Limpieza y reestructuración total de UI:
  - Eliminación de "Calculadoras" y "Tablas comparativas" para priorizar directamente los productos y servicios operativos.
  - Fusión exitosa de "Proyectos Ejecutados" y "Servicios" en un único gran bloque comercial con títulos profesionales ("Obras que Respaldan Nuestra Experiencia" / "Galería de Proyectos Reales").
- Corrección de desincronización de nombres de productos e imágenes basándose en los metadatos del Word.

## Pendientes y Bugs Conocidos
- No se registran bugs actuales.
- **Pendiente:** Verificar periódicamente que la ampliación del hover de la galería no desborde en ciertos tamaños de pantalla en dispositivos móviles extremos.

## Decisiones Técnicas (ADRs)
- **Extracción de Assets Offline:** En lugar de buscar imágenes genéricas de internet, se parsearon directamente los archivos Word del cliente utilizando un script de Python `dump_full.py`, extrayendo las rutas del XML interno para usar material 100% verídico.
- **Base de Datos Embebida:** Se consolidó el catálogo de productos localmente en el array `KVAL_PRODUCTS` dentro de la SPA, ahorrando llamados asíncronos y tiempos de carga, ideal para un catálogo B2B estático.
