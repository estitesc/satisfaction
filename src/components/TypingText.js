import React from 'react';
import '../styles.css';

export default class TypingText extends React.Component {
  constructor(props) {
    super(props);

    const randX = props.winWidth - this.getRandomInt(2 * props.winWidth);
    const randY = this.getRandomInt(props.winHeight);
    const randRotation = this.getRandomInt(360);
    const randRotation2 = this.getRandomInt(90);
    const randRotation3 = this.getRandomInt(180);
    let randTypingSpeed = this.getRandomInt(300);
    randTypingSpeed = randTypingSpeed < 40 ? 40 : randTypingSpeed;
    const randFontSize = 10 + this.getRandomInt(20);

    this.state = { 
      currChar: 0,
      text: props.children || "default",
      animating: false,
      xPos: randX,
      yPos: randY,
      rot: randRotation,
      rotY: randRotation2,
      rotZ: randRotation3,
      fontSize: randFontSize,
      xTrans: 0,
      speed: randTypingSpeed,
    };
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  componentDidMount() {
    // this.animate();
  }

  tickScroll() {
    this.setState(previousState => (
      { xTrans: previousState.xTrans - 0.1 }
    ));
  }

  tickType() {
    if(this.state.currChar >= this.state.text.length) {
      return;
    }
    this.setState(previousState => (
      { currChar: previousState.currChar + 1 }
    ));
  }

  animate() {
    // Don't animate if we are already animating, should stop in between each time.
    if(this.state.animating) { return }

    this.setState({animating: true});

    var animation = setInterval(() => {
      this.setState(previousState => (
        { currChar: previousState.currChar + 1 }
      ));
      
      if(this.state.currChar >= this.state.text.length) {
        clearInterval(animation);
        this.setState({animating: false});
      }
    }, this.state.speed);
  }

  render() {
    var overallString = this.state.text
    var overallStringLength = this.state.text.length

    var visibleString = "";
    if(overallString.substring(0, this.state.currChar).length > 0) {
      visibleString = overallString.substring(0, this.state.currChar);
    }

    var invisibleString = "";
    if(this.state.currChar < overallStringLength) {
      invisibleString = overallString.substring(this.state.currChar, overallStringLength);
    }

    const visibleText = {
      position: 'absolute',
      color: '#000',
      left: this.state.xPos,
      top: this.state.yPos,
      fontSize: `${this.state.fontSize}px`,
      transform: `
        perspective(400px) 
        rotate(${this.state.rot}deg)
        rotateY(${this.state.rotY}deg) 
        rotateZ(${this.state.rotZ}deg)
        translateX(${this.state.xTrans}px)
      `,
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
