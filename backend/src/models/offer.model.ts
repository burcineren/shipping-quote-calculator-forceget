import mongoose, { Schema, Document } from "mongoose";

export interface IOffer extends Document {
  mode: string;
  movementType: string;
  incoterms: string;
  countrieCities: string;
  packageType: string;
  unit1: string;
  unit2: string;
  currency: string;
}

const OfferSchema: Schema = new Schema({
  mode: { type: String, required: true },
  movementType: { type: String, required: true },
  incoterms: { type: String, required: true },
  countrieCities: { type: String, required: true },
  packageType: { type: String, required: true },
  unit1: { type: String, required: true },
  unit2: { type: String, required: true },
  currency: { type: String, required: true },
});

export const Offer = mongoose.model<IOffer>("Offer", OfferSchema);