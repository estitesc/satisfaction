import React, { Component } from 'react';
import '../styles.css';
import TypingText from '../components/TypingText';
import WordTypingText from '../components/WordTypingText';

class Satisfy extends Component {
  constructor(props) {
    super(props);

    this.lineRefs = [];
    this.wordByWordLineRefs = [];

    this.state = {
      lines: [],
      wordByWordLines: [],
      wants: this.props.wantsArray,
      clock: 0,
      scrollInterval: 10,
      addLineInterval: 1000,
      initialWindowWidth: window.innerWidth,
      initialWindowHeight: window.innerHeight,
      showSatisfaction: false,
    };
  }

  componentDidMount() {
    this.tick();
    this.tickType();
    this.recursiveTickScroll();
    this.recursiveAddLine(this.state.addLineInterval);
  }

  componentWillUnmount() {
    clearInterval(this.tick);
    clearInterval(this.tickType);
    clearInterval(this.tickScroll);
    clearInterval(this.addWordTypingLine);

    clearTimeout(this.animation);
  }

  tick() {
    this.tick = setInterval(() => {
      this.setState((previousState) =>   ({
        clock: previousState.clock + 100,
      }));
      this.checkAnimationPhase();
    }, 100);
  }

  checkAnimationPhase() {
    if(this.state.clock === 15000) {
      this.setState({
        addLineInterval: 300,
      });
    }

    if(this.state.clock > 40000 && this.state.clock < 50000) {
      this.setState((previousState) => ({
        scrollInterval: previousState.scrollInterval + 10,
      }));
    }

    if(this.state.clock === 50000) {
      this.setState({
        addLineInterval: 100,
        scrollInterval: 1000000,
      });
    }

    if(this.state.clock === 65000) {
      this.setState({
        addLineInterval: 1000000,
      });
      this.tickAddWordTypingLine();
    }

    if(this.state.clock === 75000) {
      this.setState({
        showSatisfaction: true,
      });
    }

    if(this.state.clock === 100000) {
      clearInterval(this.state.addWordTypingLine);
    }
  }

  tickType() {
    this.tickType = setInterval(() => {
      this.lineRefs.forEach((lineRef) => {
        lineRef.tickType();
      });
    }, 100);
  }

  recursiveTickScroll(interval) {
    this.tickScroll = setTimeout(() => {
      this.lineRefs.forEach((lineRef) => {
        lineRef.tickScroll();
      });
      this.recursiveTickScroll(this.state.scrollInterval)
    }, interval);
  }

  tickAddWordTypingLine() {
    this.addWordTypingLine = setInterval(() => {
      // Get a random want
      let {wordByWordLines, wants} = this.state;
      const wantIndex = this.getRandomInt(wants.length);
      wordByWordLines.push(wants[wantIndex]);
      this.setState({ wordByWordLines: wordByWordLines });
    }, 70);
  }

  recursiveAddLine(interval) {
    this.animation = setTimeout(() => {
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
    const { lines, wordByWordLines, initialWindowHeight, initialWindowWidth, showSatisfaction } = this.state;
    if (!lines) { return; }

    const width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    const isDesktop = width >= 768;

    return (
      <div>
        <div className="">
          {lines.map((want, index) => (
            <div key={index}>
              <TypingText winWidth={initialWindowWidth} winHeight={initialWindowHeight} ref={(ref) => {this.lineRefs[index] = ref; return true;}}>
                {want}
              </TypingText>
            </div>
          ))}
          {wordByWordLines.map((want, index) => (
            <div key={index}>
              <WordTypingText winWidth={initialWindowWidth} winHeight={initialWindowHeight} ref={(ref) => {this.lineRefs[index] = ref; return true;}}>
                {want}
              </WordTypingText>
            </div>
          ))}
        </div>
        {
          showSatisfaction && isDesktop ? <div className="satisfaction">satisfaction</div> : null
        }
        {
          this.props.usingUserWants ?
          <div className="wants-button-container">
            <button className="want-submit-button" onClick={() => (this.props.onSetCurrentView('wants'))}>
              see my wants
            </button>
          </div>
          :
          <div className="wants-button-container">
            <button className="want-submit-button" onClick={() => (this.props.onSetCurrentView('prompt'))}>
              ok, my turn now
            </button>
          </div>
        }
      </div>
    );
  }
}

export default Satisfy;
