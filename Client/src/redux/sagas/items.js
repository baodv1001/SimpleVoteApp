import { call, put } from 'redux-saga/effects';
import itemApi from '../../api/itemApi';
import * as itemActions from '../actions/items';

export function* fetchItems(action) {
  try {
    const items = yield call(itemApi.getAll);

    yield put(itemActions.getItems.getItemsSuccess(items));
  } catch (error) {
    yield put(itemActions.getItems.getItemsFailure(error));
  }
}

export function* createItem(action) {
  try {
    const newItem = yield call(itemApi.create, action.payload);

    yield put(itemActions.createItem.createItemSuccess(newItem));
  } catch (error) {
    yield put(itemActions.createItem.createItemFailure(error));
  }
}

export function* updateItem(action) {
  try {
    yield call(itemApi.update, action.payload);
    yield put(itemActions.updateItem.updateItemSuccess(action.payload));
  } catch (error) {
    yield put(itemActions.updateItem.updateItemFailure(error));
  }
}

export function* deleteItem(action) {
  try {
    yield call(itemApi.delete, action.payload);

    yield put(itemActions.deleteItem.deleteItemSuccess(action.payload));
  } catch (error) {
    yield put(itemActions.deleteItem.deleteItemFailure(error));
  }
}
