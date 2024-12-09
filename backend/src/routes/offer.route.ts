import { Router } from 'express';
import { createOffer, getOffers } from "../controller/offer.controller";
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post("/", authenticate, createOffer);

router.get("/", authenticate, getOffers);


export default router;