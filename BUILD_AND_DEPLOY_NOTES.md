# Registro de cambios para que el build corra

## Fecha
2026-03-02

## Contexto
Instancia: i-0a990c216a81dfd45
Perfil AWS: agrovet
Ruta del frontend: /var/www/campanias_frontend

## Estado previo detectado
- El dominio /promo-concierto/backoffice/... no resolvía correctamente algunas imágenes.
- El frontend y Nginx ya estaban configurados para servir /promo-concierto/ como SPA desde dist/.
- Se requería compilar de nuevo para que los cambios de frontend se reflejen en producción.

## Cambios aplicados
- Se corrigieron varios archivos de TypeScript/React para que el build finalice sin errores:
  - src/modules/auth/components/legal-signup-form.tsx
  - src/modules/auth/components/natural-signup-form.tsx
  - src/modules/auth/schemas/register.schema.ts
  - src/modules/auth/types/auth.types.ts
  - src/modules/boletas/components/boleta-data-table.tsx
  - src/modules/core/components/data-table.tsx
  - src/modules/core/components/nav-documents.tsx
  - src/modules/core/components/nav-user.tsx
  - src/modules/landing/welcome.tsx
  - src/modules/notificaciones/components/Notificacionespage.tsx
  - src/modules/notificaciones/services/notificacion.service.ts
  - src/routes/_auth/_layout/verify-email.lazy.tsx
- Se agregó tipado faltante: src/bprogress-css.d.ts
- Se limpiaron artefactos de estado previo que no debían participar en el build final: package-lock.json y public/assets
- Se confirmó configuración Nginx de /promo-concierto/ y /promo-concierto/backoffice/images path con alias a directorios del frontend

## Comandos ejecutados en la instancia
1) Verificación y reinicio de servicio
systemctl restart nginx
systemctl is-active nginx
systemctl status nginx --no-pager -l
nginx -t

2) Generación de build
cd /var/www/campanias_frontend
npm run build

## Resultado
- Build correcto.
- Nginx en estado active (running)
- Configuración de Nginx valida (nginx -t ok)

## Operación para próximas actualizaciones
- Mantener estos pasos en cada despliegue:
  - git pull
  - npm run build
  - systemctl restart nginx
- En caso de conflicto, resolver primero en código, volver a build y solo luego reiniciar Nginx.
