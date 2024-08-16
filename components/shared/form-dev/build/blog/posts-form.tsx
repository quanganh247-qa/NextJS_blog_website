"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect } from "react";
import { postSchema, PostType } from "../../schema";
import { useAuth } from "@/provider/auth-provider";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

const PostsForm = () => {
  const { auth } = useAuth();
  const [posts, setPosts] = React.useState<PostType[]>([]);
  const [offset, setOffset] = React.useState(0);
  const [limit, setLimit] = React.useState(6);
  const [name, setName] = React.useState("");
  const [totalPosts, setTotalPosts] = React.useState(0);
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const fetchPosts = async () => {
    const token = localStorage.getItem("token");

    const req = await fetch(
      `http://127.0.0.1:8000/api/post/get-all-posts?limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!req.ok) {
      const errorResult = await req.json();
      setError(errorResult.error || "An error occurred");
      return;
    }

    const data = await req.json();
    console.log(data);
    console.log(data.count);

    // Validate each post using postSchema
    const validatedPosts = data.items.map((post: PostType) =>
      postSchema.parse(post)
    );
    console.log(validatedPosts);
    setPosts(validatedPosts);
    setTotalPosts(data.count);
    console.log("totalPosts", totalPosts);
  };

  const fetchSearch = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://127.0.0.1:8000/api/post/search?name=${name}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      const errorResult = await res.json();
      setError(errorResult.error || "An error occurred");
      return;
    }

    const data = await res.json();

    // Validate each post using postSchema
    const validatedPosts = data.map((post: PostType) => postSchema.parse(post));
    setPosts(validatedPosts);
    setTotalPosts(data.count);
  };

  // Fetch posts on initial render and when offset or limit changes
  useEffect(() => {
    if (auth && !name) {
      fetchPosts();
    }
  }, [offset, limit, auth]); // Depend on auth, offset, and limit

  // Fetch search results when the search term changes
  useEffect(() => {
    if (auth && name) {
      fetchSearch();
    }
  }, [name, offset, limit, auth]); // Depend on name, auth, offset, and limit

  const handleNext = () => {
    if (offset + limit < totalPosts) {
      setOffset(offset + limit);
    }
  };

  const handlePrevious = () => {
    if (offset > 0) {
      setOffset(offset - limit);
    }
    fetchPosts();
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the form from submitting
    e.preventDefault();
    setOffset(0); // Reset offset when performing a new search
    fetchSearch();
  };
  const handleCardClick = (post_id: any) => {
    router.push(`blog/${post_id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        <p className="font-bold text-yellow-400">Blog Posts</p>
        <p className="text-4xl font-bold mt-5">
          Web development blog: Insights and tips from the experts
        </p>
        <p className="text-gray-300 mt-5">
          Welcome to our blog, where we share our insights and tips about web
          development. Whether you are a business owner looking for a new
          website, a developer looking to learn new skills, or a curious reader
          interested in the latest trends and technologies, we have something
          for you.
        </p>
      </div>

      <form
        onSubmit={handleSearch}
        className="flex items-center space-x-2 mt-5"
      >
        <Input
          type="text"
          placeholder="Search posts..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-grow"
        />
        <Button
          type="submit"
          variant="outline"
          className="text-primary border-primary hover:bg-primary hover:text-white"
        >
          Search
        </Button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="shadow-md border rounded-lg overflow-hidden bg-blue-50 text-blue-900"
            onClick={() => handleCardClick(post.id)}
          >
            {post.urlImage && (
              <img
                src={post.urlImage}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <CardHeader className="bg-blue-100">
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{post.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <Button
          onClick={handlePrevious}
          disabled={offset === 0}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={offset + limit >= totalPosts}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
export default PostsForm;
