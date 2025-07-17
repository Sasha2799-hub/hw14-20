import React from 'react';

class ShowResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winnerData: null,
      displayRes: false
    };
  }

  componentDidMount() {
    const savedWinner = localStorage.getItem('winnerData');
    if (savedWinner) {
      this.setState({
        winnerData: JSON.parse(savedWinner),
        displayRes: true
      });
    }
  }

  componentDidUpdate(prevProps) {

    if (
      prevProps.emojiCLicks !== this.props.emojiCLicks &&
      this.props.emojiCLicks.every((emoji) => emoji.count === 0)
    ) {
      this.setState({ winnerData: null, displayRes: false });
    }
  }

  showResult() {
    const allZero = this.props.emojiCLicks.every((emoji) => emoji.count === 0);
    if (allZero) {
      this.setState({ winnerData: null, displayRes: true });
      localStorage.removeItem('winnerData');
      return;
    }

    const winner = this.props.emojiCLicks.reduce((max, current) =>
      max.count < current.count ? current : max
    );

    localStorage.setItem('winnerData', JSON.stringify(winner));
    this.setState({ winnerData: winner, displayRes: true });
  }

 render() {
  const { winnerData, displayRes } = this.state;

  let resultBlock = null;

  if (displayRes) {
    if (winnerData) {
      resultBlock = (
        <div className="display_res visible">
          <span className="img_res">
            Winner is: <img src={winnerData.img}/>
          </span>
          <span className="clicks_win">Amount voices: {winnerData.count}</span>
        </div>
      );
    } else {
      resultBlock = (
        <div className="display_res visible">
          <span className="clicks_win">No votes yet</span>
        </div>
      );
    }
  }

  return (
    <>
      <div className="showRes">
        <button className="showRes-btn btn btn-success" onClick={() => this.showResult()}>
          Show Results
        </button>
      </div>

      {resultBlock}
    </>
  );
}
}

export default ShowResults;

