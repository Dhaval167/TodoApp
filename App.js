import {NativeBaseProvider} from 'native-base';
import React, {useEffect} from 'react';
import RootNavigation from './App/Navigation/RootNavigation';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';

import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducers from './App/Store';
import ReduxThunk from 'redux-thunk';
import {MenuProvider} from 'react-native-popup-menu';

const App = () => {
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['todoReducer'],
  };
  const persitedReducer = persistReducer(persistConfig, rootReducers);
  const store = createStore(persitedReducer, applyMiddleware(ReduxThunk));
  const persistedStore = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <NativeBaseProvider>
          <MenuProvider>
            <RootNavigation />
          </MenuProvider>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
