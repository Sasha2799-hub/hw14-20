import { call, put, takeEvery, all, select } from "redux-saga/effects";
import {
  fetchProducts,
  setProducts,
  setError,
  addProduct,
  updateProduct,
  requestAddProduct,
  requestUpdateProduct,
  requestDeleteProduct,
  deleteProduct,
} from "./slice/rozetkaSlice";

const API_URL = "https://689c80e658a27b18087e70f8.mockapi.io/products";

function fetchHelper(url, options) {
  return fetch(url, options).then((res) => {
    if (!res.ok) throw new Error("HTTP error");
    return res.json();
  });
}

function* fetchProductsSaga() {
  try {
    const res = yield call(fetchHelper, API_URL);
    const reindexed = res.map((item, idx) => ({
      ...item,
      id: idx + 1,
      serverId: item.id,
    }));
    yield put(setProducts(reindexed));
  } catch (err) {
    yield put(setError(err.message));
  }
}

function* watchFetchProducts() {
  yield takeEvery(fetchProducts.type, fetchProductsSaga);
}

function* addProductSaga(action) {
  try {
    const res = yield call(fetchHelper, API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(action.payload),
    });
    yield put(addProduct({ ...res, id: Date.now(), serverId: res.id }));
  } catch (err) {
    yield put(setError(err.message));
  }
}

function* watchAddProduct() {
  yield takeEvery(requestAddProduct.type, addProductSaga);
}

function* updateProductSaga(action) {
  try {
    const res = yield call(
      fetchHelper,
      `${API_URL}/${action.payload.serverId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(action.payload),
      }
    );
    yield put(
      updateProduct({
        ...res,
        id: action.payload.id,
        serverId: res.id,
      })
    );
  } catch (err) {
    yield put(setError(err.message));
  }
}

function* watchUpdateProduct() {
  yield takeEvery(requestUpdateProduct.type, updateProductSaga);
}

function* deleteProductSaga(action) {
  try {
    const serverId = action.payload.serverId;
    yield call(fetchHelper, `${API_URL}/${serverId}`, { method: "DELETE" });

    const stateItems = yield select((state) => state.products.items);
    const updated = stateItems.filter((item) => item.id !== action.payload.id);
    const reindexed = updated.map((item, idx) => ({ ...item, id: idx + 1 }));

    yield put(deleteProduct(reindexed));
  } catch (err) {
    yield put(setError(err.message));
  }
}

function* watchDeleteProduct() {
  yield takeEvery(requestDeleteProduct.type, deleteProductSaga);
}

export default function* rootSaga() {
  yield all([
    watchFetchProducts(),
    watchAddProduct(),
    watchUpdateProduct(),
    watchDeleteProduct(),
  ]);
}
