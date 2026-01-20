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

✅  I.6 — Ruta GET /users/me

        Se creó la ruta GET /users/me para obtener la información del usuario actual.
        La ruta está protegida con el middleware auth y usa req.user._id del token.
        La respuesta devuelve los datos del usuario (sin incluir la contraseña).

✅  I.7 — Proteger rutas (excepto signin/signup)

        Se protegieron todas las rutas con el middleware auth, dejando públicas solo POST /signin y POST /signup.
        Las rutas protegidas devuelven 403 cuando no hay autorización.
        Si el token es inválido, se devuelve 401.

✅  I.8 — Eliminar usuario hardcodeado en req.user

        Se verificó que no existe el middleware que asignaba un _id fijo en req.user.
        req.user se establece únicamente a través del middleware auth usando el payload del JWT.

✅  I.9 — Verificar derechos (no borrar/editar de otros)

        Se implementó la edición del perfil únicamente para el usuario autenticado mediante PATCH /users/me usando req.user._id.
        Un usuario no puede editar perfiles ajenos porque no se usa edición por userId.
        La restricción de eliminación de tarjetas por propietario se implementará cuando se agreguen los endpoints de tarjetas.

✅  I.10 — Evitar retornar el hash (select: false + .select('+password'))

        Se configuró el campo password del esquema con select: false para que no se devuelva por defecto.
        En login, se usa User.findOne({ email }).select('+password') para obtener el hash solo durante la autenticación.

✅  I.11 — Configurar token en el front (localStorage + headers Authorization)

        Se guarda el JWT en localStorage (jwt) y en estado al iniciar sesión.
        Al cargar la app, se lee el token y se valida solicitando GET /users/me.
        Se envía Authorization: Bearer <token> en las solicitudes protegidas a la API.
        Se ajustaron los endpoints del frontend para usar rutas locales/proxy hacia el backend.

Parte II — Configuración y despliegue

✅  II.1 — Manejo centralizado de errores (500 por defecto)

        Se implementó middleware centralizado para manejar errores en un solo lugar.
        Los controladores delegan errores usando next(err) en lugar de responder desde .catch.
        Errores conocidos usan statusCode (400/401/404/409) y los imprevistos responden con 500 y mensaje genérico.
        Se ajustó ESLint para ignorar next en no-unused-vars.

✅   II.2 — Validación de solicitudes (celebrate/Joi + validator.isURL)

        Se validan los cuerpos de las solicitudes antes de llegar a los controladores usando celebrate.
        /signup valida email, password y campos opcionales (name, about, avatar).
        /signin valida email y password.
        PATCH /users/me valida name y about.
        Se implementó validación de URLs con validator.isURL usando Joi.custom().
        
✅   II.3 — Logs de requests y errores (JSON, sin subir logs al repo)

        Se implementó registro de solicitudes y errores con winston + express-winston.
        Cada request se guarda en backend/logs/request.log en formato JSON.
        Los errores se guardan en backend/logs/error.log en formato JSON.
        Los archivos de logs están ignorados por Git mediante .gitignore.

✅   II.4 — Integrar frontend y backend en servidor (build + scp)

        Se compila el frontend para producción (npm run build) y se genera la carpeta build/dist.
        Se copia el build al servidor (scp/rsync) dentro de la ruta pública definida por Nginx.
        En el servidor, Nginx sirve el frontend (estáticos) y enruta las solicitudes /api hacia el backend (proxy_pass).
        Se verifica que el frontend consume la API del servidor (no localhost) y que no hay errores de CORS.

 II.5 — Desplegar API en servidor
 II.6 — App totalmente funcional (CRUD + likes + auth)
 II.7 — Crear .env en servidor
 II.8 — Dominio + subdominio API + nginx
 II.9 — HTTPS (certificados)
 II.10 — crash-test + PM2 recovery (y borrar después)
 II.11 — README con dominio final