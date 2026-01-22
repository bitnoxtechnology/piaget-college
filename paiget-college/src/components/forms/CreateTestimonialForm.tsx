import React, { useState } from "react";
import {
  useForm,
  Controller,
  type SubmitHandler,
  type Resolver,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { ImageUpload } from "@/components/ui/image-upload";
import { Switch } from "@/components/ui/switch";

import { testimonialService } from "@/lib/services/testimonial-service";
import { useNavigate } from "react-router-dom";
import {
  testimonialSchema,
  type CreateTestimonialInput,
} from "@/lib/validations/testimonial-validator";

const CreateTestimonialForm: React.FC = () => {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const createForm = useForm<CreateTestimonialInput>({
    resolver: zodResolver(
      testimonialSchema
    ) as Resolver<CreateTestimonialInput>,
    defaultValues: {
      name: "",
      content: "",
      image: "",
      position: "",
      isPublished: false,
    },
  });

  const onSubmit: SubmitHandler<CreateTestimonialInput> = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await testimonialService.createTestimonial(data);
      if (res.success) {
        toast.success("Testimony created successfully!");
        createForm.reset({
          name: "",
          content: "",
          image: undefined,
          position: "",
          isPublished: false,
        });
        navigate("/admin/testimonials");
      }
    } catch (error) {
      toast.error(`Failed to create post.`);
      console.error("Testimony submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <form onSubmit={createForm.handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup>
          <Controller
            name="name"
            control={createForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Testifier Name</FieldLabel>
                <Input
                  {...field}
                  id="name"
                  placeholder="Enter name"
                  disabled={isSubmitting}
                  className="h-[initial] w-full py-4! px-5! rounded-lg border! transition-all duration-300 ease-in border-secondary-500! placeholder:text-tertiary-400! focus:outline-none! focus:border-primary-500! focus:ring-1! focus:ring-primary-500! focus:shadow-form-input!"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="position"
            control={createForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="position">Testifier Position</FieldLabel>
                <Input
                  {...field}
                  id="position"
                  placeholder="Enter position"
                  disabled={isSubmitting}
                  className="h-[initial] w-full py-4! px-5! rounded-lg border! transition-all duration-300 ease-in border-secondary-500! placeholder:text-tertiary-400! focus:outline-none! focus:border-primary-500! focus:ring-1! focus:ring-primary-500! focus:shadow-form-input!"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="content"
            control={createForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="content">Content</FieldLabel>
                <Textarea
                  {...field}
                  id="content"
                  placeholder="Enter testimony"
                  disabled={isSubmitting}
                  className="h-25 w-full py-4! px-5! rounded-lg border! transition-all duration-300 ease-in border-secondary-500! placeholder:text-tertiary-400! focus:outline-none! focus:border-primary-500! focus:ring-1! focus:ring-primary-500! focus:shadow-form-input!"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="image"
            control={createForm.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Testifier Image</FieldLabel>
                <ImageUpload
                  onUpload={(url) => field.onChange(url)}
                  onRemove={() => field.onChange(undefined)}
                  initialImages={field.value ? [field.value] : []}
                  maxFiles={1}
                  label="Upload Image"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="isPublished"
            control={createForm.control}
            render={({ field }) => (
              <Field orientation="horizontal">
                <FieldLabel htmlFor="isPublished">Publish Testimony</FieldLabel>
                <Switch
                  id="isPublished"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                />
              </Field>
            )}
          />
        </FieldGroup>
        <div className="mt-6!">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary-300 hover:bg-primary-100"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Spinner /> Creating...
              </span>
            ) : (
              "Create Testimony"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTestimonialForm;
