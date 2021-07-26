import React, {Component} from 'react';
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
import {Avatar, Fab, useToast} from 'native-base';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';
import {TextInput} from 'react-native-paper';
import {Icon} from 'react-native-elements';
import {iconType} from '../config/Helper';
import {useSelector, useDispatch, connect} from 'react-redux';
import {
  deleteTodoActions,
  updateIsComplete,
  todoActions,
  priorityTodo,
} from '../Store/Actions/TodoActions';

let row: Array<any> = [];
let prevOpenedRow;

class NotesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoValue: '',
      searchValue: '',
      searchData: [],
      isRowOpen: '',
      prevState: '',
    };
    this.refsArray = [];
  }

  //const Toast = useToast();
  // const _todo = useSelector(state => state.todoReducer.todo);

  closeRow(index) {
    this.refsArray[index].close();
  }

  closeOtherRow(index) {
    console.log('index', index);

    this.setState((a, b, c) => ({prevState: a.isRowOpen}));
    console.log('State', this.state.prevState);

    if (prevOpenedRow && prevOpenedRow !== this.refsArray[index]) {
      this.refsArray[this.state.prevState].close();
    }
    prevOpenedRow = this.refsArray[index];
  }

  onChangeTextHandler = text => {
    this.setState({todoValue: text});
    //setTodoValue(text);
  };

  deleteRow = index => {
    this.props.deleteTodoActions(index);
    this.closeRow(index);
  };

  onChangeSearchTextHandler = txt => {
    console.log('Text', txt);
    this.setState({searchValue: txt});

    let text = txt.toLowerCase();
    let tracks = this.props._todo;
    let filterTracks = tracks.filter(item => {
      if (item.title.toLowerCase().match(text)) {
        return item;
      }
    });
    this.setState({searchData: filterTracks});
  };

  onSaveButtonHandler = () => {
    const {todoValue} = this.state;
    if (todoValue.length == 0 || todoValue == '' || todoValue == undefined) {
      return Toast.show({title: 'Enter Some Value', duration: 500});
    } else {
      var todoList = {
        title: todoValue,
        isCompleted: false,
      };

      this.props.todoActions(todoList);
      this.setState({todoValue: ''});
    }
  };

  renderItem(item, index, drag, isActive) {
    //console.log('main this', index);
    return (
      <Swipeable
        ref={ref => {
          this.refsArray[index] = ref; //or this.refsArray[item.id]
        }}
        overshootRight={false}
        friction={2}
        renderRightActions={(progress, dragX) => {
          console.log('renderRightAction');
          const trans = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [0.7, 0],
          });
          return (
            <View
              style={{
                width: 80,
                height: 80,
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'red',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 10,
                }}>
                <Animated.Text
                  style={[
                    styles.actionText,
                    {
                      transform: [{translateX: trans}],
                    },
                  ]}>
                  <TouchableOpacity
                    onPress={() => this.deleteRow(index)}
                    activeOpacity={0.5}>
                    <Icon
                      type={iconType.materialIcon}
                      name="delete"
                      color="white"
                      size={24}
                    />
                  </TouchableOpacity>
                </Animated.Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 10,
                }}>
                <Animated.Text
                  style={[
                    styles.actionText,
                    {
                      transform: [{translateX: trans}],
                    },
                  ]}>
                  <TouchableOpacity onPress={() => {}} activeOpacity={0.5}>
                    <Icon
                      type={iconType.materialIcon}
                      name="check"
                      color="white"
                      size={24}
                    />
                  </TouchableOpacity>
                </Animated.Text>
              </View>
            </View>
          );
        }}
        onSwipeableRightWillOpen={() => {
          console.log(' swipe open');
          this.setState({isRowOpen: index});
          this.closeOtherRow(index);
        }}>
        <View style={styles.rowFrontContainer}>
          <TouchableOpacity
            underlayColor="#AAA"
            onLongPress={drag}
            style={{
              backgroundColor: isActive
                ? 'red'
                : item.isCompleted
                ? 'cyan'
                : 'white',
              //backgroundColor: isActive ? 'red' : 'white',
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
              <TouchableOpacity
                onPress={() => this.props.updateIsComplete(index)}
                style={{marginHorizontal: 10}}>
                <Avatar color="white">{index.toString()}</Avatar>
              </TouchableOpacity>
              <View style={{marginLeft: 20}}>
                <Text ellipsizeMode="tail">{item.title}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Swipeable>
    );
  }

  render() {
    const {searchValue, searchData, todoValue} = this.state;
    return (
      <View style={{flex: 1}}>
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
            onChangeText={this.onChangeSearchTextHandler}
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
            onChangeText={this.onChangeTextHandler}
            onSubmitEditing={this.onSaveButtonHandler}
            placeholder="Add Note"
          />
          <TouchableOpacity
            style={{position: 'absolute', right: 20, top: 10}}
            onPress={this.onSaveButtonHandler}>
            <Icon type={iconType.materialIcon} name="note-add" size={38} />
          </TouchableOpacity>
        </View>

        {this.props._todo.length == 0 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
          <DraggableFlatList
            data={searchValue.length > 0 ? searchData : this.props._todo}
            renderItem={({item, index, drag, isActive}) =>
              this.renderItem(item, index, drag, isActive)
            }
            keyExtractor={(item, index) => index.toString()}
            onDragEnd={({data}) => this.props.priorityTodo(data)}
            dragItemOverflow={true}
          />
        )}
      </View>
    );
  }
}

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

const mapStateToProps = state => ({
  _todo: state.todoReducer.todo,
});

const mapDispatchToProps = {
  deleteTodoActions,
  updateIsComplete,
  todoActions,
  priorityTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);
