import PodcastDetailPlayer from "./PodcastDetailPlayer";
import { getShareUrl, copyToClipboard, shareOnTelegram, shareOnWhatsapp } from "../../../helper/shareFunctions";
import { FaLink, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

export default function PodcastsDetailsCard({ podcast }) {
    const url = getShareUrl(podcast.id);

    return (
        <div className="bg-white [box-shadow:0_20px_25px_-5px_rgba(0,0,0,0.1),0_-20px_25px_-5px_rgba(0,0,0,0.1)] flex flex-col rounded-[20px] shadow-md py-6 px-4 sm:px-8 md:max-w-7xl mx-auto mb-4 overflow-hidden">

            <div className="flex flex-col md:flex-row gap-x-8 items-start">
                <img
                    className="w-full sm:w-[300px] h-[200px] object-cover rounded-[20px]"
                    src={podcast.coverImage}
                    alt={podcast.title}
                />

                <div className="flex flex-col justify-start w-full">
                    <h2 className="font-bold text-[24px] text-darkBlue my-4">{podcast.title}</h2>
                    <PodcastDetailPlayer podcast={podcast} />
                </div>
            </div>
            <div className="my-8 p-6 leading-7 text-[16px] bg-gray-100 rounded-[20px] text-gray-800">
                <p>{podcast.description}</p>
                <div className="mt-4">
                    {podcast.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 mb-2"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                <div className="flex justify-end items-center gap-x-4 mt-4">
                    <span className="text-gray-600 font-semibold">اشتراک‌گذاری:</span>
                    <button onClick={() => shareOnTelegram(podcast.title, url)} className="text-[#0088cc] text-2xl hover:scale-110">
                        <FaTelegramPlane />
                    </button>
                    <button onClick={() => shareOnWhatsapp(podcast.title, url)} className="text-[#25D366] text-2xl hover:scale-110">
                        <FaWhatsapp />
                    </button>
                    <button onClick={() => copyToClipboard(url)} className="text-gray-700 text-2xl hover:scale-110">
                        <FaLink />
                    </button>
                </div>
            </div>
        </div>

    );
}
