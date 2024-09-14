function CompanyDetails({ companyData, intrestedCompanies, dispatch }) {
  const isChecked = intrestedCompanies.filter((c) => {
    return c.name === companyData.name;
  });

  console.log(isChecked.length === 1);

  function manageList(e) {
    if (e.target.checked) {
      dispatch({
        type: "manageList",
        payload: [...intrestedCompanies, companyData],
      });
    } else {
      const newList = intrestedCompanies.filter(
        (com, i) => com.name !== companyData.name
      );
      dispatch({ type: "manageList", payload: newList });
    }
  }

  return (
    <div className="company-card">
      {companyData.jobRolesAvailable.length === 0 && (
        <div className="unavailable">
          <p>
            Job openings are currently unavailable
            <div class="checkbox-container" onClick={manageList}>
              <input
                type="checkbox"
                id={`interested-checkbox-${companyData.name}`}
                checked={isChecked.length === 1}
              />
              <label
                for={`interested-checkbox-${companyData.name}`}
                class="checkbox-label"
              >
                Interested
              </label>
            </div>
          </p>
        </div>
      )}
      <div className="company-logo">
        <img src={companyData.logoUrl} alt="Google Logo" />
      </div>
      <div className="company-details">
        <h1>{companyData.name}</h1>
        <p>{companyData.description}</p>
        <p>
          <strong>Headquarters:</strong> {companyData.headquarters}
        </p>
        <p>
          <strong>Company Size:</strong> {companyData.companySize}
        </p>
        <p className="tech-stack">
          <strong>Tech Stack:</strong> {companyData.techStack.join(", ")}
        </p>
        <p className="salary-jobs">
          <strong>Average Salary:</strong> ${companyData.averageSalary}
        </p>
        <p className="job-openings">
          <strong>Job Openings:</strong> {companyData.currentJobOpenings}
        </p>
        {companyData.jobRolesAvailable.length !== 0 && (
          <p>
            <strong>Job Roles Available:</strong>{" "}
            {companyData.jobRolesAvailable.join(", ")}
          </p>
        )}
        <p className="job-link">
          <a href={companyData.jobListingUrl} target="_blank" rel="noreferrer">
            View Jobs at {companyData.name}
          </a>
        </p>
      </div>
      <div class="checkbox-container" onClick={manageList}>
        <input
          type="checkbox"
          id={`interested-checkbox-${companyData.name}`}
          checked={isChecked.length === 1}
        />
        <label
          for={`interested-checkbox-${companyData.name}`}
          class="checkbox-label"
        >
          Interested
        </label>
      </div>
    </div>
  );
}

export default CompanyDetails;
