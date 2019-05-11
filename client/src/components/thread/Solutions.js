import React, { Fragment } from "react";

export default function Solutions(props) {
  const { solutions } = props;
  return (
    <Fragment>
      {solutions.length ? (
        solutions.map((solution, i) => (
          <div key={i} className="card mt-2" style={{ fontSize: "12px" }}>
            <div className="card-content">
              <div className="container p-2">
                <h5>{solution.regex}</h5>
                <p className="lead">{solution.handle}</p>
                <p className="text-muted">{solution.date}</p>
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
