import React, { Component } from "react";
import ScrollBar from "./ScrollBar";
import DadJokes from "./DadJokes";
import './App.css';
// import Loader from "./Loader";
// import LikeButton from "./LikeButton";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <ScrollBar />
        <DadJokes />
      </div>
    );
  }
}
