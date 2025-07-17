import React from 'react';
import faceSmile from './assets/faceSmile.png';
import faceBored from './assets/faceBored.png';
import faceHand from './assets/faceHand.png';
import faceShake from './assets/faceShake.png';
import faceTongue from './assets/faceTongue.png';
import './App.css';
import ShowResults from './components/ShowRes.jsx';
import Reset from './components/Reset_btn.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emojis: [
        { id: 1, img: faceSmile, count: 0 },
        { id: 2, img: faceBored, count: 0 },
        { id: 3, img: faceHand, count: 0 },
        { id: 4, img: faceShake, count: 0 },
        { id: 5, img: faceTongue, count: 0 }
      ]
    };
    this.getClicks = this.getClicks.bind(this);
    this.resetAll = this.resetAll.bind(this);
  }

  componentDidMount() {
    const storedEmojis = localStorage.getItem('emojis');
    if (storedEmojis) {
      this.setState({ emojis: JSON.parse(storedEmojis) });
    }
  }

  getClicks(id) {
    const emojiList = [...this.state.emojis];
    for (let i = 0; i < emojiList.length; i++) {
      if (emojiList[i].id === id) {
        emojiList[i].count += 1;
        break;
      }
    }
    this.setState({ emojis: emojiList });
    localStorage.setItem('emojis', JSON.stringify(emojiList));
  }

  resetAll() {
    const resetEmojis = this.state.emojis.map((emoji) => ({...emoji, count: 0}));
    this.setState({ emojis: resetEmojis });
    localStorage.setItem('emojis', JSON.stringify(resetEmojis));
    localStorage.removeItem('winnerData');
  }

  render() {
    const emojiList = this.state.emojis;
    return (
      <div className="container">
        <div className="img-box">
          {emojiList.map((emoji) => (
            <div key={emoji.id} className="emoji">
              <img
                src={emoji.img}
                className="img"
                onClick={() => this.getClicks(emoji.id)}
              />
              <span>{emoji.count}</span>
            </div>
          ))}
        </div>
        <div className="sec-container">
          <Reset onReset={this.resetAll} />
          <ShowResults emojiCLicks={emojiList} />
        </div>
      </div>
    );
  }
}

export default App;
