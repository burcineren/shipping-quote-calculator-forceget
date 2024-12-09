import express from 'express';
import { getDimensions } from '../controller/dimensions.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', authenticate, getDimensions);

export default router;