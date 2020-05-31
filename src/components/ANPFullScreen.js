import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import Fullscreen from "react-full-screen";

export default class ANPFullScreen extends Component {
  constructor(props) {
    super();

    this.state = {
      isFull: false,
      imageName: null,
      srcImage: "/img/mr0.png",
    };
  }

  componentDidMount() {
    const server_url = "http://localhost/server/";
    const url = server_url + "/index.php/excsvr_json/calendar_get_item/99";
    const mr_img_url = server_url + "/public/img/";
    const today = moment();

    axios.get(url).then((res) => {
      const anpevents = res.data;
      const anpevent = anpevents.map((data, index) => {
        if (data.event && data.event.length > 0) {
          const curr_event = data.event[0];
          const sTime = moment(
            today.format("YYYY-MM-DD") + " " + curr_event.start
          );
          const eTime = moment(
            today.format("YYYY-MM-DD") + " " + curr_event.end
          );
          if (this.isCurrentEvent(today, sTime, eTime)) {
            if (curr_event.attachment != "No attachments found") {
              if (this.state.imageName != curr_event.attachment) {
                this.setState({
                  imageName: curr_event.attachment,
                  srcImage: mr_img_url + curr_event.attachment,
                  isFull: true,
                });
              }
            } else {
              this.setState({
                imageName: null,
                srcImage: "",
                isFull: false,
              });
            }
          } else {
            this.setState({
              imageName: null,
              srcImage: "",
              isFull: false,
            });
          }
        }
      });
    });
  }

  isCurrentEvent(now, sTime, eTime) {
    if (sTime.isBefore(now) && eTime.isAfter(now)) {
      return true;
    } else {
      return false;
    }
  }
  goFull = () => {
    this.setState({ isFull: true });
  };

  render() {
    const showFull = this.state.isFull;

    return (
      <div>
        {/* <button onClick={this.goFull}>Go Fullscreen</button> */}
        <Fullscreen
          enabled={this.state.isFull}
          onChange={(isFull) => {
            this.setState({ isFull });
          }}
        >
          <div style={{ display: showFull ? "block" : "none" }}>
            <img
              src={this.state.srcImage}
              width="1080"
              height="1920"
              alt="anp"
            />
          </div>
        </Fullscreen>
      </div>
    );
  }
}
