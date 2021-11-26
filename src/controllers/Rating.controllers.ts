import { Request, Response, NextFunction } from 'express'
import MaterialModel from '../models/Material.model'
import RatingModel, { RatingDoc } from '../models/Rating.model'

export const AddRating = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const body = req.body as RatingDoc
  const material = body.material
  const m = await MaterialModel.findById(material)
  if (!m)
    return res.status(500).json({
      success: false,
      message: 'Material not found!',
    })
  await m.EvaluateRating(body.stars)
  RatingModel.create(body)
    .then(async (rating) => {
      return res.status(200).json({
        success: true,
        rating,
      })
    })
    .catch((err) => {
      console.log('error')
      console.log(err)
    })
}

export const GetAllRatingsForMaterial = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const materialId = req.params._id
  RatingModel.find({ material: materialId })
    .then((ratings) => {
      return res.status(200).json({
        success: true,
        ratings,
      })
    })
    .catch((err) => {
      console.log('error')
      console.log(err)
    })
}
