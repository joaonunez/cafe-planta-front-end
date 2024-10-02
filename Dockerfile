# Usa una imagen base de Node.js para la fase de construcción
FROM node:18 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm ci

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación (esto creará la carpeta 'build')
RUN npm run build

# Usa una imagen base de Nginx para la fase de producción
FROM nginx:alpine

# Copia los archivos generados en la fase de build al directorio de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto que utilizará Nginx
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
