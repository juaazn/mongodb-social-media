import mongoose from 'mongoose'

const CommentsScheme = new mongoose.Schema({
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
  body: String,
 }, 
 { timestamps: true }
)

const Comments = mongoose.model('comments', CommentsScheme)

export default Comments
