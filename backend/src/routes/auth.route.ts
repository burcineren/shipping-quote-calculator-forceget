import { Router } from 'express';
import { login, logout, register } from '../controller/auth.controller';
import { authenticate, unAuth } from '../middleware/auth.middleware';


const router = Router();

router.post('/register', unAuth, register);
router.post('/login', unAuth,login);
router.post('/logout', authenticate, logout);

router.get('/protected', authenticate, (req, res) => {
    res.json({ message: 'You are accessing a protected route', user: req.body.user });
});

export default router;