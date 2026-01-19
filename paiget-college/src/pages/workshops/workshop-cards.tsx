import WorkshopCard, { WorkshopCardSkeleton } from "./workshops-card";
import "../../styles/pages/workshop-cards.css";
import { useEffect, useState } from "react";
import { workshopService } from "@/lib/services/workshop-service";
import { toast } from "sonner";

// const workshopData = [
//   {
//     title: "School Owners & Head Teachers Summit",
//     date: "August 15, 2024",
//     time: "9:00 AM - 3:00 PM",
//     location: "Main Auditorium, Piaget College",
//     audience: "Proprietors & School Administrators",
//     topics: [
//       "Institutional Leadership",
//       "Policy Development",
//       "Financial Sustainability",
//     ],
//   },
//   {
//     title: "Modern Pedagogy Workshop",
//     date: "September 10, 2024",
//     time: "10:00 AM - 4:00 PM",
//     location: "Education Block, Room 102",
//     audience: "Primary & Secondary School Teachers",
//     topics: [
//       "Active Learning Strategies",
//       "Digital Classroom Tools",
//       "Inclusive Education",
//     ],
//   },
//   {
//     title: "Early Childhood Seminar",
//     date: "October 05, 2024",
//     time: "9:00 AM - 2:00 PM",
//     location: "ECCE Center, Piaget College",
//     audience: "Nursery & Daycare Educators",
//     topics: [
//       "Child Psychology",
//       "Play-Based Learning",
//       "Developmental Milestones",
//     ],
//   },
// ];

const WorkshopCards = () => {
  const [workshops, setWorkshops] = useState<IWorkshop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    setLoading(true);
    try {
      const res = await workshopService.getAllWorkshops({
        page: 1,
        isPublished: true,
      });
      if (res.success && res.data?.workshops) {
        setWorkshops(res.data.workshops);
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      toast.error("Failed to fetch blog posts.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="workshop-cards-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">What We Offer</span>
          <h2>Upcoming Workshops & Seminars</h2>
          <p>
            Empowering educators through professional development and
            specialized training.
          </p>
        </div>

        {loading ? (
          <div className="workshop-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <WorkshopCardSkeleton key={i} />
            ))}
          </div>
        ) : workshops.length === 0 ? (
          <p className="text-gray-500 text-lg mb-6!">
            No blog posts published yet. Check back soon!
          </p>
        ) : (
          <div className="workshop-grid">
            {workshops.map((workshop, index) => (
              <WorkshopCard
                key={workshop._id}
                workshop={workshop}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkshopCards;
