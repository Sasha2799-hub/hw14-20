import { useRef, useState, useEffect } from 'react';

function ShowResults({ emoji }) {
  const [state, setState] = useState({
    winnerData: null,
    displayRes: false,
  });

  useEffect(() => {
    const savedWinner = localStorage.getItem('winnerData');
    if (savedWinner) {
      setState({
        winnerData: JSON.parse(savedWinner),
        displayRes: true,
      });
    }
  }, []);

  const initialValue = useRef();

  useEffect(() => {
    const prevClicks = initialValue.current;
    if (
      prevClicks !== emoji &&
      emoji.every((emoji) => emoji.count === 0)
    ) {
      setState({ winnerData: null, displayRes: false });
    }
    initialValue.current = emoji; 
  }, [emoji]); 

  const showResult = () => {
    const allZero = emoji.every((emoji) => emoji.count === 0);
    if (allZero) {
      setState({ winnerData: null, displayRes: true });
      localStorage.removeItem('winnerData');
      return;
    }

    const winner = emoji.reduce((max, current) =>
      max.count < current.count ? current : max
    );

    localStorage.setItem('winnerData', JSON.stringify(winner));
    setState({ winnerData: winner, displayRes: true });
  };

  const { winnerData, displayRes } = state;

  let resultBlock = null;

  if (displayRes) {
    if (winnerData) {
      resultBlock = (
        <div className="display_res visible">
          <span className="img_res">
            Winner is: <img src={winnerData.img} alt="winner" />
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
        <button className="showRes-btn btn btn-success" onClick={showResult}>
          Show Results
        </button>
      </div>

      {resultBlock}
    </>
  );
}

export default ShowResults;

