import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './slice/todoSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    todo: todoSlice
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    sagaMiddleware
  ],
});

sagaMiddleware.run(rootSaga); 

export default store;
