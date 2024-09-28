import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
  {
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    image: {
      type: Map,
      of: String,
      require: [true, 'Por fa, sube una imagen']
    },
    body: {
      type: String,
      required: [true, 'Tiene que escribir algo, para poder publicar un post'],
    },
    comments: [],
    like: [{type: mongoose.Types.ObjectId, ref: 'User'}]
  },
  { timestamps: true }
)

PostSchema.index({
  name: 'text',
})

const Post = mongoose.model('Post', PostSchema)

export default Post
