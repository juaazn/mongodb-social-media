import mongoose from 'mongoose'
const ObjectId = mongoose.SchemaTypes.ObjectId
const UserName = mongoose.SchemaTypes.String

const CommentsScheme = new mongoose.Schema({
  userName: {
    type: UserName,
    ref: 'User'
  },
  body: String,
  deliveryDate: Date,
 }, { timestamps: true }
)

const Comments = mongoose.model('comments', CommentsScheme)

export default Comments
