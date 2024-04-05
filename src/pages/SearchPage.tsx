import { useSearchRestaurants } from "@/api/restaurant_api";
import PaginationSelector from "@/components/PaginationSelect";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultsCard from "@/components/SearchResultsCard";
import SearchResultInfo from "@/components/SearchResultsInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();

  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });

  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState: SearchState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState: SearchState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  if (isLoading) {
    return <div className="max-w-xl mx-auto h-screen">Loading...</div>;
  }

  if (!results?.data || !city) {
    return <span>No results found!</span>;
  }

  return (
    <div className="bg-gradient-to-b from-[#f4c541] to-transparent">
      <div className="max-w-6xl mx-auto min-h-screen h-auto p-5">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
          <div id="cuisine-list">Cuisine List here</div>
          <div id="main-section" className="flex flex-col gap-5">
            <div className="w-full">
              <SearchBar
                onSubmit={setSearchQuery}
                placeHolder="Search by Cusine or Restaurant Name"
                onReset={resetSearch}
                searchQuery={searchState.searchQuery}
                isHomePage={false}
              />
            </div>
            <SearchResultInfo city={city} total={results?.pagination.total} />
            {results.data.map((restaurant) => (
              <SearchResultsCard restaurant={restaurant} />
            ))}
            <PaginationSelector
              page={results.pagination.page}
              pages={results.pagination.pages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
