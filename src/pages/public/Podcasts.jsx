import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import FilterablePaginatedList from "../../components/filter/FilterablePaginatedList";
import translate from "../../locale/translate";
import { fetchPodcasts } from "../../features/user/podcasts/podcastsSlice";
import { podcastsFilterConfig } from "../../components/filter/filterConfig";
import PodcastsList from "../../features/user/podcasts/pages/PodcastsList";

export default function Podcasts() {
  const dispatch = useDispatch();
  const { podcasts, loading, error } = useSelector((store) => store.podcasts);
  const listRef = useRef(null);

  return (
    <>
      <div ref={listRef}>
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
          filtersProps={{ dispatch }}
          scrollToTop={false}
          scrollToElement={listRef.current}
        />
      </div>
    </>
  )
}
