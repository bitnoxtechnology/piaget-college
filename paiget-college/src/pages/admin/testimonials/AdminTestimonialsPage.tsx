import React, { useEffect, useState } from "react";
import SearchInput from "@/components/dashboard/SearchInput";
import { testimonialService } from "@/lib/services/testimonial-service";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Edit, MessageSquare, Trash, User } from "lucide-react";

const AdminTestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selected, setSelected] = useState<ITestimonial | null>(null);
  const [query, setQuery] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);

  useEffect(() => {
    const t = setTimeout(async () => {
      setLoadingSearch(true);
      try {
        const res = await testimonialService.getAllTestimonials({ q: query });
        if (res.success && res.data?.testimonials) {
          setTestimonials(res.data.testimonials);
        }
      } catch (e) {
        // ignore
      } finally {
        setLoadingSearch(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  const fetchTestimonials = async () => {
    try {
      const res = await testimonialService.getAllTestimonials({});
      if (res.success && res.data?.testimonials) {
        setTestimonials(res.data.testimonials);
      }
    } catch (error) {
      toast.error("Failed to fetch testimonials.");
      console.error("Fetch testimonials error:", error);
    }
  };

  const fetchTestimonialById = async (testimonialId: string) => {
    try {
      const res = await testimonialService.getTestimonialById(testimonialId);
      if (res.success && res.data) {
        setSelected(res.data.testimonial);
      }
    } catch (err: any) {
      toast.error(
        err?.message || "An error occurred while fetching the testimonial."
      );
      console.error("Fetch testimonial detail error:", err);
    }
  };

  const onDelete = async (testimonialId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this testimonial? This cannot be undone."
      )
    ) {
      setIsSubmitting(true);
      try {
        await testimonialService.deleteTestimonial(testimonialId);
        toast.success("Testimonial deleted successfully!");
        if (selected?._id === testimonialId) setSelected(null);
        fetchTestimonials();
      } catch (error) {
        toast.error("Failed to delete testimonial.");
        console.error("Delete testimonial error:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between gap-6 mb-4!">
        <h1 className="font-bold">All Testimonials</h1>
        <Button asChild className="px-2!">
          <Link to="/admin/create-testimonial">Add Testimonial</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        {/* Testimonials List */}
        <div className="lg:col-span-2">
          <div className="space-y-3 mt-4! md:mt-6!">
            <SearchInput value={query} onChange={setQuery} />
            <div className="mb-0.5! mt-4! text-sm text-muted-foreground">
              {loadingSearch
                ? "Searching..."
                : testimonials.length === 0
                  ? "No matches"
                  : `${testimonials.length} result(s)`}
            </div>
            <div className="max-h-100 mt-3! overflow-auto border rounded-md divide-y">
              {testimonials.length === 0 && !loadingSearch ? (
                <div className="p-8! text-center">
                  <MessageSquare
                    size={36}
                    className="mx-auto mb-3! text-muted-foreground opacity-40"
                  />
                  <p className="text-sm text-muted-foreground">
                    No testimonials found
                  </p>
                </div>
              ) : (
                testimonials.map((item) => (
                  <div
                    key={item._id}
                    className={`relative p-5! cursor-pointer hover:text-gray-900 hover:bg-accent ${
                      selected?._id === item._id ? "bg-accent text-gray-900" : ""
                    }`}
                    onClick={() => fetchTestimonialById(item._id)}
                  >
                    <div className="absolute top-0 right-1">
                      <div className="flex gap-1 items-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="cursor-pointer"
                          asChild
                        >
                          <Link
                            to={`/admin/testimonials/edit/${item._id}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Edit size={16} />
                          </Link>
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(item._id);
                          }}
                          disabled={isSubmitting}
                          variant="ghost"
                          size="sm"
                          className="cursor-pointer hover:text-red-600 focus:text-red-600"
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-1! pr-16">
                      <div className="font-medium text-sm">{item.name}</div>
                      <span
                        className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                          item.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.isPublished ? "Published" : "Draft"}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {item.content}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Testimonial Detail */}
        <div className="lg:col-span-3">
          {selected ? (
            <div className="border rounded-lg p-6! bg-white sticky top-6">
              <div className="flex items-start gap-4! mb-4!">
                {selected.image ? (
                  <img
                    src={selected.image}
                    alt={selected.name}
                    className="w-16 h-16 rounded-full object-cover shrink-0 border-2 border-border"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center shrink-0 border-2 border-border">
                    <User size={28} className="text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-bold">{selected.name}</h2>
                    <span
                      className={`inline-flex items-center px-2.5! py-0.5! rounded-full text-xs font-semibold ${
                        selected.isPublished
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {selected.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                  {selected.position && (
                    <p className="text-sm text-muted-foreground mt-0.5!">
                      {selected.position}
                    </p>
                  )}
                </div>
              </div>

              {selected.content && (
                <blockquote className="border-l-4 border-gray-200 pl-4! mb-4!">
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    &ldquo;{selected.content}&rdquo;
                  </p>
                </blockquote>
              )}

              <div className="text-xs text-muted-foreground space-y-1! pt-4! border-t">
                <p>
                  <span className="font-semibold">Created:</span>{" "}
                  {new Date(selected.createdAt).toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Updated:</span>{" "}
                  {new Date(selected.updatedAt).toLocaleString()}
                </p>
              </div>

              <div className="mt-5! flex gap-3!">
                <Button asChild size="sm">
                  <Link to={`/admin/testimonials/edit/${selected._id}`}>
                    <Edit size={14} className="mr-1!" />
                    Edit
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(selected._id)}
                  disabled={isSubmitting}
                >
                  <Trash size={14} className="mr-1!" />
                  Delete
                </Button>
              </div>
            </div>
          ) : (
            <div className="border rounded-lg p-12! bg-gray-50 flex items-center justify-center min-h-96">
              <div className="text-center">
                <MessageSquare
                  size={48}
                  className="mx-auto mb-4! text-muted-foreground opacity-40"
                />
                <p className="text-muted-foreground">
                  Select a testimonial to preview
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTestimonialsPage;
