import React, { Component } from "react";
import MRCard from "./MRCard";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import moment from "moment";
import { mrConfig } from "../utils/config";

export default class Cards extends Component {
  constructor(props) {
    super();
    this.state = {
      rooms: [
        // {
        //   id: "1",
        //   name: "Regency Room",
        //   level: "#33-00",
        //   pax: "12 pax",
        //   photo: "http://localhost/server/public/img/mr0.png",
        //   isVacant: false,
        //   date: "Monday April 20, 2020",
        //   owner: "Halomoan Kasim",
        //   time: "03:00 PM - 04:00 PM",
        //   title:
        //     "Very Important Meeting With Vendor.Super Super Long of Description ",
        //   next_isVacant: false,
        //   next_owner: "Halomoan Kasim",
        //   next_time: "03:00 PM - 04:00 PM",
        //   next_title: "Very Important Meeting With Vendor",
        // },
      ],
    };
  }

  retrieveMR() {
    const srvaddr = mrConfig.srvaddr;

    //let url = srvaddr + "/index.php/excsvr_json/calendar_get_list/uol";
    const url = mrConfig.urlMR;

    axios.get(url).then((res) => {
      const mrooms = res.data;

      let sTime, eTime, next_sTime, next_eTime;
      const today = moment();

      let rooms = mrooms.map((data, index) => {
        let room = {};
        let curr_meeting = null;
        let next_meeting = null;
        let arr = data.name.split("#");
        arr[1] = arr[1] == null ? "" : arr[1];

        room.id = index;
        room.name = arr[0];
        room.level = arr[1];

        room.photo = srvaddr + "/public/img/" + data.photo;

        if (data.pax) {
          room.pax = data.pax + " Pax";
        }

        if (data.event) {
          if (data.event.length > 1) {
            curr_meeting = data.event[0];
            next_meeting = data.event[1];
          } else {
            curr_meeting = data.event[0];
          }

          sTime = moment(today.format("YYYY-MM-DD") + " " + curr_meeting.start);
          eTime = moment(today.format("YYYY-MM-DD") + " " + curr_meeting.end);

          if (!this.isCurrentEvent(today, sTime, eTime)) {
            if (this.isFutureEvent(today, sTime)) {
              next_meeting = curr_meeting;
            }
            curr_meeting = null;
          }
        }

        if (curr_meeting) {
          room.isVacant = false;
          room.time = sTime.format("hh:mm A") + " - " + eTime.format("hh:mm A");
          room.owner = curr_meeting.organizer;
          room.title = curr_meeting.subject;
        } else {
          room.isVacant = true;
        }

        if (next_meeting) {
          next_sTime = moment(
            today.format("YYYY-MM-DD") + " " + next_meeting.start
          );
          next_eTime = moment(
            today.format("YYYY-MM-DD") + " " + next_meeting.end
          );

          room.next_isVacant = false;
          room.next_time =
            next_sTime.format("hh:mm A") + " - " + next_eTime.format("hh:mm A");
          room.next_owner = next_meeting.organizer;
          room.next_title = next_meeting.subject;
        } else {
          room.next_isVacant = true;
        }

        return room;
      });
      this.setState({ rooms });
    });
  }

  componentDidMount() {
    this.retrieveMR();
    this.MRTimer = setInterval(() => {
      this.retrieveMR();
    }, 5000);
  } //componentDidMount

  componentWillUnmount() {
    clearInterval(this.MRTimer);
  }

  isCurrentEvent(now, sTime, eTime) {
    if (sTime.isBefore(now) && eTime.isAfter(now)) {
      return true;
    } else {
      return false;
    }
  }

  isFutureEvent(now, sTime) {
    if (sTime.isAfter(now)) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    let content = [];
    let items = [];

    const rooms = this.state.rooms;
    rooms.forEach((room, i) => {
      if ((i + 1) % 2 === 0 && items.length > 0) {
        items.push(
          <Col key={room.id}>
            <MRCard key={room.id} room={room} />
          </Col>
        );
        content.push(<Row key={room.id}>{items}</Row>);
        items = [];
      } else {
        items.push(
          <Col key={room.id}>
            <MRCard room={room} />
          </Col>
        );
      }
    });

    if (items.length === 1) {
      items.push(<Col key={99}></Col>);
      content.push(<Row key={99}>{items}</Row>);
    } else if (items.length === 2) {
      content.push(<Row key={99}>{items}</Row>);
    }

    return <div>{content}</div>;
  }
}

//PropTypes
MRCard.propTypes = {
  room: PropTypes.object.isRequired,
};
