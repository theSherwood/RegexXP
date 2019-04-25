import React, { Fragment } from "react";

export default function Comments(props) {
  const { comments } = props;
  return (
    <Fragment>
      <form className="container">
        <textarea className="form-control" />
        <button>Comment</button>
      </form>
      {comments.map(comment => (
        <div className="card mt-2" style={{ fontSize: "12px" }}>
          <div className="card-content">
            <div className="container p-2">
              <h6>{comment.handle}</h6>
              <p className="lead">{comment.text}</p>
              <p className="text-muted">{comment.date}</p>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
}
