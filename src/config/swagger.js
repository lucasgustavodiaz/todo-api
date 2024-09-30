import { response } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const PORT = process.env.PORT || 5000

// Configuración de Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TODOs API',
      version: '1.0.0',
      description:
        'Este documento contiene la documentación para utilizar la API de TODOs\n\n' +
        '[ Base URL: https://unlpam-todo-api.vercel.app ]'
    },
    servers: [
      {
        url: `https://unlpam-todo-api.vercel.app` // Cambia la URL si usas otro host
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      responses: {
        Token: {
          description: 'Operación exitosa. Retorna un Token.',
          content: {
            'application/json': {
              schema: {
                type: 'string',
                example:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
              }
            }
          }
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
