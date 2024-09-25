import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor rellena tu nombre'] 
    },
    email: {
      type: String,
      required: [true, 'Por favor rellena tu correo'],
      match: [/.+\@.+\..+/, 'Este correo no es válido'],
      unique: [true, 'Por favor el correo tiene que ser único'],
    },
    password: {
      type: String,
      required: [true, 'Por favor rellena tu contraseña'],
    },
    profileImage: {
      type: Map,
      of: String,
      require: [true, 'Please, upload image']

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
