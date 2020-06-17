import React, { Component } from "react";
import "./Joke.css";

export default class Joke extends Component {
  handleClick = e => {
    const delta = parseInt(e.target.id, 10);
    this.props.handleVote(this.props.id, delta);
  };

  getColor() {
    if (this.props.votes >= 15) return "#4caf50";
    else if (this.props.votes >= 12) return "#8bc34a";
    else if (this.props.votes >= 9) return "#cddc39";
    else if (this.props.votes >= 6) return "#ffeb3b";
    else if (this.props.votes >= 3) return "#ffc102";
    else if (this.props.votes >= 0) return "#ff9800";
    else return "#f44336";
  }

  render() {
    return (
      <li className="Joke">
        <div className="JokeButtons">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            id={1}
            onClick={this.handleClick}
            className="feather feather-arrow-up"> 
            <line x1="12" y1="19" x2="12" y2="5" id="1"></line>
            <polyline points="5 12 12 5 19 12" id="1"></polyline>
          </svg>
          <div className="JokeVotes" style={{ "--border": this.getColor() }}>
            {this.props.votes}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={this.handleClick}
            id={-1}
            className="feather feather-arrow-down">
            <line x1="12" y1="5" x2="12" y2="19" id="-1"></line>
            <polyline points="19 12 12 19 5 12" id="-1"></polyline>
          </svg>
        </div>
        <div className="JokeText">{this.props.text}</div>
        <div className="JokeEmoji">
          <i className="em em-neutral_face" aria-label="NEUTRAL FACE"></i>
        </div>
      </li>
    );
  }
}
