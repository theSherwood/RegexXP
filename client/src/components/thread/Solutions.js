import React, { Fragment } from "react";
import formatDate from "../../helpers/formatDate";

export default function Solutions(props) {
  const { solutions } = props;
  return (
    <Fragment>
      {solutions.length ? (
        solutions.map((solution, i) => (
          <div key={i} className="card mt-2" style={{ fontSize: "12px" }}>
            <div className="card-content">
              <div className="container p-2">
                <h6>{solution.handle}</h6>
                <p className="text-muted">{formatDate(solution.date)}</p>
                <p className="lead">{solution.regex}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">This challenge hasn't been solved yet.</p>
      )}
    </Fragment>
  );
}
