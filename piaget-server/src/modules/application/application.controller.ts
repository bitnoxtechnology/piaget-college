import { Request, Response } from "express";
import { ApplicationService } from "./application.service";
import { applicationSchema } from "../../lib/validation/application-validator";
import { asyncHandler } from "../../middlewares/async-handler";
import { HTTPSTATUSCODE } from "../../config/status-codes.config";

export class ApplicationController {
  private applicationService: ApplicationService;

  constructor(applicationService: ApplicationService) {
    this.applicationService = applicationService;
  }

  public createApplication = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const validatedBody = applicationSchema.parse(req.body);

      const application =
        await this.applicationService.createApplication(validatedBody);
      return res.status(HTTPSTATUSCODE.CREATED).json({
        success: true,
        message: "Application submitted successfully",
        data: {
          application,
        },
      });
    }
  );

  public getAllApplications = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const { page, limit, status, q } = req.query;

      const data = await this.applicationService.getAllApplications(
        Number(page) || 1,
        Number(limit) || 10,
        status as string,
        q as string
      );

      return res.status(HTTPSTATUSCODE.OK).json({
        success: true,
        data,
      });
    }
  );

  public getApplicationById = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const { applicationId } = req.params;
      const application =
        await this.applicationService.getApplicationById(applicationId);

      return res.status(HTTPSTATUSCODE.OK).json({
        success: true,
        data: { application },
      });
    }
  );

  public updateApplicationStatus = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const { applicationId } = req.params;
      const { status } = req.body;

      if (
        !status ||
        !["pending", "under-review", "accepted", "rejected"].includes(status)
      ) {
        return res.status(HTTPSTATUSCODE.BAD_REQUEST).json({
          success: false,
          message:
            "Invalid status. Must be one of: pending, under-review, accepted, rejected",
        });
      }

      const application = await this.applicationService.updateApplicationStatus(
        applicationId,
        {
          status,
        }
      );

      return res.status(HTTPSTATUSCODE.OK).json({
        success: true,
        message: "Application status updated successfully",
        data: { application },
      });
    }
  );

  public deleteApplication = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const { applicationId } = req.params;
      const result =
        await this.applicationService.deleteApplication(applicationId);

      return res.status(HTTPSTATUSCODE.OK).json({
        success: true,
        data: { result },
      });
    }
  );
}

export const applicationController = new ApplicationController(
  new ApplicationService()
);
