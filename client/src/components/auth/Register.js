import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

function Register(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
    handle: ""
  });

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    props.registerUser(formData);
  };

  const { email, password, password2, handle } = formData;
  return (
    <div className="container">
      <div className="card" style={{ backgroundColor: "#35a7ff" }}>
        <div className="card-content">
          <div className="container p-4">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="handle">Display Name/Handle</label>
                <input
                  name="handle"
                  type="text"
                  className="form-control"
                  value={handle}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password2">Confirm Password</label>
                <input
                  name="password2"
                  type="password"
                  className="form-control"
                  value={password2}
                  onChange={onChange}
                />
              </div>
              <button type="submit" className="btn btn-warning mt-2">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { registerUser }
)(Register);
