import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import NotesList from '../Components/NotesList';
const TodoScreen = props => {
  return (
    <View style={{flex: 1}}>
      <NotesList />
    </View>
  );
};

export default TodoScreen;
