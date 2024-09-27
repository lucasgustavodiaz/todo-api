import pool from '../config/db.js'

// Crear tarea
export const createTask = async task => {
  const { description, completed, userId } = task
  const result = await pool.query(
    'INSERT INTO tasks (description, completed, userId) VALUES ($1, $2, $3) RETURNING id, description, completed, userid AS "userId", createdat AS "createdAt"',
    [description, completed || false, userId]
  )
  return result.rows[0]
}

// Obtener todas las tareas de un usuario
export const getTasksByUserId = async userId => {
  const result = await pool.query(
    'SELECT id, description, completed, userid AS "userId", createdat AS "createdAt" FROM tasks WHERE userId = $1',
    [userId]
  )
  return result.rows
}

// Obtener tarea por ID
export const getTaskById = async (id, userId) => {
  const result = await pool.query(
    'SELECT id, description, completed, userid AS "userId", createdat AS "createdAt" FROM tasks WHERE id = $1 AND userId = $2',
    [id, userId]
  )
  return result.rows[0]
}

// Actualizar tarea
export const updateTask = async (id, task) => {
  const { description, completed } = task

  // Crear un array para los valores a pasar a la consulta y uno para las partes de la consulta
  let query = 'UPDATE tasks SET'
  const values = []
  let index = 1

  // Verifica si se proporcionó una descripción y añade a la consulta
  if (description !== undefined) {
    query += ` description = $${index},`
    values.push(description)
    index++
  }

  // Añadir el campo "completed" siempre que esté presente
  if (completed !== undefined) {
    query += ` completed = $${index},`
    values.push(completed)
    index++
  }

  // Elimina la última coma y añade la cláusula WHERE
  query = query.slice(0, -1) // Elimina la última coma
  query += ` WHERE id = $${index} RETURNING id, description, completed, userid AS "userId", createdat AS "createdAt"`
  values.push(id)

  // Ejecutar la consulta con los valores construidos
  const result = await pool.query(query, values)
  return result.rows[0]
}

// Eliminar tarea
export const deleteTask = async (id, userId) => {
  await pool.query('DELETE FROM tasks WHERE id = $1 AND userId = $2', [
    id,
    userId
  ])
}
