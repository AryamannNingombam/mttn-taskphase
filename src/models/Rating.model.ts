import mongoose from 'mongoose'

export interface RatingDoc extends mongoose.Document {
  stars: number
  comment: string
  material: mongoose.Types.ObjectId
}

export const RatingSchema = new mongoose.Schema({
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  material: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
})

export default mongoose.model<RatingDoc>('Rating', RatingSchema)
