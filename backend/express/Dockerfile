FROM node:18-slim

WORKDIR /app

# Copiar solo package.json y package-lock.json para instalar dependencias
COPY package.json package-lock.json ./
RUN npm install

# Instalar nodemon globalmente para live reload
RUN npm install -g nodemon

# Copiar el resto del proyecto
COPY . .

# Establecer la variable de entorno para modo desarrollo
ENV NODE_ENV=development

# Exponer el puerto que utiliza tu servidor Express
EXPOSE 4000

# Comando para iniciar nodemon
CMD ["nodemon", "src/server.js"]
