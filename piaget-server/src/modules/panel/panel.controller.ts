import { Request, Response } from "express";
import { HTTPSTATUSCODE } from "../../config/status-codes.config";
import { asyncHandler } from "../../middlewares/async-handler";
import { PanelService } from "./panel.service";

export class PanelController {
  private panelService: PanelService;

  constructor(panelService: PanelService) {
    this.panelService = panelService;
  }

  public getOverviewStats = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const stats = await this.panelService.getOverviewStats();
      return res.status(HTTPSTATUSCODE.OK).json({
        success: true,
        data: stats,
      });
    }
  );
}

export const panelController = new PanelController(new PanelService());
