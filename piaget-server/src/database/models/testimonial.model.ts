import mongoose, { Document, Schema } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  position: string;
  content: string;
  image?: string;
  publishedAt?: Date;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    image: { type: String },
    publishedAt: { type: Date },
    isPublished: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

const TestimonialModel = mongoose.model<ITestimonial>(
  "Testimonial",
  testimonialSchema
);

export default TestimonialModel;
