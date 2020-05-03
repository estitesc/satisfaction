import React from 'react';
import '../styles.css';

export default class Wants extends React.Component {
  render() {
    return (
      <div className="want-main">
        <div className="want-form-container">
          <div className="want-form-label">
            What you want:
          </div>
          <div className="want-form-sub-label">
            {
              this.props.wantsArray.map((want, index) => {
                return (
                  <div key={index}>{want}</div>
                )
              })
            }
          </div>
        </div>
        <div className="wants-button-container">
          <button className="want-submit-button" onClick={() => (this.props.onSetCurrentView('prompt'))}>
            back to form
          </button>
        </div>
      </div>
    );
  }
}
