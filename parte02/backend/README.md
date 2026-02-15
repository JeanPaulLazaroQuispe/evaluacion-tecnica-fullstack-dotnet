# Sistema de Gestión de Usuarios - API Backend

Esta solución representa una implementación robusta de una API para la gestión de usuarios, desarrollada bajo estándares modernos de ingeniería de software y diseñada para ser escalable, segura y mantenible.

## 🚀 Tecnologías y Herramientas

*   **.NET 8.0** (ASP.NET Core Web API)
*   **Entity Framework Core** (ORM)
*   **PostgreSQL** (Motor de Base de Datos)
*   **JWT (JSON Web Tokens)** (Seguridad)
*   **AutoMapper** (Transformación de Objetos)
*   **FluentValidation** (Validación de Esquemas)
*   **BCrypt.Net** (Cifrado de Credenciales)
*   **Swagger/OpenAPI** (Documentación Técnica)

## 🏗️ Arquitectura de la Solución

El proyecto se rige por los principios de **Clean Architecture**, asegurando un desacoplamiento efectivo entre la lógica de negocio y las dependencias externas:

*   **Capa de Dominio (Domain)**: Punto central que define las entidades de negocio y reglas fundamentales del sistema.
*   **Capa de Aplicación (Application)**: Orquestación de casos de uso, definición de interfaces, DTOs y lógica de validación.
*   **Capa de Infraestructura (Infrastructure)**: Implementaciones técnicas, persistencia de datos y servicios de seguridad externos.
*   **Capa API**: Punto de exposición de servicios, controladores y configuración del pipeline de ejecución.

## 🔒 Implementación de Seguridad y Estándares

La API incorpora múltiples capas de protección y buenas prácticas:

*   **Autenticación y Autorización**: Implementación de esquemas basados en JWT. El acceso a los recursos de usuario está restringido exclusivamente a clientes autenticados.
*   **Seguridad de Credenciales**: Las contraseñas se almacenan mediante algoritmos de hashing unidireccional utilizando **BCrypt**, garantizando la confidencialidad de los datos.
*   **Validación de Datos**: Integración de **FluentValidation** para el control estricto de la integridad de los datos de entrada, asegurando que solo información válida sea procesada por el sistema.
*   **Gestión Centralizada de Excepciones**: Uso de Middleware para la normalización de respuestas de error. Este componente asegura que, en entornos no controlados, no se filtre información sensible de la arquitectura del servidor.
*   **Cabeceras de Seguridad**: Aplicación de políticas de respuesta (`X-Frame-Options`, `CSP`, `HSTS`) para mitigar vulnerabilidades comunes de la web.
*   **Configuración de CORS**: Política configurada específicamente para permitir la integración fluida con entornos locales de desarrollo.
*   **Tipado Moderno**: Soporte especializado para el tipo `DateOnly` de .NET 8, optimizando la comunicación de fechas con el cliente y su representación en la documentación técnica.

## 📡 Catálogo de Endpoints

### Autenticación (Pública)
*   `POST /api/auth/login`: Validación de credenciales y expedición de tokens.

### Gestión de Usuarios (Protegida)
*   `GET /api/users`: Recuperación de colección de usuarios activos.
*   `GET /api/users/{id}`: Consulta detallada por identificador único.
*   `POST /api/users`: Registro de nuevos usuarios.
*   `PUT /api/users/{id}`: Actualización persistente de información existente.
*   `DELETE /api/users/{id}`: Desactivación lógica de usuarios.

---
*Solución técnica desarrollada para la evaluación de FullStack .NET.*
