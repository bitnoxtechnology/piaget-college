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
