const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Middleware para servir archivos estáticos
app.use(express.static("public"));

// Ruta principal
app.get("/", (req, res) => {
  res.json({
    message: "Hola mundo desde Azure!",
    description: "Aplicación DevOps S8 - Grupo 1 ",
    timestamp: new Date().toISOString(),
    hostname: require("os").hostname(),
    platform: require("os").platform(),
    team: "S8 DevOps Team DUOC UC",
    version: "1.0.1",
  });
});

// Ruta de salud para monitoreo
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Ruta de información del sistema
app.get("/info", (req, res) => {
  res.json({
    nodeVersion: process.version,
    platform: process.platform,
    architecture: process.arch,
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Algo salió mal!" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`** Servidor corriendo en puerto ${PORT}`);
  console.log(`** URL: http://localhost:${PORT}`);
  console.log(`** Health check: http://localhost:${PORT}/health`);
});
