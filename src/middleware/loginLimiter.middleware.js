import rateLimit from 'express-rate-limit'  

// Definir el limitador para rutas de autenticación / login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Ventana de tiempo: 15 minutos
  max: 3, // Limite de 3 intentos por IP dentro de los 15 minutos
  message: {
    message: 'Demasiados intentos de inicio de sesión. Por favor, inténtalo de nuevo en 15 minutos.'
  },
  standardHeaders: true, // Devuelve cabeceras estándar RateLimit-* (RFC 6585)
  legacyHeaders: false,  // Desactiva cabeceras antiguas (X-RateLimit-*)
});

export default loginLimiter

