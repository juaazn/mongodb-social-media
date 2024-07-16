FROM node:20.14.0 as builder
# Crea el directorio de trabajo en /root/src
RUN mkdir -p /root/src
# Establece el directorio de trabajo en /root/src
WORKDIR /root/src
# Copia los archivos de configuración
COPY ["package.json", "package-lock.json", "./"]
# Instala las dependencias del proyecto
RUN npm install
# Copia los archivos de tu proyecto al directorio de trabajo
COPY . ./
# Inicia la aplicación cuando se ejecute el contenedor
CMD ["npm", "run", "start"]