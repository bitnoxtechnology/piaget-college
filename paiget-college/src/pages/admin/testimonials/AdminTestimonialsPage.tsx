import React, { useEffect, useState } from "react";
import SearchInput from "@/components/dashboard/SearchInput";
import { testimonialService } from "@/lib/services/testimonial-service";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Edit, Trash } from "lucide-react";

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
        const data = res.data.testimonial;
        setSelected(data);
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
        <Button className="px-2!">
          <Link to="/admin/create-testimonial">Add Testimonial</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
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
              {testimonials.map((item) => (
                <div
                  key={item._id}
                  className={`relative p-5! hover:text-gray-900 hover:bg-accent ${
                    selected?._id === item._id ? "bg-accent text-gray-900" : ""
                  }`}
                  onClick={() => fetchTestimonialById(item._id)}
                >
                  <div className="absolute top-0 right-1">
                    <div className="flex gap-3 items-center">
                      <Button variant={"ghost"} className="cursor-pointer">
                        <Link to={`/admin/testimonials/edit/${item._id}`}>
                          <Edit />
                        </Link>
                      </Button>
                      <Button
                        onClick={() => onDelete(item._id)}
                        disabled={isSubmitting}
                        variant={"ghost"}
                        className="cursor-pointer hover:text-red-600 focus:text-red-600"
                      >
                        <Trash />
                      </Button>
                    </div>
                  </div>
                  <div className="font-medium">{item.name}</div>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTestimonialsPage;
