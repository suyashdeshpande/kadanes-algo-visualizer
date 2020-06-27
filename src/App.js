import React from "react";
import DownArrow from "./svg/down-arrow.svg";
import "./App.css";

class App extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      start: -1,
      end: -1,
      running: false,
    };
  }

  arr = [2, -1, 0, -9, 10, 15, 2];
  animate = () => {
    if (this.state.running) return;

    this.setState({ running: true });
    const { animations, maxPair } = this.maxSubArraySum(this.arr);

    let i = 0;
    let timer = setInterval(() => {
      if (i >= animations.length) {
        clearInterval(timer);
        this.setState({
          start: maxPair[0],
          end: maxPair[1],
          running: false,
        });
        return;
      }
      this.setState({
        start: animations[i][0],
        end: animations[i][1],
      });
      i++;
    }, 800);
  };

  maxSubArraySum = (arr) => {
    let animations = [];
    let maxPair = [];
    let length = arr.length;

    if (!length) return animations;

    let prev = 0;
    let answer = arr[0];
    let currentSum = arr[0];

    animations.push([0, 0]);

    for (let i = 1; i < length; i++) {
      if (arr[i] > currentSum + arr[i]) {
        prev = i;
      }
      currentSum = Math.max(arr[i], currentSum + arr[i]);
      animations.push([prev, i]);
      if (currentSum > answer) {
        answer = currentSum;
        maxPair = [prev, i];
      }
      answer = Math.max(answer, currentSum);
    }

    return { animations, maxPair };
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          {this.arr.map((x, index) => {
            let classes = "element";
            if (index >= this.state.start && index <= this.state.end) {
              if (!this.state.running) classes += " answer";
              else classes += " highlight";
            }
            return (
              <div className="inner-container">
                {index === this.state.start && index === this.state.end && (
                  <div class="pointer">
                    S/E
                    <img src={DownArrow} alt="start index" />
                  </div>
                )}
                {index === this.state.start && index !== this.state.end && (
                  <div class="pointer">
                    Start
                    <img src={DownArrow} alt="start index" />
                  </div>
                )}
                {index === this.state.end && index !== this.state.start && (
                  <div class="pointer">
                    End
                    <img src={DownArrow} alt="end index" />
                  </div>
                )}
                <div className={classes} key={index}>
                  {x}
                </div>
              </div>
            );
          })}
        </div>
        <div
          onClick={this.animate}
          role="button"
          tabIndex="0"
          className={`button` + (this.state.running ? ` disabled` : "")}
        >
          <span>Visualise</span>
        </div>
      </div>
    );
  }
}

export default App;
