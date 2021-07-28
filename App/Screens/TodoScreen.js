import React, {useState} from 'react';
import {View, Text, StyleSheet, StatusBar, SafeAreaView} from 'react-native';

import NotesList from '../Components/NotesList';
const TodoScreen = props => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor="#353434"
          translucent
          barStyle="light-content"
        />
        <NotesList />
      </View>
    </SafeAreaView>
  );
};
export default TodoScreen;
