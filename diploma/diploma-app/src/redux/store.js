import rozetkaSlice from './slice/rozetkaSlice';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas.js';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    products: rozetkaSlice
  },
    middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    sagaMiddleware
  ],
});

sagaMiddleware.run(rootSaga); 

export default store;