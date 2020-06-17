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
          <i className="fas fa-arrow-up" onClick={this.handleClick} id="1"></i>
          <div className="JokeVotes" style={{"--border": this.getColor()}}> {this.props.votes} </div>
          <i
            className="fas fa-arrow-down"
            id="-1"
            onClick={this.handleClick}></i>
        </div>
        <div className="JokeText">{this.props.text}</div>
        <div className="JokeEmoji">
          <i className="em em-neutral_face" aria-label="NEUTRAL FACE"></i>
        </div>
      </li>
    );
  }
}
