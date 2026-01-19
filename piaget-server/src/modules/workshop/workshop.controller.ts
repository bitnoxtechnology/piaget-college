import { Request, Response } from "express";
import { WorkshopService } from "./workshop.service";
import { createWorkshopSchema } from "../../lib/validation/workshop.validation";
import { asyncHandler } from "../../middlewares/async-handler";
import { HTTPSTATUSCODE } from "../../config/status-codes.config";

export class WorkshopController {
  private workshopService: WorkshopService;

  constructor(workshopService: WorkshopService) {
    this.workshopService = workshopService;
  }

  public createWorkshop = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const userId = req.userId as string;
      const validatedBody = createWorkshopSchema.parse(req.body);

      const workshop = await this.workshopService.createWorkshop(validatedBody);
      return res.status(HTTPSTATUSCODE.CREATED).json({
        success: true,
        message: "Workshop created successfully",
        data: {
          workshop,
        },
      });
    }
  );

  public getAllWorkshops = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const { page, limit, published, q } = req.query;
      const isPublished =
        published === "true" ? true : published === "false" ? false : undefined;

      const data = await this.workshopService.getAllWorkshops(
        Number(page) || 1,
        Number(limit) || 10,
        isPublished,
        q as string
      );

      return res.status(HTTPSTATUSCODE.OK).json({
        success: true,
        data,
      });
    }
  );

  public getWorkshopById = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const { workshopId } = req.params;
      const workshop = await this.workshopService.getWorkshopById(workshopId);

      return res.status(HTTPSTATUSCODE.OK).json({
        success: true,
        data: { workshop },
      });
    }
  );

  public deleteWorkshop = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const { workshopId } = req.params;
      const result = await this.workshopService.deleteWorkshop(workshopId);

      return res.status(HTTPSTATUSCODE.OK).json({
        success: true,
        data: { result },
      });
    }
  );
}

export const workshopController = new WorkshopController(new WorkshopService());
