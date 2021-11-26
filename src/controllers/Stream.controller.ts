import { Request, Response, NextFunction } from 'express'
import StreamModel, { StreamDoc } from '../models/Stream.model'

export const AddStream = (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as StreamDoc
  StreamModel.create(body)
    .then((s) => {
      return res.status(200).json({
        success: true,
        stream: s,
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

export const DeleteStream = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { _id } = req.params
  if (!_id)
    return res.status(500).json({
      success: false,
      message: 'Required values not provided!',
    })
  StreamModel.findByIdAndDelete(_id)
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
        message: 'Unknown server error',
      })
    })
}

export const GetAllStreams = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  StreamModel.find({})
    .then((streams) => {
      return res.status(200).json({
        success: true,
        streams,
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
