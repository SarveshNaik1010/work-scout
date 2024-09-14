import CompanyDetails from "./CompanyDetails";

function SearchResults({ searchResults, dispatch, intrestedCompanies }) {
  return (
    <div>
      <div className="contanier results">
        <h2>Search Results: </h2>
        <div className="search-results">
          {searchResults.map((res, i) => {
            return <CompanyDetails companyData={res} key={i} dispatch={dispatch} intrestedCompanies={intrestedCompanies} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
