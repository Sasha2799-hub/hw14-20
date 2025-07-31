import { createSlice } from '@reduxjs/toolkit';
import faceSmile from '../../assets/faceSmile.png';
import faceBored from '../../assets/faceBored.png';
import faceHand from '../../assets/faceHand.png';
import faceShake from '../../assets/faceShake.png';
import faceTongue from '../../assets/faceTongue.png';

const initialState = {
  emojis: [
    { id: 1, img: faceSmile, count: 0 },
    { id: 2, img: faceBored, count: 0 },
    { id: 3, img: faceHand, count: 0 },
    { id: 4, img: faceShake, count: 0 },
    { id: 5, img: faceTongue, count: 0 }
  ],
  winner: null
};

const savedEmojis = JSON.parse(localStorage.getItem("emojis"));
const savedWinner = JSON.parse(localStorage.getItem("winner"));

if (savedEmojis) {
  initialState.emojis = savedEmojis;
}

if (savedWinner) {
  initialState.winner = savedWinner;
}

const emojiSlice = createSlice({
  name: 'emoji',
  initialState,
  reducers: {
    vote: (state, action) => {
      const emoji = state.emojis.find((elem) => elem.id === action.payload);
      if (emoji) {
        emoji.count += 1;
        localStorage.setItem('emojis', JSON.stringify(state.emojis));
      }
    },
    reset: (state) => {
      state.emojis.forEach((elem) => (elem.count = 0));
      state.winner = null;
      localStorage.removeItem('emojis');
      localStorage.removeItem('winner');
    },
    showResult: (state) => {
      const allZero = state.emojis.every((elem) => elem.count === 0)
      if (allZero) {
        state.winner = null;
        localStorage.removeItem('winner');
      } else {
        const winner = state.emojis.reduce((a, b) =>
          a.count > b.count ? a : b
        );
        state.winner = winner
        localStorage.setItem('winner', JSON.stringify(winner))
      }
    }
  }
});
export const { vote, reset, showResult } = emojiSlice.actions;
export default emojiSlice.reducer;
