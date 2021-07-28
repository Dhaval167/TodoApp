import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';

import TodoScreen from '../Screens/TodoScreen';
import {isNetworkAvailable} from '../Store/Actions/TodoActions';
import NetInfo from '@react-native-community/netinfo';

const Stack = createStackNavigator();

const RootNavigation = () => {
  const dispatch = useDispatch();
  const isConnected = useSelector(
    state => state.todoReducer.isNetworkAvailable,
  );
  console.log('isConnected', isConnected);
  const isConnectedType = useSelector(state => state.todoReducer.isNetworkType);
  console.log('isConnected', isConnectedType);
  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(isNetworkAvailable(state.type, state.isConnected));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Todo">
        <Stack.Screen
          name="Todo"
          component={TodoScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
