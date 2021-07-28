import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {iconType} from '../config/Helper';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useSelector} from 'react-redux';

const Header = props => {
  const index = props.index;
  return (
    <View
      style={{
        paddingTop: '10%',
        paddingLeft: '5%',
        backgroundColor: '#353434',
        paddingBottom: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
        {props.title}
      </Text>
      {index == 1 ? (
        <Menu
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MenuTrigger>
            <Icon
              name="options-vertical"
              type={iconType.simpleLineIcon}
              size={20}
              color="white"
            />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsWrapper: {padding: 5, marginBottom: 10},
              optionsContainer: {
                width: '30%',
                height: '10%',
                marginTop: '2%',
                margin: '-5%',
              },
            }}>
            <MenuOption onSelect={props.clear}>
              <Text style={{fontSize: 20, textAlign: 'center'}}>Clear</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      ) : null}
    </View>
  );
};

export default Header;
