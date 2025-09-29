CREATE TABLE customer (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    identificacion VARCHAR(50) NOT NULL UNIQUE,
    tipo_identificacion VARCHAR(5) NOT NULL,
    primer_nombre VARCHAR(100) NOT NULL,
    segundo_nombre VARCHAR(100),
    primer_apellido VARCHAR(100) NOT NULL,
    segundo_apellido VARCHAR(100),
    direccion VARCHAR(200),
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    ocupacion VARCHAR(100),
    fecha_nacimiento DATE NOT NULL,
    foto VARCHAR(255)

);