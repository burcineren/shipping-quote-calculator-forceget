import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.util';

export const authenticate = (req: Request, res: Response, next: NextFunction):void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Authorization header missing or invalid' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);
        req.body.user = decoded;
        next();
        return;
    } catch (error) {
        res.status(403).json({ error: 'Invalid or expired token' });
        return;
    }
}; export const unAuth = (req: Request, res: Response, next: NextFunction):void=> {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        next(); 
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);
        res.status(403).json({
            error: 'You are already authenticated. Logout to perform this action.',
            user: decoded, 
            
        });
        return;
    } catch (error) {
        
        next(); 
        return;
    }
};