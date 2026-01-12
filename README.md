# web_project_api_full

Proyecto final (Sprint 19): backend + frontend en un solo repositorio.

## Estructura

```bash
web_project_api_full/
├─ backend/
├─ frontend/
└─ README.md

Progreso — Sprint 19

Parte I — Autorización y registro de usuarios

✅  I.1 — Esquema de usuario: email y password

        Se aggregator los campos email y password al esquema de usuario.
        email es único (unique: true) y se valida con validator.isEmail.
        En este punto, password aún se devuelve por defecto (se ajustará en el punto I.10).

✅  I.2 — Actualizar controlador createUser (hash + defaults + opcionales)

        Se actualizó el controlador createUser para recibir email y password desde el body.
        La contraseña se guarda hasheada usando bcryptjs antes de persistir en la base de datos.
        name, about y avatar quedan opcionales y usan valores por defecto en el esquema:
            name: "Jacques Cousteau"
            about: "Explorador"
            avatar: enlace por defecto

✅  I.3 — Crear controlador login (JWT expira en 1 semana)

        Se creó el controlador login para autenticar por email y password.
        Si las credenciales son correctas, se genera un JWT con payload { _id } que expira en 7 días.
        Si las credenciales son inválidas, el servidor responde con 401.

✅  I.4 — Crear rutas POST /signin y POST /signup

        Se agregaron las rutas POST /signin y POST /signup en app.js.
        Se conectaron a los controladores login y createUser.
        La creación de usuarios se maneja desde /signup (ya no se usa la ruta de creación en routes/users.js, si aplicaba).

✅  I.5 — Middleware de autorización auth

        Se creó el middleware auth para verificar el JWT desde los encabezados (Authorization: Bearer <token>).
        Si el token es válido, el payload se asigna a req.user y se ejecuta next().
        Si el token es inválido o no existe, el servidor responde con 401.

 I.6 — Ruta GET /users/me
 I.7 — Proteger rutas (excepto signin/signup)
 I.8 — Eliminar usuario hardcodeado en req.user
 I.9 — Verificar derechos (no borrar/editar de otros)
 I.10 — Evitar retornar el hash (select: false + .select('+password'))
 I.11 — Configurar token en el front (localStorage + headers Authorization)

Parte II — Configuración y despliegue

 II.1 — Manejo centralizado de errores (500 por defecto)
 II.2 — Validación de solicitudes (celebrate/Joi + validator.isURL)
 II.3 — Logs de requests y errores (JSON, sin subir logs al repo)
 II.4 — Integrar frontend y backend en servidor (build + scp)
 II.5 — Desplegar API en servidor
 II.6 — App totalmente funcional (CRUD + likes + auth)
 II.7 — Crear .env en servidor
 II.8 — Dominio + subdominio API + nginx
 II.9 — HTTPS (certificados)
 II.10 — crash-test + PM2 recovery (y borrar después)
 II.11 — README con dominio final