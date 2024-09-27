import pool from './db.js'

const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(100) NOT NULL,
        lastName VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        description TEXT NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        userId INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    console.log('Tablas creadas exitosamente')
  } catch (error) {
    console.error('Error creando las tablas', error)
  } finally {
    pool.end()
  }
}

createTables()
