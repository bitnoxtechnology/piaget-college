import React, { useState, useEffect, useMemo, useCallback } from "react";
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
  FieldDescription,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { ImageUpload } from "@/components/ui/image-upload";
import { Switch } from "@/components/ui/switch";
import QuillEditor from "@/components/editor/quill-editor";

import { blogService } from "@/lib/services/blog-service";
import {
  updateBlogSchema,
  type UpdateBlogInput,
} from "@/lib/validations/blog-validator";
import { useNavigate, useParams } from "react-router-dom";
import { quillModules } from "../editor/quill-data";

const UpdatePostForm: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState<IBlog | null>(null);

  const updateForm = useForm<UpdateBlogInput>({
    resolver: zodResolver(updateBlogSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      contentHtml: "",
      coverImage: "",
      images: [],
      videos: [],
      tags: [],
      isPublished: false,
    },
  });

  const QuillModules = useMemo(() => quillModules, []);

  const fetchBlogBySlug = useCallback(
    async (blogSlug: string) => {
      try {
        const res = await blogService.getBlogBySlug(blogSlug);
        if (res.success && res.data) {
          const data = res.data.blog;
          setPost(data);
          updateForm.reset({
            title: data.title || "",
            excerpt: data.excerpt || "",
            contentHtml: data.contentHtml || "",
            coverImage: data.coverImage,
            images: data.images || [],
            videos: data.videos || [],
            tags: data.tags || [],
            isPublished: data.isPublished,
          });
        }
      } catch (err: any) {
        toast.error(
          err?.message || "An error occurred while fetching the post."
        );
        console.error("Fetch post detail error:", err);
      }
    },
    [updateForm]
  );

  useEffect(() => {
    if (slug) {
      fetchBlogBySlug(slug);
    }
  }, [slug, fetchBlogBySlug]);

  const onSubmit = async (data: UpdateBlogInput) => {
    setIsSubmitting(true);
    try {
      const res = await blogService.updateBlog(post?._id as string, data);
      if (res.success) {
        toast.success("Post updated successfully!");
      }
      navigate("/admin/posts");
    } catch (error) {
      toast.error(`Failed to update post.`);
      console.error("Post submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={updateForm.handleSubmit(onSubmit)} className="space-y-6">
      <FieldGroup>
        <Controller
          name="title"
          control={updateForm.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                {...field}
                id="title"
                placeholder="Enter blog title"
                disabled={isSubmitting}
                className="h-[initial] w-full py-4! px-5! rounded-lg border! transition-all duration-300 ease-in border-secondary-500! placeholder:text-tertiary-400! focus:outline-none! focus:border-primary-500! focus:ring-1! focus:ring-primary-500! focus:shadow-form-input!"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="excerpt"
          control={updateForm.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="excerpt">Excerpt</FieldLabel>
              <Textarea
                {...field}
                id="excerpt"
                placeholder="Enter a brief excerpt"
                disabled={isSubmitting}
                className="h-[initial] w-full py-4! px-5! rounded-lg border! transition-all duration-300 ease-in border-secondary-500! placeholder:text-tertiary-400! focus:outline-none! focus:border-primary-500! focus:ring-1! focus:ring-primary-500! focus:shadow-form-input!"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="contentHtml"
          control={updateForm.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contentHtml">Content</FieldLabel>
              <QuillEditor
                value={field.value as string}
                onChange={field.onChange}
                modules={QuillModules}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="coverImage"
          control={updateForm.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Cover Image</FieldLabel>
              <ImageUpload
                onUpload={(url) => field.onChange(url)}
                onRemove={() => field.onChange(undefined)}
                initialImages={field.value ? [field.value] : []}
                maxFiles={1}
                label="Upload Cover Image"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="images"
          control={updateForm.control}
          render={({ field }) => (
            <Field>
              <FieldLabel>Additional Images</FieldLabel>
              <ImageUpload
                onUpload={(url) =>
                  field.onChange([...(field.value || []), url])
                }
                onRemove={(urlToRemove) =>
                  field.onChange(
                    field.value?.filter((url) => url !== urlToRemove)
                  )
                }
                initialImages={field.value || []}
                multiple
                label="Upload additional images"
              />
            </Field>
          )}
        />
        <Controller
          name="videos"
          control={updateForm.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="videos">
                Video URLs (YouTube/Vimeo)
              </FieldLabel>
              <FieldDescription>
                Enter full URLs, separated by commas.
              </FieldDescription>
              <Input
                {...field}
                id="videos"
                placeholder="e.g., https://www.youtube.com/watch?v=xyz, https://vimeo.com/abc"
                disabled={isSubmitting}
                value={
                  Array.isArray(field.value)
                    ? field.value.join(", ")
                    : field.value || ""
                }
                onChange={(e) =>
                  field.onChange(
                    e.target.value.split(",").map((url) => url.trim())
                  )
                }
                className="h-[initial] w-full py-4! px-5! rounded-lg border! transition-all duration-300 ease-in border-secondary-500! placeholder:text-tertiary-400! focus:outline-none! focus:border-primary-500! focus:ring-1! focus:ring-primary-500! focus:shadow-form-input!"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="tags"
          control={updateForm.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="tags">Tags</FieldLabel>
              <FieldDescription>
                Enter tags, separated by commas.
              </FieldDescription>
              <Input
                {...field}
                id="tags"
                placeholder="e.g., workshops, events, academics"
                disabled={isSubmitting}
                value={
                  Array.isArray(field.value)
                    ? field.value.join(", ")
                    : field.value || ""
                }
                onChange={(e) =>
                  field.onChange(
                    e.target.value.split(",").map((tag) => tag.trim())
                  )
                }
                className="h-[initial] w-full py-4! px-5! rounded-lg border! transition-all duration-300 ease-in border-secondary-500! placeholder:text-tertiary-400! focus:outline-none! focus:border-primary-500! focus:ring-1! focus:ring-primary-500! focus:shadow-form-input!"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="isPublished"
          control={updateForm.control}
          render={({ field }) => (
            <Field orientation="horizontal">
              <FieldLabel htmlFor="isPublished">Publish Post</FieldLabel>
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
            "Update Post"
          )}
        </Button>
      </div>
    </form>
  );
};

export default UpdatePostForm;
