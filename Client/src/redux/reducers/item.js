import INIT_STATE from '../constant';
import { getType } from '../actions/items';
import * as itemActions from '../actions/items';

export default function itemsReducer(state = INIT_STATE.items, action) {
  switch (action.type) {
    //get
    case getType(itemActions.getItems.getItemsRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(itemActions.getItems.getItemsSuccess):
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isSuccess: true,
      };
    case getType(itemActions.getItems.getItemsFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    // create
    case getType(itemActions.createItem.createItemRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(itemActions.createItem.createItemSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
        isLoading: false,
        isSuccess: true,
      };
    case getType(itemActions.createItem.createItemFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    //update
    case getType(itemActions.updateItem.updateItemRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(itemActions.updateItem.updateItemSuccess):
      return {
        ...state,
        data: state.data.map(item =>
          item.idItem === action.payload.idItem ? action.payload : item
        ),
        isLoading: false,
        isSuccess: true,
      };
    case getType(itemActions.updateItem.updateItemFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    // delete
    case getType(itemActions.deleteItem.deleteItemRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(itemActions.deleteItem.deleteItemSuccess):
      return {
        ...state,
        data: state.data.filter(item => item.idItem !== action.payload),
        isLoading: false,
        isSuccess: true,
      };
    case getType(itemActions.deleteItem.deleteItemFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    default:
      return state;
  }
}
