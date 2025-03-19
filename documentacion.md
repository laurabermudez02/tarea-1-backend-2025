# Implementación de Contenedores Docker para aplicacion de productos

## Estructura de la Solución

Para este proyecto he implementado Docker. La solución es tres contenedores independientes que se comunican entre sí a través de una red Docker dedicada:

1. **Contenedor Node.js**: Aloja la aplicación principal de Express.js
2. **Contenedor Redis**: Proporciona el servicio de caché para Valkey
3. **Contenedor MySQL**: Almacena la base de datos del e-commerce

## Dockerfiles y Configuración

### Dockerfile Principal (Para la Aplicación Node.js)

Este Dockerfile configura el entorno para ejecutar la aplicación Node.js. A diferencia de versiones anteriores, este nuevo enfoque separa completamente los servicios.

```dockerfile
FROM node:22

RUN apt-get update && apt-get install -y redis-server

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

EXPOSE 8080 6379

CMD redis-server --daemonize yes && npm start

```

### Dockerfile.redis (Para el Servicio Redis para usar valky)

permite configurarlo correctamente para su uso con Valkey:

```dockerfile
FROM redis:latest

EXPOSE 6379

CMD ["redis-server", "--protected-mode", "no"]
```

### Configuración de la Red Docker

Para que los contenedores se comuniquen entre sí, cree una red Docker llamada `app-network`. Esto permite que los contenedores se comuniquen utilizando sus nombres como hostnames.

```bash
docker network create app-network
```

## Comandos de Ejecución

Para ejecutar la aplicación completa, he creado y ejecutado los contenedores en el siguiente orden:

1. **MySQL:**
   ```bash
   docker run -d \
     --name mysql \
     --network app-network \
     -e MYSQL_ROOT_PASSWORD=contraseña123 \
     -e MYSQL_DATABASE=ecommerce \
     -p 3306:3306 \
     -v mysql-data:/var/lib/mysql \
     -v $(pwd)/db-init:/docker-entrypoint-initdb.d \
     mysql:8.0 --default-authentication-plugin=mysql_native_password
   ```

2. **Redis:**
   ```bash
   docker build -t redis-valkey -f Dockerfile.redis .
   docker run -d \
     --name redis \
     --network app-network \
     -p 6379:6379 \
     -v redis-data:/data \
     redis-valkey
   ```

3. **Aplicación Node.js:**
   ```bash
   docker build -t nodejs-app .
   docker run -d \
     --name nodejs-app \
     --network app-network \
     -p 8080:8080 \
     -e DB_USER=root \
     -e DB_PASSWORD=contraseña123 \
     -e DB_HOST=mysql \
     -e DB_PORT=3306 \
     -e DB_NAME=ecommerce \
     -e SECRET=BACKEND-2025 \
     -e REDIS_HOST=redis \
     -e REDIS_PORT=6379 \
     nodejs-app
   ```

## Persistencia de Datos

Para garantizar la persistencia de datos entre reinicios, he configurado volúmenes Docker para MySQL y Redis:

```bash
docker volume create mysql-data
docker volume create redis-data
```
