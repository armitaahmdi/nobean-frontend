import { useDispatch, useSelector } from "react-redux";
import FilterablePaginatedList from "../components/filter/FilterablePaginatedList";
import translate from "../locale/translate";
import { fetchPodcasts } from "../features/podcasts/podcastsSlice";
import { podcastsFilterConfig } from "../components/filter/filterConfig";
import PodcastsList from "../features/podcasts/pages/PodcastsList";

export default function Podcasts() {
  const dispatch = useDispatch();
  const { podcasts, loading, error } = useSelector((store) => store.podcasts);

  return (
    <>
      <FilterablePaginatedList
        fetchAction={fetchPodcasts}
        items={podcasts}
        loading={loading}
        error={error}
        config={podcastsFilterConfig}
        ListComponent={({ data, selectedFilters }) => (
          <PodcastsList
            podcasts={data}
            selectedSort={selectedFilters.sortOptions}
            selectedCategory={selectedFilters.categories}
            selectedBadge={selectedFilters.badge}
          />
        )}
        seo={translate.podcasts}
        filtersProps={{ dispatch }} u
      />
    </>
  )
}
