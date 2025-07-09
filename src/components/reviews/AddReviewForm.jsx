import { useState } from "react";
import messageIcon from "../../assets/images/icons/message.png"

export default function AddReviewForm({ onSubmit }) {
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        onSubmit({
            name: name || "کاربر",
            comment,
            created_at: new Date().toISOString(),
            likes: 0,
            dislikes: 0,
            replies: [],
        });

        setName("");
        setComment("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-gray-50 p-6 rounded-xl border mt-10 shadow-sm space-y-6"
        >
            <h3 className="flex items-center gap-2 text-xl font-semibold text-darkBlue mb-4">
                <img src={messageIcon} alt="ثبت نظر شما" className="w-7 h-7" />
                ثبت نظر شما
            </h3>
            <input
                type="text"
                placeholder="نام (اختیاری)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <textarea
                placeholder="متن نظر شما..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="5"
                className="w-full border px-3 py-2 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 text-sm font-semibold transition"
            >
                ارسال نظر
            </button>
        </form>
    );
}