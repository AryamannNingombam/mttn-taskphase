import mongoose from 'mongoose'

export interface StreamDoc extends mongoose.Document {
  name: string
}

export const StreamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
})

export default mongoose.model<StreamDoc>('Stream', StreamSchema)
