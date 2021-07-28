export const TODO_LIST = 'TODO_LIST';
export const REMOVE_TODO = ' REMOVE_TODO';
export const UPDATE_IS_COMPLETED_VALUE = 'UPDATE_IS_COMPLETED_VALUE';
export const IS_NETWORK_AVAILABLE = 'IS_NETWORK_AVAILABLE';
export const PRIORITY_TODO = 'PRIORITY_TODO';
export const IS_COMPLETED_TODO = 'IS_COMPLETED_TODO';
export const REVERT_COMPLETED_TODO = 'REVERT_COMPLETED_TODO';
export const CLEAR_COMPLETED_TODO = 'CLEAR_COMPLETED_TODO';
export const VISIBLE_OPTIONS_MENU = 'VISIBLE_OPTIONS_MENU';

export const todoActions = title => {
  return dispatch => {
    dispatch({type: TODO_LIST, data: title});
  };
};

export const deleteTodoActions = todo => {
  return dispatch => {
    dispatch({type: REMOVE_TODO, data: todo});
  };
};

export const updateIsComplete = value => {
  return dispatch => {
    dispatch({type: UPDATE_IS_COMPLETED_VALUE, data: value});
  };
};

export const priorityTodo = data => {
  return dispatch => {
    dispatch({type: PRIORITY_TODO, data: data});
  };
};

export const isCompletedTodo = (item, index) => {
  return dispatch => {
    dispatch({type: IS_COMPLETED_TODO, data: {item, index}});
  };
};

export const isRevertCompletedTodo = (item, index) => {
  return dispatch => {
    dispatch({type: REVERT_COMPLETED_TODO, data: {item, index}});
  };
};

export const clearCompletedTodo = () => {
  return dispatch => {
    dispatch({type: CLEAR_COMPLETED_TODO});
  };
};

export const isVisibleOptionMenu = value => {
  return dispatch => {
    dispatch({type: VISIBLE_OPTIONS_MENU, data: value});
  };
};

export const isNetworkAvailable = (networkType, isConnected) => {
  return dispatch => {
    dispatch({
      type: IS_NETWORK_AVAILABLE,
      data: {networkType: networkType, isConnected: isConnected},
    });
  };
};
