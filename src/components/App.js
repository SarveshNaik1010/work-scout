import { useEffect, useReducer } from "react";
import "../App.css";
import SearchBox from "./SearchBox";
import SearchResults from "./SearchResults";
import StartScreen from "./StartScreen";
import Loading from "./Loading";
import filterSearchResult from "../utils/filterSearchResult";
import Overlay from "./Overlay";

const initialState = {
  status: "ready",
  selectCriteria: "name",
  searchQuery: "",
  isSearchBtnClicked: false,
  searchResults: [],
  intrestedCompanies: [],
  showModel: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "changeStatus":
      return { ...state, status: action.payload };

    case "selectCriteria":
      return { ...state, selectCriteria: action.payload };

    case "changeQuery":
      return { ...state, searchQuery: action.payload };

    case "startSearching":
      return { ...state, isSearchBtnClicked: true };

    case "stopSearching":
      return { ...state, isSearchBtnClicked: false };

    case "addSearchResults":
      return { ...state, searchResults: action.payload };

    case "manageList":
      return { ...state, intrestedCompanies: action.payload };

    case "toggleModal":
      return { ...state, showModel: !state.showModel };

    case "fetchCompany": {
      return {
        ...state,
        showModel: false,
        searchResults: [action.payload],
      };
    }

    default:
      return new Error("Something went wrong");
  }
}

function App() {
  const [
    {
      status,
      searchQuery,
      isSearchBtnClicked,
      selectCriteria,
      searchResults,
      intrestedCompanies,
      showModel,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(
    function () {
      if (!isSearchBtnClicked) return;
      async function getCompanies() {
        dispatch({ type: "changeStatus", payload: "loading" });
        const res = await fetch(`http://localhost:7000/companies`);
        const data = await res.json();
        const filteredData =
          searchQuery === ""
            ? data
            : filterSearchResult(data, selectCriteria, searchQuery);
        dispatch({ type: "addSearchResults", payload: filteredData });
        dispatch({ type: "stopSearching" });
        dispatch({ type: "changeStatus", payload: "active" });
      }
      getCompanies();
    },
    [isSearchBtnClicked, searchQuery, selectCriteria]
  );

  return (
    <>
      {showModel && (
        <Overlay dispatch={dispatch} intrestedCompanies={intrestedCompanies} />
      )}
      <div className="contanier header">
        <SearchBox dispatch={dispatch} searchQuery={searchQuery} />
        <button onClick={(e) => dispatch({ type: "toggleModal" })}>
          View Intrested
        </button>
      </div>
      {status === "ready" && <StartScreen />}
      {status === "loading" && <Loading />}
      {status === "active" &&
        (searchResults.length === 0 ? (
          <div className="contanier">
            <h3>No company with the name {searchQuery}</h3>
          </div>
        ) : (
          <SearchResults
            searchResults={searchResults}
            dispatch={dispatch}
            intrestedCompanies={intrestedCompanies}
          />
        ))}
    </>
  );
}

export default App;
