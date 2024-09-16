function SearchBox({ searchQuery, dispatch }) {
  return (
    <form className="search-bar">
      <select
        className="select-creteria"
        onChange={(e) =>
          dispatch({ type: "selectCriteria", payload: e.target.value })
        }
      >
        <option value="name">Company Name</option>
        <option value="averageSalary">Average Salary</option>
        <option value="techStack">Tech Stack</option>
        <option value="jobRolesAvailable">Job Role</option>
        <option value="headquarters">Location</option>
      </select>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) =>
          dispatch({ type: "changeQuery", payload: e.target.value })
        }
      />
      <button
        className="btn-search"
        onClick={(e) => {
          e.preventDefault();
          dispatch({ type: "startSearching" });
        }}
      >
        {searchQuery.length === 0 ? "Get All Companies" : "Search"}
      </button>
      {/* <div className="tags">
        <span className="tag">HTML</span>
      </div> */}
    </form>
  );
}

export default SearchBox;
