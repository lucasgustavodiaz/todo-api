import pool from '../config/db.js'
import bcrypt from 'bcryptjs'

export const createUser = async user => {
  const { firstName, lastName, email, password } = user
  const hashedPassword = await bcrypt.hash(password, 10)
  const result = await pool.query(
    'INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING id, firstname AS "firstName", lastname AS "lastName", email',
    [firstName, lastName, email, hashedPassword]
  )
  return result.rows[0]
}

export const findUserByEmail = async email => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [
    email
  ])
  return result.rows[0]
}

export const getUserById = async id => {
  const result = await pool.query(
    'SELECT id, firstname AS "firstName", lastName AS "lastName", email FROM users WHERE id = $1',
    [id]
  )
  return result.rows[0]
}
