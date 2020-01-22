import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  body: String,
  sender: {
    type: 'ObjectId',
    ref: 'User'
  },
  chat: {
    type: 'ObjectId',
    ref: 'Chat'
  }
}, {
  timestamps: true
})

export default mongoose.model('Message', messageSchema)
