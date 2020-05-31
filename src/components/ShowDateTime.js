import React, { Component } from "react";
import Moment from "react-moment";

export default class ShowDateTime extends Component {
  constructor(props) {
    super(props);
    this.state = { time: new Date(), date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      time: new Date(),
    });
  }

  render() {
    return (
      <div>
        <div className="text-right">
          <h1>
            <Moment format="dddd, MMM Do YYYY">{this.state.date}</Moment>
          </h1>
          <h2>{this.state.time.toLocaleTimeString()}</h2>
        </div>
      </div>
    );
  }
}
