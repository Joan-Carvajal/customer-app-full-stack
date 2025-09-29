# Customer Full Stack

Este proyecto es una aplicación full stack para la gestión de clientes, desarrollada con Spring Boot en el backend. Permite la autenticación de usuarios y la administración de información de clientes.

## Características principales
- Autenticación de usuarios (JWT)
- Gestión de clientes (CRUD)
- Validación de datos
- Configuración de CORS
- Documentación OpenAPI (Swagger)

## Requisitos previos
- Java 17 o superior
- Maven
- Base de datos compatible (por defecto H2, configurable en `application.properties`)

## Instalación y ejecución

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd customer-full-stack
   ```


2. **Conexión a la base de datos:**
   
   Por defecto, la aplicación está configurada para usar MySQL. Puedes modificar la conexión en el archivo `src/main/resources/application.properties`:
   
   ```properties
   spring.datasource.url=jdbc:mysql://127.0.0.1:3306/customer_db
   spring.datasource.username=root
   spring.datasource.password=
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   ```
   
   Cambia los valores según tu entorno local. Si usas otra base de datos, ajusta el driver y la URL.

3. **Ejecutar migraciones:**
   Las migraciones de base de datos se ejecutan automáticamente al iniciar la aplicación (Flyway).

4. **Compilar y ejecutar la aplicación:**
   ```bash
   ./mvnw spring-boot:run
   ```
   O en Windows:
   ```bash
   mvnw.cmd spring-boot:run
   ```

5. **Acceder a la aplicación:**
   - API: `http://localhost:8080`
   - Documentación Swagger: `http://localhost:8080/swagger-ui.html`


## Endpoints de la API

### Endpoints de Autenticación (`/auth`)

- `POST /auth/login` — Autentica un usuario y retorna un JWT.
   - **Body:** `{ "login": "usuario", "clave": "password" }`
   - **Respuesta:** `{ "tokenJWT": "..." }`

- `POST /auth/register` — Registra un nuevo usuario.
   - **Body:** `{ "login": "usuario", "clave": "password" }`
   - **Respuesta:** Usuario creado.

### Endpoints de Clientes (`/customer`)

- `GET /customer` — Lista paginada de clientes. **(Requiere JWT)**
- `GET /customer/{id}` — Obtiene un cliente por su ID. **(Requiere JWT)**
- `POST /customer` — Crea un nuevo cliente. **(Requiere JWT)**
   - **Body:** Datos del cliente (ver DTO correspondiente)
- `PUT /customer/{id}` — Actualiza un cliente existente. **(Requiere JWT)**
   - **Body:** Datos a actualizar
- `DELETE /customer/{id}` — Elimina un cliente por ID. **(Requiere JWT)**
- `POST /customer/{id}/foto` — Sube una foto para el cliente (multipart/form-data). **(Requiere JWT)**

## Estructura del proyecto

- `controller/` — Controladores REST
- `domain/` — Entidades y lógica de dominio
- `infra/` — Configuración, seguridad y manejo de errores
- `resources/db/migration/` — Migraciones de base de datos (Flyway)

## Seguridad
La autenticación se realiza mediante JWT. Los endpoints de `/customer` requieren un token válido en la cabecera:

```
Authorization: Bearer <token>
```

## Personalización

Puedes modificar la configuración en `src/main/resources/application.properties` para cambiar la base de datos, el puerto, CORS, etc.

---

## Frontend: customer-react

El frontend de la aplicación está en la carpeta `customer-react` y utiliza React + Vite + TailwindCSS.

### Requisitos previos
- Node.js 18+
- npm o yarn

### Instalación y ejecución

1. Instala las dependencias:
   ```bash
   cd customer-react
   npm install
   # o
   yarn
   ```

2. Configura la URL de la API backend:
   
   Crea un archivo `.env.local` en la raíz de `customer-react` con el siguiente contenido:
   ```env
   VITE_API_URL=http://localhost:8080
   ```
   Ajusta la URL si tu backend corre en otro puerto o dominio.

3. Inicia la aplicación React:
   ```bash
   npm run dev
   # o
   yarn dev
   ```
   La app estará disponible en `http://localhost:5173` (por defecto).

### Scripts útiles
- `npm run dev`: Levanta el servidor de desarrollo
- `npm run build`: Compila la app para producción
- `npm run preview`: Previsualiza la app compilada
- `npm run lint`: Linter de código

### Estructura básica del frontend
- `src/views/`: Vistas principales (Login, Register, Customer)
- `src/services/`: Servicios para consumir la API
- `src/components/`: Componentes reutilizables

---


