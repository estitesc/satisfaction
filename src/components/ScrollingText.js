import React from 'react';
import '../styles.css';

export default class TypingText extends React.Component {
  constructor(props) {
    super(props);

    const randX = this.getRandomInt(window.innerWidth);
    const randY = this.getRandomInt(window.innerHeight);
    const randRotation = this.getRandomInt(360);
    const randRotation2 = this.getRandomInt(90);
    const randRotation3 = this.getRandomInt(180);

    this.state = { 
      currChar: 0,
      text: props.children || "default",
      animating: false,
      xPos: randX,
      yPos: randY,
      rot: randRotation,
      rotY: randRotation2,
      rotZ: randRotation3,
      xTrans: 0,
    };
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
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
    }, 90);
  }

  tick() {
    // Hacky minus one here to account for the additional word and prevent "jiggling"
    // if(this.state.currWord >= this.state.words.length - 1) {
    //   return;
    // }

    this.setState(previousState => (
      { xTrans: previousState.xTrans - 1 }
    ));
  }


  render() {
    const { text } = this.state;

    const visibleText = {
      position: 'absolute',
      color: '#000',
      left: this.state.xPos,
      top: this.state.yPos,
      transform: `
        perspective(400px) 
        rotate(${this.state.rot}deg)
        rotateY(${this.state.rotY}deg) 
        rotateZ(${this.state.rotZ}deg)
        translateX(${this.state.xTrans}px)
      `,
    };

    return (
      <span style={visibleText}>
        {text}
      </span>
    );
  }
}
