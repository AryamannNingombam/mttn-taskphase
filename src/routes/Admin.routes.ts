import express from 'express'
import { SignIn } from '../controllers/Admin.controllers';

const router = express.Router();


router.post('/sign-in',SignIn)



export {router as AdminRouter}