/* eslint-disable react-hooks/exhaustive-deps */
import { HiPlay, HiPause } from "react-icons/hi";
import { useRef, useState, useEffect } from "react";

export default function PodcastPlayer({ podcast, isPlaying, setIsPlaying, onClose }) {
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const toggleAudio = () => {
        const audio = audioRef.current;
        if (audio.paused) {
            audio.play();
            setIsPlaying(true);
        } else {
            audio.pause();
            setIsPlaying(false);
        }
    };

    const handleSeek = (e) => {
        const time = parseFloat(e.target.value);
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const update = () => setCurrentTime(audio.currentTime);
        const loaded = () => setDuration(audio.duration);
        const ended = () => setIsPlaying(false);

        audio.addEventListener("timeupdate", update);
        audio.addEventListener("loadedmetadata", loaded);
        audio.addEventListener("ended", ended);

        return () => {
            audio.removeEventListener("timeupdate", update);
            audio.removeEventListener("loadedmetadata", loaded);
            audio.removeEventListener("ended", ended);
        };
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }, [isPlaying])

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[#ecf3fe] shadow-lg p-4 z-50 flex items-center border-t border-gray-300">
            <span className="text-[15px] font-semibold truncate max-w-[180px] mr-5 text-gray-800">
                {podcast.title}
            </span>

            <button
                onClick={toggleAudio}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-[#285295] hover:bg-[#1e3a8a] transition-shadow shadow-md hover:shadow-lg text-white mr-5"
                aria-label={isPlaying ? "Pause" : "Play"}
            >
                {isPlaying ? (
                    <HiPause className="text-2xl" />
                ) : (
                    <HiPlay className="text-2xl ml-[2px]" />
                )}
            </button>

            <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                className="flex-grow h-2 rounded-lg cursor-pointer accent-[#285295] mr-5"
            />

            <span className="text-sm w-[65px] text-right text-gray-600 tabular-nums select-none">
                {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            {onClose && (
                <button
                    onClick={onClose}
                    className="ml-6 w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-200 transition"
                    aria-label="Close player"
                >
                    &times;
                </button>
            )}

            <audio ref={audioRef} src={podcast.audioUrl} autoPlay />
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
