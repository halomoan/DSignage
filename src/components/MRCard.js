import React, { Component } from "react";
import styled from "styled-components";

const StyleWrapper = styled.div`
  .mrcard-img::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: ${(props) => (props.vacant ? "" : "")};
    box-shadow: 0.5rem 0.5rem 3rem 1px rgba(0, 0, 0, 0.5);
    border-radius: 0.8rem;
  }
`;

export default class MRCard extends Component {
  render() {
    const room = this.props.room;
    return (
      <>
        <StyleWrapper vacant={room.isVacant}>
          <div className="mrcard-container">
            <div className="mrcard">
              <div className="mrcard-img">
                {/* <img src={require(`../assets/images/mr${room.id}.png`)} /> */}
                <img
                  src={room.photo}
                  onError={(i) => (i.target.style.display = "none")}
                />
              </div>

              <div className="mrcard-desk">
                <div className="mrcard-mrname">
                  <a href="#">{room.name}</a>
                </div>
                <div className="mrcard-mrlevel">
                  <a href="#">{room.level}</a>
                  <span>{room.pax}</span>
                </div>
                <div className="mrcard-info">
                  <div className="mrcard-time">
                    <span>
                      {room.isVacant ? <span>&nbsp;</span> : room.time}
                    </span>
                  </div>
                  <div className="mrcard-owner">
                    <span>
                      {room.isVacant ? (
                        <span>&nbsp;</span>
                      ) : (
                        `Organizer: ${room.owner}`
                      )}
                    </span>
                  </div>
                  <div className="mrcard-title">
                    <span>{room.isVacant ? "V a c a n t" : room.title}</span>
                  </div>

                  {/*<p className="mrcard-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repudiandae aliquam aspernatur sunt quam accusamus et quae hic
                  quo ex aliquid velit, illo eos quidem placeat impedit officia?
                  Sed, pariatur id.
                </p>
                <a href="#" className="mrcard-cta">
                  Read More
                </a>
                */}

                  {!room.next_isVacant ? (
                    <div>
                      <div className="mrcard-next">
                        <div className="mrcard-nextbar">
                          <span>Next Meeting: </span>
                        </div>
                        <div className="mrcard-next-time">
                          <span>{room.next_time}</span>
                        </div>
                        <div className="mrcard-next-owner">
                          <span>{`Organizer: ${room.next_owner}`}</span>
                        </div>
                        <div className="mrcard-next-title">
                          <span>{room.next_title}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="mrcard-next">
                        <div className="mrcard-nextbar">
                          <span>Next Meeting: </span>
                        </div>
                        <div className="mrcard-next-time">
                          <span></span>
                        </div>
                        <div className="mrcard-next-owner">
                          <span></span>
                        </div>
                        <br />
                        <div className="mrcard-next-title">
                          <span>V A C A N T</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* ./ mrcard-info */}
          </div>
        </StyleWrapper>
      </>
    );
  }
}
