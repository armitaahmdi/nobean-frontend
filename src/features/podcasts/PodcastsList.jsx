import PodcastCard from "./PodcastCard";

export default function PodcastsList({ podcasts }) {
    return (
        <div className="bg-white rounded-[20px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 gap-x-16 p-4">
            {podcasts.map((podcast) => (
                <PodcastCard key={podcast.id} podcast={podcast} />
            ))}
        </div>
    )
}
