import React from 'react';
import '../styles.css';

// Similar to typing text except that this one goes word by word, in effect causing things to print faster.
export default class WordTypingText extends React.Component {
  constructor(props) {
    super(props);

    const randX = window.innerWidth - this.getRandomInt(2 * window.innerWidth);
    const randY = this.getRandomInt(window.innerHeight);
    const randRotation = this.getRandomInt(360);
    const randRotation2 = this.getRandomInt(90);
    const randRotation3 = this.getRandomInt(180);
    let randTypingSpeed = this.getRandomInt(300);
    randTypingSpeed = randTypingSpeed < 40 ? 40 : randTypingSpeed;

    // Adding the hacky last word and then only iterating until length-1 has the desired effect of causing no re-adjustment of the text after the last line is printed, something that for whatever reason couldn't do with 
    var words = this.props.children.concat(" hacky").split(" ");

    this.state = { 
      currWord: 0,
      text: props.children || "default",
      animating: false,
      xPos: randX,
      yPos: randY,
      rot: randRotation,
      rotY: randRotation2,
      rotZ: randRotation3,
      // speed: randTypingSpeed,
      words: words,
      speed: 400,
    };
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  componentDidMount() {
    // this.animate();
  }

  tickScroll() {
    //does nothing
  }

  tickType() {
    // Hacky minus one here to account for the additional word and prevent "jiggling"
    if(this.state.currWord >= this.state.words.length - 1) {
      return;
    }

    this.setState(previousState => (
      { currWord: previousState.currWord + 1 }
    ));
  }

  animate() {
    this.setState({animating: true});

    var animation = setInterval(() => {
      if(this.state.currWord >= this.state.words.length - 1) {
        clearInterval(animation);
        return;
      }

      this.setState(previousState => (
        { currWord: previousState.currWord + 1 }
      ));
    }, this.state.speed);
  }

  render() {
    const {words} = this.state;

    var overallString = this.state.text;
    var overallStringLength = this.state.text.length;

    var visibleString = "";
    if(this.state.currWord > 0) {
      const visibleWords = words.slice(0, this.state.currWord);
      visibleString = visibleWords.join(' ');
    }

    var invisibleString = "";
    if(this.state.currWord < words.length) {
      const invisibleWords = words.slice(this.state.currWord, words.length);
      invisibleString = invisibleWords.join(' ');
    }

    const visibleText = {
      position: 'absolute',
      color: '#000',
      fontSize: '24px',
      left: this.state.xPos,
      top: this.state.yPos,
      transform: `perspective(400px) rotate(${this.state.rot}deg) rotateY(${this.state.rotY}deg) rotateZ(${this.state.rotZ}deg)`,
    };
    const invisibleText = {
      visibility: 'hidden',
    };

    return (
      <span style={visibleText}>
        {visibleString}
        <span style={invisibleText}>
          {invisibleString}
        </span>
      </span>
    );
  }
}
