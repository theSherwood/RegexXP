import React, { Fragment } from "react";

export default function Comments(props) {
  const { comments } = props;

  return (
    <Fragment>
      {comments.length ? (
        comments.map((comment, i) => (
          <div key={i} className="card mt-2" style={{ fontSize: "12px" }}>
            <div className="card-content">
              <div className="container p-2">
                <h6>{comment.handle}</h6>
                <p className="lead">{comment.text}</p>
                <p className="text-muted">{comment.date}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">
          This challenge doesn't have any comments yet.
        </p>
      )}
    </Fragment>
  );
}
