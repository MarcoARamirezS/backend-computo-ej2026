# 🚀 DEMEN ERP Backend

Este proyecto corresponde a un **Backend empresarial** desarrollado con **Node.js + Express + Firebase Firestore**, diseñado como proyecto final académico para que los alumnos construyan el frontend consumiendo esta API.

Incluye autenticación con JWT, control de accesos basado en roles y permisos (RBAC), auditoría de acciones del sistema y un dashboard con métricas clave.

---

## 🛠️ Tecnologías Utilizadas

- **Node.js (ESM)**
- **Express.js**
- **Firebase Firestore (firebase-admin)**
- **JWT (JSON Web Tokens)**
- **bcryptjs** para el hash de contraseñas
- **Zod** para validación de datos
- **RBAC** (Roles y Permisos)
- **Arquitectura por capas**
- **Auditoría y Dashboard**

---

## 📁 Estructura del Proyecto

```
src/
├── app.js
├── server.js
├── config/
│   ├── firebase.js
│   └── jwt.js
├── middlewares/
│   ├── auth.js
│   ├── requirePermissions.js
│   ├── validate.js
│   └── errorHandler.js
├── modules/
│   ├── auth/
│   ├── users/
│   ├── roles/
│   ├── permissions/
│   ├── clients/
│   ├── suppliers/
│   ├── products/
│   ├── inventory/
│   ├── recepciones/
│   ├── audit/
│   └── dashboard/
├── routes/
│   └── index.js
├── utils/
│   └── audit.js
└── seeds/
    └── create-first-user.js
```

---

## 🔐 Autenticación

### Login
```
POST /api/auth/login
```

**Request**
```json
{
  "usuario": "proyecto",
  "password": "Hello2U\""
}
```

**Response**
```json
{
  "token": "JWT_TOKEN"
}
```

---

## 🛡️ Control de Acceso (RBAC)

El sistema utiliza permisos con el formato:

```
recurso:accion
```

### Ejemplos
- `users:create`
- `products:update`
- `inventory:update`
- `dashboard:read`
- `audit:read`

---

## 📦 Módulos del Sistema

### 🔹 Auth
- `POST /api/auth/login`
- `GET /api/auth/me`

### 🔹 Users
- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users`
- `PATCH /api/users/:id`
- `PATCH /api/users/:id/toggle-active`
- `DELETE /api/users/:id`

### 🔹 Roles
- `GET /api/roles`
- `GET /api/roles/:id`
- `POST /api/roles`
- `PATCH /api/roles/:id`
- `DELETE /api/roles/:id`

### 🔹 Permissions
- `GET /api/permissions`
- `GET /api/permissions/:id`
- `POST /api/permissions`
- `PATCH /api/permissions/:id`
- `DELETE /api/permissions/:id`
- `POST /api/permissions/seed`

### 🔹 Clients
- `GET /api/clients`
- `GET /api/clients/:id`
- `POST /api/clients`
- `PATCH /api/clients/:id`
- `PATCH /api/clients/:id/toggle-active`
- `DELETE /api/clients/:id`

### 🔹 Suppliers
- `GET /api/suppliers`
- `GET /api/suppliers/:id`
- `POST /api/suppliers`
- `PATCH /api/suppliers/:id`
- `PATCH /api/suppliers/:id/toggle-active`
- `DELETE /api/suppliers/:id`

### 🔹 Products
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `PATCH /api/products/:id`
- `PATCH /api/products/:id/toggle-active`
- `DELETE /api/products/:id`

### 🔹 Inventory
- `GET /api/inventory`
- `GET /api/inventory/:productId`
- `POST /api/inventory/:productId/adjust`
- `GET /api/inventory/movements`

### 🔹 Recepciones
- `GET /api/recepciones`
- `GET /api/recepciones/:id`
- `POST /api/recepciones`
- `PATCH /api/recepciones/:id`
- `POST /api/recepciones/:id/confirm`
- `DELETE /api/recepciones/:id`

### 🔹 Audit
- `GET /api/audit`
- `GET /api/audit/:id`
- `POST /api/audit`

### 🔹 Dashboard
- `GET /api/dashboard/summary`
- `GET /api/dashboard/recent-activity`

---

## 📝 Formato de Respuestas

### Listados
```json
{
  "items": [],
  "total": 0,
  "page": 1,
  "limit": 10
}
```

### Obtener un elemento
```json
{
  "item": {}
}
```

### Creación / Actualización
```json
{
  "message": "Operación exitosa",
  "item": {}
}
```

### Eliminación
```json
{
  "message": "Eliminado correctamente"
}
```

---

## 🧾 Auditoría

Todas las acciones relevantes del sistema son registradas automáticamente en la colección `audit`, incluyendo:

- Creación, actualización y eliminación de registros
- Ajustes de inventario
- Confirmación de recepciones
- Gestión de roles y permisos

---

## 📊 Dashboard

El endpoint `/api/dashboard/summary` proporciona:

- Totales de usuarios, clientes, proveedores y productos
- Productos con bajo stock
- Recepciones recientes
- Movimientos de inventario
- Actividad reciente del sistema

---

## 🌱 Script para Crear el Primer Usuario

### Ejecutar el Script

```bash
npm run seed:first-user
```

### Credenciales del Usuario Inicial

| Campo    | Valor              |
|----------|--------------------|
| Usuario  | proyecto           |
| Password | Hello2U"           |
| Email    | proyecto@erp.local |
| Rol      | ADMIN              |

---

## ⚙️ Instalación y Ejecución

### 1. Instalar dependencias
```bash
npm install
```

### 2. Variables de entorno (.env)
```env
PORT=
NODE_ENV=development
CORS_ORIGIN=

JWT_SECRET=
JWT_EXPIRES_IN=
JWT_REFRESH_SECRET=
JWT_REFRESH_EXPIRES_IN=

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=""
```

### 3. Crear el usuario inicial
```bash
npm run seed:first-user
```

### 4. Ejecutar el servidor
```bash
npm run dev
```

El servidor estará disponible en:
```
http://localhost:3001/api
```

---

## 🧪 Endpoint de Salud

```
GET /api/health
```

**Response**
```json
{
  "status": "ok"
}
```

---

## 🎯 Objetivo Académico

Este backend está diseñado para que los alumnos desarrollen el **frontend** utilizando tecnologías modernas como React o Nuxt, consumiendo una API REST segura y escalable.

---

## 📄 Licencia

Este proyecto es de uso académico y educativo.
