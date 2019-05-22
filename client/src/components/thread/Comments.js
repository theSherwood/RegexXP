import React, { Fragment } from "react";
import formatDate from "../../helpers/formatDate";

export default function Comments(props) {
  const { comments } = props;

  return (
    <Fragment>
      {comments.length ? (
        comments.map((comment, i) => (
          <div key={i} className="card mt-2" style={{ fontSize: ".9em" }}>
            <div className="card-content">
              <div className="container p-2">
                <p className="mb-0">{comment.handle}</p>
                <p className="text-muted">{formatDate(comment.date)}</p>
                <p className="lead mb-1">{comment.text}</p>
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
