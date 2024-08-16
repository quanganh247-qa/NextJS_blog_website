"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { PostType } from "../../schema";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { commentSchema, CommentType } from "../../schema/posts-schema";
import { get } from "http";
import getCommentsAction from "@/server/actions/blog/get-comments.action";
import { CreateCommentType } from "@/components/shared/form-dev/schema/posts-schema";
import AddCommentAction from "@/server/actions/blog/add-comment.action";

const PostDetailForm = () => {
  const [post, setPost] = React.useState<PostType | null>(null);
  const [comments, setComment] = React.useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");
  const [reloadComments, setReloadComments] = useState(false); // State for reloading comments

  const router = useRouter();
  const { post_id } = useParams(); // Use useParams to get the post ID from the URL

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   const fetchPost = async () => {
  //     try {
  //       const req = await fetch(
  //         `http://127.0.0.1:8000/api/post/get-post?post_id=${post_id}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       if (!req.ok) {
  //         const errorResult = await req.json();
  //         toast(errorResult.error || "An error occurred");
  //         return;
  //       }

  //       const data: PostType = await req.json();
  //       setPost(data);
  //     } catch (err) {
  //       toast("Failed to load post");
  //     }
  //   };

  //   const fetchCmt = async (post_id: any) => {
  //     const data = await getCommentsAction(post_id);
  //     setComment(data || []);
  //   };

  //   if (post_id) {
  //     fetchPost();
  //     fetchCmt(post_id);
  //   }
  // }, [post_id]);
  useEffect(() => {
    const fetchPostAndComments = async (post_id: string) => {
      if (post_id) {
        const token = localStorage.getItem("token");

        try {
          const req = await fetch(
            `http://127.0.0.1:8000/api/post/get-post?post_id=${post_id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (req.ok) {
            const postData: PostType = await req.json();
            setPost(postData);
          } else {
            const errorResult = await req.json();
            toast(errorResult.error || "An error occurred");
          }

          const commentsData = await getCommentsAction(post_id);
          if (commentsData) setComment(commentsData);
        } catch (err) {
          toast("Failed to load data");
        }
      }
    };

    if (typeof post_id === "string") {
      fetchPostAndComments(post_id);
    } else if (Array.isArray(post_id) && post_id.length > 0) {
      fetchPostAndComments(post_id[0]);
    }
  }, [post_id]);

  const handleAddComment = async () => {
    const token = localStorage.getItem("token");

    if (!newComment.trim()) {
      toast("Please enter a comment");
      return;
    }

    if (!post_id || !post) {
      toast("Unable to add comment");
      return;
    }

    const newCommentData: CreateCommentType = {
      content: newComment,
    };

    const addedComment = await AddCommentAction(
      Array.isArray(post_id) ? post_id[0] : post_id,
      newCommentData,
      Array.isArray(token) ? token[0] : token
    );
    if (addedComment) {
      // Clear the input field
      setNewComment("");
      setReloadComments(true);
      toast("Comment added successfully");
    }
  };

  useEffect(() => {
    if (reloadComments) {
      const fetchComments = async () => {
        const commentsData = await getCommentsAction(
          Array.isArray(post_id) ? post_id[0] : post_id
        );
        if (commentsData) setComment(commentsData);
      };

      fetchComments();
      setReloadComments(false);
    }
  }, [reloadComments]);
  if (!post) {
    return (
      <>
        <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          >
            <animate
              attributeName="r"
              begin="0s"
              dur="1.8s"
              values="10;8;10"
              calcMode="linear"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="stroke-opacity"
              begin="0s"
              dur="1.8s"
              values="1;0;1"
              calcMode="linear"
              repeatCount="indefinite"
            ></animate>
          </circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V4a10 10 0 00-10 10h2zm2 8.08a8.01 8.01 0 01-...."
          />
        </svg>
      </>
    );
  }

  return (
    <div className="max-w-screen-xl w-full bg-white rounded-lg shadow-lg p-6 mx-auto">
      <h1 className="text-5xl font-bold mb-4 text-center">{post.title}</h1>
      <h2 className="text-lg font-medium text-gray-600 text-center mb-6">
        {post.content}
      </h2>
      {post.urlImage ? (
        <img
          src={post.urlImage}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-600">
          No Image Available
        </div>
      )}
      <p className="text-gray-800 mb-4">
        {new Date(post.created_at).toLocaleDateString()}
      </p>
      <div className="flex justify-center">
        <Button
          onClick={() => router.back()}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Back
        </Button>
      </div>

      {/* Comments Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Comments</h3>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Card key={comment.id} className="mb-4">
              <CardHeader>
                <CardTitle>{comment.author}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-800">{comment.content}</p>
                <p className="text-gray-600 text-sm mt-2">
                  {/* {new Date(comment.updated_at).toLocaleDateString()} */}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No comments available.</p>
        )}
      </div>
      <div className="mt-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          className="w-full p-2 border rounded-lg mb-2"
        />
        <Button onClick={handleAddComment} className="bg-green-600 text-white">
          Submit Comment
        </Button>
      </div>
    </div>
  );
};

export default PostDetailForm;
