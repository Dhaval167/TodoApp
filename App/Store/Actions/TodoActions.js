export const TODO_LIST = 'TODO_LIST';
export const REMOVE_TODO = ' REMOVE_TODO';
export const UPDATE_IS_COMPLETED_VALUE = 'UPDATE_IS_COMPLETED_VALUE';
export const IS_NETWORK_AVAILABLE = 'IS_NETWORK_AVAILABLE';
export const PRIORITY_TODO = 'PRIORITY_TODO';

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

export const isNetworkAvailable = (networkType, isConnected) => {
  return dispatch => {
    dispatch({
      type: IS_NETWORK_AVAILABLE,
      data: {networkType: networkType, isConnected: isConnected},
    });
  };
};
