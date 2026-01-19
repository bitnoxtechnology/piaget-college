import { Router } from "express";
import { asyncHandler } from "../../middlewares/async-handler";
import requireAuth from "../../middlewares/authentication";
import { panelController } from "./panel.controller";

const panelRouter = Router();

// Privtae routes
panelRouter.get(
  "/",
  requireAuth,
  asyncHandler(panelController.getOverviewStats)
);

export default panelRouter;
