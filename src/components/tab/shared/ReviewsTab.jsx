import React, { useState } from "react";
import AddReviewForm from "../../reviews/AddReviewForm";
import moment from "moment-jalaali";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

export default function ReviewsTab({ reviews }) {
    const processedReviews = (reviews || []).map((review) => ({
        ...review,
        dateShamsi: moment(review.created_at).locale("fa").format("jD jMMMM jYYYY"),
        likes: review.likes || 0,
        dislikes: review.dislikes || 0,
        replies: review.replies || [],
    }));

    const [reviewStates, setReviewStates] = useState(processedReviews);
    const [replyOpenIndex, setReplyOpenIndex] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [userVotes, setUserVotes] = useState({});

    const toggleLike = (index) => {
        if (userVotes[index] === "like") return;

        setReviewStates((prev) => {
            const updated = [...prev];
            if (userVotes[index] === "dislike") updated[index].dislikes -= 1;
            updated[index].likes += 1;
            return updated;
        });

        setUserVotes((prev) => ({ ...prev, [index]: "like" }));
    };

    const toggleDislike = (index) => {
        if (userVotes[index] === "dislike") return;

        setReviewStates((prev) => {
            const updated = [...prev];
            if (userVotes[index] === "like") updated[index].likes -= 1;
            updated[index].dislikes += 1;
            return updated;
        });

        setUserVotes((prev) => ({ ...prev, [index]: "dislike" }));
    };

    const submitReply = (index) => {
        if (!replyText.trim()) return;

        setReviewStates((prev) => {
            const updated = [...prev];
            updated[index].replies = [
                ...updated[index].replies,
                {
                    name: "کاربر",
                    comment: replyText,
                    created_at: new Date(),
                },
            ];
            return updated;
        });

        setReplyText("");
        setReplyOpenIndex(null);
    };

    const addReview = (newReview) => {
        const reviewWithExtras = {
            ...newReview,
            dateShamsi: moment(newReview.created_at).locale("fa").format("jD jMMMM jYYYY"),
            likes: 0,
            dislikes: 0,
            replies: [],
        };
        setReviewStates((prev) => [reviewWithExtras, ...prev]);
    };

    return (
        <div className="space-y-6">
            {reviewStates.length === 0 ? (
                <p className="text-center text-gray-500">هنوز نظری ثبت نشده است.</p>
            ) : (
                reviewStates.map((review, i) => (
                    <div
                        key={i}
                        className="bg-white border border-gray-100 rounded-2xl shadow-md p-5 transition hover:shadow-lg"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 text-darkBlue flex items-center justify-center font-bold text-lg">
                                    {review.name?.charAt(0)}
                                </div>
                                <span className="font-semibold text-gray-800">{review.name}</span>
                            </div>
                            <span className="text-xs text-gray-500">{review.dateShamsi}</span>
                        </div>

                        <p className="text-gray-700 leading-relaxed text-sm mb-4">{review.comment}</p>

                        <div className="flex gap-6 items-center text-gray-600 text-sm">
                            <button
                                onClick={() => toggleLike(i)}
                                className={`flex items-center gap-1 ${userVotes[i] === "like" ? "text-blue-600" : "hover:text-blue-600"
                                    }`}
                            >
                                <FaThumbsUp /> {review.likes}
                            </button>
                            <button
                                onClick={() => toggleDislike(i)}
                                className={`flex items-center gap-1 ${userVotes[i] === "dislike" ? "text-red-600" : "hover:text-red-600"
                                    }`}
                            >
                                <FaThumbsDown /> {review.dislikes}
                            </button>
                            <button
                                onClick={() => setReplyOpenIndex(replyOpenIndex === i ? null : i)}
                                className="hover:text-blue-600"
                            >
                                پاسخ
                            </button>
                        </div>

                        {replyOpenIndex === i && (
                            <div className="mt-4">
                                <textarea
                                    rows={3}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="پاسخ خود را بنویسید..."
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                />
                                <div className="flex justify-end mt-2">
                                    <button
                                        onClick={() => submitReply(i)}
                                        className="bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700 transition"
                                    >
                                        ارسال
                                    </button>
                                </div>
                            </div>
                        )}

                        {review.replies.length > 0 && (
                            <div className="mt-4 border-t border-gray-200 pt-4 space-y-4">
                                {review.replies.map((reply, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-blue-50 rounded-xl p-3 pr-5 ml-6 border-r-4 border-blue-400 text-right"
                                    >
                                        <div className="flex items-center gap-2 mb-1 justify-start">
                                            <div className="w-7 h-7 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center font-semibold text-sm">
                                                {reply.name?.charAt(0)}
                                            </div>
                                            <span className="text-gray-700 font-medium text-sm">{reply.name}</span>
                                        </div>
                                        <p className="text-gray-600 text-sm">{reply.comment}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))
            )}

            <AddReviewForm onSubmit={addReview} />
        </div>
    );
}
