import React from "react";
import { Users, BookOpen, Calendar, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { panelService } from "@/lib/services/panel.service";

type overviewDataType = {
  posts: number;
  workshops: number;
  testimonials: number;
  applications: number;
};

const DashboardOverview = () => {
  const [overviewData, setOverviewData] = React.useState<overviewDataType>({
    posts: 0,
    workshops: 0,
    testimonials: 0,
    applications: 0,
  });

  React.useEffect(() => {
    // Fetch overview stats from the server (mocked here)
    const fetchOverviewStats = async () => {
      try {
        const response = await panelService.getOverviewStats();

        if (response.success && response.data) {
          setOverviewData(response.data);
        }
      } catch (error) {
        console.error("Error fetching overview stats:", error);
      }
    };
    fetchOverviewStats();
  }, []);

  // Mock data for statistics
  const stats = [
    {
      title: "Testimonials",
      value: overviewData.testimonials.toString(),
      icon: Users,
      color: "bg-blue-100 text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Latest Posts",
      value: overviewData.posts.toString(),
      icon: BookOpen,
      color: "bg-green-100 text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Upcoming Workshops",
      value: overviewData.workshops.toString(),
      icon: Calendar,
      color: "bg-purple-100 text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Applications",
      value: overviewData.applications.toString(),
      icon: MessageSquare,
      color: "bg-orange-100 text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const recentActivities = [
    { id: 1, activity: "New student enrollment", date: "Today at 10:30 AM" },
    {
      id: 2,
      activity: "Workshop updated: Python Basics",
      date: "Yesterday at 2:15 PM",
    },
    { id: 3, activity: "New testimonial submitted", date: "2 days ago" },
    { id: 4, activity: "Program information updated", date: "3 days ago" },
  ];

  return (
    <div className="w-full p-6! bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8!">
        <h1 className="text-4xl font-bold text-gray-900 mb-2!">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">Welcome to your website admin panel</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8!">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`${stat.bgColor} rounded-lg shadow p-6! border border-gray-200 hover:shadow-lg transition-shadow duration-300`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2!">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3! rounded-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow border border-gray-200 p-6!">
          <div className="flex items-center justify-between mb-6!">
            <h2 className="text-xl font-bold text-gray-900">
              Recent Activities
            </h2>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All
            </a>
          </div>
          <div className="space-y-4!">
            {recentActivities.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between p-4! bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {item.activity}
                  </p>
                  <p className="text-xs text-gray-500 mt-1!">{item.date}</p>
                </div>
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2!"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6!">
          <h2 className="text-xl font-bold text-gray-900 mb-6!">
            Quick Actions
          </h2>
          <div className="space-y-3!">
            <button className="w-full px-4! py-3! bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200">
              <Link to="/admin/create-workshop">Create Workshop</Link>
            </button>
            <button className="w-full px-4! py-3! bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200">
              <Link to="/admin/posts">Manage Posts</Link>
            </button>
            <button className="w-full px-4! py-3! bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200">
              <Link to="/admin/create-testimonial">Add Testimonial</Link>
            </button>
            <button className="w-full px-4! py-3! bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200">
              <Link to="/admin/applications">View Applications</Link>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-8! p-6! bg-white rounded-lg shadow border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-3!">System Status</h3>
        <div className="flex flex-wrap gap-4!">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700">
              All Systems Operational
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Database Connected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700">API Responsive</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
