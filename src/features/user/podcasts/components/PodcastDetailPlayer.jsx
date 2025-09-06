import { useEffect, useRef, useState } from "react";
import { HiPlay, HiPause } from "react-icons/hi2";
import { HiOutlineDownload } from "react-icons/hi";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { RiReplay15Fill, RiForward15Fill } from "react-icons/ri";
import translate from "../../../../locale/translate";

export default function PodcastDetailPlayer({ podcast }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const toggleAudio = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (audio.paused) {
            audio.play();
            setIsPlaying(true);
        } else {
            audio.pause();
            setIsPlaying(false);
        }
    };

    const seekForward = () => {
        if (!audioRef.current) return;
        audioRef.current.currentTime = Math.min(currentTime + 15, duration);
    };

    const seekBackward = () => {
        if (!audioRef.current) return;
        audioRef.current.currentTime = Math.max(currentTime - 15, 0);
    };

    const handleSeek = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = (clickX / rect.width) * duration;
        if (audioRef.current) audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const setMeta = () => setDuration(audio.duration);
        const onEnd = () => setIsPlaying(false);

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", setMeta);
        audio.addEventListener("ended", onEnd);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", setMeta);
            audio.removeEventListener("ended", onEnd);
        };
    }, []);

    return (
        <div className="bg-white rounded-xl p-5 max-w-3xl w-full">
            {/* <div className="flex items-center gap-6 mb-6">
                <div className="flex flex-1 justify-center items-center gap-6">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={seekBackward}
                        aria-label="Back 15 seconds"
                        className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition"
                    >
                        <RiReplay15Fill className="text-3xl" />
                    </motion.button>

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleAudio}
                        aria-label={isPlaying ? "Pause" : "Play"}
                        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md transition-colors ${isPlaying ? "bg-darkBlue hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-500"
                            } text-white`}
                    >
                        {isPlaying ? (
                            <HiPause className="text-4xl" />
                        ) : (
                            <HiPlay className="text-4xl ml-1" />
                        )}
                    </motion.button>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={seekForward}
                        aria-label="Forward 15 seconds"
                        className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition"
                    >
                        <RiForward15Fill className="text-3xl" />
                    </motion.button>
                </div>

                <div className="flex justify-start">
                    <a
                        href={podcast.audioUrl}
                        download
                        className="flex w-fit items-center text-darkBlue hover:text-lightBlue py-2 text-[16px]"
                    >
                        <HiOutlineDownload className="ml-1" /> {translate.download}
                    </a>
                </div>
            </div> */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">
                <div className="flex flex-1 justify-center items-center gap-6 order-1 sm:order-none">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={seekBackward}
                        aria-label="Back 15 seconds"
                        className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition"
                    >
                        <RiReplay15Fill className="text-3xl" />
                    </motion.button>

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleAudio}
                        aria-label={isPlaying ? "Pause" : "Play"}
                        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md transition-colors ${isPlaying ? "bg-darkBlue hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-500"
                            } text-white`}
                    >
                        {isPlaying ? (
                            <HiPause className="text-4xl" />
                        ) : (
                            <HiPlay className="text-4xl ml-1" />
                        )}
                    </motion.button>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={seekForward}
                        aria-label="Forward 15 seconds"
                        className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition"
                    >
                        <RiForward15Fill className="text-3xl" />
                    </motion.button>
                </div>

                <div className="flex justify-end sm:justify-start">
                    <a
                        href={podcast.audioUrl}
                        download
                        className="flex w-fit items-center text-darkBlue hover:text-lightBlue py-2 text-[16px]"
                    >
                        <HiOutlineDownload className="ml-1" /> {translate.download}
                    </a>
                </div>
            </div>

            <div
                onClick={handleSeek}
                className="relative w-full h-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 transition"
                aria-label="Seek audio progress"
                role="slider"
                aria-valuemin={0}
                aria-valuemax={duration}
                aria-valuenow={currentTime}
            >
                <div
                    className="absolute top-0 left-0 h-2 bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                />
            </div>


            <div className="flex justify-between mt-3 text-xs text-gray-500 font-mono select-none">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
            </div>



            <audio ref={audioRef} src={podcast.audioUrl} />
        </div>
    );
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");
    return `${mins}:${secs}`;
}
