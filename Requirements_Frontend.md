# 📋 Requirements.md – Frontend DEMEN ERP

## 🎯 Objetivo

Desarrollar un **frontend administrativo** que consuma la API del backend DEMEN ERP. El sistema debe permitir la gestión integral de los módulos principales mediante una interfaz moderna y funcional.

El frontend puede desarrollarse utilizando:

- **Vue 3** o **React**
- **TailwindCSS** para estilos
- **DaisyUI** para componentes de interfaz

---

## 🧱 Alcance General

El sistema debe incluir:

- Autenticación con JWT
- Rutas protegidas
- Layout administrativo (navbar + sidebar)
- Dashboard con métricas
- Módulos CRUD principales
- Manejo de permisos (RBAC)
- Experiencia de usuario consistente
- Validación de formularios
- Manejo de estados de carga y errores

---

## 🗂️ Módulos Obligatorios

| Módulo        | Descripción |
|--------------|-------------|
| **Auth** | Inicio y cierre de sesión |
| **Dashboard** | Métricas generales del sistema |
| **Users** | Gestión de usuarios |
| **Roles** | Gestión de roles |
| **Permissions** | Visualización de permisos |
| **Clients** | Gestión de clientes |
| **Suppliers** | Gestión de proveedores |
| **Products** | Gestión de productos |
| **Inventory** | Consulta y ajustes de inventario |
| **Recepciones** | Registro y confirmación de recepciones |
| **Audit** | Consulta de eventos de auditoría |

---

## 🎨 Requisitos de Interfaz

### Layout
- Navbar superior con nombre del sistema y botón de logout.
- Sidebar con navegación a los módulos.
- Contenedor principal para el contenido.

### Componentes UI mínimos
- Tabla con paginación y filtros.
- Formularios con validación.
- Modal de confirmación para eliminar.
- Badges para estados (activo/inactivo, confirmado, etc.).
- Alertas de éxito y error.
- Indicadores de carga (loading).
- Cards para métricas del dashboard.

---

## 🔐 Autenticación

### Requisitos
- Pantalla de login con usuario y contraseña.
- Consumo del endpoint `/api/auth/login`.
- Almacenamiento seguro del token JWT.
- Envío automático del token en el header `Authorization`.
- Redirección al login cuando el token no exista o sea inválido.
- Funcionalidad de logout.

### Flujo de Validación
1. El usuario ingresa credenciales.
2. El sistema valida contra el backend.
3. Si es exitoso, se guarda el token y se redirige al dashboard.
4. Si falla, se muestra un mensaje de error.

---

## 📊 Dashboard

### Requisitos
- Mostrar métricas generales:
  - Total de usuarios.
  - Total de clientes.
  - Total de proveedores.
  - Total de productos.
  - Productos con bajo stock.
  - Actividad reciente.
  - Recepciones recientes.

### Flujo de Validación
1. El usuario autenticado accede al dashboard.
2. El sistema consume `/api/dashboard/summary`.
3. Se muestran las métricas en tarjetas y tablas.

---

## 👥 Users

### Funcionalidades
- Listar usuarios.
- Crear usuario.
- Editar usuario.
- Activar/Desactivar usuario.
- Eliminar usuario.

### Flujo de Validación
1. Crear un usuario y verificar su aparición en la tabla.
2. Editar un usuario y validar los cambios.
3. Desactivar y reactivar un usuario.
4. Eliminar un usuario y confirmar su eliminación.

---

## 🧑‍💼 Roles y Permissions

### Roles
- Listar roles.
- Crear roles con permisos asociados.
- Editar roles.
- Eliminar roles.

### Permissions
- Listar permisos existentes.
- Mostrar los permisos asignados a cada rol.

### Flujo de Validación
1. Crear un nuevo rol con permisos.
2. Asignar el rol a un usuario.
3. Validar que el usuario solo vea los módulos permitidos.

---

## 🏢 Clients y Suppliers

### Funcionalidades
- Listar registros.
- Crear nuevos registros.
- Editar registros.
- Activar/Desactivar.
- Eliminar registros.

### Flujo de Validación
1. Crear un cliente/proveedor y verificar su aparición.
2. Editar la información y validar los cambios.
3. Desactivar y reactivar el registro.
4. Eliminar el registro.

---

## 📦 Products

### Funcionalidades
- Listar productos.
- Crear productos.
- Editar productos.
- Activar/Desactivar productos.
- Eliminar productos.

### Flujo de Validación
1. Crear un producto y verificar su aparición.
2. Editar el producto.
3. Eliminar el producto.
4. Confirmar su impacto en el inventario.

---

## 📊 Inventory

### Funcionalidades
- Consultar el stock actual.
- Identificar productos con bajo stock.
- Ajustar inventario.
- Consultar movimientos.

### Flujo de Validación
1. Realizar un ajuste de inventario.
2. Validar la actualización del stock.
3. Confirmar el registro del movimiento en el historial.

---

## 📥 Recepciones

### Funcionalidades
- Listar recepciones.
- Crear recepciones en estado borrador.
- Editar recepciones.
- Confirmar recepciones.
- Eliminar recepciones no confirmadas.

### Flujo de Validación
1. Crear una recepción con múltiples productos.
2. Confirmar la recepción.
3. Validar el incremento del inventario.
4. Verificar el registro en auditoría.

---

## 🧾 Audit

### Funcionalidades
- Listar eventos de auditoría.
- Visualizar detalles de cada evento.
- Filtrar por usuario, módulo o fecha.

### Flujo de Validación
1. Realizar acciones en distintos módulos.
2. Verificar que los eventos aparezcan en el módulo de auditoría.

---

## 🔒 Control de Permisos (RBAC)

### Requisitos
- Ocultar módulos según permisos del usuario.
- Restringir acciones como crear, editar o eliminar.
- Validar permisos antes de mostrar botones de acción.

### Flujo de Validación
1. Iniciar sesión con un usuario con permisos limitados.
2. Confirmar que solo se muestran los módulos autorizados.
3. Verificar que las acciones restringidas no estén disponibles.

---

## ✅ Criterios de Aceptación

| Categoría | Criterio |
|----------|---------|
| Autenticación | Login y logout funcionales |
| Seguridad | Rutas protegidas y manejo de token |
| Funcionalidad | CRUD completo en módulos principales |
| UI/UX | Interfaz consistente con TailwindCSS y DaisyUI |
| Permisos | Implementación correcta de RBAC |
| Integración | Consumo correcto de la API |
| Auditoría | Registro y visualización de eventos |
| Dashboard | Visualización de métricas clave |

---

## 📦 Entregables del Alumno

1. Repositorio del frontend.
2. Aplicación funcional conectada al backend.
3. Documentación breve del proyecto.
4. Evidencia de pruebas de los flujos descritos.
5. Interfaz consistente y responsiva.

---

## 🏁 Alcance Mínimo Obligatorio

- Login y rutas protegidas.
- Dashboard funcional.
- CRUD de Users.
- CRUD de Clients.
- CRUD de Suppliers.
- CRUD de Products.
- Consulta y ajustes de Inventory.
- Gestión de Recepciones.

---

## 🌟 Alcance Recomendado

- Gestión completa de Roles y Permissions.
- Módulo de Auditoría.
- Filtros avanzados y paginación.
- Interfaz completamente responsiva.

---

## 🎓 Objetivo Académico

Este proyecto tiene como finalidad que el alumno aplique conocimientos de:

- Consumo de APIs REST.
- Arquitectura de aplicaciones frontend.
- Manejo de autenticación y autorización.
- Diseño de interfaces administrativas.
- Integración de tecnologías modernas como Vue/React, TailwindCSS y DaisyUI.

---

**Autor:** Proyecto académico DEMEN ERP  
**Licencia:** Uso educativo.
