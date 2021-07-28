import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Animated,
  Keyboard,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import {Avatar, Fab, useToast} from 'native-base';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Icon} from 'react-native-elements';
import {iconType} from '../config/Helper';
import {connect} from 'react-redux';
import {
  deleteTodoActions,
  updateIsComplete,
  todoActions,
  priorityTodo,
  isCompletedTodo,
  isVisibleOptionMenu,
  clearCompletedTodo,
} from '../Store/Actions/TodoActions';
import Header from './Header';
import CompletedTodo from './CompletedTodo';

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
      index: 0,
      routes: [
        {
          key: 'todo',
          title: 'Todo',
        },
        {
          key: 'todoCompleted',
          title: 'TodoCompleted',
        },
      ],
    };
    this.refsArray = [];
  }

  TodoRoute = () => {
    const {_todo} = this.props;
    const {searchValue, searchData, todoValue, index} = this.state;

    return (
      <View style={{flex: 1}}>
        <Header title="Todo" index={index} />
        <View style={styles.inputContainer}>
          <View style={styles.textInput}>
            <TextInput
              style={styles.textInputSearch}
              onChangeText={this.onChangeSearchTextHandler}
              placeholder="Search"
              placeholderTextColor="grey"
              selectionColor="#353434"
              underlineColor="white"
            />
            <TouchableOpacity
              style={{position: 'absolute', right: '2%'}}
              onPress={() => {}}>
              <Icon
                type={iconType.materialIcon}
                name="search"
                size={34}
                color="white"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.textInput}>
            <TextInput
              style={styles.textInputAddNote}
              value={todoValue}
              onChangeText={this.onChangeTextHandler}
              onSubmitEditing={this.onSaveButtonHandler}
              placeholder="Add Note"
              placeholderTextColor="grey"
              underlineColor="white"
            />
            <TouchableOpacity
              style={{position: 'absolute', right: '2%'}}
              onPress={this.onSaveButtonHandler}>
              <Icon
                type={iconType.materialIcon}
                name="note-add"
                size={34}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
        {_todo.length == 0 ? (
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
            dragItemOverflow={false}
            autoscrollThreshold={60}
            autoscrollSpeed={500}
          />
        )}
      </View>
    );
  };

  TodoCompletedRoute = () => {
    const {_todoCompleted} = this.props;

    return (
      <View style={{flex: 1}}>
        <Header
          title="TodoCompleted"
          index={this.state.index}
          clear={() => this.props.clearCompletedTodo()}
        />
        <CompletedTodo data={_todoCompleted} />
      </View>
    );
  };

  renderScene = SceneMap({
    todo: this.TodoRoute,
    todoCompleted: this.TodoCompletedRoute,
  });

  renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      style={{
        backgroundColor: '#353434',
      }}
      getLabelText={({route}) => route.title}
    />
  );

  closeRow(index) {
    this.refsArray[index].close();
  }

  closeOtherRow(index) {
    this.setState((a, b, c) => ({prevState: a.isRowOpen}));
    if (prevOpenedRow && prevOpenedRow !== this.refsArray[index]) {
      this.refsArray[this.state.prevState].close();
    }
    prevOpenedRow = this.refsArray[index];
  }

  onChangeTextHandler = text => {
    this.setState({todoValue: text});
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
      return alert('Enter Some Value');
    } else {
      var todoList = {
        title: todoValue,
        isCompleted: false,
      };
      this.props.todoActions(todoList);
      this.setState({todoValue: ''});
      Keyboard.dismiss();
    }
  };

  renderItem(item, index, drag, isActive) {
    return (
      <Swipeable
        ref={ref => {
          this.refsArray[index] = ref; //or this.refsArray[item.id]
        }}
        overshootRight={false}
        renderRightActions={(progress, dragX) => {
          const trans = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [0.7, 0],
          });
          return (
            <View style={styles.hiddenViewContainer}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 5,
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
                      size={28}
                    />
                  </TouchableOpacity>
                </Animated.Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 5,
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
                      size={28}
                    />
                  </TouchableOpacity>
                </Animated.Text>
              </View>
            </View>
          );
        }}
        onSwipeableRightWillOpen={() => {
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
                onPress={() => {
                  this.props.updateIsComplete(index);
                  this.props.isCompletedTodo(item, index);
                }}
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
    const {index, routes} = this.state;
    return (
      <View style={{flex: 1}}>
        <TabView
          navigationState={{index, routes}}
          renderScene={this.renderScene}
          onIndexChange={index => this.setState({index: index})}
          initialLayout={{width: '100%'}}
          renderTabBar={this.renderTabBar}
          tabBarPosition="bottom"
        />
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
  textInputAddNote: {
    width: '100%',
    height: 45,
    borderColor: 'white',
    borderBottomWidth: 1,
    color: 'white',
    backgroundColor: '#353434',
    textAlign: 'left',
    marginLeft: '10%',
    marginRight: '10%',
    color: 'white',
  },
  textInputSearch: {
    width: '100%',
    height: 45,
    borderColor: 'white',
    borderBottomWidth: 1,
    color: 'white',
    backgroundColor: '#353434',
    textAlign: 'left',
    marginLeft: '10%',
    marginRight: '10%',
    color: 'white',
  },
  inputContainer: {
    backgroundColor: '#353434',
    paddingBottom: '7%',
    elevation: 3,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  hiddenViewContainer: {
    width: 80,
    height: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'red',
    flexDirection: 'row',
    marginVertical: 10,
    borderRadius: 10,
    marginRight: 5,
    padding: 2,
  },
  textInput: {
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  tabIndicator: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: '25%',
    right: '25%',
    marginBottom: 4,
  },
});

const mapStateToProps = state => ({
  _todo: state.todoReducer.todo,
  _todoCompleted: state.todoReducer.completedTodo,
});

const mapDispatchToProps = {
  deleteTodoActions,
  updateIsComplete,
  todoActions,
  priorityTodo,
  isCompletedTodo,
  isVisibleOptionMenu,
  clearCompletedTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);
