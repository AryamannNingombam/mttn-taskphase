import * as mongoose from 'mongoose'

export interface SubjectDoc extends mongoose.Document {
  name: string
  stream: mongoose.Types.ObjectId
  semester: number
}

export const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  stream: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
})

export default mongoose.model<SubjectDoc>('Subject', SubjectSchema)
