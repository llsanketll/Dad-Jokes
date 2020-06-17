import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";
import Loader from "./Loader";
import "./DadJokes.css";
import ScrollBar from "./ScrollBar";

const JOKE_URL = `https://icanhazdadjoke.com/`;

export default class DadJokes extends Component {
  static defaultProps = {
    maxJokes: 10,
  };

  constructor(props) {
    super(props);

    this.state = {
      jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
      isLoaded: false,
    };
    this.seenJokes = new Set(this.state.jokes.map(j => j.id));
  }

  componentDidMount() {
    if (this.state.jokes.length === 0) {
      this.getJokes();
    } else {
      this.setState({ isLoaded: true });
    }
  }

  getJokes = async () => {
    let jokes = [];
    try {
      while (jokes.length < this.props.maxJokes) {
        const response = await axios.get(JOKE_URL, {
          headers: { Accept: "application/json" },
        });
        const newJoke = response.data;
        if (!this.seenJokes.has(newJoke.id)) {
          jokes.push({ text: newJoke.joke, id: newJoke.id, votes: 0 });
          this.seenJokes.add(newJoke.id);
        }
      }
      this.setState(
        st => ({
          jokes: [...st.jokes, ...jokes],
          isLoaded: true,
        }),
        () => {
          window.localStorage.setItem("jokes", JSON.stringify(jokes));
        }
      );
    } catch (error) {
      alert(error);
    }
  };

  handleVote = (id, delta) => {
    const newJokes = this.state.jokes.map(joke =>
      joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
    );
    this.setState({ jokes: newJokes }, () => {
      window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes));
    });
  };

  handleClick = () => {
    if (this.state.isLoaded) {
      this.getJokes();
      this.setState({ isLoaded: false });
    }
  };

  render() {
    const sortedJokes = this.state.jokes.sort((a, b) => b.votes - a.votes);
    const jokes = sortedJokes.map(joke => (
      <Joke
        key={joke.id}
        id={joke.id}
        votes={joke.votes}
        text={joke.text}
        handleVote={this.handleVote}
      />
    ));

    return (
      <div className="DadJokes">
        <aside className="jokeAside">
          <h1>
            <span>Dad</span> Jokes
          </h1>
          <img
            src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
            alt="emoji"
          />
          <button onClick={this.handleClick} className="jokeButton">
            New Joke
          </button>
        </aside>
        <ul className="DadList">
          <ScrollBar />
          {this.state.isLoaded ? jokes : <Loader />}
        </ul>
      </div>
    );
  }
}
