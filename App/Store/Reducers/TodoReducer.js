import {
  CLEAR_COMPLETED_TODO,
  IS_COMPLETED_TODO,
  IS_NETWORK_AVAILABLE,
  PRIORITY_TODO,
  REMOVE_TODO,
  REVERT_COMPLETED_TODO,
  TODO_LIST,
  UPDATE_IS_COMPLETED_VALUE,
  VISIBLE_OPTIONS_MENU,
} from '../Actions/TodoActions';

const initialState = {
  isNetworkType: '',
  isNetworkAvailable: true,
  todo: [],
  completedTodo: [],
  isVisibleOptionMenu: false,
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case TODO_LIST:
      return {...state, todo: [...state.todo, action.data]};

    case REMOVE_TODO:
      console.log('remove-called');
      var data = state.todo.filter((item, index) => index !== action.data);
      return {
        ...state,
        todo: data,
      };

    case UPDATE_IS_COMPLETED_VALUE:
      var data = state.todo.map((item, index) =>
        index == action.data && item.isCompleted == false
          ? {...item, isCompleted: true}
          : item,
      );
      return {
        ...state,
        todo: data,
      };
    case IS_COMPLETED_TODO:
      var todo = state.todo.filter(
        (item, index) => index !== action.data.index,
      );
      return {
        ...state,
        todo: todo,
        completedTodo: [...state.completedTodo, action.data.item],
      };

    case REVERT_COMPLETED_TODO:
      var completed = state.completedTodo.filter(
        (item, index) => index !== action.data.index,
      );
      return {
        ...state,
        todo: [...state.todo, action.data.item],
        completedTodo: completed,
      };

    case CLEAR_COMPLETED_TODO:
      return {...state, completedTodo: []};

    case VISIBLE_OPTIONS_MENU:
      return {...state, isVisibleOptionMenu: action.data};

    //drag-and-drop
    case PRIORITY_TODO:
      return {...state, todo: action.data};

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
