import { HiPlay } from "react-icons/hi";
import { HiPause } from "react-icons/hi";
import { useRef, useState } from "react";
import translate from "../../locale/translate";

export default function PodcastCard({ podcast }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleAudio = () => {
        const audio = audioRef.current;
        if (audio) {
            if (audio.paused) {
                audio.play();
                setIsPlaying(true);
            } else {
                audio.pause();
                setIsPlaying(false);
            }
        }
    };

    return (
        <div className="border border-[#D7D7D7] p-4 rounded-[20px]">
            {/* بخش بالا: عکس + متن */}
            <div className="flex flex-col lg:flex-row gap-4">
                <img
                    className="rounded-[20px] w-full lg:w-[200px] h-auto object-cover"
                    src={podcast.coverImage}
                    alt={podcast.title}
                />

                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-[20px] pb-2 border-b text-lightYellow">
                        {podcast.title}
                    </h3>
                    <p className="text-[#4D4D4D] text-[16px]">{podcast.description}</p>
                </div>
            </div>

            {/* بخش پایین: تگ‌ها + دکمه + مهمان */}
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
                        onClick={toggleAudio}
                        className="flex items-center gap-2 text-[#285295] font-semibold text-[18px]"
                    >
                        {isPlaying ? (
                            <HiPause className="text-[30px]" />
                        ) : (
                            <HiPlay className="text-[30px]" />
                        )}
                        {translate.listen}
                    </button>
                </div>

                <span className="text-sm text-gray-600">
                    {translate.guest} : {podcast.guests?.join("، ")}
                </span>
            </div>

            <audio ref={audioRef} src={podcast.audioUrl} />
        </div>
    );
}
