import { Request, Response } from "express";
import { Dimension } from "../models/dimension.model";

export const getDimensions = async (_req: Request, res: Response): Promise<void> => {
    try {
        const dimensions = await Dimension.find();
        res.status(200).json(dimensions);
    } catch (error) {
        console.error('Error fetching dimensions:', error);
        res.status(500).json({ error: 'Failed to fetch dimensions' });
    }
};