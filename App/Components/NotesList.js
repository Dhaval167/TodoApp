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

import {TextInput} from 'react-native-paper';
import {Avatar, Fab, useToast} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Icon} from 'react-native-elements';
import {iconType} from '../config/Helper';
import {useSelector, useDispatch} from 'react-redux';
import {
  deleteTodoActions,
  updateIsComplete,
  todoActions,
} from '../Store/Actions/TodoActions';

const rowTranslateAnimatedValues = {};

const NotesList = props => {
  const Toast = useToast();
  const [todoValue, setTodoValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchData, setSearchData] = useState([]);

  const {todo} = useSelector(state => state.todoReducer);
  console.log('Todo', todo);

  const dispatch = useDispatch();

  todo.map((item, index) => {
    rowTranslateAnimatedValues[`${index}`] = new Animated.Value(1);
  });

  const animationIsRunning = useRef(false);

  const onChangeTextHandler = text => {
    setTodoValue(text);
  };

  const onSaveButtonHandler = () => {
    if (todoValue.length == 0 || todoValue == '' || todoValue == undefined) {
      return Toast.show({title: 'Enter Some Value', duration: 500});
    } else {
      var todoList = {
        title: todoValue,
        isCompleted: false,
      };
      dispatch(todoActions(todoList));
      setTodoValue('');
    }
  };

  const onChangeSearchTextHandler = txt => {
    console.log('Text', txt);
    setSearchValue(txt);
    let text = txt.toLowerCase();
    let tracks = todo;
    let filterTracks = tracks.filter(item => {
      if (item.title.toLowerCase().match(text)) {
        return item;
      }
    });
    setSearchData(filterTracks);
    // if (text == '') {
    //   setSearchData([]);
    // }
    // todo.filter((item, index) => {
    //   if (item.title == text) {
    //     setSearchData([item]);
    //   }
    // });
  };
  console.log('search', searchData);

  // const searchButtonHandler = searchText => {
  //   if (searchText == undefined || searchText == '' || searchText.length == 0) {
  //     return Toast.show({title: 'Enter Some Value', duration: 500});
  //   }
  // };

  const updateRow = (rowMap, rowKey) => {
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
            marginHorizontal: 20,
          }}
          onPress={() => deleteRow(rowMap, data.index)}
          activeOpacity={0.5}>
          <Icon
            type={iconType.materialIcon}
            name="delete"
            color="white"
            size={24}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => updateRow(rowMap, data.index)}
          activeOpacity={0.5}>
          <Icon
            type={iconType.materialCommunity}
            name={
              data.item.isCompleted ? 'sticker-check' : 'sticker-check-outline'
            }
            color="white"
            size={24}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          marginHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 15,
          marginBottom: 15,
        }}>
        <TextInput
          style={{
            width: '90%',
            height: 45,
            borderRadius: 10,
          }}
          onChangeText={onChangeSearchTextHandler}
          placeholder="Search"
        />

        <TouchableOpacity
          style={{position: 'absolute', right: 20, top: 5}}
          onPress={() => {}}>
          <Icon type={iconType.materialIcon} name="search" size={38} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginHorizontal: 10,
          width: '100%',
          marginTop: 15,
          marginBottom: 15,
          elevation: 5,
        }}>
        <TextInput
          style={{
            width: '95%',
            borderRadius: 10,
          }}
          value={todoValue}
          onChangeText={onChangeTextHandler}
          placeholder="Add Note"
        />
        <TouchableOpacity
          style={{position: 'absolute', right: 20, top: 10}}
          onPress={onSaveButtonHandler}>
          <Icon type={iconType.materialIcon} name="note-add" size={38} />
        </TouchableOpacity>
      </View>

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
      ) : searchValue.length > 0 && searchData.length == 0 ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'black', fontSize: 24, fontWeight: 'bold'}}>
            No Data Found
          </Text>
        </View>
      ) : (
        <SwipeListView
          data={searchValue.length > 0 ? searchData : todo}
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
          disableRightSwipe
          rightActionValue={-100}
          leftActivationValue={75}
          rightActivationValue={-50}
          onLeftAction={onLeftAction}
          onRightAction={onRightAction}
          onLeftActionStatusChange={onLeftActionStatusChange}
          onRightActionStatusChange={onRightActionStatusChange}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
