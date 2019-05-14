import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { loginUser, clearAuthErrors } from "../../actions/authActions";

function Login(props) {
  const { isAuthenticated, errors } = props.auth;

  if (isAuthenticated) {
    props.history.push("/challenges");
  }

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    return () => {
      props.clearAuthErrors();
    };
  }, []);

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    props.loginUser(formData, props.history);
  };

  return (
    <div className="card">
      <div className="card-content">
        <div className="container p-4">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                aria-label="email"
                name="email"
                type="email"
                className={"form-control" + (errors.email ? " is-invalid" : "")}
                value={formData.email}
                onChange={onChange}
              />
              <div className="invalid-feedback">{errors.email}</div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                aria-label="password"
                name="password"
                type="password"
                className={
                  "form-control" + (errors.password ? " is-invalid" : "")
                }
                value={formData.password}
                onChange={onChange}
              />
              <div className="invalid-feedback">{errors.password}</div>
            </div>
            <button type="submit" className="btn btn-default mt-2">
              Login
            </button>
          </form>
        </div>
      </div>
      <a href={`${window.location.origin}/auth/google`}>Google</a>
      <a href={`${window.location.origin}/auth/github`}>Github</a>
    </div>
  );
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  clearAuthErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser, clearAuthErrors }
)(withRouter(Login));
