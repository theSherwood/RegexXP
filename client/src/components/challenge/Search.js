import React, { useState } from "react";
import { connect } from "react-redux";
import { getChallengesByQuery } from "../../actions/challengeActions";

const Search = props => {
  const [queryString, setQueryString] = useState("");

  const handleInputChange = e => {
    setQueryString(e.target.value);
  };

  const submitSearch = e => {
    e.preventDefault();
    const query = queryString.trim();
    if (query) props.getChallengesByQuery(queryString);
  };

  return (
    <div>
      <form onSubmit={submitSearch}>
        <div className="input-group mb-3">
          <input
            aria-label="search"
            className="form-control"
            placeholder="Search by keyword..."
            value={queryString}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="btn"
            style={{ background: "black", color: "#ffc107" }}
          >
            <b>Search</b>
          </button>
        </div>
      </form>
    </div>
  );
};

export default connect(
  null,
  { getChallengesByQuery }
)(Search);
