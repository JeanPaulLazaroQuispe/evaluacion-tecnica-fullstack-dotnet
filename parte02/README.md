# Sistema de Gestión de Usuarios - Prueba Técnica

Este proyecto es un sistema de gestión de usuarios completo con control de acceso basado en roles (RBAC).

## Estructura del Proyecto

- `parte02/backend`: API Web desarrollada en .NET 8.
- `parte02/frontend`: Interfaz de usuario en React 18 con Vite y Ant Design.
- `parte02/database`: Scripts SQL de referencia.

*Nota: Para más detalles técnicos y especificaciones de cada módulo, consulte los archivos README individuales dentro de las carpetas `backend` y `frontend`.*

## Requisitos Previos

- .NET 8 SDK
- Node.js (v18 o superior)
- PostgreSQL (Instalado y en ejecución)

## Instrucciones de Configuración

El sistema está configurado para ser **autoejecutable**. Solo necesita tener PostgreSQL corriendo.

### 1. Configuración del Backend
1. Navegue al directorio del backend:
   ```bash
   cd parte02/backend/UserManagement.API
   ```
2. Verifique la cadena de conexión en `appsettings.json`. Ejemplo:  
   `"DefaultConnection": "Host=localhost;Port=5432;Database=technical_test_part2_db;Username=postgres;Password=tu_password"`
3. Ejecute la API:
   ```bash
   dotnet run
   ```
   *Al iniciar, el backend creará automáticamente la base de datos `technical_test_part2_db`, todas las tablas necesarias y un usuario administrador inicial.*

### 2. Configuración del Frontend
1. Navegue al directorio del frontend:
   ```bash
   cd parte02/frontend
   ```
2. Instale e inicie:
   ```bash
   npm install
   npm run dev
   ```
   Acceda a la aplicación en `http://localhost:5173`.

## Credenciales de Prueba
- **Usuario**: `admin`
- **Contraseña**: `admin`

## Características Principales
- Creación automática de base de datos y esquemas al iniciar.
- Operaciones CRUD para usuarios.
- Permisos basados en roles (Admin, Editor, Usuario).
- Autenticación JWT.
- Validación de edad (Mínimo 18 años).
- Interfaz moderna y responsiva.
