import express from 'express'
import { AddSubject, GetAllSubjects, GetSubjectsForStream } from '../controllers/Subject.controller';
import CheckJWT from '../middleware/jwt.middleware';


const router = express.Router();


router.post('/add-subject',CheckJWT,AddSubject)
router.get('/get-subjects-for-stream/:semester/:stream',GetSubjectsForStream)
router.get('/get-all-subjects',GetAllSubjects)


export {router as SubjectRouter}