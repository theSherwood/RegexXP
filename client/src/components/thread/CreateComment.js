import React, { useRef } from "react";
import { connect } from "react-redux";
import { addComment } from "../../actions/challengeActions";

const CreateComment = props => {
  const textareaElmnt = useRef(null);

  const onSubmitComment = e => {
    e.preventDefault();
    const value = textareaElmnt.current.value.trim();
    if (value) {
      props.createCommentCallback(value);
      textareaElmnt.current.value = "";
    }
  };

  return (
    <form onSubmit={onSubmitComment} className="container">
      <textarea
        aria-label="comment"
        className="form-control"
        style={{ resize: "none" }}
        ref={textareaElmnt}
      />
      <button className="btn btn-default btn-sm mt-1 mb-2">Comment</button>
    </form>
  );
};

export default connect(
  null,
  { addComment }
)(CreateComment);
