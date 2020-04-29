import React from 'react';
import FlashMessage from './FlashMessage';
import { WantsBlock } from '../Dictionary';
import '../styles.css';

export default class WhatDoYouWant extends React.Component {
  constructor(props) {
    super(props);
    // 
    this.state = {
      showFlashMessage: false,
      flashMessage: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNoYouGo = this.handleNoYouGo.bind(this);
  }

  handleChange(event) {
    this.props.onSetUserWants(event.target.value);
  }

  handleSubmit() {
    // First check if the submitted text creates enough wants when split along new lines and periods.
    const newLineSplits = this.props.userWants.split("\n");
    let doubleSplits = [];
    doubleSplits = newLineSplits.map((split) => {
      return split.split(". ");
    });
    const doubleFlat = doubleSplits.flat();
    const doubleFlatFilt = doubleFlat.filter(function (want) {
      return want.length > 3;
    });

    if(doubleFlatFilt.length > 10) {
      this.setState({
        flashMessage: 'thank you, now you can watch your desires interacting.',
        showFlashMessage: true,
      });
      this.props.onSetWantsArray(doubleFlatFilt);

      setTimeout(() => {
        this.props.onSetCurrentView('satisfy');
      }, 4000);
    } else {
      // Not long enough ask them for more wants!
      this.setState({
        flashMessage: "Come on, I'm sure you want more than that.",
        showFlashMessage: true,
      });
  
      setTimeout(() => {
        this.setState({
          showFlashMessage: false,
        });
      }, 2000);
    }
  }

  handleNoYouGo() {
    this.setState({
      flashMessage: "Ok, I'll tell you what I want, but be warned, the truth contains a lot of sexual content.",
      showFlashMessage: true,
    });
    this.props.onSetWantsArray(WantsBlock.split("|"));

    setTimeout(() => {
      this.props.onSetCurrentView('satisfy');
    }, 5000);
  }

  render() {
    return (
      this.state.showFlashMessage ?
      <FlashMessage message={this.state.flashMessage}/>
      :
      <div className="want-main">
        <div className="want-form-container">
          <div className="want-form-label">
            What do you want?
          </div>
          <div className="want-form-sub-label">
            Type or paste in all your desires to see them converted into an animated poem. The recommendation is to spend at least 15 minutes writing down everything that feels true to you in the format "I want X". Each want should be delineated by a new line or a period.
          </div>
          <textarea className="want-textarea" value={this.props.userWants} onChange={(event) => (this.handleChange(event))}></textarea>
          <div className="want-submit-container">
            <button className="want-submit-button" onClick={this.handleSubmit}>submit</button>
            <div className="want-submit-sub-link">
              <button className="text-button" onClick={this.handleNoYouGo}><u>No, what do YOU want?</u></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
