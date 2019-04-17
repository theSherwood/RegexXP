import React from "react";

export default function Login() {
  return (
    <div className="container">
      <div className="card">
        <div className="card-content">
          <div className="row">
            <form className="col s12" action="/auth/login" method="post">
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
              <input type="submit" value="Login" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
