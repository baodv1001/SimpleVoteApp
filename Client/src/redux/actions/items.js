import { createActions } from 'redux-actions';

export const getType = reduxAction => {
  return reduxAction().type;
};

export const getItems = createActions({
  getItemsRequest: undefined,
  getItemsSuccess: payload => payload,
  getItemsFailure: error => error,
});

export const getItem = createActions({
  getItemRequest: payload => payload,
  getItemSuccess: payload => payload,
  getItemFailure: error => error,
});

export const createItem = createActions({
  createItemRequest: payload => payload,
  createItemSuccess: payload => payload,
  createItemFailure: error => error,
});

export const updateItem = createActions({
  updateItemRequest: payload => payload,
  updateItemSuccess: payload => payload,
  updateItemFailure: error => error,
});

export const deleteItem = createActions({
  deleteItemRequest: payload => payload,
  deleteItemSuccess: payload => payload,
  deleteItemFailure: error => error,
});
