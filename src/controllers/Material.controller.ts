import { NextFunction, Request, Response } from 'express'
import MaterialModel, { MaterialDoc } from '../models/Material.model'

export const AddMaterial = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.file)
    return res.status(500).json({
      success: false,
      message: 'File not uploaded!',
    })
  const url = req.file?.path
  const body = {
    ...req.body,
    url,
  } as MaterialDoc
  MaterialModel.create(body)
    .then((m) => {
      return res.status(200).json({
        success: true,
        material: m,
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

export const GetMaterialDetails = (
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
  MaterialModel.findById(_id)
    .then((material) => {
      return res.status(200).json({
        success: true,
        material,
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
 

export const GetAllMaterialsForStream = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { stream } = req.params
  if (!stream)
    return res.status(500).json({
      success: false,
      message: 'required values not provided!',
    })

  MaterialModel.find({ stream })
    .then((materials) => {
      return res.status(200).json({
        success: true,
        materials,
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

export const GetAllMaterialsForSubject = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { semester, subject } = req.params
  if (!semester || !subject)
    return res.status(500).json({
      success: false,
      message: 'Required values not provided!',
    })
  const toNum = parseInt(semester as string)
  MaterialModel.find({ semester: toNum, subject: subject }).then(
    (materials) => {
      return res.status(200).json({
        success: true,
        materials,
      })
    },
  )
}

