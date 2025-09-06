import { HiPlay } from "react-icons/hi";
import { HiPause } from "react-icons/hi";
import translate from "../../../../locale/translate";
import PodcastPlayer from "./PodcastPlayer";
import { Link } from "react-router-dom";
import { getExcerpt } from "../../../../helper/helperFunction"

export default function PodcastCard({ podcast, activePodcast, isPlaying, setActivePodcast, setIsPlaying, }) {
    const isCurrentPodcastPlaying = activePodcast?.id === podcast.id && isPlaying;

    const handleTogglePlayer = () => {
        if (activePodcast?.id === podcast.id) {
            setIsPlaying(!isPlaying);
        } else {
            setActivePodcast(podcast);
            setIsPlaying(true);
        }
    };

    return (
        <div className="border bg-white shadow-lg border-[#D7D7D7] p-4 rounded-[20px]">
            <div>
                <Link className="flex flex-col lg:flex-row gap-4" to={`/podcasts/${podcast.id}`}>
                    <img
                        className="rounded-[20px] w-full lg:w-[200px] h-auto object-cover"
                        src={podcast.coverImage}
                        alt={podcast.title}
                    />

                    <div className="flex flex-col gap-2 lg:pt-4">
                        <h3 className="font-bold text-[20px] pb-2 border-b text-lightYellow">
                            {podcast.title}
                        </h3>
                        <p className="text-[#4D4D4D] text-[16px]">{getExcerpt(podcast.description)}</p>
                    </div>
                </Link>
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mt-4">
                <div className="flex flex-wrap gap-2">
                    {podcast.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="text-[12px] p-2 border border-[#4D4D4D] rounded-[10px]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleTogglePlayer}
                        className="flex items-center gap-2 text-[#285295] font-semibold text-[18px]"
                    >
                        {isCurrentPodcastPlaying ? (
                            <HiPause className="text-[26px]" />
                        ) : (
                            <HiPlay className="text-[26px]" />
                        )}
                        {translate.listen}
                    </button>

                    {isCurrentPodcastPlaying && (
                        <PodcastPlayer
                            podcast={podcast}
                            onClose={() => setActivePodcast(null)}
                        />
                    )}
                </div>

                <span className="text-sm text-gray-600">
                    {translate.guest} : {podcast.guests?.join("، ")}
                </span>
            </div>
        </div>
    );
}
