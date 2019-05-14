import React, { Fragment } from "react";
import Tester from "../tester/Tester";

export default function Home() {
  return (
    <Fragment>
      <h3>Welcome to RegexXP</h3>
      <Tester />
      <div className="row">
        <div className="col-md-8 m-auto">
          <p>
            RegexXP is a learning tool for javascript developers trying to
            improve their regular expression skills. Put your abilities to the
            test, solve challenges, see the solutions that others have made, and
            create regular expression challenges of your own!
          </p>
        </div>
      </div>
    </Fragment>
  );
}
