import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import PodcastsDetailsCard from "../features/podcasts/PodcastsDetailsCard";
import { useEffect } from "react";
import { fetchPodcasts } from "../features/podcasts/podcastsSlice";
import RelatedPodcasts from "../features/podcasts/RelatedPodcasts";

export default function PodcastDetail() {
  const { id } = useParams()
  const dispatch = useDispatch();
  const { podcasts } = useSelector((store) => store.podcasts);

  const podcast = podcasts.find((i) => i.id === +id);

  useEffect(() => {
    if (podcasts.length === 0) {
      dispatch(fetchPodcasts());
    }
  }, [dispatch, podcasts.length]);

  if (!podcast) {
    return <div className="text-center py-10">در حال بارگذاری پادکست...</div>;
  }

  return (
    <div>
      <PodcastsDetailsCard podcast={podcast} />
      <RelatedPodcasts podcasts={podcasts} currentPodcastId={podcast.id} />
    </div>
  )
}
