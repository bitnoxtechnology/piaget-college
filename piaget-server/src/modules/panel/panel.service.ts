import BlogModel from "../../database/models/blog.model";
import WorkshopModel from "../../database/models/workshop.model";
import TestimonialModel from "../../database/models/testimonial.model";
import ApplicationModel from "../../database/models/application.model";

export class PanelService {
  public async getOverviewStats() {
    const [blogCount, workshopCount, testimonialCount, applicationCount] =
      await Promise.all([
        BlogModel.countDocuments(),
        WorkshopModel.countDocuments(),
        TestimonialModel.countDocuments(),
        ApplicationModel.countDocuments(),
      ]);

    return {
      posts: blogCount,
      workshops: workshopCount,
      testimonials: testimonialCount,
      applications: applicationCount,
      users: 0,
    };
  }
}
