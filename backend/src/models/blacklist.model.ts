import mongoose, { Schema, Document } from 'mongoose';

interface BlacklistDocument extends Document {
  token: string;
  expiresAt: Date;
}

const BlacklistSchema: Schema = new Schema({
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

BlacklistSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Blacklist = mongoose.model<BlacklistDocument>('Blacklist', BlacklistSchema);