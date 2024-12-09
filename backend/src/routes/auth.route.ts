import { Router } from 'express';
import { login, register } from '../controller/auth.controller';
import { authenticate, unAuth } from '../middleware/auth.middleware';


const router = Router();

router.post('/register', authenticate, register);
router.post('/login', unAuth,login);

export default router;