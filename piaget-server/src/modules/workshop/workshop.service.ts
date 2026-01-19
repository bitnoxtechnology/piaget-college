import { CreateWorkshopInput } from "../../lib/validation/workshop.validation";
import { NotFoundException } from "../../lib/errors/catch-errors";
import WorkshopModel, { IWorkshop } from "../../database/models/workshop.model";

export class WorkshopService {
  public async createWorkshop(input: CreateWorkshopInput): Promise<IWorkshop> {
    const workshop = new WorkshopModel({
      ...input,
      publishedAt: input.isPublished ? new Date() : undefined,
    });
    await workshop.save();
    return workshop;
  }

  public async getAllWorkshops(
    page: number = 1,
    limit: number = 10,
    isPublished?: boolean,
    q?: string
  ) {
    const skip = (page - 1) * limit;
    const filter: { isPublished?: boolean; $or?: any[] } = {};

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }

    if (isPublished !== undefined) {
      filter.isPublished = isPublished;
    }

    const workshops = await WorkshopModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await WorkshopModel.countDocuments(filter);

    return {
      workshops,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  public async getWorkshopById(id: string): Promise<IWorkshop> {
    const workshop = await WorkshopModel.findById(id);
    if (!workshop) {
      throw new NotFoundException("Workshop not found");
    }
    return workshop;
  }

  public async deleteWorkshop(
    workshopId: string
  ): Promise<{ message: string }> {
    const result = await WorkshopModel.findByIdAndDelete(workshopId);
    if (!result) {
      throw new NotFoundException("Workshop not found");
    }
    return { message: "Workshop deleted successfully" };
  }
}
