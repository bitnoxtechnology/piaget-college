import React, { useEffect, useState } from "react";
import SearchInput from "@/components/dashboard/SearchInput";
import { workshopService } from "@/lib/services/workshop-service";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, CalendarDays, Clock, MapPin, Trash, Users } from "lucide-react";

const AdminWorkshopsPage = () => {
  const [workshops, setWorkshops] = useState<IWorkshop[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selected, setSelected] = useState<IWorkshop | null>(null);
  const [query, setQuery] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);

  useEffect(() => {
    const t = setTimeout(async () => {
      setLoadingSearch(true);
      try {
        const res = await workshopService.getAllWorkshops({ q: query });
        if (res.success && res.data?.workshops) {
          setWorkshops(res.data.workshops);
        }
      } catch (e) {
        // ignore
      } finally {
        setLoadingSearch(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  const fetchWorkshops = async () => {
    try {
      const res = await workshopService.getAllWorkshops({});
      if (res.success && res.data?.workshops) {
        setWorkshops(res.data.workshops);
      }
    } catch (error) {
      toast.error("Failed to fetch workshops.");
      console.error("Fetch workshops error:", error);
    }
  };

  const fetchWorkshopById = async (workshopId: string) => {
    try {
      const res = await workshopService.getWorkshopById(workshopId);
      if (res.success && res.data) {
        setSelected(res.data.workshop);
      }
    } catch (err: any) {
      toast.error(
        err?.message || "An error occurred while fetching the workshop."
      );
      console.error("Fetch workshop detail error:", err);
    }
  };

  const onDelete = async (workshopId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this workshop? This cannot be undone."
      )
    ) {
      setIsSubmitting(true);
      try {
        await workshopService.deleteWorkshop(workshopId);
        toast.success("Workshop deleted successfully!");
        if (selected?._id === workshopId) setSelected(null);
        fetchWorkshops();
      } catch (error) {
        toast.error("Failed to delete workshop.");
        console.error("Delete workshop error:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const formatDate = (date: Date | string) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div>
      <div className="flex justify-between gap-6 mb-4!">
        <h1 className="font-bold">All Workshops</h1>
        <Button asChild className="px-2!">
          <Link to="/admin/create-workshop">Add Workshop</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        {/* Workshops List */}
        <div className="lg:col-span-2">
          <div className="space-y-3 mt-4! md:mt-6!">
            <SearchInput value={query} onChange={setQuery} />
            <div className="mb-0.5! mt-4! text-sm text-muted-foreground">
              {loadingSearch
                ? "Searching..."
                : workshops.length === 0
                  ? "No matches"
                  : `${workshops.length} result(s)`}
            </div>
            <div className="max-h-100 mt-3! overflow-auto border rounded-md divide-y">
              {workshops.length === 0 && !loadingSearch ? (
                <div className="p-8! text-center">
                  <CalendarDays
                    size={36}
                    className="mx-auto mb-3! text-muted-foreground opacity-40"
                  />
                  <p className="text-sm text-muted-foreground">
                    No workshops found
                  </p>
                </div>
              ) : (
                workshops.map((item) => (
                  <div
                    key={item._id}
                    className={`relative p-5! cursor-pointer hover:text-gray-900 hover:bg-accent ${
                      selected?._id === item._id ? "bg-accent text-gray-900" : ""
                    }`}
                    onClick={() => fetchWorkshopById(item._id)}
                  >
                    <div className="absolute top-0 right-1">
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
                    <div className="font-medium text-sm pr-8 mb-1">
                      {item.title}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-0.5!">
                      <Calendar size={12} />
                      <span>{formatDate(item.date)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Workshop Detail */}
        <div className="lg:col-span-3">
          {selected ? (
            <div className="border rounded-lg p-6! bg-white sticky top-6">
              <div className="flex items-start justify-between gap-3 mb-4!">
                <h2 className="text-lg font-bold leading-tight">
                  {selected.title}
                </h2>
                <span
                  className={`shrink-0 inline-flex items-center px-2.5! py-0.5! rounded-full text-xs font-semibold ${
                    selected.isPublished
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {selected.isPublished ? "Published" : "Draft"}
                </span>
              </div>

              <div className="space-y-2! mb-4!">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar size={15} className="text-muted-foreground shrink-0" />
                  <span>{formatDate(selected.date)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={15} className="text-muted-foreground shrink-0" />
                  <span>
                    {selected.startTime} – {selected.endTime}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={15} className="text-muted-foreground shrink-0" />
                  <span>{selected.location}</span>
                </div>
                {selected.instructor && (
                  <div className="flex items-center gap-2 text-sm">
                    <Users size={15} className="text-muted-foreground shrink-0" />
                    <span>Instructor: {selected.instructor}</span>
                  </div>
                )}
                {selected.capacity != null && (
                  <div className="flex items-center gap-2 text-sm">
                    <Users size={15} className="text-muted-foreground shrink-0" />
                    <span>
                      {selected.enrolledCount ?? 0} / {selected.capacity}{" "}
                      enrolled
                    </span>
                  </div>
                )}
              </div>

              {selected.description && (
                <p className="text-sm text-muted-foreground leading-relaxed mb-4! pb-4! border-b">
                  {selected.description}
                </p>
              )}

              {selected.programs && selected.programs.length > 0 && (
                <div className="mb-4!">
                  <p className="text-xs font-semibold text-muted-foreground mb-2!">
                    Programs
                  </p>
                  <div className="flex flex-wrap gap-1.5!">
                    {selected.programs.map((prog) => (
                      <span
                        key={prog}
                        className="px-2! py-0.5! bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {prog}
                      </span>
                    ))}
                  </div>
                </div>
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

              <div className="mt-5!">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(selected._id)}
                  disabled={isSubmitting}
                >
                  <Trash size={14} className="mr-1!" />
                  Delete Workshop
                </Button>
              </div>
            </div>
          ) : (
            <div className="border rounded-lg p-12! bg-gray-50 flex items-center justify-center min-h-96">
              <div className="text-center">
                <CalendarDays
                  size={48}
                  className="mx-auto mb-4! text-muted-foreground opacity-40"
                />
                <p className="text-muted-foreground">
                  Select a workshop to view details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminWorkshopsPage;
