import express from  'express';
import myUserController from '../controllers/myUserController'

const router = express.Router();

router.post("/", myUserController.createCurrentUser)



export default router