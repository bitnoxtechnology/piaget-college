import React, { useEffect, useState } from "react";
import SearchInput from "@/components/dashboard/SearchInput";
import { blogService } from "@/lib/services/blog-service";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Edit, Trash } from "lucide-react";

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
        setSelected(res.data.blog);
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
        if (selected?._id === blogId) setSelected(null);
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
        <Button asChild className="px-2!">
          <Link to="/admin/create-post">Create New Post</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        {/* Posts List */}
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
              {blogs.length === 0 && !loadingSearch ? (
                <div className="p-8! text-center">
                  <BookOpen
                    size={36}
                    className="mx-auto mb-3! text-muted-foreground opacity-40"
                  />
                  <p className="text-sm text-muted-foreground">No posts found</p>
                </div>
              ) : (
                blogs.map((item) => (
                  <div
                    key={item._id}
                    className={`relative p-5! cursor-pointer hover:text-gray-900 hover:bg-accent ${
                      selected?._id === item._id ? "bg-accent text-gray-900" : ""
                    }`}
                    onClick={() => fetchBlogBySlug(item.slug)}
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
                            to={`/admin/posts/edit/${item.slug}`}
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
                    <div className="font-medium text-sm pr-16 mb-1 truncate">
                      {item.title}
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                          item.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.isPublished ? "Published" : "Draft"}
                      </span>
                      <p className="text-xs text-muted-foreground line-clamp-1 flex-1">
                        {item.excerpt}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Post Detail Preview */}
        <div className="lg:col-span-3">
          {selected ? (
            <div className="border rounded-lg overflow-hidden bg-white sticky top-6">
              {selected.coverImage && (
                <img
                  src={selected.coverImage}
                  alt={selected.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6!">
                <div className="flex items-start justify-between gap-3 mb-3!">
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

                {selected.tags && selected.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4!">
                    {selected.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2! py-0.5! bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {selected.excerpt && (
                  <p className="text-sm text-muted-foreground mb-4! leading-relaxed">
                    {selected.excerpt}
                  </p>
                )}

                <div className="text-xs text-muted-foreground space-y-1! pt-4! border-t">
                  {selected.author && (
                    <p>
                      <span className="font-semibold">Author:</span>{" "}
                      {selected.author.name}
                    </p>
                  )}
                  <p>
                    <span className="font-semibold">Created:</span>{" "}
                    {new Date(selected.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-semibold">Updated:</span>{" "}
                    {new Date(selected.updatedAt).toLocaleString()}
                  </p>
                  {selected.publishedAt && (
                    <p>
                      <span className="font-semibold">Published:</span>{" "}
                      {new Date(selected.publishedAt).toLocaleString()}
                    </p>
                  )}
                </div>

                <div className="mt-5! flex gap-3!">
                  <Button asChild size="sm">
                    <Link to={`/admin/posts/edit/${selected.slug}`}>
                      <Edit size={14} className="mr-1!" />
                      Edit Post
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
            </div>
          ) : (
            <div className="border rounded-lg p-12! bg-gray-50 flex items-center justify-center min-h-96">
              <div className="text-center">
                <BookOpen
                  size={48}
                  className="mx-auto mb-4! text-muted-foreground opacity-40"
                />
                <p className="text-muted-foreground">Select a post to preview</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPostsPage;
