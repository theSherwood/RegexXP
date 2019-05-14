import React from "react";

export default function Footer() {
  return (
    <footer
      className="bg-dark p-2 text-center"
      // style={{ flex: "0 0 auto" }}
      style={{ position: "absolute", bottom: "0px", left: "0px", right: "0px" }}
    >
      Copyright &copy; 2019 Adam Sherwood
    </footer>
  );
}
