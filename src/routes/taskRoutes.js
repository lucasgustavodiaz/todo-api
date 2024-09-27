import { Router } from 'express'
import {
  getTasks,
  createNewTask,
  getTaskByIdController,
  updateTaskById,
  deleteTaskById
} from '../controllers/taskController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - description
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la tarea
 *         description:
 *           type: string
 *           description: Descripción de la tarea
 *         completed:
 *           type: boolean
 *           description: Estado de la tarea
 *         userId:
 *           type: integer
 *           description: ID del usuario que creó la tarea
 *         createdAt:
 *           type: string
 *           description: Fecha de creación
 *           format: date-time
 *     TaskUpload:
 *       type: object
 *       required:
 *         - description
 *       properties:
 *         description:
 *           type: string
 *           description: Descripción de la tarea
 *         completed:
 *           type: boolean
 *           description: Estado de la tarea
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtener todas las tareas del usuario autenticado
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get('/tasks', protect, getTasks) // Obtener todas las tareas del usuario

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskUpload'
 *     responses:
 *       201:
 *         description: La tarea fue creada exitosamente.
 */
router.post('/tasks', protect, createNewTask) // Crear una nueva tarea

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Detalles de la tarea.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarea no encontrada.
 */
router.get('/tasks/:id', protect, getTaskByIdController) // Obtener una tarea específica por ID

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea por ID
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskUpload'
 *     responses:
 *       200:
 *         description: La tarea fue actualizada exitosamente.
 */
router.put('/tasks/:id', protect, updateTaskById) // Actualizar una tarea por ID

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea por ID
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: La tarea fue eliminada exitosamente.
 */
router.delete('/tasks/:id', protect, deleteTaskById) // Eliminar una tarea por ID

export default router
