import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/async-handler";
import { EmailService } from "./email.service";
import { BadRequestException } from "../../lib/errors/catch-errors";
import { HTTPSTATUSCODE } from "../../config/status-codes.config";

export class EmailController {
  private emailService: EmailService;

  constructor(emailService: EmailService) {
    this.emailService = emailService;
  }

  public sendContactUsEmail = asyncHandler(
    async (req: Request, res: Response) => {
      const { name, email, phone, subject, message } = req.body;

      if (!name || !email || !message || !phone || !subject) {
        throw new BadRequestException("All fields are required");
      }

      await this.emailService.sendContactUsEmail({
        name,
        email,
        message,
        phone,
        subject,
      });

      return res.status(HTTPSTATUSCODE.OK).json({
        message: "Contact us email sent successfully",
        success: true,
      });
    }
  );
}

export const emailController = new EmailController(new EmailService());
