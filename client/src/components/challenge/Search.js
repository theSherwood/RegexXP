import React, { useState } from "react";
import { connect } from "react-redux";
import { getChallengesByQuery } from "../../actions/challengeActions";

const Search = props => {
  const [queryString, setQueryString] = useState("");

  const handleInputChange = e => {
    setQueryString(e.target.value);
  };

  const submitSearch = () => {
    props.getChallengesByQuery(queryString);
  };

  return (
    <div>
      <input value={queryString} onChange={handleInputChange} />
      <button className="btn btn-warning" onClick={submitSearch}>
        Search
      </button>
    </div>
  );
};

export default connect(
  null,
  { getChallengesByQuery }
)(Search);
