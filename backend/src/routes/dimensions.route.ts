import express from 'express';
import { getDimensions } from '../controller/dimensions.controller';

const router = express.Router();

router.get('/', getDimensions);

export default router;