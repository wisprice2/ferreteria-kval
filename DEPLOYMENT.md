# Publicación en Cloudflare Pages

- URL principal: https://solucionhidraulicahye.com/
- Proyecto: `ferreteria-kval`.
- Cuenta de Cloudflare: `6d7f7f9e91e44b2fa0de43fdea817d74`.
- Panel: https://dash.cloudflare.com/6d7f7f9e91e44b2fa0de43fdea817d74/pages/view/ferreteria-kval
- Repositorio: `wisprice2/ferreteria-kval`.
- Rama de producción: `master`.
- Comando de compilación: `npm run build`.
- Directorio publicado: `dist`.
- Configuración de Pages versionada: `wrangler.jsonc`.

Cloudflare está conectado a GitHub: los cambios enviados a `master` generan
una compilación y una publicación automáticas. Revisar su resultado en
Implementaciones dentro del panel de Pages.

## Dominio y HTTPS

El DNS autoritativo del dominio está en Cloudflare:

- `glen.ns.cloudflare.com`
- `sydney.ns.cloudflare.com`

Los nombres `@` y `www` apuntan mediante CNAME a `ferreteria-kval.pages.dev`.
La regla de Cloudflare `www al dominio principal` redirige por 301 desde
`https://www.solucionhidraulicahye.com/*` a
`https://solucionhidraulicahye.com/${1}`, conservando la cadena de consulta.
Está activada la opción Usar siempre HTTPS.

El registro y la renovación del dominio siguen administrándose desde Vercel.
El alojamiento de la web y la resolución DNS se administran en Cloudflare.
El proyecto publica archivos estáticos y no requiere Functions ni una base
de datos para el catálogo o las solicitudes de cotización por WhatsApp.

## Comprobación local

```sh
npm ci
npm run build
npm run preview
```

No se deben incluir claves ni tokens en este archivo o en el repositorio.
