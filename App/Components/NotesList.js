import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
} from 'react-native';

import {Avatar, Fab} from 'native-base';

import {SwipeListView} from 'react-native-swipe-list-view';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconMI from 'react-native-vector-icons/MaterialCommunityIcons';
import AddModel from './AddModel';
import Icon from 'react-native-vector-icons/AntDesign';

import {useSelector, useDispatch} from 'react-redux';
import {
  deleteTodoActions,
  updateIsComplete,
} from '../Store/Actions/TodoActions';

const rowTranslateAnimatedValues = {};

const NotesList = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [mode, setMode] = useState('Basic');

  const {todo} = useSelector(state => state.todoReducer);
  const dispatch = useDispatch();

  todo.map((item, index) => {
    rowTranslateAnimatedValues[`${index}`] = new Animated.Value(1);
  });

  const animationIsRunning = useRef(false);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
      dispatch(updateIsComplete(rowKey));
    }
  };
  const deleteRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
      dispatch(deleteTodoActions(rowKey));
    }
  };

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  const onLeftActionStatusChange = rowKey => {
    console.log('onLeftActionStatusChange', rowKey);
    if (rowKey.isActivated) {
      //dispatch(updateIsComplete(rowKey.key));
    }
  };

  const onRightActionStatusChange = rowKey => {
    console.log('onRightActionStatusChange', rowKey);
    if (rowKey.isActivated) {
      //dispatch(deleteTodoActions(rowKey.key));
    }
  };

  const onRightAction = rowKey => {
    console.log('onRightAction', rowKey);
  };

  const onLeftAction = rowKey => {
    console.log('onLeftAction', rowKey);
  };

  const onSwipeValueChange = swipeData => {
    const {key, value, direction} = swipeData;

    if (
      value < -Dimensions.get('window').width &&
      !animationIsRunning.current
    ) {
      animationIsRunning.current = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        console.log('Start Key', Key);
        animationIsRunning.current = false;
      });
    }
  };

  const renderItem = ({item, index}) => {
    // console.log('Item', item);
    return (
      <Animated.View
        style={[
          styles.rowFrontContainer,
          {
            height: rowTranslateAnimatedValues[index].interpolate({
              inputRange: [0, 1],
              outputRange: [0, 80],
            }),
          },
        ]}>
        <TouchableHighlight
          underlayColor="#AAA"
          onPress={() => {}}
          style={{
            backgroundColor: item.isCompleted ? 'cyan' : 'white',
            justifyContent: 'center',
            alignItems: 'center',
            height: 80,
            underlayColor: '#AAA',
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{marginHorizontal: 10}}>
              <Avatar color="white">{index.toString()}</Avatar>
            </View>
            <View style={{marginLeft: 20}}>
              <Text ellipsizeMode="tail">{item.title}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </Animated.View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => closeRow(rowMap, data.index)}
          activeOpacity={0.5}>
          <IconMI
            name={
              data.item.isCompleted ? 'sticker-check' : 'sticker-check-outline'
            }
            color="white"
            size={24}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => deleteRow(rowMap, data.index)}
          activeOpacity={0.5}>
          <IconM name="delete" color="white" size={24} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {todo.length == 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 250,
              width: 250,
            }}>
            <Image
              source={require('../../assets/Icons/ic_addNotes.jpg')}
              style={{
                height: '100%',
                width: '100%',
                borderRadius: 150 / 2,
              }}
              resizeMode="contain"
            />

            <Text
              style={{fontSize: 24, fontWeight: 'bold', marginVertical: 10}}>
              Add Some Note here...
            </Text>
          </View>
        </View>
      ) : (
        <SwipeListView
          data={todo}
          keyExtractor={(item, index) => index}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onRowDidOpen={onRowDidOpen}
          rightOpenValue={-100}
          onSwipeValueChange={onSwipeValueChange}
          useNativeDriver={false}
          leftActionValue={50}
          rightActionValue={-55}
          leftActivationValue={75}
          rightActivationValue={-50}
          onLeftAction={onLeftAction}
          onRightAction={onRightAction}
          onLeftActionStatusChange={onLeftActionStatusChange}
          onRightActionStatusChange={onRightActionStatusChange}
        />
      )}
      <AddModel
        isOpen={modalVisible}
        onClose={setModalVisible}
        onCloseButton={() => {
          setModalVisible(!modalVisible);
        }}
        onSaveButton={() => {
          setModalVisible(!modalVisible);
        }}
      />
      <Fab
        onPress={() => setModalVisible(!modalVisible)}
        position="absolute"
        size="sm"
        icon={<Icon color="white" name="plus" size={24} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
  },
  rowFrontContainer: {},
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: '#1f65ff',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});

export default NotesList;
