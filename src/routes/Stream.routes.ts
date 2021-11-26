import express from 'express'
import { AddStream, GetAllStreams } from '../controllers/Stream.controller';
import CheckJWT from '../middleware/jwt.middleware';


const router = express.Router();



router.post('/add-stream',CheckJWT,AddStream)
router.get('/get-all-streams',GetAllStreams)


export {router as StreamRouter}