import {
  createTask,
  getTasksByUserId,
  getTaskById,
  updateTask,
  deleteTask
} from '../models/taskModel.js'

export const getTasks = async (req, res) => {
  try {
    const tasks = await getTasksByUserId(req.user.id)
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' })
  }
}

export const createNewTask = async (req, res) => {
  const { description, completed } = req.body

  if (!description || req.user.id == null) {
    return res
      .status(400)
      .json({ error: 'Alguno de los datos requeridos está incompleto' })
  }

  try {
    const task = await createTask({
      description,
      completed,
      userId: req.user.id
    })
    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' })
  }
}

export const getTaskByIdController = async (req, res) => {
  const { id } = req.params

  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' })
  }

  try {
    const task = await getTaskById(id, req.user.id)
    if (!task) return res.status(404).json({ message: 'Tarea inexistente' })
    res.json(task)
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' })
  }
}

export const updateTaskById = async (req, res) => {
  const { id } = req.params
  const { description, completed } = req.body

  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' })
  }

  try {
    const updatedTask = await updateTask(id, { description, completed })
    if (!updatedTask)
      return res.status(404).json({ message: 'Tarea inexistente' })
    res.json(updatedTask)
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' })
  }
}

export const deleteTaskById = async (req, res) => {
  const { id } = req.params

  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' })
  }

  try {
    const task = await getTaskById(id, req.user.id)

    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' })
    }

    await deleteTask(id, req.user.id)
    res.json({ message: 'Tarea eliminada exitosamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' })
  }
}
