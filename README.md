# Evaluación Técnica — Fullstack .NET Developer

Este repositorio contiene la solución completa a la evaluación técnica, dividida en dos partes: ejercicios de lógica en C# y un sistema web de gestión de usuarios.

## 📂 Estructura del Repositorio

- **`parte01-console/`**: Aplicación de consola con los algoritmos `OrderRange` y `MoneyParts`.
- **`parte02/backend/`**: API REST robusta desarrollada con .NET 8, PostgreSQL y Clean Architecture.
- **`parte02/frontend/`**: Interfaz de usuario moderna desarrollada con React 18, Vite y Ant Design.

---

## 🚀 Guía Rápida de Inicio

### Requisitos Previos

- .NET 8 SDK
- Node.js (v18+)
- PostgreSQL (Instalado y en ejecución)

### 1. Obtener el Código

```bash
git clone https://github.com/JeanPaulLazaroQuispe/evaluacion-tecnica-fullstack-dotnet.git
cd evaluacion-tecnica-fullstack-dotnet
```

### 2. Ejecutar Parte 01 (Algoritmos C#)

```bash
cd parte01-console/Parte01.ConsoleApp
dotnet run
```

### 3. Ejecutar Parte 02 (Sistema Web)

#### Backend (API)
1. Configure su base de datos en `parte02/backend/UserManagement.API/appsettings.json` (cadena `DefaultConnection`).
2. Ejecute:
   ```bash
   cd parte02/backend/UserManagement.API
   dotnet run
   ```
   *Nota: La base de datos, las tablas y el usuario administrador se crean automáticamente al iniciar.*

#### Frontend (React)
1. Instale dependencias y ejecute:
   ```bash
   cd parte02/frontend
   npm install
   npm run dev
   ```
2. Acceda a `http://localhost:5173`.

---

## 🔑 Credenciales de Acceso (Parte 02)

- **Usuario**: `admin`
- **Contraseña**: `admin`

---

## 🛠️ Tecnologías Destacadas

- **Backend**: Entity Framework Core, JWT, AutoMapper, FluentValidation, BCrypt, Swagger.
- **Frontend**: React Context API, Axios, Ant Design, TypeScript.
- **Lógica**: Backtracking recursivo y optimización de precisión decimal.

---

*Para más detalles técnicos de cada parte, consulte los archivos README específicos dentro de sus respectivas carpetas.*