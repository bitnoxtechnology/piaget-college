type UserType = {
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

interface ErrorResponse {
  success: boolean;
  message: string;
  errorName?: string;
}

interface IBlog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  contentHtml: string;
  coverImage?: string;
  images?: string[];
  videos?: string[];
  tags?: string[];
  author: UserType;
  publishedAt?: Date;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ITestimonial {
  _id: string;
  name: string;
  position: string;
  image: string;
  content: string;
  publishedAt?: Date;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface IWorkshop {
  _id: string;
  title: string;
  description: string;
  date: Date;
  programs: string[];
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

interface IApplication {
  _id: string;
  paymentReferenceCode: string;
  surname: string;
  firstname: string;
  dateOfBirth: string;
  gender: "Male" | "Female" | "Other";
  nationality: string;
  highestEducationLevel: string;
  courseOfInterest: string;
  program: string;
  jambScore: string;
  waecSubjects: string;
  intendedStartDate: string;
  personalMessage?: string;
  email: string;
  phoneNumber: string;
  sourceOfInformation: string;
  otherSourceDetails?: string;
  status: "pending" | "under-review" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
}
