import TestimonialModel, {
  ITestimonial,
} from "../../database/models/testimonial.model";
import {
  CreateTestimonialInput,
  UpdateTestimonialInput,
} from "../../lib/validation/testimonial.validation";
import { NotFoundException } from "../../lib/errors/catch-errors";

export class TestimonialService {
  public async createTestimonial(
    input: CreateTestimonialInput
  ): Promise<ITestimonial> {
    const testimonial = new TestimonialModel({
      ...input,
      publishedAt: input.isPublished ? new Date() : undefined,
    });
    await testimonial.save();
    return testimonial;
  }

  public async getAllTestimonials(
    page: number = 1,
    limit: number = 10,
    isPublished?: boolean,
    q?: string
  ) {
    const skip = (page - 1) * limit;
    const filter: { isPublished?: boolean; $or?: any[] } = {};

    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { position: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
      ];
    }

    if (isPublished !== undefined) {
      filter.isPublished = isPublished;
    }

    const testimonials = await TestimonialModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await TestimonialModel.countDocuments(filter);

    return {
      testimonials,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  public async getTestimonialById(id: string): Promise<ITestimonial> {
    const testimonial = await TestimonialModel.findById(id);
    if (!testimonial) {
      throw new NotFoundException("Testimonial not found");
    }
    return testimonial;
  }

  public async updateTestimonial(
    testimonialId: string,
    input: UpdateTestimonialInput
  ): Promise<ITestimonial> {
    const testimonial = await TestimonialModel.findById(testimonialId);

    if (!testimonial) {
      throw new NotFoundException("Testimonial not found");
    }

    Object.assign(testimonial, input);

    // Handle publishing state change
    if (input.isPublished && !testimonial.publishedAt) {
      testimonial.publishedAt = new Date();
    } else if (input.isPublished === false) {
      testimonial.publishedAt = undefined;
    }

    await testimonial.save();
    return testimonial;
  }

  public async deleteTestimonial(
    testimonialId: string
  ): Promise<{ message: string }> {
    const result = await TestimonialModel.findByIdAndDelete(testimonialId);
    if (!result) {
      throw new NotFoundException("Testimonial not found");
    }
    return { message: "Testimonial deleted successfully" };
  }
}
