import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import { mrConfig } from "../utils/config";

export default class ANPFullScreen extends Component {
  constructor(props) {
    super();

    this.state = {
      isFull: false,
      imageName: null,
      srcImage: "",
    };
  }

  retrieveANP() {
    //const srvaddr = "http://localhost/server/";
    //const url = srvaddr + "/index.php/excsvr_json/calendar_get_item/99";
    const srvaddr = mrConfig.srvaddr;
    const url = mrConfig.urlANP;

    const mr_img_url = srvaddr + "/public/img/";
    const today = moment();

    axios.get(url).then((res) => {
      const anpevents = res.data;
      anpevents.map((data, index) => {
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

  componentDidMount() {
    this.ANPTimer = setInterval(() => {
      //console.log("anp");
      this.retrieveANP();
    }, 12000);
  }

  componentWillUnmount() {
    clearInterval(this.ANPTimer);
  }

  isCurrentEvent(now, sTime, eTime) {
    if (sTime.isBefore(now) && eTime.isAfter(now)) {
      return true;
    } else {
      return false;
    }
  }
  // goFull = () => {
  //   this.setState({ isFull: true });
  // };

  render() {
    const showFull = this.state.isFull;
    const fullStyle = {
      height: "100%",
      width: "100%",
      overflow: "hidden",
      position: "fixed",
      top: "0px",
      left: "0px",
      zIndex: 1,
      display: "block",
    };
    const hideStyle = {
      display: "none",
    };

    return (
      <div>
        <div id="fullimage" style={showFull ? fullStyle : hideStyle}>
          <img src={this.state.srcImage} alt="anp" />
        </div>
      </div>
    );
  }
}
