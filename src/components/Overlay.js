function CompanySmallCard({ company, dispatch }) {
  return (
    <div
      className="company-card small-card"
      onClick={() => {
        dispatch({ type: "fetchCompany", payload: company });
        dispatch({ type: "toggleModal" });
      }}
    >
      <div className="company-logo">
        <img src={company.logoUrl} alt={`${company.name} Logo`} />
      </div>
    </div>
  );
}

function Overlay({ intrestedCompanies, dispatch }) {
  return (
    <div className="modal" onClick={() => dispatch({ type: "toggleModal" })}>
      <div className={`modal-content ${intrestedCompanies.length > 0 && "ph:w-[80%] ph:h-fit ph:max-h-[80%]"} ph:overflow-y-scroll`}>
        {intrestedCompanies.length === 0 ? (
          <p className="ph:text-sm">No Intrested Companies</p>
        ) : (
          intrestedCompanies.map((res, i) => {
            return (
              <CompanySmallCard company={res} dispatch={dispatch} key={i} />
            );
          })
        )} 
      </div>
    </div>
     
      
  );
}

export default Overlay;
