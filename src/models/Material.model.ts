import * as mongoose from 'mongoose'
 

export interface MaterialDoc extends mongoose.Document {
  title: string
  description: string
  url: string
  semester: number
  stream: mongoose.Types.ObjectId
  subject:mongoose.Types.ObjectId
  timestamp: Date
}

export const MaterialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
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

export default mongoose.model<MaterialDoc>('Material', MaterialSchema)
