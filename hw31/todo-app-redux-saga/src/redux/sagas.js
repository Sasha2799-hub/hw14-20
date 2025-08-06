import { all, call, put, takeEvery} from 'redux-saga/effects';
import {
  fetchItems,
  setFetchedItems,
  setError,
  addToDo,
  addItems,
  toggleCompleteRequest,
  toggleCompleteSuccess,
  editTodoRequest,
  editTodoSuccess
} from './slice/todoSlice';

function fetchHelper(url, options) {
  return fetch(url, options).then(res => {
    if (!res.ok) throw new Error('HTTP error');
    return res.json();
  });
}

function* fetchTodosSaga() {
  try {
    const todos = yield call(fetchHelper, 'https://68920c30447ff4f11fbef223.mockapi.io/todos');
    yield put(setFetchedItems(todos))
  } catch (err) {
    yield put(setError(err.message));
  }
}
function* watchFetchTodos() {
  yield takeEvery(fetchItems.type, fetchTodosSaga);
}

function* addItemSaga(action) {
  try {
    const todo = yield call(fetchHelper, 'https://68920c30447ff4f11fbef223.mockapi.io/todos', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: action.payload, done: false })
    });
    yield put(addItems(todo))
  } catch (e) {
    yield put(setError(e.message));
  }
}
function* watchAddTodos() {
  yield takeEvery(addToDo.type, addItemSaga);
}

import { select } from 'redux-saga/effects';

function* toggleCompleteSaga(action) {
  try {
    const id = action.payload;
    const item = yield (state => state.todo.items.find(i => i.id === id));
    if (!item) return;
    const updatedTodo = {
      text: item.text,
      done: !item.done
    };
    yield call(fetchHelper, `https://68920c30447ff4f11fbef223.mockapi.io/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTodo),
    });

    yield put(toggleCompleteSuccess(id));
  } catch (err) {
    yield put(setError(err.message));
  }
}

function* watchToggleComplete() {
  yield takeEvery(toggleCompleteRequest.type, toggleCompleteSaga);
}

function* editTodoSaga(action) {
  try {
    const { id, text } = action.payload
    const item = yield select(state => state.todo.items.find(i => i.id === id));
    if (!item) return;

    yield call(fetchHelper, `https://68920c30447ff4f11fbef223.mockapi.io/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, done: item.done })
    });

    yield put(editTodoSuccess({ id, text }));
  } catch (err) {
    yield put(setError(err.message));
  }
}
function* watchEditTodo() {
  yield takeEvery(editTodoRequest.type, editTodoSaga);
}

export default function* rootSaga() {
  yield all([
    watchFetchTodos(),
    watchAddTodos(),
    watchToggleComplete(),
    watchEditTodo(),
  ]);
}
