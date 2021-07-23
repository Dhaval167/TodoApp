import {
  IS_NETWORK_AVAILABLE,
  REMOVE_TODO,
  SEARCH_TODO,
  TODO_LIST,
  UPDATE_IS_COMPLETED_VALUE,
} from '../Actions/TodoActions';

const initialState = {
  isNetworkType: '',
  isNetworkAvailable: true,
  todo: [],
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case TODO_LIST:
      return {...state, todo: [...state.todo, action.data]};

    case REMOVE_TODO:
      console.log('remove-called');
      var data = state.todo.filter((item, index) => index !== action.data);
      console.log('NewData', data);

      return {
        ...state,
        todo: data,
      };

    case UPDATE_IS_COMPLETED_VALUE:
      var data = state.todo.map((item, index) =>
        index == action.data && item.isCompleted != null
          ? {...item, isCompleted: !item.isCompleted}
          : item,
      );

      return {
        ...state,
        todo: data,
      };

    case IS_NETWORK_AVAILABLE:
      var isConnected = action.data.isConnected;
      var netWorkType = action.data.networkType;
      return {
        ...state,
        isNetworkType: netWorkType,
        isNetworkAvailable: isConnected,
      };

    default:
      return state;
  }
}
export default todoReducer;
