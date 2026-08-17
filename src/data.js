export const alumnos = [
  {
    first_name: "Carlos",
    last_name: "Ruiz Fernández",
    email: "carlos.ruiz@email.com",
    dni: "45678912S",
    role: "student",
    password: "123Abc99@",
  },
  {
    first_name: "Ana",
    last_name: "Gómez López",
    email: "ana.gomez@email.com",
    dni: "74839201F",
    role: "student",
    password: "123Abc99@",
  },
  {
    first_name: "Luis",
    last_name: "Martínez Soto",
    email: "luis.martinez@email.com",
    dni: "87654321X",
    role: "student",
    password: "123Abc99@",
  },
  {
    first_name: "Antonio",
    last_name: "Perez Gomez",
    email: "antonio.perez@email.com",
    dni: "12345678Z",
    role: "student",
    password: "123Abc99@",
  },
];

export const practicas = [
  {
    company_name: "Google",
    start_date: "2026-07-20",
    end_date: "2026-08-13",
    status: "active",
  },
  {
    company_name: "Microsoft",
    start_date: "2026-07-01",
    end_date: "2026-08-31",
    status: "active",
  },
  {
    company_name: "Amazon",
    start_date: "2026-07-01",
    end_date: "2026-09-30",
    status: "active",
  },
  {
    company_name: "Microsoft",
    start_date: "2026-08-03",
    end_date: "2026-08-31",
    status: "active",
  },
];

export const tareas = [
  // Tareas para el primer alumno: solo hasta la fecha actual (2026-08-06)
  {
    daily_logs: [
      {
        date: "2026-07-20",
        tasks: [
          {
            description:
              "Onboarding, configuración del entorno local y clonado de repositorios",
            order: 1,
          },
          {
            description:
              "Lectura de la documentación interna sobre arquitectura de microservicios",
            order: 2,
          },
        ],
        absence: null,
      },
      {
        date: "2026-07-21",
        tasks: [
          {
            description:
              "Revisión de dependencias y ejecución del proyecto en entorno de desarrollo",
            order: 1,
          },
        ],
        absence: null,
      },
      {
        date: "2026-07-22",
        tasks: [
          {
            description:
              "Diseño del esquema de base de datos para el módulo de usuarios",
            order: 1,
          },
          {
            description: "Creación de migraciones iniciales en PostgreSQL",
            order: 2,
          },
        ],
        absence: null,
      },
      {
        date: "2026-07-23",
        tasks: [
          {
            description:
              "Implementación de endpoints REST para el registro e inicio de sesión",
            order: 1,
          },
        ],
        absence: null,
      },
      {
        date: "2026-07-24",
        tasks: [
          {
            description:
              "Pruebas unitarias con Jest para los servicios de autenticación",
            order: 1,
          },
          {
            description: "Revisión de código con el tutor de la empresa",
            order: 2,
          },
        ],
        absence: null,
      },
      {
        date: "2026-07-27",
        tasks: [
          {
            description:
              "Investigación sobre autenticación JWT y refresh tokens",
            order: 1,
          },
        ],
        absence: null,
      },
      {
        date: "2026-07-28",
        tasks: [
          {
            description:
              "Integración del middleware de validación de tokens en las rutas protegidas",
            order: 1,
          },
          {
            description: "Documentación de la API en Swagger/OpenAPI",
            order: 2,
          },
        ],
        absence: null,
      },
      {
        date: "2026-07-29",
        tasks: [
          {
            description:
              "Creación de componentes UI en React para el panel de administración",
            order: 1,
          },
        ],
        absence: null,
      },
      {
        date: "2026-07-30",
        tasks: [
          {
            description:
              "Conexión del frontend con los servicios de autenticación del backend",
            order: 1,
          },
          {
            description: "Manejo de estados de carga y errores en formularios",
            order: 2,
          },
        ],
        absence: null,
      },
      {
        date: "2026-07-31",
        tasks: [
          {
            description:
              "Corrección de bugs reportados durante la revisión del frontend",
            order: 1,
          },
        ],
        absence: null,
      },
      {
        date: "2026-08-03",
        tasks: [
          {
            description:
              "Optimización de consultas SQL para mejorar el tiempo de respuesta",
            order: 1,
          },
          {
            description:
              "Implementación de caché con Redis para datos estáticos",
            order: 2,
          },
        ],
        absence: null,
      },
      {
        date: "2026-08-04",
        tasks: [
          {
            description: "Pruebas de integración de la API con Postman",
            order: 1,
          },
        ],
        absence: null,
      },
      {
        date: "2026-08-05",
        tasks: [
          {
            description: "Configuración del pipeline CI/CD en GitHub Actions",
            order: 1,
          },
          {
            description:
              "Despliegue de la versión staging en el servidor de pruebas",
            order: 2,
          },
        ],
        absence: null,
      },
      {
        date: "2026-08-06",
        tasks: [
          {
            description: "Pruebas de carga del sistema y análisis de métricas",
            order: 1,
          },
        ],
        absence: null,
      },
    ],
  },

  // Tareas para el segundo alumno: unas pocas tareas relacionadas con programación (fechas <= 2026-08-06)
  {
    daily_logs: [
      {
        date: "2026-07-06",
        tasks: [
          {
            description: "Implementación de endpoints CRUD en Node.js",
            order: 1,
          },
        ],
        absence: null,
      },
      {
        date: "2026-07-20",
        tasks: [
          {
            description:
              "Refactorización de servicio para manejo de errores y logs",
            order: 1,
          },
          {
            description: "Escribir pruebas unitarias para utilidades",
            order: 2,
          },
        ],
        absence: null,
      },
      {
        date: "2026-08-03",
        tasks: [
          {
            description: "Optimizar consulta de búsqueda con índices",
            order: 1,
          },
        ],
        absence: null,
      },
    ],
  },

  // Tareas para el tercer alumno: unas tareas puntuales (fechas <= 2026-08-06)
  {
    daily_logs: [
      {
        date: "2026-07-07",
        tasks: [
          {
            description: "Implementación de autenticación JWT en el backend",
            order: 1,
          },
        ],
        absence: null,
      },
      {
        date: "2026-07-28",
        tasks: [
          {
            description: "Integrar pipeline de CI para pruebas automáticas",
            order: 1,
          },
          { description: "Documentar pasos de despliegue en README", order: 2 },
        ],
        absence: null,
      },
    ],
  },
  // Tareas para el cuarto alumno (Antonio): semana 2026-08-03 a 2026-08-07
  {
    daily_logs: [
      {
        date: "2026-08-03",
        tasks: [
          {
            description: "Implementación de endpoint en Node.js para la API",
            order: 1,
          },
          {
            description: "Escribir pruebas unitarias con Jest para el endpoint",
            order: 2,
          },
        ],
        absence: null,
      },
      {
        date: "2026-08-04",
        tasks: [
          {
            description: "Refactorización de servicio para manejo de errores",
            order: 1,
          },
          { description: "Documentación de la API y casos de uso", order: 2 },
        ],
        absence: null,
      },
      {
        date: "2026-08-05",
        tasks: [
          {
            description: "Optimización de consultas en la base de datos",
            order: 1,
          },
          {
            description: "Implementación de índices para búsquedas frecuentes",
            order: 2,
          },
        ],
        absence: null,
      },
      {
        date: "2026-08-06",
        tasks: [
          {
            description: "Integración del frontend con los nuevos endpoints",
            order: 1,
          },
          {
            description: "Corrección de bugs detectados en la integración",
            order: 2,
          },
        ],
        absence: null,
      },
      {
        date: "2026-08-07",
        tasks: [
          {
            description: "Revisión de rendimiento y profiling de la aplicación",
            order: 1,
          },
          {
            description: "Escribir documentación de despliegue para staging",
            order: 2,
          },
        ],
        absence: null,
      },
    ],
  },
];

// exports are defined above
