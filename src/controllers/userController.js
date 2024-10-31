import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {
  createUser,
  findUserByEmail,
  getUserById
} from '../models/userModel.js'

export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  try {
    const existingUser = await findUserByEmail(email)
    if (existingUser)
      return res.status(400).json({ message: 'El usuario ya existe' })

    const user = await createUser({ firstName, lastName, email, password })
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })

    res.status(201).json({ user, token })
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' })
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await findUserByEmail(email)
    if (!user) return res.status(404).json({ message: 'El usuario no existe' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ message: 'Contraseña incorrecta' })

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })
    res.json({
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
      jwt: token
    })
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' })
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await getUserById(req.user.id)
    if (!user) return res.status(404).json({ message: 'El usuario no existe' })

    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' })
  }
}
