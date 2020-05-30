import React from "react";
import styled from "styled-components";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../assets/images/uol-logo.JPG";
import ShowDateTime from "./ShowDateTime";

const Styles = styled.div`
  .title {
    color: black;
    margin-left: 10px;
    font-family: Arial, Helvetica, sans-serif;

    font-size: 70px;
    font-weight: bold;
    line-height: 1;
    text-shadow: 3px 3px rgba(103, 128, 159, 0.5);
  }

  .subtitle {
    font-size: 20px;
    margin-left: 10px;
    font-style: oblique;
  }
  .logo-placeholder {
    display: inline-block;
    width: 240px;
    height: 100px;
  }
  .logo {
  }
  .navbar-brand {
    padding: 0px;
  }
`;

function NavBar() {
  return (
    <Styles>
      <Navbar bg="white" variant="light" expand="lg">
        <Navbar.Brand href="#">
          <div className="logo-placeholder">
            <img
              className="logo"
              src={Logo}
              width="100%"
              height="100%"
              alt="Company Logo"
            />
          </div>{" "}
          <div className="d-inline-flex flex-column">
            <span className="title"> MEETING ROOMS </span>
            <span className="subtitle"> Have a good day</span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <ShowDateTime></ShowDateTime>
        </Navbar.Collapse>
      </Navbar>
    </Styles>
  );
}

export default NavBar;
