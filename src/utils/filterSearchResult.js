function filterSearchResult(data, selectCriteria, searchQuery) {
  return data.filter((company, i) => {
    switch (selectCriteria) {
      case "name":
        return company[selectCriteria] === searchQuery;
      case "averageSalary":
        return company[selectCriteria] >= searchQuery;
      case "techStack":
        return company[selectCriteria].includes(searchQuery);
      case "jobRolesAvailable":
        return company[selectCriteria].includes(searchQuery);
      case "headquarters":
        return company[selectCriteria] === searchQuery;
      default:
        return "someting went wrong";
    }
  });
}

export default filterSearchResult;
