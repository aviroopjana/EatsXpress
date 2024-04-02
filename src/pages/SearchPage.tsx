import { useSearchRestaurants } from "@/api/restaurant_api";
import SearchResultsCard from "@/components/SearchResultsCard";
import SearchResultInfo from "@/components/SearchResultsInfo";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { city } = useParams();

  const { results, isLoading } = useSearchRestaurants(city);

  if (isLoading) {
    return <div className="max-w-xl mx-auto h-screen">Loading...</div>;
  }

  if (!results?.data || !city) {
    return <span>No results found!</span>;
  }

  return (
    <div className="max-w-6xl mx-auto h-auto p-5">
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
        <div id="cuisine-list">Cuisine List here</div>
        <div id="main-section" className="flex flex-col gap-5">
          <SearchResultInfo city={city} total={results?.pagination.total} />
          {results.data.map((restaurant) => (
            <SearchResultsCard restaurant={restaurant}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
