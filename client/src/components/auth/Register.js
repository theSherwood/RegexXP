import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser, clearAuthErrors } from "../../actions/authActions";

function Register(props) {
  const { isAuthenticated, errors } = props.auth;

  if (isAuthenticated) {
    props.history.push("/challenges");
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
    handle: ""
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
    props.registerUser(formData, props.history);
  };

  const { email, password, password2, handle } = formData;
  return (
    <div className="card">
      <div className="card-content">
        <div className="container p-4">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="handle">Display Name/Handle</label>
              <input
                name="handle"
                type="text"
                className={
                  "form-control" + (errors.handle ? " is-invalid" : "")
                }
                value={handle}
                onChange={onChange}
              />
              <div className="invalid-feedback">{errors.handle}</div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="email"
                className={"form-control" + (errors.email ? " is-invalid" : "")}
                value={email}
                onChange={onChange}
              />
              <div className="invalid-feedback">{errors.email}</div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                className={
                  "form-control" + (errors.password ? " is-invalid" : "")
                }
                value={password}
                onChange={onChange}
              />
              <div className="invalid-feedback">{errors.password}</div>
            </div>
            <div className="form-group">
              <label htmlFor="password2">Confirm Password</label>
              <input
                name="password2"
                type="password"
                className={
                  "form-control" + (errors.password2 ? " is-invalid" : "")
                }
                value={password2}
                onChange={onChange}
              />
              <div className="invalid-feedback">{errors.password2}</div>
            </div>
            <button type="submit" className="btn btn-warning mt-2">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  clearAuthErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { registerUser, clearAuthErrors }
)(withRouter(Register));
