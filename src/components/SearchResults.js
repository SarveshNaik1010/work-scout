import CompanyDetails from "./CompanyDetails";

function SearchResults({ searchResults, dispatch, intrestedCompanies }) {
  return (
    <div className="">
      <div className="contanier results ph:m-4">
        <h2 className="ph:text-sm">{searchResults.length} Search Results: </h2>
        <div className="search-results ph:mx-0 ph:my-2">
          {searchResults.map((res, i) => {
            return (
              <CompanyDetails
                companyData={res}
                key={i}
                dispatch={dispatch}
                intrestedCompanies={intrestedCompanies}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
