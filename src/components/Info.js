function Info({ dispatch }) {
  return (
    <div
      className="modal infoModal"
      onClick={() => dispatch({ type: "toggleInfo" })}
    >
      <ul className="modal-content">
        <h2>Guideline to use the app</h2>
        <li>1. Keep the input field empty for getting all companies</li>
        <li>
          2. Companies: Google, Microsoft, Apple, IBM, Spotify, Netlifx etc.
        </li>
        <p className="message">Click anywhere to close this window</p>
      </ul>
    </div>
  );
}

export default Info;
