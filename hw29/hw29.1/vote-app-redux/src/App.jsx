import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { vote } from './redux/slice/emojiSlice';
import ShowResults from './components/ShowRes';
import Reset from './components/Reset_btn';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const emojis = useSelector((state) => state.voting.emojis);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <div className="img-box">
        {emojis.map((emoji) => (
          <div key={emoji.id} className="emoji">
            <img
              src={emoji.img}
              className="img"
              onClick={() => dispatch(vote(emoji.id))}
              alt="emoji"
            />
            <span>{emoji.count}</span>
          </div>
        ))}
      </div>
      <div className="sec-container">
        <Reset />
        <ShowResults />
      </div>
    </div>
  );
}

export default App;
