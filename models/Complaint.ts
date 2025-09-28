import mongoose, { Schema, Document } from "mongoose";

export interface IComplaint extends Document {
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  dateSubmitted: Date;
}

const ComplaintSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  priority: { type: String, required: true },
  status: { type: String, default: "Pending" },
  dateSubmitted: { type: Date, default: Date.now },
});

export default mongoose.models.Complaint ||
  mongoose.model<IComplaint>("Complaint", ComplaintSchema);
