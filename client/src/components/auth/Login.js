import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/authActions";

function Login(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

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
                className="form-control"
                value={formData.email}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                value={formData.password}
                onChange={onChange}
              />
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
  loginUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { loginUser }
)(Login);
