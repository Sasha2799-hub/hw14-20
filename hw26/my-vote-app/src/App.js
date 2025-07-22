import './App.css';
import React, { useState, useEffect } from 'react';
import faceSmile from './assets/faceSmile.png';
import faceBored from './assets/faceBored.png';
import faceHand from './assets/faceHand.png';
import faceShake from './assets/faceShake.png';
import faceTongue from './assets/faceTongue.png';
import ShowResults from './components/ShowRes.jsx';
import Reset from './components/Reset_btn.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [emoji, setEmojis] = useState([
    { id: 1, img: faceSmile, count: 0 },
    { id: 2, img: faceBored, count: 0 },
    { id: 3, img: faceHand, count: 0 },
    { id: 4, img: faceShake, count: 0 },
    { id: 5, img: faceTongue, count: 0 }
  ]);

  useEffect(() => {
    const storedEmojis = localStorage.getItem('emojis');
    if (storedEmojis) {
      setEmojis(JSON.parse(storedEmojis));
    }
  }, []);


  const getClicks = (id) => {
    const emojiList = [...emoji];
    for (let i = 0; i < emojiList.length; i++) {
      if (emojiList[i].id === id) {
        emojiList[i].count += 1;
        break;
      }
    }
    setEmojis(emojiList);
    localStorage.setItem('emojis', JSON.stringify(emojiList));
  };

  const resetAll = () => {
    const resetEmojis = emoji.map((emoji) => ({ ...emoji, count: 0 }));
    setEmojis(resetEmojis);
    localStorage.setItem('emojis', JSON.stringify(resetEmojis));
    localStorage.removeItem('winnerData');
  };

  return (
    <div className="container">
      <div className="img-box">
        {emoji.map((emoji) => (
          <div key={emoji.id} className="emoji">
            <img
              src={emoji.img}
              className="img"
              onClick={() => getClicks(emoji.id)}
            />
            <span>{emoji.count}</span>
          </div>
        ))}
      </div>
      <div className="sec-container">
        <Reset onReset={resetAll} />
        <ShowResults emoji={emoji} />
      </div>
    </div>
  );
}

export default App;

