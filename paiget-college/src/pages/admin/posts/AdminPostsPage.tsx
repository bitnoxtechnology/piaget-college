import React, { useEffect, useState } from "react";
import SearchInput from "@/components/dashboard/SearchInput";
import { blogService } from "@/lib/services/blog-service";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Edit, Trash } from "lucide-react";

const AdminPostsPage = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selected, setSelected] = useState<IBlog | null>(null);
  const [query, setQuery] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);

  useEffect(() => {
    const t = setTimeout(async () => {
      setLoadingSearch(true);
      try {
        const res = await blogService.getAllBlogs({ q: query });
        if (res.success && res.data?.blogs) {
          setBlogs(res.data.blogs);
        }
      } catch (e) {
        // ignore
      } finally {
        setLoadingSearch(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  const fetchBlogs = async () => {
    try {
      const res = await blogService.getAllBlogs({});
      if (res.success && res.data?.blogs) {
        setBlogs(res.data.blogs);
      }
    } catch (error) {
      toast.error("Failed to fetch blogs.");
      console.error("Fetch blogs error:", error);
    }
  };

  const fetchBlogBySlug = async (blogSlug: string) => {
    try {
      const res = await blogService.getBlogBySlug(blogSlug);
      if (res.success && res.data) {
        const data = res.data.blog;
        setSelected(data);
      }
    } catch (err: any) {
      toast.error(err?.message || "An error occurred while fetching the blog.");
      console.error("Fetch blog detail error:", err);
    }
  };

  const onDelete = async (blogId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this blog post? This cannot be undone."
      )
    ) {
      setIsSubmitting(true);

      try {
        await blogService.deleteBlog(blogId);
        toast.success("Blog deleted successfully!");
        fetchBlogs();
      } catch (error) {
        toast.error("Failed to delete blog.");
        console.error("Delete blog error:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between gap-6 mb-4!">
        <h1 className="font-bold">All Posts</h1>
        <Button className="px-2!">
          <Link to="/admin/create-post">Create New Post</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-3 mt-4! md:mt-6!">
            <SearchInput value={query} onChange={setQuery} />
            <div className="mb-0.5! mt-4! text-sm text-muted-foreground">
              {loadingSearch
                ? "Searching..."
                : blogs.length === 0
                ? "No matches"
                : `${blogs.length} result(s)`}
            </div>
            <div className="max-h-100 mt-3! overflow-auto border rounded-md divide-y">
              {blogs.map((item) => (
                <div
                  key={item._id}
                  className={`relative p-5! hover:text-gray-900 hover:bg-accent ${
                    selected?._id === item._id ? "bg-accent text-gray-900" : ""
                  }`}
                  onClick={() => fetchBlogBySlug(item.slug)}
                >
                  <div className="absolute top-0 right-1">
                    <div className="flex gap-3 items-center">
                      <Button variant={"ghost"} className="cursor-pointer">
                        <Link to={`/admin/posts/edit/${item.slug}`}>
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
                  <div className="font-medium">{item.title}</div>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {item.excerpt}
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

export default AdminPostsPage;
