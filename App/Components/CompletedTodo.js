import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Avatar} from 'native-base';
import {useDispatch} from 'react-redux';
import {
  clearCompletedTodo,
  isRevertCompletedTodo,
} from '../Store/Actions/TodoActions';

const CompletedTodo = props => {
  const dispatch = useDispatch();
  const _renderItem = ({item, index}) => {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          underlayColor="#AAA"
          style={{
            backgroundColor: 'cyan',
            justifyContent: 'center',
            alignItems: 'center',
            height: 80,
            underlayColor: '#AAA',
            marginVertical: 10,
            marginHorizontal: 10,
            borderRadius: 10,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => dispatch(isRevertCompletedTodo(item, index))}
              style={{marginHorizontal: 10}}>
              <Avatar color="white">{index.toString()}</Avatar>
            </TouchableOpacity>
            <View style={{marginLeft: 20}}>
              <Text ellipsizeMode="tail">{item.title}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {props.data.length == 0 ? (
        <View
          style={{
            left: '25%',
            top: '50%',
            position: 'absolute',
          }}>
          <Text style={{fontSize: 18}}>Not Complete Any Todo</Text>
        </View>
      ) : (
        <FlatList
          keyExtractor={(item, index) => index}
          data={props.data}
          renderItem={_renderItem}
        />
      )}

      {/* <TouchableOpacity
        style={styles.clearButton}
        onPress={() => dispatch(clearCompletedTodo())}></TouchableOpacity>
      <Text style={styles.textClear}>Clear</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  clearButton: {
    width: 0,
    height: 0,
    position: 'absolute',
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 50,
    borderTopWidth: 50,
    borderRightColor: 'transparent',
    borderTopColor: 'red',
  },
  textClear: {
    color: 'white',
    fontSize: 14,
    position: 'absolute',
    left: 0,
    top: '1%',
    transform: [{rotate: '-45deg'}],
  },
});

export default CompletedTodo;
