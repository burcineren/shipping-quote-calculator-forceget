import mongoose, { Schema, Document } from "mongoose";

export interface IOffer extends Document {
  mode: string;
  movementType: string;
  incoterms: string;
  countriesCities: string;
  packageType: string;
  unit1: string;
  unit2: string;
  currency: string;
  boxCount?: number;
  palletCount?: number;
}

const OfferSchema: Schema = new Schema({
  mode: { type: String, required: false },
  movementType: { type: String, required: true },
  incoterms: { type: String, required: true },
  countriesCities: { type: String, required: true },
  packageType: { type: String, required: true },
  unit1: { type: String, required: true },
  unit2: { type: String, required: true },
  currency: { type: String, required: true },
  boxCount: { type: Number },
  palletCount: { type: Number },
});

export const Offer = mongoose.model<IOffer>("Offer", OfferSchema);