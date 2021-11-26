import express from 'express'
import multer from 'multer'
import {
  AddMaterial,
  GetAllMaterialsForStream,
  GetAllMaterialsForSubject,
  GetMaterialDetails,
} from '../controllers/Material.controller'
import CheckJWT from '../middleware/jwt.middleware'

const router = express.Router()

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/')
    },
  }),
  fileFilter: (req, files, callback) => {
    if (files.originalname.includes('.pdf')) {
      callback(null, true)
    } else {
      callback(null, false)
    }
  },
  limits: {
    //5mb?
    fileSize: 1024 * 1024 * 5,
  },
})

router.post('/add-material', CheckJWT, upload.single('file'), AddMaterial)
router.get('/get-material-details/:_id', GetMaterialDetails)
router.get(
  '/get-all-materials-for-subject/:semester/:subject',
  GetAllMaterialsForSubject,
)
router.get('/get-all-materials-for-stream/:_id', GetAllMaterialsForStream)

export { router as MaterialRouter }
