# Semana 8 DevOps - Evaluación Sumativa 3

**Autores**: Gonzalo Caro, Benjamín Dávila, Sebastián Briceño
**Curso**: DevOps - DUOC UC  
**Experiencia**: Evaluación Sumativa 3 – CI/CD con Azure DevOps y Azure VM 

## 📋 Descripción

Este proyecto implementa un pipeline CI/CD completo utilizando Azure DevOps, integrando herramientas y prácticas modernas de DevOps para automatizar el proceso de construcción, prueba, contenerización y despliegue de una aplicación Node.js en una máquina virtual de Azure.
- Integración Continua (CI) con Node.js + Azure DevOps
- Despliegue Continuo (CD) automatizado con Docker y Azure Container Registry (ACR)
- Publicación final en una VM de Azure Linux (Ubuntu) ejecutando el contenedor en producción.

## 🏗️ Arquitectura

```
┌─────────────────┐    ┌─────────────────┐        ┌──────────────────┐
│   Desarrollador │────│   GitHub Repo   │────────│  Azure DevOps    │
└─────────────────┘    └─────────────────┘        │  - CI/CD YAML    │
                                |                 └──────┬───────────┘
                                │                        │
                                │                        ▼
                                │             ┌─────────────────────┐
                                │             │   Azure Container   │
                                │             │     Registry (ACR)  │
                                │             └─────────────────────┘
                                │                        │
                                ▼                        │
                       ┌─────────────────┐               │
                       │   Local Build   │               │
                       └─────────────────┘               │
                                │                        │
                                └────────────────────────┘
                                         │
                                         ▼
                                ┌─────────────────┐
                                │   Azure VM      │
                                │   (Docker Host) │
                                └─────────────────┘

```

⚙️ Flujo del Pipeline
🔹 1. Integración Continua (Build y Test)

Se ejecuta al hacer push en las ramas main o develop.

Instala Node.js v18, ejecuta npm install y pruebas automatizadas (npm test).

Publica los resultados de test en Azure DevOps.

🔹 2. Construcción y Publicación de Imagen Docker

Construye una imagen Docker a partir del Dockerfile.

La etiqueta y sube automáticamente al Azure Container Registry (ACR).

Se valida la subida exitosa.

🔹 3. Despliegue Continuo (Deploy en VM)

Se ejecuta solo en la rama main y tras una build exitosa.

Publica la imagen en una máquina virtual Ubuntu configurada como servidor Docker.

Puede usar SSH o Azure CLI para el despliegue automatizado.

🔹 4. Pruebas de Integración

Ejecuta pruebas sobre el entorno desplegado (por ejemplo: health check de la aplicación).

Confirma el correcto funcionamiento en producción.

## Ejecución Local

### Prerrequisitos
- Node.js 18+
- Docker Desktop
- Azure CLI

### Instalación
```bash
# Clonar repositorio
git clone <repo-url>
cd Azure

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start
```

### Acceder a la aplicación
- **Aplicación**: http://localhost:3000
- **Health Check**: http://localhost:3000/health
- **Info Sistema**: http://localhost:3000/info

## 🐳Contenerización

### Construir imagen Docker
```bash
docker build -t S8DevOpscr2025-demo:1.0.1
```

### Ejecutar contenedor
```bash
docker run -d -p 3000:3000 --name S8DevOps-app S8DevOps-demo:1.0.1
```

### Usar Docker Compose
```bash
docker compose up -d
```

## ☁️ Despliegue en Azure

### 1. Preparar ACR
```bash
# Login a Azure
az login

# Login a ACR
az acr login --name S8DevOps
```

### 2. Construir y subir imagen
```bash
# Etiquetar para ACR
docker tag S8DevOps-demo:1.0.1 S8DevOps.azurecr.io/demo/S8DevOps-app:1.0.1

# Subir a ACR
docker push S8DevOps.azurecr.io/demo/S8DevOps-app:1.0.1
```

### 3. Verificar en ACR
```bash
az acr repository list --name S8DevOps --output table
az acr repository show-tags --name S8DevOps --repository demo/S8DevOps-app
```

### 4. Desplegar en VM
```bash
# En la VM de Azure
docker pull S8DevOps.azurecr.io/demo/S8DevOps-app:1.0.1
docker run -d -p 80:3000 S8DevOps.azurecr.io/demo/S8DevOps-app:1.0.1
```

## 📊 Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Información principal de la aplicación |
| GET | `/health` | Estado de salud del servicio |
| GET | `/info` | Información técnica del sistema |

## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js + Express
- **Contenerización**: Docker + Docker Compose
- **Cloud**: Microsoft Azure (VM + ACR)
- **Proxy**: Nginx
- **Cache**: Redis (opcional)
- **CI/CD**: Azure DevOps
- **Control de Versiones**: Git + GitHub

## 📝 Estructura del Proyecto

```
Azure/
├── server.js              # Aplicación principal Express
├── package.json            # Dependencias Node.js
├── Dockerfile             # Configuración del contenedor
├── docker-compose.yml     # Orquestación de servicios
├── healthcheck.js         # Script de health check
├── .dockerignore          # Archivos excluidos del build
├── nginx/
│   ├── nginx.conf         # Configuración proxy
│   └── html/
│       └── 404.html       # Página de error personalizada
└── README.md              # Este archivo
```

## 🎯 Objetivos Cumplidos
- Implementar pipeline CI/CD completo en Azure DevOps
- Automatizar instalación, build y test de aplicación Node.js
- Construir y publicar imagen Docker en Azure Container Registry
- Desplegar automáticamente en Azure VM
- Ejecutar pruebas de validación en producción

## 📚 Referencias

- [Azure Container Registry Documentation](https://docs.microsoft.com/en-us/azure/container-registry/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

---

**Desarrollado para**: Experiencia de Aprendizaje S8 - Actividad Sumativa 3 - DevOps  
**Institución**: DUOC UC  
**Fecha**: Octubre 2025
