# Imagen base ligera con Node
FROM node:20-slim

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Crear carpeta de trabajo
WORKDIR /app

# Copiar package.json y pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# Instalar dependencias
RUN pnpm install

# Copiar todo el proyecto
COPY . .

# Exponer puerto 5174
EXPOSE 5174

# Comando por defecto (Vite dev server en 5174)
CMD ["pnpm", "run", "dev", "--", "--port", "5174"]