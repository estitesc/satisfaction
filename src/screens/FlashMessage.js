import React from 'react';
import '../styles.css';

export default class FlashMessage extends React.Component {

  render() {
    return (
      <div className="flash-main">
        <div className="flash-container">
          <div className="flash-message">
            {this.props.message}
          </div>
        </div>
      </div>
    );
  }
}
