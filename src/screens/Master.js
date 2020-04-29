import React from 'react';
import Satisfy from './Satisfy';
import WhatDoYouWant from './WhatDoYouWant';
import '../styles.css';

export default class Master extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentView: 'prompt',
      userWants: '',
      wantsArray: [],
    };
  }

  onSetCurrentView(view) {
    this.setState({
      currentView: view,
    })
  }

  onSetUserWants(wants) {
    this.setState({
      userWants: wants,
    })
  }

  onSetWantsArray(wantsArray) {
    this.setState({
      wantsArray: wantsArray,
    })
  } 

  render() {
    return (
      this.state.currentView === 'prompt' ?
      <WhatDoYouWant
        userWants={this.state.userWants}
        onSetUserWants={(wants) => (this.onSetUserWants(wants))}
        onSetWantsArray={(wantsArray) => (this.onSetWantsArray(wantsArray))}
        onSetCurrentView={(view) => (this.onSetCurrentView(view))}
      />
      :
      <Satisfy wantsArray={this.state.wantsArray} />
    );
  }
}
