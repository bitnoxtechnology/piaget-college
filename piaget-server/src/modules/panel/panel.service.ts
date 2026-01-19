import BlogModel from "../../database/models/blog.model";
import WorkshopModel from "../../database/models/workshop.model";
import TestimonialModel from "../../database/models/testimonial.model";

export class PanelService {
  public async getOverviewStats() {
    const [blogCount, workshopCount, testimonialCount] = await Promise.all([
      BlogModel.countDocuments(),
      WorkshopModel.countDocuments(),
      TestimonialModel.countDocuments(),
    ]);

    return {
      posts: blogCount,
      workshops: workshopCount,
      testimonials: testimonialCount,
      applications: 0,
      users: 0,
    };
  }
}
