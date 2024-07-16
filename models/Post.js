import mongoose from 'mongoose'
const ObjectId = mongoose.SchemaTypes.String
const userName = mongoose.SchemaTypes.String

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: 'Users'
    },
    userName: {
      type: userName,
      ref: 'Users',
    },
    title: {
      type: String,
      required: [true, 'Por favor escriba un titulo'],
    },
    body: {
      type: String,
      required: [true, 'Tiene que escribir algo, para poder publicar un post'],
    },
    comments: [],
    like: [ { userId: {type: ObjectId, ref: 'User'}, userName: String, isLike: Boolean } ]
  },
  { timestamps: true }
)

PostSchema.index({
  name: 'text',
})

const Post = mongoose.model('Post', PostSchema)

export default Post
