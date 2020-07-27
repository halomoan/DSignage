import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../assets/images/uol-logo.JPG";
import ShowDateTime from "./ShowDateTime";

function NavBar() {
  return (
    <div>
      <div className="row mt-2">
        <div className="col-8">
          <div className="d-flex flex-row bd-highlight mb-2">
            <div>
              <img
                className="navlogo"
                src={Logo}
                width="100%"
                height="100%"
                alt="Company Logo"
              />
            </div>
            <div className="navtext">
              <span className="navtitle"> MEETING ROOMS </span>
              <span className="navsubtitle"> Have a good day</span>
            </div>
          </div>
        </div>
        <div className="col-4">
          <ShowDateTime></ShowDateTime>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
