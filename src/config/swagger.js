import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const PORT = process.env.PORT || 5000

// Configuración de Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuarios y Tareas',
      version: '1.0.0',
      description: 'Documentación de la API para gestionar usuarios y tareas'
    },
    servers: [
      {
        url: `http://localhost:${PORT}` // Cambia la URL si usas otro host
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js'] // Archivos que contienen las anotaciones Swagger
}

const swaggerSpec = swaggerJsdoc(options)

// Función para configurar la ruta de Swagger
export const setupSwaggerDocs = app => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customCssUrl: '/swagger-ui.css', // Ruta al archivo CSS personalizado
      customfavIcon: '/favicon-32x32.png'
    })
  )
}
