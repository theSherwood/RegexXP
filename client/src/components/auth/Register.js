import React from "react";

export default function Register() {
  return (
    <div className="container">
      <div className="card">
        <div className="card-content">
          <div className="row">
            <form className="col s12" action="/auth/signup" method="post">
              <div className="row">
                <div className="input-field col s6">
                  <input name="display-name" type="text" className="validate" />
                  <label for="display-name">Display Name</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input name="email" type="email" className="validate" />
                  <label for="email">Email</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input name="password" type="password" className="validate" />
                  <label for="password">Password</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    name="password2"
                    type="password"
                    className="validate"
                  />
                  <label for="password2">Confirm Password</label>
                </div>
              </div>
              <input type="submit" value="Signup" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
