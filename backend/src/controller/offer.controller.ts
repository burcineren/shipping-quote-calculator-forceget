import { Request, Response } from "express";
import { Offer, IOffer } from "../models/offer.model";

// Create a new offer
export const createOffer = async (req: Request, res: Response): Promise<void> => {
  try {
    const newOffer: IOffer = new Offer(req.body);
    const savedOffer = await newOffer.save();
    res.status(201).json({ message: "Offer saved successfully", offer: savedOffer });
  } catch (error) {
    console.error("Error creating offer:", error);
    res.status(500).json({ error: "Failed to save offer" });
  }
};

// Get all offers
export const getOffers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const offers = await Offer.find();
    res.status(200).json(offers);
  } catch (error) {
    console.error("Error fetching offers:", error);
    res.status(500).json({ error: "Failed to fetch offers" });
  }
};