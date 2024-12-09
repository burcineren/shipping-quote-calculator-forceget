import { Router } from 'express';
import { login, register } from '../controller/auth.controller';
import { authenticate, unAuth } from '../middleware/auth.middleware';


const router = Router();

router.post('/register', unAuth, register);
router.post('/login', unAuth,login);

export default router;