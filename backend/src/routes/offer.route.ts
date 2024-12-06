import { Router } from 'express';
import { createOffer, getOffers } from "../controller/offer.controller";

const router = Router();

router.post("/", createOffer);

router.get("/", getOffers);


export default router;