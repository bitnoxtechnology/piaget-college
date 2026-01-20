import { Router } from "express";
import { asyncHandler } from "../../middlewares/async-handler";
import requireAuth from "../../middlewares/authentication";
import { applicationController } from "./application.controller";

const applicationRouter = Router();

// Submit application (public)
applicationRouter.post(
  "/submit",
  asyncHandler(applicationController.createApplication)
);

// Protected routes (require authentication - admin only)
applicationRouter.get(
  "/",
  requireAuth,
  asyncHandler(applicationController.getAllApplications)
);
applicationRouter.get(
  "/:applicationId",
  requireAuth,
  asyncHandler(applicationController.getApplicationById)
);
applicationRouter.patch(
  "/:applicationId/status",
  requireAuth,
  asyncHandler(applicationController.updateApplicationStatus)
);
applicationRouter.delete(
  "/:applicationId",
  requireAuth,
  asyncHandler(applicationController.deleteApplication)
);

export default applicationRouter;
