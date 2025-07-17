import React from 'react';

class Reset extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        className="reset-btn btn btn-warning"
        onClick={this.props.onReset}>
        Reset
      </button>
    );
  }
}

export default Reset;
