import React from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar";
import Cards from "./components/Cards";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <div className="App">
      <Container fluid>
        <NavBar />
        <Cards />
      </Container>
    </div>
  );
}

export default App;
