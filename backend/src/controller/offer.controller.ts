import { Request, Response } from "express";
import { Dimension } from "../models/dimension.model";
import { calculateBoxCount, calculatePalletCount } from "../utils/calculations.util";
import { IOffer, Offer } from "../models/offer.model";

export const createOffer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { packageType, mode, ...offerData } = req.body;

    const carton = await Dimension.findOne({ type: "Carton" });
    const box = await Dimension.findOne({ type: "Box" });
    const pallet = await Dimension.findOne({ type: "Pallet" });

    if (!carton || !box || !pallet) {
      res.status(500).json({ error: "Dimension data is missing from the database." });
      return;
    }

    let boxCount: number | null = null;
    let palletCount: number | null = null;

    if (packageType === "Cartons") {
      boxCount = calculateBoxCount(carton, box);
      palletCount = calculatePalletCount(box, pallet);
    } else if (packageType === "Boxes") {
      palletCount = calculatePalletCount(box, pallet);
    } else if (packageType === "Pallets") {
      palletCount = 1;
    }

    if (mode === "LCL" && palletCount && palletCount >= 24) {
      res.status(400).json({ error: "For pallet count 24 or more, choose mode FCL." });
      return;
    }

    if (mode === "FCL" && palletCount && palletCount > 24) {
      res.status(400).json({ error: "Cannot ship more than 24 pallets with FCL." });
      return;
    }

    const newOffer: IOffer = new Offer({ ...offerData, mode, packageType, boxCount, palletCount });
    const savedOffer = await newOffer.save();
    res.status(201).json(savedOffer);
  } catch (error) {
    console.error("Error creating offer:", error);
    res.status(500).json({ error: "Failed to create offer" });
  }
};

export const getOffers = async (req: Request, res: Response): Promise<void> => {
  try {
    const offers = await Offer.find();
    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch offers" });
  }
};