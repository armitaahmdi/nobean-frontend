import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react";
import PodcastsDetailsCard from "../../features/user/podcasts/components/PodcastsDetailsCard";
import { fetchPodcasts } from "../../features/user/podcasts/podcastsSlice";
import RelatedPodcasts from "../../features/user/podcasts/components/RelatedPodcasts";
import RelatedArticles from "../../features/user/articles/components/RelatedArticles";
import LoadingState from "../../components/ui/LoadingState";
import ErrorState from "../../components/ui/ErrorState";

export default function PodcastDetail() {
  const { id } = useParams()
  const dispatch = useDispatch();
  const { podcasts, loading, error } = useSelector((store) => store.podcasts);
  const { articles } = useSelector((store) => store.articles);

  const podcast = podcasts.find((i) => i.id === +id);

  useEffect(() => {
    if (podcasts.length === 0) {
      dispatch(fetchPodcasts());
    }
  }, [dispatch, podcasts.length]);

  if (!podcast) {
    return <div className="text-center py-10">در حال بارگذاری پادکست...</div>;
  }

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;

  return (
    <div>
      <PodcastsDetailsCard podcast={podcast} />
      <RelatedPodcasts podcasts={podcasts} currentPodcastId={podcast.id} />
      <RelatedArticles articles={articles} />
    </div>
  )
}
