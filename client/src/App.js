import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import axiosConfigToken from "./helpers/axiosConfigToken";
import jwt_decode from "jwt-decode";
import { setUser } from "./actions/authActions";

import User from "./components/user/User";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import HandleJWT from "./components/auth/HandleJWT";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/home/Home";
import About from "./components/home/About";
import CreateChallenge from "./components/challenge/CreateChallenge";
import Challenges from "./components/challenge/Challenges";
import Challenge from "./components/challenge/Challenge";
import PrivateRoute from "./components/routing/PrivateRoute";
import NotFound from "./components/routing/NotFound";

import "./App.css";

// Get auth token
const token = localStorage.getItem("jwtToken");
if (token) {
  axiosConfigToken(token);
  const decodedUser = jwt_decode(token);
  store.dispatch(setUser(decodedUser));
}

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div
          className="App"
          style={{
            minHeight: "100vh",
            position: "relative",
            paddingBottom: "100px"
          }}
        >
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/user/:id" component={User} />
              <Route exact path="/challenges" component={Challenges} />
              <Route exact path="/challenges/:id" component={Challenge} />
              <PrivateRoute
                exact
                path="/create-challenge"
                component={CreateChallenge}
              />
              <Route exact path="/jwt/:token" component={HandleJWT} />
              <Route path="/" component={NotFound} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}
