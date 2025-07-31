import { useDispatch, useSelector } from 'react-redux';
import { showResult } from '../redux/slice/emojiSlice';

function ShowResults() {
  const dispatch = useDispatch();
  const winner = useSelector((state) => state.voting.winner)

  const handleClick = () => {
    dispatch(showResult())
  }

  return (
    <>
      <div className="showRes">
        <button className="showRes-btn btn btn-success" onClick={handleClick}>
          Show Results
        </button>
      </div>

      {winner !== null ? (
        <div className="display_res visible">
          <span className="img_res">
            Winner is: <img src={winner.img} alt="winner" />
          </span>
          <span className="clicks_win">Amount voices: {winner.count}</span>
        </div>
      ) : (
        <div className="display_res visible">
          <span className="clicks_win">No votes yet</span>
        </div>
      )}
    </>
  );
}

export default ShowResults;
