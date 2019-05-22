import React from "react";
import Tester from "../tester/Tester";

export default function Home() {
  return (
    <div className="row">
      <div className="col-md-8 m-auto">
        <h3 className="page-title mb-4">Welcome to RegexXP</h3>
        <Tester />
      </div>
    </div>
  );
}
