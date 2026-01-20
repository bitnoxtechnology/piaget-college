import mongoose, { Document, Schema } from "mongoose";

export interface IApplication extends Document {
  paymentReferenceCode: string;
  surname: string;
  firstname: string;
  dateOfBirth: Date;
  gender: "Male" | "Female" | "Other";
  nationality: string;
  highestEducationLevel:
    | "WAEC/NECO"
    | "JAMB"
    | "Diploma"
    | "Bachelor's Degree"
    | "Higher";
  courseOfInterest: string;
  program: "Undergraduate" | "Professional Diploma in Education";
  jambScore: string;
  waecSubjects: string;
  intendedStartDate: Date;
  personalMessage?: string;
  email: string;
  phoneNumber: string;
  sourceOfInformation:
    | "School Website"
    | "Social Media"
    | "Friend/Referral"
    | "Advertisement"
    | "Other";
  otherSourceDetails?: string;
  status: "pending" | "under-review" | "accepted" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>(
  {
    paymentReferenceCode: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
    },
    highestEducationLevel: {
      type: String,
      enum: ["WAEC/NECO", "JAMB", "Diploma", "Bachelor's Degree", "Higher"],
      required: true,
    },
    courseOfInterest: {
      type: String,
      required: true,
      trim: true,
    },
    program: {
      type: String,
      enum: ["Undergraduate", "Professional Diploma in Education"],
      required: true,
    },
    jambScore: {
      type: String,
      required: true,
      trim: true,
    },
    waecSubjects: {
      type: String,
      required: true,
      trim: true,
    },
    intendedStartDate: {
      type: Date,
      required: true,
    },
    personalMessage: {
      type: String,
      trim: true,
      default: "",
      maxlength: 500,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    sourceOfInformation: {
      type: String,
      enum: [
        "School Website",
        "Social Media",
        "Friend/Referral",
        "Advertisement",
        "Other",
      ],
      required: true,
    },
    otherSourceDetails: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "under-review", "accepted", "rejected"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true }
);

const ApplicationModel = mongoose.model<IApplication>(
  "Application",
  applicationSchema
);

export default ApplicationModel;
