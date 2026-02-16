# User Management System - Frontend

Este es el frontend de la solución para la prueba técnica de Gestión de Usuarios, desarrollado con un enfoque moderno, seguro y responsivo.

## 🚀 Tecnologías Utilizadas

- **React 18**: Biblioteca principal para la interfaz de usuario.
- **Vite**: Herramienta de construcción ultra rápida para el desarrollo.
- **Ant Design (v6)**: Sistema de diseño y biblioteca de componentes premium.
- **React Hook Form**: Gestión eficiente y declarativa de formularios.
- **Axios**: Cliente HTTP para el consumo de la API .NET 8.
- **React Router Dom**: Manejo de navegación y rutas protegidas.
- **Day.js**: Manipulación de fechas y validaciones temporales.

## 🛠️ Funcionalidades Principales

### 1. Seguridad y Autenticación
- **JWT Auth**: Manejo de tokens de sesión con persistencia en `localStorage`.
- **Interceptores de Axios**:
  - Inyección automática del token `Bearer` en cada petición.
  - Manejo centralizado de errores 401 (expiración de sesión).
- **Rutas Protegidas**: "Guards" reactivos que impiden el acceso a `/users` sin un token válido.

### 2. Gestión de Usuarios (CRUD)
- **Listado**: Tabla responsiva con soporte para scroll horizontal en móviles.
- **Formulario Dinámico**: Un solo modal para creación y edición.
- **Roles y Permisos (RBAC)**:
  - **Admin**: Control total (Crear, Editar, Eliminar).
  - **Editor**: Permisos de edición y lectura solamente. No puede asignar el rol Admin.
  - **User**: Solo lectura. La columna de acciones se oculta automáticamente.

### 3. Validaciones y UX
- **Validación de Formularios**: Correo electrónico con formato válido y contraseña con mínimo de 6 caracteres.
- **Restricción de Fechas**: El `DatePicker` bloquea automáticamente la selección de fechas futuras para el nacimiento.
- **Normalización**: Conversión automática de `username` y `email` a minúsculas y eliminación de espacios.
- **Feedback**: Notificaciones dinámicas (Toasts) para éxitos y errores provenientes del backend.
