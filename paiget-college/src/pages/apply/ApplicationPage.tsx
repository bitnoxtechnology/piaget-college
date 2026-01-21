"use client";

import React, { useState } from "react";
import { useForm, Controller, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";

import {
  applicationSchema,
  type ApplicationFormType,
} from "@/lib/validations/application-validator";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { applicationService } from "@/lib/services/application-service";

const ApplicationPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ApplicationFormType>({
    resolver: zodResolver(applicationSchema) as Resolver<ApplicationFormType>,
    mode: "onChange",
    defaultValues: {
      paymentReferenceCode: "",
      surname: "",
      firstname: "",
      dateOfBirth: "",
      gender: "Male",
      nationality: "",
      highestEducationLevel: "WAEC/NECO",
      courseOfInterest: "",
      program: "Undergraduate",
      jambScore: "",
      waecSubjects: "",
      intendedStartDate: "",
      personalMessage: "",
      email: "",
      phoneNumber: "",
      sourceOfInformation: "School Website",
      otherSourceDetails: "",
    },
  });

  const sourceOfInformation = form.watch("sourceOfInformation");

  const onSubmit = async (data: ApplicationFormType) => {
    setIsSubmitting(true);

    try {
      const response = await applicationService.submitApplication(data);
      if (response.success) {
        toast.success("Application submitted successfully!");
        form.reset();
      }
    } catch (error) {
      toast.error(
        "Failed to submit application. Please try again or contact support."
      );
      console.error("Application submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-light-800! py-12! px-4! sm:px-6! lg:px-8! mt-17.5! md:mt-20!">
        <div className="max-w-4xl mx-auto!">
          {/* Header */}
          <div className="mb-12!">
            <h1 className="text-4xl! font-bold text-primary-100 mb-2!">
              Student Application Form
            </h1>
            <p className="text-text-primary text-lg!">
              Join Piaget College and unlock your potential
            </p>
          </div>

          {/* Important Notice */}
          <div className="bg-secondary-200 border-l-4 border-primary-100 p-6! mb-8! rounded-lg">
            <h2 className="text-xl! font-semibold text-primary-100 mb-3!">
              ⚠️ Important Notice
            </h2>
            <p className="text-text-primary mb-4!">
              Kindly ensure you make the payment of{" "}
              <span className="font-bold">N10,000</span> into the school account
              before filling the form below.
            </p>
            <div className="bg-white bg-opacity-50 p-4! rounded">
              <p className="text-sm! text-text-primary mb-2!">
                <span className="font-semibold">Bank Name:</span> Access Bank
              </p>
              <p className="text-sm! text-text-primary mb-2!">
                <span className="font-semibold">Account Name:</span> Piaget
                College
              </p>
              <p className="text-sm! text-text-primary">
                <span className="font-semibold">Account Number:</span>{" "}
                1234567890
              </p>
            </div>
          </div>

          {/* Application Form */}
          <div className="bg-white rounded-lg shadow-lg p-8!">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6!">
              {/* Payment Reference Code */}
              <FieldGroup>
                <Controller
                  name="paymentReferenceCode"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="paymentReferenceCode">
                        Payment Reference Code{" "}
                        <span className="text-red-600">*</span>
                      </FieldLabel>
                      <FieldDescription>
                        Enter the payment reference code from your bank receipt
                      </FieldDescription>
                      <Input
                        {...field}
                        id="paymentReferenceCode"
                        placeholder="e.g., ACC-2024-001234"
                        disabled={isSubmitting}
                        className="h-[initial] w-full py-4! px-5! rounded-lg border! transition-all duration-300 ease-in border-secondary-500! placeholder:text-tertiary-400! focus:outline-none! focus:border-primary-500! focus:ring-1! focus:ring-primary-500! focus:shadow-form-input!"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* Surname and Firstname */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FieldGroup>
                  <Controller
                    name="surname"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="surname">
                          Surname <span className="text-red-600">*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id="surname"
                          placeholder="Enter your surname"
                          disabled={isSubmitting}
                          className="h-[initial] w-full py-4! px-5! rounded-lg border! transition-all duration-300 ease-in border-secondary-500! placeholder:text-tertiary-400! focus:outline-none! focus:border-primary-500! focus:ring-1! focus:ring-primary-500! focus:shadow-form-input!"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>

                <FieldGroup>
                  <Controller
                    name="firstname"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="firstname">
                          First Name <span className="text-red-600">*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id="firstname"
                          placeholder="Enter your first name"
                          disabled={isSubmitting}
                          className="h-[initial] w-full py-4! px-5! rounded-lg border! transition-all duration-300 ease-in border-secondary-500! placeholder:text-tertiary-400! focus:outline-none! focus:border-primary-500! focus:ring-1! focus:ring-primary-500! focus:shadow-form-input!"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </div>

              {/* Date of Birth and Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FieldGroup>
                  <Controller
                    name="dateOfBirth"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="dateOfBirth">
                          Date of Birth <span className="text-red-600">*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id="dateOfBirth"
                          type="date"
                          disabled={isSubmitting}
                          className="h-[initial] w-full py-4! px-5! rounded-lg border! transition-all duration-300 ease-in border-secondary-500! placeholder:text-tertiary-400! focus:outline-none! focus:border-primary-500! focus:ring-1! focus:ring-primary-500! focus:shadow-form-input!"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>

                <FieldGroup>
                  <Controller
                    name="gender"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="gender">
                          Gender <span className="text-red-600">*</span>
                        </FieldLabel>
                        <select
                          {...field}
                          id="gender"
                          disabled={isSubmitting}
                          className="h-[initial] w-full py-4! px-5! rounded-lg border! transition-all duration-300 ease-in border-secondary-500! placeholder:text-tertiary-400! focus:outline-none! focus:border-primary-500! focus:ring-1! focus:ring-primary-500! focus:shadow-form-input! bg-white cursor-pointer"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </div>

              {/* Nationality and Education Level */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FieldGroup>
                  <Controller
                    name="nationality"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="nationality">
                          Nationality <span className="text-red-600">*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id="nationality"
                          placeholder="Enter your nationality"
                          disabled={isSubmitting}
                          className="h-[initial] w-full py-4! px-5! rounded-lg border! transition-all duration-300 ease-in border-secondary-500! placeholder:text-tertiary-400! focus:outline-none! focus:border-primary-500! focus:ring-1! focus:ring-primary-500! focus:shadow-form-input!"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>

                <FieldGroup>
                  <Controller
                    name="highestEducationLevel"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="highestEducationLevel">
                          Highest Level of Education{" "}
                          <span className="text-red-600">*</span>
                        </FieldLabel>
                        <select
                          {...field}
                          id="highestEducationLevel"
                          disabled={isSubmitting}
                          className="h-[initial] w-full py-4! px-5! rounded-lg border! transition-all duration-300 ease-in border-secondary-500! placeholder:text-tertiary-400! focus:outline-none! focus:border-primary-500! focus:ring-1! focus:ring-primary-500! focus:shadow-form-input! bg-white cursor-pointer"
                        >
                          <option value="WAEC/NECO">WAEC/NECO</option>
                          <option value="JAMB">JAMB</option>
                          <option value="Diploma">Diploma</option>
                          <option value="Bachelor's Degree">
                            Bachelor's Degree
                          </option>
                          <option value="Higher">Higher</option>
                        </select>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </div>

              {/* Course of Interest and Program */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FieldGroup>
                  <Controller
                    name="courseOfInterest"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="courseOfInterest">
                          Course of Interest{" "}
                          <span className="text-red-600">*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id="courseOfInterest"
                          placeholder="e.g., Web Development, Data Science"
                          disabled={isSubmitting}
                          className="h-[initial] w-full py-4! px-5! rounded-lg border! transition-all duration-300 ease-in border-secondary-500! placeholder:text-tertiary-400! focus:outline-none! focus:border-primary-500! focus:ring-1! focus:ring-primary-500! focus:shadow-form-input!"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>

                <FieldGroup>
                  <Controller
                    name="program"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="program">
                          Program <span className="text-red-600">*</span>
                        </FieldLabel>
                        <select
                          {...field}
                          id="program"
                          disabled={isSubmitting}
                          className="h-[initial] w-full py-4! px-5! rounded-lg border! transition-all duration-300 ease-in border-secondary-500! placeholder:text-tertiary-400! focus:outline-none! focus:border-primary-500! focus:ring-1! focus:ring-primary-500! focus:shadow-form-input! bg-white cursor-pointer"
                        >
                          <option value="Undergraduate">Undergraduate</option>
                          <option value="Professional Diploma in Education">
                            Professional Diploma in Education
                          </option>
                        </select>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </div>

              {/* JAMB Score and WAEC Subjects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FieldGroup>
                  <Controller
                    name="jambScore"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="jambScore">
                          JAMB Score/Credits/Passes{" "}
                          <span className="text-red-600">*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id="jambScore"
                          placeholder="e.g., 180, or specify your credits/passes"
                          disabled={isSubmitting}
                          className="h-[initial] w-full py-4! px-5! rounded-lg border! transition-all duration-300 ease-in border-secondary-500! placeholder:text-tertiary-400! focus:outline-none! focus:border-primary-500! focus:ring-1! focus:ring-primary-500! focus:shadow-form-input!"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>

                <FieldGroup>
                  <Controller
                    name="waecSubjects"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <div className="flex gap-2">
                          <FieldLabel htmlFor="waecSubjects">
                            WAEC/NECO Subjects{" "}
                            <span className="text-red-600">*</span>
                          </FieldLabel>
                          <FieldDescription>
                            Separate subjects with commas
                          </FieldDescription>
                        </div>
                        <Input
                          {...field}
                          id="waecSubjects"
                          placeholder="e.g., English, Mathematics, Physics"
                          disabled={isSubmitting}
                          className="h-[initial] w-full py-4! px-5! rounded-lg border! transition-all duration-300 ease-in border-secondary-500! placeholder:text-tertiary-400! focus:outline-none! focus:border-primary-500! focus:ring-1! focus:ring-primary-500! focus:shadow-form-input!"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </div>

              {/* Intended Start Date */}
              <FieldGroup>
                <Controller
                  name="intendedStartDate"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="intendedStartDate">
                        When do you intend to start?{" "}
                        <span className="text-red-600">*</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        id="intendedStartDate"
                        type="date"
                        disabled={isSubmitting}
                        className="h-[initial] w-full py-4! px-5! rounded-lg border! transition-all duration-300 ease-in border-secondary-500! placeholder:text-tertiary-400! focus:outline-none! focus:border-primary-500! focus:ring-1! focus:ring-primary-500! focus:shadow-form-input!"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* Personal Message */}
              <FieldGroup>
                <Controller
                  name="personalMessage"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="personalMessage">
                        Personal Message
                      </FieldLabel>
                      <FieldDescription>
                        Tell us about yourself, your goals, or why you're
                        interested in Piaget College (optional, max 500
                        characters)
                      </FieldDescription>
                      <Textarea
                        {...field}
                        id="personalMessage"
                        placeholder="Share your story with us..."
                        disabled={isSubmitting}
                        rows={4}
                        className="h-[initial] w-full py-4! px-5! rounded-lg border! transition-all duration-300 ease-in border-secondary-500! placeholder:text-tertiary-400! focus:outline-none! focus:border-primary-500! focus:ring-1! focus:ring-primary-500! focus:shadow-form-input!"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* Email and Phone Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FieldGroup>
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="email">
                          Email Address <span className="text-red-600">*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          disabled={isSubmitting}
                          className="h-[initial] w-full py-4! px-5! rounded-lg border! transition-all duration-300 ease-in border-secondary-500! placeholder:text-tertiary-400! focus:outline-none! focus:border-primary-500! focus:ring-1! focus:ring-primary-500! focus:shadow-form-input!"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>

                <FieldGroup>
                  <Controller
                    name="phoneNumber"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="phoneNumber">
                          Phone Number <span className="text-red-600">*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id="phoneNumber"
                          type="tel"
                          placeholder="+234 (80) 1234-5678"
                          disabled={isSubmitting}
                          className="h-[initial] w-full py-4! px-5! rounded-lg border! transition-all duration-300 ease-in border-secondary-500! placeholder:text-tertiary-400! focus:outline-none! focus:border-primary-500! focus:ring-1! focus:ring-primary-500! focus:shadow-form-input!"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </div>

              {/* Source of Information */}
              <FieldGroup>
                <Controller
                  name="sourceOfInformation"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="sourceOfInformation">
                        Where did you hear about us?{" "}
                        <span className="text-red-600">*</span>
                      </FieldLabel>
                      <select
                        {...field}
                        id="sourceOfInformation"
                        disabled={isSubmitting}
                        className="h-[initial] w-full py-4! px-5! rounded-lg border! transition-all duration-300 ease-in border-secondary-500! placeholder:text-tertiary-400! focus:outline-none! focus:border-primary-500! focus:ring-1! focus:ring-primary-500! focus:shadow-form-input! bg-white cursor-pointer"
                      >
                        <option value="School Website">School Website</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Friend/Referral">Friend/Referral</option>
                        <option value="Advertisement">Advertisement</option>
                        <option value="Other">Other</option>
                      </select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* Conditional Other Source Details */}
              {sourceOfInformation === "Other" && (
                <FieldGroup>
                  <Controller
                    name="otherSourceDetails"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="otherSourceDetails">
                          Please specify <span className="text-red-600">*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id="otherSourceDetails"
                          placeholder="Where did you hear about us?"
                          disabled={isSubmitting}
                          className="h-[initial] w-full py-4! px-5! rounded-lg border! transition-all duration-300 ease-in border-secondary-500! placeholder:text-tertiary-400! focus:outline-none! focus:border-primary-500! focus:ring-1! focus:ring-primary-500! focus:shadow-form-input!"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
              )}

              {/* Submit Button */}
              <div className="flex gap-4 pt-8!">
                <Button
                  type="submit"
                  disabled={isSubmitting || !form.formState.isValid}
                  className="flex-1 bg-primary-100 hover:bg-primary-200 text-white font-semibold py-4! px-6! rounded-lg transition-colors duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <Spinner className="mr-2!" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
                <Button
                  type="button"
                  onClick={() => form.reset()}
                  disabled={isSubmitting}
                  className="flex-1 bg-secondary-500 hover:bg-secondary-400 text-white font-semibold py-4! px-6! rounded-lg transition-colors duration-300"
                >
                  Clear Form
                </Button>
              </div>

              {/* Form Status */}
              {Object.keys(form.formState.errors).length > 0 && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4! rounded mt-4!">
                  <p className="text-sm! font-semibold text-red-700">
                    Please fix the errors above before submitting
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Footer Note */}
          <div className="mt-8! text-center text-text-primary text-sm!">
            <p>
              Have questions? Contact us at{" "}
              <a
                href="mailto:admissions@piaget.edu.ng"
                className="text-primary-100 font-semibold hover:underline"
              >
                admissions@piaget.edu.ng
              </a>{" "}
              or call{" "}
              <a
                href="tel:+2348012345678"
                className="text-primary-100 font-semibold hover:underline"
              >
                +234 (801) 234-5678
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ApplicationPage;
