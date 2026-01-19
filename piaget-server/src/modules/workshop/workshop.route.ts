import { Router } from "express";
import { asyncHandler } from "../../middlewares/async-handler";
import requireAuth from "../../middlewares/authentication";
import { workshopController } from "./workshop.controller";

const workshopRouter = Router();

// Public routes
workshopRouter.get("/", asyncHandler(workshopController.getAllWorkshops));
workshopRouter.get(
  "/:workshopId",
  asyncHandler(workshopController.getWorkshopById)
);

// Protected routes (require authentication)
workshopRouter.post(
  "/",
  requireAuth,
  asyncHandler(workshopController.createWorkshop)
);
workshopRouter.delete(
  "/:workshopId",
  requireAuth,
  asyncHandler(workshopController.deleteWorkshop)
);

export default workshopRouter;
