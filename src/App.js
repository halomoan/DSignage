import React from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar";
import Cards from "./components/Cards";
import Container from "react-bootstrap/Container";
import ANPFullScreen from "./components/ANPFullScreen";

function App() {
  return (
    <div className="App">
      <Container fluid>
        <NavBar />
        <Cards />
        <ANPFullScreen></ANPFullScreen>
      </Container>
    </div>
  );
}

export default App;
