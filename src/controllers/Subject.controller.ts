import { NextFunction, Request, Response } from 'express'
import StreamModel from '../models/Stream.model'
import SubjectModel, { SubjectDoc } from '../models/Subject.model'

export const AddSubject = (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as SubjectDoc
  SubjectModel.create(body)
    .then((s) => {
      return res.status(200).json({
        success: true,
        subject: s,
      })
    })
    .catch((err) => {
      console.log('error')
      console.log(err)
      return res.status(500).json({
        success: false,
        message: 'Unknown server error!',
      })
    })
}

export const DeleteSubject = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { _id } = req.params
  if (_id)
    return res.status(500).json({
      success: false,
      message: 'Required values not provided!',
    })
  SubjectModel.findByIdAndDelete(_id)
    .then(() => {
      return res.status(200).json({
        success: true,
      })
    })
    .catch((err) => {
      console.log('error')
      console.log(err)
      return res.status(500).json({
        success: false,
        message: 'Unknown server error!',
      })
    })
}

export const GetSubjectsForStream = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { semester, stream } = req.params
  if (!semester || !stream)
    return res.status(500).json({
      success: false,
      message: 'Required values not provided!',
    })

  const str = await StreamModel.findOne({ name: stream })
  if (!str)
    return res
      .status(500)
      .json({ success: false, message: 'Stream not found!' })

  SubjectModel.find({ semester: parseInt(semester), stream: str._id })
    .then((subjects) => {
      return res.status(500).json({
        success: false,
        subjects,
      })
    })
    .catch((err) => {
      console.log('error')
      console.log(err)
      return res.status(500).json({
        success: false,
        message: 'Unknown server error!!',
      })
    })
}

export const GetAllSubjects = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  SubjectModel.find({})
    .then((subjects) => {
      return res.status(200).json({
        success: true,
        subjects,
      })
    })
    .catch((err) => {
      console.log('error')
      console.log(err)
      return res.status(500).json({
        success: false,
        message: 'Unknown server error!',
      })
    })
}
