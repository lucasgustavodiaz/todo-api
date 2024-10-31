import { Router } from 'express'
import {
  registerUser,
  loginUser,
  getMe
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegister:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         firstName:
 *           type: string
 *           description: El nombre del usuario
 *         lastName:
 *           type: string
 *           description: El apellido del usuario
 *         email:
 *           type: string
 *           description: El correo electrónico del usuario
 *         password:
 *           type: string
 *           description: La contraseña del usuario
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: El correo electrónico del usuario
 *         password:
 *           type: string
 *           description: La contraseña del usuario
 *     UserGetMe:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del usuario
 *         firstName:
 *           type: string
 *           description: Nombre del usuario
 *         lastName:
 *           type: string
 *           description: Apellido del usuario
 *         email:
 *           type: string
 *           description: Email del usuario
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       description: Los datos del usuario a registrar.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/JWT'
 *       400:
 *         description: El usuario ya se encuentra registrado / Alguno de los datos requeridos está incompleto.
 *       500:
 *         description: Error del servidor.
 */
router.post('/users', registerUser)

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Usuarios]
 *     requestBody:
 *       description: Credenciales necesarias para iniciar sesión (email y contraseña).
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/JWT'
 *       400:
 *         description: Contraseña incorrecta.
 *       404:
 *         description: El usuario no existe.
 *       500:
 *         description: Error del servidor.
 */
router.post('/users/login', loginUser)

/**
 * @swagger
 * /users/getMe:
 *   get:
 *     summary: Obtener los datos del usuario autenticado
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *           - name: Authorization
 *             in: header
 *             required: true
 *             description: JWT de autenticación.
 *             schema:
 *               type: string
 *     responses:
 *       200:
 *         description: Los datos del usuario autenticado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserGetMe'
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: El usuario no existe.
 *       500:
 *         description: Error del servidor.
 */
router.get('/users/getMe', protect, getMe)

export default router
