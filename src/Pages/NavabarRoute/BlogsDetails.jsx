import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosSecure from "../../Components/Hooks/AxiosSecure";
import { FaHeart, FaRegHeart, FaShareAlt, FaComment } from "react-icons/fa";
import UseAuth from "../../Components/Hooks/UseAuth";

export default function BlogsDetails() {
     const { user } = UseAuth();
    const { id } = useParams();
    const axiosSecure = AxiosSecure();
    const [blogs, setBlogs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axiosSecure.get(`/blog/${id}`)
            .then((res) => {
                if (res.data && Array.isArray(res.data)) {
                    setBlogs(res.data[0]);
                    setLikesCount(res.data[0]?.likes || 0);
                    setComments(res.data[0]?.comments || []);
                }
            })
            .catch((err) => console.error("Error fetching blog:", err))
            .finally(() => setLoading(false));
    }, [id]);

    
    // ✅ Handle Like
    const handleLike = async () => {
        if (!user) return alert("You must be logged in to like this post.");
        
        try {
            const newLikedState = !liked;
            setLiked(newLikedState);
            setLikesCount((prev) => (newLikedState ? prev + 1 : prev - 1));

            await axiosSecure.post(`/blog/${id}/like`, { userId: user?.uid, liked: newLikedState });
        } catch (error) {
            console.error("Error updating like:", error);
        }
    };

    // ✅ Handle Comment Submission
    const handleComment = async (event) => {
        event.preventDefault();
        const commentText = event.target.comment.value.trim();
        if (!commentText) return;

        const newComment = {
            text: commentText,
            user: {
                name: user?.displayName,
                avatar: user?.photoURL,
            },
        };

        try {
            setComments([...comments, newComment]);
            await axiosSecure.post(`/blog/${id}/comment`, { comment: newComment });
            event.target.reset();
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center mt-20">
                <div className="spinner-border animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    if (!blogs) {
        return <div className="text-center mt-20 text-xl">Blog not found</div>;
    }

    return (
        <div className="mt-20 container mx-auto my-12 py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                <figure className="relative">
                    <img
                        src={blogs?.thumbnail}
                        alt={blogs?.title}
                        className="w-full h-72 object-cover rounded-t-lg"
                    />
                </figure>
                <div className="p-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">{blogs?.title}</h2>
                    <div
                        className="text-gray-700 text-lg space-y-4"
                        dangerouslySetInnerHTML={{ __html: blogs?.content }}
                    />
                    <div className="mt-6 flex items-center justify-between text-gray-600">
                        <button
                            className="flex items-center space-x-2 hover:text-red-500 transition"
                            onClick={handleLike}
                        >
                            {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                            <span>{likesCount} Likes</span>
                        </button>
                        <button className="flex items-center space-x-2 hover:text-blue-500 transition">
                            <FaShareAlt />
                            <span>Share</span>
                        </button>
                        <button className="flex items-center space-x-2 hover:text-green-500 transition">
                            <FaComment />
                            <span>{comments.length} Comments</span>
                        </button>
                    </div>

                    {/* Comment Section */}
                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold mb-4">Comments</h3>
                        <form onSubmit={handleComment} className="mb-6">
                            <textarea
                                name="comment"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Write a comment..."
                            ></textarea>
                            <button
                                type="submit"
                                className="mt-2 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                            >
                                Submit Comment
                            </button>
                        </form>
                        <div className="space-y-4">
                            {comments.length > 0 ? (
                                comments.map((comment, index) => (
                                  <div>
                                  <div>
                                    <img>{user?.photoURL
                                    }</img>
                                    <h1>{user?.displayName}</h1>
                                  </div>
                                  <div
                                        key={index}
                                        className="p-3 border rounded-lg shadow-sm text-gray-700"
                                    >
                                        {comment}
                                    </div>
                                  </div>
                                  
                                ))
                            ) : (
                                <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
