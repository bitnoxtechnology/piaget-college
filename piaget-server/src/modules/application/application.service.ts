import ApplicationModel, {
  IApplication,
} from "../../database/models/application.model";
import { sendEmail } from "../../lib/email/send";
import { applicationFormTemplate } from "../../lib/email/templates/application";
import { NotFoundException } from "../../lib/errors/catch-errors";
import { ApplicationInputType } from "../../lib/validation/application-validator";

// interface ApplicationServiceInput {
//   paymentReferenceCode: string;
//   surname: string;
//   firstname: string;
//   dateOfBirth: string;
//   gender: "Male" | "Female" | "Other";
//   nationality: string;
//   highestEducationLevel:
//     | "WAEC/NECO"
//     | "JAMB"
//     | "Diploma"
//     | "Bachelor's Degree"
//     | "Higher";
//   courseOfInterest: string;
//   program: "Undergraduate" | "Professional Diploma in Education";
//   jambScore: string;
//   waecSubjects: string;
//   intendedStartDate: string;
//   personalMessage?: string;
//   email: string;
//   phoneNumber: string;
//   sourceOfInformation:
//     | "School Website"
//     | "Social Media"
//     | "Friend/Referral"
//     | "Advertisement"
//     | "Other";
//   otherSourceDetails?: string;
// }

interface UpdateApplicationStatusInput {
  status: "pending" | "under-review" | "accepted" | "rejected";
}

export class ApplicationService {
  public async createApplication(
    input: ApplicationInputType
  ): Promise<IApplication> {
    const application = new ApplicationModel({
      ...input,
      dateOfBirth: new Date(input.dateOfBirth),
      intendedStartDate: new Date(input.intendedStartDate),
    });
    await application.save();

    // send email notification
    const emailContent = applicationFormTemplate({
      surname: input.surname,
      firstname: input.firstname,
      email: input.email,
      phoneNumber: input.phoneNumber,
      paymentReferenceCode: input.paymentReferenceCode,
      dateOfBirth: input.dateOfBirth,
      gender: input.gender,
      nationality: input.nationality,
      highestEducationLevel: input.highestEducationLevel,
      courseOfInterest: input.courseOfInterest,
      program: input.program,
      jambScore: input.jambScore,
      waecSubjects: input.waecSubjects,
      intendedStartDate: input.intendedStartDate,
      personalMessage: input.personalMessage,
      sourceOfInformation: input.sourceOfInformation,
      otherSourceDetails: input.otherSourceDetails,
    });

    await sendEmail({ ...emailContent, replyTo: input.email });

    return application;
  }

  public async getAllApplications(
    page: number = 1,
    limit: number = 10,
    status?: string,
    q?: string
  ) {
    const skip = (page - 1) * limit;
    const filter: { status?: string; $or?: any[] } = {};

    if (q) {
      filter.$or = [
        { surname: { $regex: q, $options: "i" } },
        { firstname: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { phoneNumber: { $regex: q, $options: "i" } },
        { paymentReferenceCode: { $regex: q, $options: "i" } },
        { courseOfInterest: { $regex: q, $options: "i" } },
      ];
    }

    if (status) {
      filter.status = status;
    }

    const applications = await ApplicationModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await ApplicationModel.countDocuments(filter);

    return {
      applications,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  public async getApplicationById(
    applicationId: string
  ): Promise<IApplication> {
    const application = await ApplicationModel.findById(applicationId);
    if (!application) {
      throw new NotFoundException("Application not found");
    }
    return application;
  }

  public async updateApplicationStatus(
    applicationId: string,
    input: UpdateApplicationStatusInput
  ): Promise<IApplication> {
    const application = await ApplicationModel.findByIdAndUpdate(
      applicationId,
      { status: input.status },
      { new: true, runValidators: true }
    );

    if (!application) {
      throw new NotFoundException("Application not found");
    }

    return application;
  }

  public async deleteApplication(
    applicationId: string
  ): Promise<{ message: string }> {
    const result = await ApplicationModel.findByIdAndDelete(applicationId);
    if (!result) {
      throw new NotFoundException("Application not found");
    }
    return { message: "Application deleted successfully" };
  }
}
