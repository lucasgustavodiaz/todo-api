import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import { setupSwaggerDocs } from './config/swagger.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const app = express()

// Habilitar CORS
app.use(
  cors({
    origin: '*', // Permite todos los orígenes
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Encabezados permitidos
  })
)

app.options('*', cors()) // Permitir todas las opciones

app.use(express.json())

// Middleware
app.use('/', userRoutes)
app.use('/', taskRoutes)

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'API de tareas' })
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// Servir archivos estáticos desde ../public
app.use(express.static(path.join(__dirname, '../public')))

// Swagger Docs
setupSwaggerDocs(app)

export default app
