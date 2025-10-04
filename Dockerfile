# Imagen base oficial de Node.js
FROM node:18-alpine

# Metadata del contenedor
LABEL maintainer="Gonzalo Caro <gonzalo.caro@duocuc.cl>"
LABEL description="Aplicación DevOps S8 para Azure Container Registry"
LABEL version="1.0.1"

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias de producción
RUN npm install --only=production && \
    npm cache clean --force

# Copiar código fuente de la aplicación
COPY . .

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001

# Cambiar ownership de archivos al usuario nodejs
RUN chown -R nodeuser:nodejs /app
USER nodeuser

# Exponer puerto de la aplicación
EXPOSE 3000

# Configurar health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
