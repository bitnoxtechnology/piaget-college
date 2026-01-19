import React, { useEffect, useState } from "react";
import SearchInput from "@/components/dashboard/SearchInput";
import { workshopService } from "@/lib/services/workshop-service";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trash } from "lucide-react";

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
        const data = res.data.workshop;
        setSelected(data);
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
        fetchWorkshops();
      } catch (error) {
        toast.error("Failed to delete workshop.");
        console.error("Delete workshop error:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between gap-6 mb-4!">
        <h1 className="font-bold">All Workshops</h1>
        <Button className="px-2!">
          <Link to="/admin/create-workshop">Add Workshop</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
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
              {workshops.map((item) => (
                <div
                  key={item._id}
                  className={`relative p-5! hover:text-gray-900 hover:bg-accent ${
                    selected?._id === item._id ? "bg-accent text-gray-900" : ""
                  }`}
                  onClick={() => fetchWorkshopById(item._id)}
                >
                  <div className="absolute top-0 right-1">
                    <div className="flex gap-3 items-center">
                      {/* <Button variant={"ghost"} className="cursor-pointer">
                        <Link to={`/admin/workshops/edit/${item._id}`}>
                          <Edit />
                        </Link>
                      </Button> */}
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
                  <div className="font-medium">{item.title}</div>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {item.description}
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

export default AdminWorkshopsPage;
