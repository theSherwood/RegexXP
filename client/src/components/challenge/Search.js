import React, { useState } from "react";
import { connect } from "react-redux";
import {
  getChallengesByQuery,
  getChallenges
} from "../../actions/challengeActions";

const Search = props => {
  const [queryString, setQueryString] = useState("");

  const handleInputChange = e => {
    setQueryString(e.target.value);
  };

  const submitSearch = e => {
    e.preventDefault();
    const query = queryString.trim();
    if (query) {
      props.getChallengesByQuery(queryString);
    } else {
      props.getChallenges();
    }
  };

  return (
    <div>
      <form onSubmit={submitSearch}>
        <div className="input-group mb-3">
          <input
            aria-label="search"
            className="form-control search-bar"
            placeholder="Keyword search..."
            value={queryString}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="btn btn-default"
            style={{ color: "white" }}
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
  { getChallengesByQuery, getChallenges }
)(Search);
