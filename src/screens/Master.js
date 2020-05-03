import React from 'react';
import Satisfy from './Satisfy';
import WhatDoYouWant from './WhatDoYouWant';
import Wants from './Wants';
import '../styles.css';

export default class Master extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentView: 'prompt',
      userWants: '',
      wantsArray: [],
      usingUserWants: true,
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

  onSetUsingUserWants(usingUserWants) {
    this.setState({
      usingUserWants: usingUserWants,
    })
  }

  render() {
    return (
      <div>
        {
          this.state.currentView === 'prompt' ?
          <WhatDoYouWant
            userWants={this.state.userWants}
            onSetUserWants={(wants) => (this.onSetUserWants(wants))}
            onSetWantsArray={(wantsArray) => (this.onSetWantsArray(wantsArray))}
            onSetCurrentView={(view) => (this.onSetCurrentView(view))}
            onSetUsingUserWants={(usingUserWants) => (this.onSetUsingUserWants(usingUserWants))}
          />
          : null 
        }
        {
          this.state.currentView === 'satisfy' ?
          <Satisfy 
            wantsArray={this.state.wantsArray}
            onSetCurrentView={(view) => (this.onSetCurrentView(view))}
            usingUserWants={this.state.usingUserWants}
          />
          : null 
        }
        {
          this.state.currentView === 'wants' ?
          <Wants wantsArray={this.state.wantsArray} onSetCurrentView={(view) => (this.onSetCurrentView(view))} />
          : null 
        }
      </div>
    );
  }
}
