import { useDispatch } from 'react-redux';
import { reset } from '../redux/slice/emojiSlice';

function Reset() {
  const dispatch = useDispatch();

  return (
    <button className="reset-btn btn btn-warning" onClick={() => dispatch(reset())}>
      Reset
    </button>
  );
}

export default Reset;

