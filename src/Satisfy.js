import React, { Component } from 'react';
import './styles.css';
import { WantsBlock } from './Dictionary';
import TypingText from './components/TypingText';
import WordTypingText from './components/WordTypingText';

class Satisfy extends Component {
  constructor(props) {
    super(props);

    const wants = WantsBlock.split("|");

    this.lineRefs = [];
    this.wordByWordLineRefs = [];

    this.state = {
      lines: [],
      wordByWordLines: [],
      wants: wants,
      clock: 0,
      scrollInterval: 10,
      addLineInterval: 1000,
    };
  }

  componentDidMount() {
    this.tick();
    this.tickType();
    this.recursiveTickScroll();
    this.recursiveAddLine(this.state.addLineInterval);
  }

  tick() {
    var tick = setInterval(() => {
      this.setState((previousState) =>   ({
        clock: previousState.clock + 100,
      }));
      this.checkAnimationPhase();
    }, 100);
  }

  checkAnimationPhase() {
    if(this.state.clock === 3000) {
      console.log("three seconds elapsed");
    }

    if(this.state.clock === 15000) {
      this.setState({
        addLineInterval: 300,
      });
    }

    if(this.state.clock > 30000 && this.state.clock < 40000) {
      this.setState((previousState) => ({
        scrollInterval: previousState.scrollInterval + 10,
      }));
    }

    if(this.state.clock === 40000) {
      this.setState({
        addLineInterval: 100,
        scrollInterval: 1000000,
      });
    }

    if(this.state.clock === 40000) {
      this.setState({
        addLineInterval: 1000000,
        scrollInterval: 1000000,
      });
      this.tickAddWordTypingLine();
    }
  }

  tickType() {
    var tickType = setInterval(() => {
      this.lineRefs.forEach((lineRef) => {
        lineRef.tickType();
      });
    }, 100);
  }

  recursiveTickScroll(interval) {
    var tickScroll = setTimeout(() => {
      this.lineRefs.forEach((lineRef) => {
        lineRef.tickScroll();
      });
      this.recursiveTickScroll(this.state.scrollInterval)
    }, interval);
  }

  tickAddWordTypingLine() {
    var animation = setInterval(() => {
      // Get a random want
      let {wordByWordLines, wants} = this.state;
      const wantIndex = this.getRandomInt(wants.length);
      wordByWordLines.push(wants[wantIndex]);
      this.setState({ wordByWordLines: wordByWordLines });
    }, 50);
  }

  recursiveAddLine(interval) {
    var animation = setTimeout(() => {
      // Get a random want
      let {lines, wants} = this.state;
      const wantIndex = this.getRandomInt(wants.length);
      lines.push(wants[wantIndex]);
      this.setState({ lines: lines });
      this.recursiveAddLine(this.state.addLineInterval);
    }, interval);
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  render() {
    const { lines, wordByWordLines } = this.state;
    if (!lines) { return; }

    return (
      <div>
        <div className="">
          {lines.map((want, index) => (
            <div>
              <TypingText ref={(ref) => {this.lineRefs[index] = ref; return true;}}>
                {want}
              </TypingText>
            </div>
          ))}
          {wordByWordLines.map((want, index) => (
            <div>
              <WordTypingText ref={(ref) => {this.lineRefs[index] = ref; return true;}}>
                {want}
              </WordTypingText>
            </div>
          ))}
        </div>
        <div className="satisfaction">satisfaction</div>
      </div>
    );
  }
}

export default Satisfy;
