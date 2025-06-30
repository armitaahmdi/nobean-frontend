import { useState } from "react";
import moment from "moment-jalaali";

moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

export default function ReviewsCard({ reviews }) {
    const [showAll, setShowAll] = useState(false);

    if (!reviews?.length) {
        return <p className="text-center text-gray-500">هنوز نظری ثبت نشده است.</p>;
    }

    const reviewsWithJalaliDate = reviews.map(review => ({
        ...review,
        dateShamsi: moment(review.created_at).locale("fa").format("jD jMMMM jYYYY")
    }));

    const visibleReviews = showAll ? reviewsWithJalaliDate : reviewsWithJalaliDate.slice(0, 6);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {visibleReviews.map((review, i) => (
                    <div
                        key={i}
                        className="bg-white border border-gray-100 rounded-2xl shadow-md p-5 transition hover:shadow-lg h-full"
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
                        <p className="text-gray-700 leading-relaxed text-sm">{review.comment}</p>
                    </div>
                ))}
            </div>

            {reviews.length > 6 && (
                <div className="text-center">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-sm text-blue-600 font-semibold hover:underline"
                    >
                        {showAll
                            ? "نمایش کمتر"
                            : `مشاهده همه نظرات (${reviews.length} مورد)`}
                    </button>
                </div>
            )}
        </div>
    );
}
