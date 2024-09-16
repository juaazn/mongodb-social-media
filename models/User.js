import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor rellena tu nombre'] 
    },
    email: {
      type: String,
      match: [/.+\@.+\..+/, 'Este correo no es válido'],
      unique: true,
      required: [true, 'Por favor rellena tu correo'],
    },
    password: {
      type: String,
      required: [true, 'Por favor rellena tu contraseña'],
    },
    age: {
      type: Number,
      required: [true, 'Por favor rellena tu edad'],
    },
    tokens: [],
    following: [{type: mongoose.Types.ObjectId, ref: 'users'}]
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('User', UserSchema)

export default User
