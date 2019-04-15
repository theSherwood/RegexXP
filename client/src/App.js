import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Tester from "./components/tester/Tester";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route exact path="/" component={Tester} />
        <Footer />
      </div>
    </Router>
  );
}
