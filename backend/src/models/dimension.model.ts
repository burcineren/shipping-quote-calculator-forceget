import mongoose, { Schema, Document } from "mongoose";

export interface IDimension extends Document {
  type: string;
  width: number;
  length: number;
  height: number;
}

const DimensionSchema: Schema = new Schema({
  type: { type: String, required: true },
  width: { type: Number, required: true },
  length: { type: Number, required: true },
  height: { type: Number, required: true },
});

export const Dimension = mongoose.model<IDimension>("Dimension", DimensionSchema);