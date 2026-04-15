
# ERP Académico Modular API

## 📌 Descripción General
Este proyecto corresponde a un **backend desarrollado con Node.js** como parte de un sistema ERP académico modular. Está diseñado para que los estudiantes desarrollen posteriormente el frontend consumiendo esta API REST.

El sistema incluye autenticación, gestión de usuarios y una arquitectura escalable basada en buenas prácticas de desarrollo backend.

---

## 🚀 Tecnologías Utilizadas

- **Node.js** – Entorno de ejecución.
- **Express** – Framework para la creación de la API REST.
- **Firestore (Firebase Admin SDK)** – Base de datos NoSQL.
- **JWT (jsonwebtoken)** – Autenticación basada en tokens.
- **bcryptjs** – Hashing seguro de contraseñas.
- **Zod** – Validación de datos.
- **dotenv** – Manejo de variables de entorno.
- **CORS** – Control de acceso entre dominios.
- **Nodemon** – Recarga automática en desarrollo.

---

## 📁 Estructura del Proyecto

```
erp-backend/
├─ src/
│  ├─ app.js
│  ├─ server.js
│  ├─ config/
│  │  ├─ env.js
│  │  ├─ firebase.js
│  │  └─ jwt.js
│  ├─ middlewares/
│  │  ├─ auth.js
│  │  ├─ errorHandler.js
│  │  ├─ notFound.js
│  │  └─ validate.js
│  ├─ modules/
│  │  ├─ health/
│  │  ├─ auth/
│  │  └─ users/
│  ├─ routes/
│  │  └─ index.js
│  └─ utils/
│     └─ asyncHandler.js
├─ .env
├─ .gitignore
└─ package.json
```

---

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd erp-backend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env`:

```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

JWT_SECRET=super_secret_jwt_key
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=super_secret_refresh_key
JWT_REFRESH_EXPIRES_IN=7d

FIREBASE_PROJECT_ID=tu_project_id
FIREBASE_CLIENT_EMAIL=tu_client_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTU_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
```

### 4. Ejecutar el proyecto

```bash
npm run dev
```

La API estará disponible en:

```
http://localhost:3001
```

---

## 🔐 Autenticación

La autenticación se realiza mediante **JSON Web Tokens (JWT)**.

### Endpoint de Login

```http
POST /api/auth/login
```

#### Request
```json
{
  "usuario": "admin",
  "password": "123456"
}
```

#### Response
```json
{
  "token": "jwt_token",
  "user": {
    "id": "admin001",
    "nombre": "Marco",
    "apellido": "Ramirez",
    "email": "admin@erp.com",
    "usuario": "admin",
    "role": "ADMIN",
    "roleId": "role_admin",
    "permissions": ["dashboard:read"],
    "activo": true
  }
}
```

### Obtener Usuario Autenticado

```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Response
```json
{
  "user": {
    "id": "admin001",
    "nombre": "Marco",
    "apellido": "Ramirez",
    "email": "admin@erp.com",
    "usuario": "admin",
    "role": "ADMIN",
    "roleId": "role_admin",
    "permissions": ["dashboard:read"],
    "activo": true
  }
}
```

---

## 👥 Módulo de Usuarios

### 1. Listar Usuarios

```http
GET /api/users
Authorization: Bearer <token>
```

#### Query Params
- `q`: búsqueda por nombre, email o usuario.
- `activo`: filtrar por estado.
- `page`: número de página.
- `limit`: número de registros por página.

#### Response
```json
{
  "items": [],
  "total": 0,
  "page": 1,
  "limit": 10
}
```

---

### 2. Obtener Usuario por ID

```http
GET /api/users/:id
```

#### Response
```json
{
  "item": {
    "id": "abc123",
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan@erp.com",
    "usuario": "juanp",
    "role": "OPERADOR",
    "roleId": "role_operador",
    "permissions": [],
    "activo": true,
    "createdAt": "2026-04-14T00:00:00.000Z",
    "updatedAt": "2026-04-14T00:00:00.000Z"
  }
}
```

---

### 3. Crear Usuario

```http
POST /api/users
```

#### Request
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@erp.com",
  "usuario": "juanp",
  "password": "123456",
  "role": "OPERADOR",
  "roleId": "role_operador",
  "permissions": [],
  "activo": true
}
```

#### Response
```json
{
  "message": "Usuario creado correctamente",
  "item": { ... }
}
```

---

### 4. Actualizar Usuario

```http
PATCH /api/users/:id
```

#### Response
```json
{
  "message": "Usuario actualizado correctamente",
  "item": { ... }
}
```

---

### 5. Activar/Desactivar Usuario

```http
PATCH /api/users/:id/toggle-active
```

#### Request
```json
{
  "activo": false
}
```

#### Response
```json
{
  "message": "Estado del usuario actualizado correctamente",
  "item": { ... }
}
```

---

### 6. Eliminar Usuario

```http
DELETE /api/users/:id
```

#### Response
```json
{
  "message": "Usuario eliminado correctamente"
}
```

---

## 📦 Endpoint de Salud

```http
GET /api/health
```

#### Response
```json
{
  "message": "API funcionando correctamente",
  "timestamp": "2026-04-14T00:00:00.000Z"
}
```

---

## 📑 Formato Estándar de Respuestas

### Respuesta Exitosa
```json
{
  "message": "Operación realizada correctamente",
  "item": {}
}
```

### Respuesta de Listado
```json
{
  "items": [],
  "total": 0,
  "page": 1,
  "limit": 10
}
```

### Respuesta de Error
```json
{
  "message": "Descripción del error"
}
```

### Error de Validación
```json
{
  "message": "Error de validación",
  "errors": {
    "campo": "Mensaje de error"
  }
}
```

---

## 🔒 Seguridad

- Contraseñas almacenadas con **bcrypt**.
- Autenticación mediante **JWT**.
- Middleware de protección de rutas.
- Validación de datos con **Zod**.
- Manejo centralizado de errores.
- Uso de variables de entorno para información sensible.

---

## 🧪 Pruebas con Postman

Se recomienda crear una colección en Postman con los endpoints definidos para facilitar las pruebas y la integración con el frontend.

---

## 📈 Próximos Módulos

El sistema está diseñado para escalar con los siguientes módulos:

- Roles
- Permisos
- Clientes
- Proveedores
- Productos
- Inventario
- Recepciones
- Auditoría
- Dashboard

---

## 👨‍🏫 Propósito Académico

Este backend sirve como base para que los estudiantes:

- Consuman una API REST real.
- Implementen autenticación en el frontend.
- Gestionen permisos por rol.
- Desarrollen interfaces CRUD completas.
- Comprendan arquitecturas empresariales.

---

## 📄 Licencia

Este proyecto se distribuye con fines académicos y educativos.
