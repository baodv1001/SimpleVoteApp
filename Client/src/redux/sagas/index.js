import { takeLatest } from 'redux-saga/effects';
import * as itemActions from '../actions/items';
import { createItem, deleteItem, fetchItems, updateItem } from '../sagas/items';
import { fetchAuthSaga, fetchUserSaga } from './auth';
import * as authActions from '../actions/auth';

export default function* mySaga() {
  //item
  yield takeLatest(itemActions.getItems.getItemsRequest, fetchItems);
  yield takeLatest(itemActions.createItem.createItemRequest, createItem);
  yield takeLatest(itemActions.updateItem.updateItemRequest, updateItem);
  yield takeLatest(itemActions.deleteItem.deleteItemRequest, deleteItem);
  //auth
  yield takeLatest(authActions.getAuth.getAuthRequest, fetchAuthSaga);
  yield takeLatest(authActions.getUser.getUserRequest, fetchUserSaga);
}
