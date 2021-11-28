import mongoose from 'mongoose'
import RatingModel from './Rating.model'

export interface MaterialDoc extends mongoose.Document {
  title: string
  description: string
  url: string
  rating: number
  semester: number
  stream: mongoose.Types.ObjectId
  subject: mongoose.Types.ObjectId
  timestamp: Date
  EvaluateRating(r: number): null
}

export const MaterialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  semester: {
    type: Number,
    required: true,
    min: 1,
    max: 8,
  },

  stream: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  subject: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
    default: new Date(Date.now()),
  },
})

MaterialSchema.methods.EvaluateRating = async function (r: number) {
  const material = this as MaterialDoc
  const ratings = await RatingModel.find({ material: material._id })
  const rating = (material.rating + r) / (ratings.length + 1)
  material.rating = rating
  await material.save()
  return
}

export default mongoose.model<MaterialDoc>('Material', MaterialSchema)
