import React from "react";
import "./Spinner.css";

export default function Spinner(props) {
  const { spinnerStyles } = props;
  const styles = {
    width: "20vmin",
    height: "20vmin",
    margin: "auto",
    marginTop: "2em",
    ...spinnerStyles
  };

  return (
    <div className="spinner-container" style={styles}>
      <div>
        <div>
          <div>
            <div>
              <div>
                <div />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
