import mongoose from 'mongoose'

const CardSchema = new mongoose.Schema({
  question: { type: String },
  answer: { type: String },
  image: { type: String },
})

const CardModel = mongoose.model('Card', CardSchema)

export default CardModel


