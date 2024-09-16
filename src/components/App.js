import { useEffect, useReducer } from "react";
import "../App.css";
import SearchBox from "./SearchBox";
import SearchResults from "./SearchResults";
import StartScreen from "./StartScreen";
import Loading from "./Loading";
import filterSearchResult from "../utils/filterSearchResult";
import Overlay from "./Overlay";
import Info from "./Info";
import Error from "./Error";

const initialState = {
  status: "ready",
  selectCriteria: "name",
  searchQuery: "",
  isSearchBtnClicked: false,
  searchResults: [],
  intrestedCompanies: [],
  showModel: false,
  showInfo: true,
  errorMessage: "",
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

    case "toggleInfo":
      return { ...state, showInfo: !state.showInfo };

    case "fetchCompany":
      return {
        ...state,
        showModel: false,
        searchResults: [action.payload],
      };

    case "error":
      return { ...state, errorMessage: action.payload, status: "error" };

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
      showInfo,
      errorMessage,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(
    function () {
      if (!isSearchBtnClicked) return;
      async function getCompanies() {
        try {
          dispatch({ type: "changeStatus", payload: "loading" });
          const res = await fetch(
            `https://res.cloudinary.com/dvq2kdv1z/raw/upload/v1726454591/company-data_woivba.json`
          );
          const { companies: data } = await res.json();
          console.log(data);
          const filteredData =
            searchQuery === ""
              ? data
              : filterSearchResult(data, selectCriteria, searchQuery);
          dispatch({ type: "addSearchResults", payload: filteredData });
          dispatch({ type: "stopSearching" });
          dispatch({ type: "changeStatus", payload: "active" });
        } catch (error) {
          dispatch({ type: "error", payload: "Something went wrong!" });
        }
      }
      getCompanies();
    },
    [isSearchBtnClicked, searchQuery, selectCriteria]
  );

  return (
    <>
      {showInfo && <Info dispatch={dispatch} />}
      {showModel && (
        <Overlay dispatch={dispatch} intrestedCompanies={intrestedCompanies} />
      )}
      <div className="contanier header">
        <SearchBox dispatch={dispatch} searchQuery={searchQuery} />
        <button onClick={(e) => dispatch({ type: "toggleModal" })}>
          {intrestedCompanies.length} Intrested Companies
        </button>
        <button onClick={(e) => dispatch({ type: "toggleInfo" })}>Info</button>
      </div>
      {status === "ready" && <StartScreen />}
      {status === "loading" && <Loading />}
      {status === "error" && <Error errorMessage={errorMessage} />}
      {status === "active" &&
        errorMessage === "" &&
        (searchResults.length === 0 ? (
          <div className="contanier">
            <h3>
              No company with the {selectCriteria} {searchQuery}
            </h3>
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
