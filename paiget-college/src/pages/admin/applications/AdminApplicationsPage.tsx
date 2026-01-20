"use client";

import React, { useEffect, useState } from "react";
import SearchInput from "@/components/dashboard/SearchInput";
import { applicationService } from "@/lib/services/application-service";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Trash, Eye, Check, Clock, XCircle } from "lucide-react";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";

const AdminApplicationsPage = () => {
  const [applications, setApplications] = useState<IApplication[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selected, setSelected] = useState<IApplication | null>(null);
  const [query, setQuery] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const t = setTimeout(async () => {
      setLoadingSearch(true);
      try {
        const res = await applicationService.getAllApplications({
          q: query,
          status: statusFilter === "all" ? undefined : statusFilter,
        });
        if (res.success && res.data?.applications) {
          setApplications(res.data.applications);
        }
      } catch (e) {
        // ignore
      } finally {
        setLoadingSearch(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [query, statusFilter]);

  const fetchApplications = async () => {
    try {
      const res = await applicationService.getAllApplications({
        status: statusFilter === "all" ? undefined : statusFilter,
      });
      if (res.success && res.data?.applications) {
        setApplications(res.data.applications);
      }
    } catch (error) {
      toast.error("Failed to fetch applications.");
      console.error("Fetch applications error:", error);
    }
  };

  const fetchApplicationById = async (applicationId: string) => {
    try {
      const res = await applicationService.getApplicationById(applicationId);
      if (res.success && res.data) {
        const data = res.data.application;
        setSelected(data);
      }
    } catch (err: any) {
      toast.error(
        err?.message || "An error occurred while fetching the application."
      );
      console.error("Fetch application detail error:", err);
    }
  };

  const onUpdateStatus = async (
    applicationId: string,
    newStatus: "pending" | "under-review" | "accepted" | "rejected"
  ) => {
    setIsSubmitting(true);

    try {
      await applicationService.updateApplicationStatus(applicationId, {
        status: newStatus,
      });
      toast.success("Application status updated successfully!");
      fetchApplications();
      if (selected?._id === applicationId) {
        fetchApplicationById(applicationId);
      }
    } catch (error) {
      toast.error("Failed to update application status.");
      console.error("Update application status error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onDelete = async (applicationId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this application? This cannot be undone."
      )
    ) {
      setIsSubmitting(true);

      try {
        await applicationService.deleteApplication(applicationId);
        toast.success("Application deleted successfully!");
        setSelected(null);
        fetchApplications();
      } catch (error) {
        toast.error("Failed to delete application.");
        console.error("Delete application error:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const getStatusColor = (
    status: "pending" | "under-review" | "accepted" | "rejected"
  ) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "under-review":
        return "bg-blue-100 text-blue-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (
    status: "pending" | "under-review" | "accepted" | "rejected"
  ) => {
    switch (status) {
      case "pending":
        return <Clock size={16} />;
      case "under-review":
        return <Eye size={16} />;
      case "accepted":
        return <Check size={16} />;
      case "rejected":
        return <XCircle size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="pb-8!">
      <div className="flex justify-between gap-6 mb-4!">
        <h1 className="font-bold">All Applications</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6! lg:gap-8!">
        {/* Applications List */}
        <div className="lg:col-span-2">
          <div className="space-y-3 mt-4! md:mt-6!">
            {/* Search Input */}
            <SearchInput value={query} onChange={setQuery} />

            {/* Status Filter */}
            <FieldGroup className="mt-6!">
              <FieldLabel>Filter by Status</FieldLabel>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-[initial] w-full py-2! px-3! rounded-lg border! transition-all duration-300 ease-in border-secondary-500! focus:outline-none! focus:border-primary-500! focus:ring-1! focus:ring-primary-500! bg-white cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="under-review">Under Review</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </FieldGroup>

            <div className="mb-0.5! mt-4! text-sm! text-muted-foreground">
              {loadingSearch
                ? "Searching..."
                : applications.length === 0
                  ? "No matches"
                  : `${applications.length} result(s)`}
            </div>

            {/* Applications List Container */}
            <div className="max-h-100 mt-3! overflow-auto border rounded-md divide-y">
              {applications.map((item) => (
                <div
                  key={item._id}
                  className={`relative p-5! hover:text-gray-900 hover:bg-accent cursor-pointer ${
                    selected?._id === item._id ? "bg-accent text-gray-900" : ""
                  }`}
                  onClick={() => fetchApplicationById(item._id)}
                >
                  <div className="absolute top-2! right-2!">
                    <Button
                      onClick={() => onDelete(item._id)}
                      disabled={isSubmitting}
                      variant={"ghost"}
                      className="cursor-pointer hover:text-red-600 focus:text-red-600"
                      size="sm"
                    >
                      <Trash size={18} />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2! mb-2!">
                    <div className="font-medium">
                      {item.firstname} {item.surname}
                    </div>
                    <span
                      className={`inline-flex items-center gap-1! px-2! py-1! rounded-full text-xs! font-semibold ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {getStatusIcon(item.status)}
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs! text-muted-foreground mb-1!">
                    {item.email}
                  </p>
                  <p className="text-xs! text-muted-foreground line-clamp-1">
                    {item.courseOfInterest} • {item.program}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Application Details */}
        <div className="lg:col-span-3">
          {selected ? (
            <div className="border rounded-lg p-6! bg-white">
              <div className="mb-6!">
                <div className="flex items-center justify-between mb-4!">
                  <h2 className="text-2xl! font-bold">
                    {selected.firstname} {selected.surname}
                  </h2>
                  <span
                    className={`inline-flex items-center gap-1! px-3! py-1! rounded-full text-sm! font-semibold ${getStatusColor(
                      selected.status
                    )}`}
                  >
                    {getStatusIcon(selected.status)}
                    {selected.status}
                  </span>
                </div>
              </div>

              {/* Personal Information */}
              <div className="mb-6!">
                <h3 className="text-lg! font-semibold text-primary-100 mb-3!">
                  📋 Personal Information
                </h3>
                <div className="space-y-2! text-sm!">
                  <div className="flex justify-between pb-2! border-b">
                    <span className="font-semibold">Email:</span>
                    <span>{selected.email}</span>
                  </div>
                  <div className="flex justify-between pb-2! border-b">
                    <span className="font-semibold">Phone:</span>
                    <span>{selected.phoneNumber}</span>
                  </div>
                  <div className="flex justify-between pb-2! border-b">
                    <span className="font-semibold">Date of Birth:</span>
                    <span>{selected.dateOfBirth}</span>
                  </div>
                  <div className="flex justify-between pb-2! border-b">
                    <span className="font-semibold">Gender:</span>
                    <span>{selected.gender}</span>
                  </div>
                  <div className="flex justify-between pb-2!">
                    <span className="font-semibold">Nationality:</span>
                    <span>{selected.nationality}</span>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="mb-6!">
                <h3 className="text-lg! font-semibold text-primary-100 mb-3!">
                  🎓 Academic Information
                </h3>
                <div className="space-y-2! text-sm!">
                  <div className="flex justify-between pb-2! border-b">
                    <span className="font-semibold">Education Level:</span>
                    <span>{selected.highestEducationLevel}</span>
                  </div>
                  <div className="flex justify-between pb-2! border-b">
                    <span className="font-semibold">WAEC/NECO Subjects:</span>
                    <span className="text-right">{selected.waecSubjects}</span>
                  </div>
                  <div className="flex justify-between pb-2!">
                    <span className="font-semibold">JAMB Score:</span>
                    <span>{selected.jambScore}</span>
                  </div>
                </div>
              </div>

              {/* Program Information */}
              <div className="mb-6!">
                <h3 className="text-lg! font-semibold text-primary-100 mb-3!">
                  📚 Program Information
                </h3>
                <div className="space-y-2! text-sm!">
                  <div className="flex justify-between pb-2! border-b">
                    <span className="font-semibold">Course of Interest:</span>
                    <span className="text-right">
                      {selected.courseOfInterest}
                    </span>
                  </div>
                  <div className="flex justify-between pb-2! border-b">
                    <span className="font-semibold">Program:</span>
                    <span>{selected.program}</span>
                  </div>
                  <div className="flex justify-between pb-2!">
                    <span className="font-semibold">Intended Start Date:</span>
                    <span>{selected.intendedStartDate}</span>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="mb-6!">
                <h3 className="text-lg! font-semibold text-primary-100 mb-3!">
                  💳 Payment Information
                </h3>
                <div className="space-y-2! text-sm!">
                  <div className="flex justify-between pb-2!">
                    <span className="font-semibold">
                      Payment Reference Code:
                    </span>
                    <span className="font-mono text-primary-100">
                      {selected.paymentReferenceCode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              {(selected.sourceOfInformation || selected.personalMessage) && (
                <div className="mb-6!">
                  <h3 className="text-lg! font-semibold text-primary-100 mb-3!">
                    ℹ️ Additional Information
                  </h3>
                  <div className="space-y-3!">
                    <div className="pb-2! border-b">
                      <span className="font-semibold text-sm!">
                        Source of Information:
                      </span>
                      <p className="text-sm! mt-1!">
                        {selected.sourceOfInformation}
                      </p>
                    </div>
                    {selected.otherSourceDetails && (
                      <div className="pb-2! border-b">
                        <span className="font-semibold text-sm!">
                          Source Details:
                        </span>
                        <p className="text-sm! mt-1!">
                          {selected.otherSourceDetails}
                        </p>
                      </div>
                    )}
                    {selected.personalMessage && (
                      <div>
                        <span className="font-semibold text-sm!">
                          Personal Message:
                        </span>
                        <p className="text-sm! mt-1! p-3! bg-light-800 rounded">
                          {selected.personalMessage}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Status Update Actions */}
              <div className="mt-8! pt-6! border-t">
                <h3 className="text-lg! font-semibold mb-4! text-primary-100">
                  Update Status
                </h3>
                <div className="grid grid-cols-2 gap-2!">
                  <Button
                    onClick={() => onUpdateStatus(selected._id, "under-review")}
                    disabled={
                      isSubmitting || selected.status === "under-review"
                    }
                    variant={
                      selected.status === "under-review" ? "default" : "outline"
                    }
                    className="text-xs!"
                  >
                    <Eye size={16} className="mr-1!" />
                    Under Review
                  </Button>
                  <Button
                    onClick={() => onUpdateStatus(selected._id, "accepted")}
                    disabled={isSubmitting || selected.status === "accepted"}
                    variant={
                      selected.status === "accepted" ? "default" : "outline"
                    }
                    className="text-xs!"
                  >
                    <Check size={16} className="mr-1!" />
                    Accept
                  </Button>
                  <Button
                    onClick={() => onUpdateStatus(selected._id, "rejected")}
                    disabled={isSubmitting || selected.status === "rejected"}
                    variant={
                      selected.status === "rejected" ? "default" : "outline"
                    }
                    className="text-xs!"
                  >
                    <XCircle size={16} className="mr-1!" />
                    Reject
                  </Button>
                  <Button
                    onClick={() => onUpdateStatus(selected._id, "pending")}
                    disabled={isSubmitting || selected.status === "pending"}
                    variant={
                      selected.status === "pending" ? "default" : "outline"
                    }
                    className="text-xs!"
                  >
                    <Clock size={16} className="mr-1!" />
                    Pending
                  </Button>
                </div>
              </div>

              {/* Metadata */}
              <div className="mt-8! pt-6! border-t text-xs! text-muted-foreground space-y-1!">
                <p>
                  <span className="font-semibold">Created:</span>{" "}
                  {new Date(selected.createdAt).toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Updated:</span>{" "}
                  {new Date(selected.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          ) : (
            <div className="border rounded-lg p-12! bg-light-800 flex items-center justify-center h-full min-h-96">
              <div className="text-center">
                <Eye
                  size={48}
                  className="mx-auto mb-4! text-muted-foreground"
                />
                <p className="text-muted-foreground">
                  Select an application to view details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminApplicationsPage;
