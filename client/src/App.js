import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Tester from "./components/tester/Tester";
import CreateChallenge from "./components/challenge/CreateChallenge";

export default function App() {
  return (
    <Router>
      <div
        className="App"
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Header />
        <div className="container mt-2" style={{ flex: "1 0 auto" }}>
          <Route exact path="/" component={Tester} />
          <Route exact path="/create-challenge" component={CreateChallenge} />
        </div>
        <Footer />
      </div>
    </Router>
  );
}
