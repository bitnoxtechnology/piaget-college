import React, { useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
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
import {
  updateTestimonialSchema,
  type UpdateTestimonialInput,
} from "@/lib/validations/testimonial-validator";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTestimonialForm: React.FC = () => {
  const navigate = useNavigate();
  const { testimonialId } = useParams<{ testimonialId: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testimonial, setTestimonial] = useState<ITestimonial | null>(null);

  const updateForm = useForm<UpdateTestimonialInput>({
    resolver: zodResolver(updateTestimonialSchema),
    defaultValues: {
      name: "",
      content: "",
      image: undefined,
      position: "",
      isPublished: false,
    },
  });

  const fetchTestimonialById = useCallback(
    async (testimonialId: string) => {
      try {
        const res = await testimonialService.getTestimonialById(testimonialId);
        if (res.success && res.data) {
          const data = res.data.testimonial;
          setTestimonial(data);
          updateForm.reset({
            name: data.name || "",
            content: data.content || "",
            image: data.image,
            position: data.position || "",
            isPublished: data.isPublished,
          });
        }
      } catch (err: any) {
        toast.error(
          err?.message || "An error occurred while fetching the testimonial."
        );
        console.error("Fetch testimonial detail error:", err);
      }
    },
    [updateForm]
  );

  useEffect(() => {
    if (testimonialId) {
      fetchTestimonialById(testimonialId);
    }
  }, [testimonialId, fetchTestimonialById]);

  const onSubmit = async (data: UpdateTestimonialInput) => {
    setIsSubmitting(true);
    try {
      const res = await testimonialService.updateTestimonial(
        testimonial?._id as string,
        data
      );
      if (res.success) {
        toast.success("Testimonial updated successfully!");
      }
      navigate("/admin/testimonials");
    } catch (error) {
      toast.error(`Failed to update testimonial.`);
      console.error("Testimonial submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={updateForm.handleSubmit(onSubmit)} className="space-y-6">
      <FieldGroup>
        <Controller
          name="name"
          control={updateForm.control}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="position"
          control={updateForm.control}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="content"
          control={updateForm.control}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="image"
          control={updateForm.control}
          render={({ field }) => (
            <Field>
              <FieldLabel>Testifier Image</FieldLabel>
              <ImageUpload
                onUpload={(url) => field.onChange(url)}
                onRemove={() => field.onChange(undefined)}
                initialImages={field.value ? [field.value] : []}
                maxFiles={1}
                label="Upload Image"
              />
            </Field>
          )}
        />
        <Controller
          name="isPublished"
          control={updateForm.control}
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
              <Spinner /> Updating...
            </span>
          ) : (
            "Update Testimonial"
          )}
        </Button>
      </div>
    </form>
  );
};

export default UpdateTestimonialForm;
