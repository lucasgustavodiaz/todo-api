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
    res.status(500).json({ error: 'Server error' })
  }
}

export const createNewTask = async (req, res) => {
  const { description, completed } = req.body
  try {
    const task = await createTask({
      description,
      completed,
      userId: req.user.id
    })
    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

export const getTaskByIdController = async (req, res) => {
  const { id } = req.params
  try {
    const task = await getTaskById(id, req.user.id)
    if (!task) return res.status(404).json({ message: 'Task not found' })
    res.json(task)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

export const updateTaskById = async (req, res) => {
  const { id } = req.params
  const { description, completed } = req.body
  try {
    const updatedTask = await updateTask(id, { description, completed })
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' })
    res.json(updatedTask)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

export const deleteTaskById = async (req, res) => {
  const { id } = req.params
  try {
    await deleteTask(id, req.user.id)
    res.json({ message: 'Task deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}
