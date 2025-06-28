import { useState } from "react";
import PodcastCard from "./PodcastCard";
import PodcastPlayer from "./PodcastPlayer";

export default function PodcastsList({ podcasts }) {
    const [activePodcast, setActivePodcast] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="relative">
            <div className="rounded-[20px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 gap-x-16 p-4">
                {podcasts.map((podcast) => (
                    <PodcastCard
                        key={podcast.id}
                        podcast={podcast}
                        activePodcast={activePodcast}
                        isPlaying={isPlaying}
                        setActivePodcast={setActivePodcast}
                        setIsPlaying={setIsPlaying}
                    />
                ))}
            </div>

            {activePodcast && (
                <PodcastPlayer
                    podcast={activePodcast}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    onClose={() => {
                        setActivePodcast(null);
                        setIsPlaying(false);
                    }}
                />
            )}
        </div>
    );
}
