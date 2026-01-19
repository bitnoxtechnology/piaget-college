import mongoose, { Document, Schema } from "mongoose";

export interface IWorkshop extends Document {
  title: string;
  description: string;
  date: Date;
  programs?: string[];
  startTime: string;
  endTime: string;
  location: string;
  instructor?: string;
  capacity?: number;
  enrolledCount?: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const workshopSchema = new Schema<IWorkshop>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    programs: { type: [String], default: [] },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    location: { type: String, required: true },
    instructor: { type: String },
    capacity: { type: Number, default: 1, min: 1 },
    enrolledCount: { type: Number, default: 0, min: 0 },
    isPublished: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

const WorkshopModel = mongoose.model<IWorkshop>("Workshop", workshopSchema);
export default WorkshopModel;
