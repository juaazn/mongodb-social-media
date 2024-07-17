import 'dotenv/config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'

const UserController = {
  async create(req, res, next) {
    try {
      const { name, email, password, age } = req.body
      const passwordWithHash = bcrypt.hashSync(password, 10)

      const user = await User.create({ name, email, password: passwordWithHash, age })
      res.status(201).send({ message: 'Usuario registrado con exito', user })
    } catch (error) {
      console.error(error)
      next(error)
    }
  },
  async login(req, res) {
    try {
      const user = await User.findOne({
        email: req.body?.email,
      })

      const isMatch = await bcrypt.compare(req.body.password , user.password)

      if (!isMatch) {
        return res.status(400).send({ message: 'Usuario o contraseña incorrecto' })
      }
      
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
      
      if (user.tokens.length > 4) user.tokens.shift()
      user.tokens.push(token)
      await user.save()
      res.send({ message: 'Bienvenid@ ' + user.name, token })
    } catch (error) {
      console.error(error)
      res.status(500).send({
        message: 'Hubo un problema al crear el usuario',
      })
    }
  },
  async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      })
      res.send({ message: 'Desconectado con éxito' })
    } catch (error) {
      console.error(error)
      res.status(500).send({
        message: 'Hubo un problema al intentar desconectar al usuario',
      })
    }
  },
  async getUser(req, res) {
    try {
      const user = await User.findById(req.params._id)
      res.send(user)
    } catch (error) {
      res.send({ message: "Error al obtener el usuario" })
      console.error(error)
    }
  }
}

export default UserController
