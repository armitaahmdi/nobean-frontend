import { Link } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import translate from "../../../locale/translate";
import { getExcerpt } from "../../../helper/helperFunction";

export default function RelatedPodcasts({ podcasts, currentPodcastId }) {
    const filtered = podcasts.filter(p => p.id !== currentPodcastId);
    const randomItems = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);

    return (
        <div className="my-10">
            <h3 className="text-xl font-bold text-darkBlue mb-4 border-b pb-2">{translate.relatedpodcasts}</h3>

            <div className="flex flex-col gap-4">
                {randomItems.map(podcast => (
                    <Link
                        key={podcast.id}
                        to={`/podcasts/${podcast.id}`}
                        className="bg-white [box-shadow:0_20px_25px_-5px_rgba(0,0,0,0.1),0_-20px_25px_-5px_rgba(0,0,0,0.1)] flex flex-col sm:flex-row rounded-[16px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                    >
                        <img
                            src={podcast.coverImage}
                            alt={podcast.title}
                            className="w-full sm:w-[140px] h-[180px] sm:h-auto object-cover"
                        />
                        <div className="p-4 flex flex-col justify-between w-full">
                            <h4 className="font-semibold text-[16px] text-gray-800 line-clamp-2">
                                {podcast.title}
                            </h4>

                            <p className="text-[14px] text-gray-600 mt-1 line-clamp-2 text-justify">
                                {getExcerpt(podcast.description)}
                            </p>

                            <div className="flex items-center text-[13px] text-gray-500 mt-2 gap-1">
                                <FaClock className="text-gray-400" />
                                <span>{podcast.duration}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
