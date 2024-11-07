# Eccomerce Hola Mundo Animal 🐶

## Descripción

Una tienda de productos de calidad para tus mascotas!

## Caracteristicas

- Sistema de usuarios
- Carrito de compras
- Filtrado de productos

## Tecnologías utilizadas

- Frontend: **HTML, CSS y Javascript.**
- Backend: **Node.js, Express y MySql.**
- Otras herramientas: **Git, Github y drawSQL.**

## Instalación

Para instalar el repositorio es necesario hacerlo desde git con alguno de los siguientes comandos

```bash
# Sí cuentas con gh
gh repo clone CodeStrong2023/EcommerceHolaMundoAnimal
# Si solo cuentas con git
git clone https://github.com/CodeStrong2023/EcommerceHolaMundoAnimal.git
```

### Requsitos previos

Para poder ejecutar el proyecto con normalidad es necesario tener instalada una versión Node.js igual o superior a la versión 18, además deberá contar con el motor de base de datos MySql.

Por ultimo, se deberá contar con las siguientes tablas dentro de la base de datos:

![Base de datos](/db_diagram.png)

(Los comandos para generar las tablas se encuentran en el archivo `/db_tables.sql`)

### Instalación de dependecias

Para instalar las dependencias del proyecto se debe ejecutar el siguiente comando

```bash
npm install
```

### Variables de entorno

Para que el eccomerce pueda funcionar normalmente se deberán establecer algunas variables de entorno mediante un archivo llamdado `.env`. La plantilla del archivo es la siguiente:

```plaintext
DB_USER=
DB_PASSWORD=
DB_NAME=holamundoanimal
DB_HOST=
DB_PORT=3306

JWT_SECRET="clave secreta 🤫"
```
### Estructura del proyecto

```java
├── src
│   ├── routes
│   ├── public
│   ├── pages
│   ├── models
│   ├── server.js
│   ├── main.js
│   └── db.js
├── db_tables.sql
├── modelo.png
├── .env
├── package.json
└── README.md
```