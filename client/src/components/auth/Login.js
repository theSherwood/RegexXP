import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser, clearAuthErrors } from "../../actions/authActions";

function Login(props) {
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

    props.loginUser(formData);
  };

  const { errors } = props;
  return (
    <div className="card">
      <div className="card-content">
        <div className="container p-4">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="email"
                className={"form-control" + (errors.email ? " is-invalid" : "")}
                value={formData.email}
                onChange={onChange}
              />
              <div class="invalid-feedback">{errors.email}</div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                className={
                  "form-control" + (errors.password ? " is-invalid" : "")
                }
                value={formData.password}
                onChange={onChange}
              />
              <div class="invalid-feedback">{errors.password}</div>
            </div>
            <button type="submit" className="btn btn-warning mt-2">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  clearAuthErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.auth.errors
});

export default connect(
  mapStateToProps,
  { loginUser, clearAuthErrors }
)(Login);
