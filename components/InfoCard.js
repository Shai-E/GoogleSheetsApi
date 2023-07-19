import React from 'react';
import {Text, Pressable} from 'react-native';
import {isOfAge} from '../utils/validators';

const InfoCard = ({name, age, id, setCurrentPerson, active}) => {
  const over18 = isOfAge(age);
  const background = over18 ? '#00FF007F' : '#FFFF007F';
  return (
    <Pressable
      hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
      style={{
        flexDirection: 'row',
        paddingHorizontal: '2.5%',
        borderWidth: active ? 2 : 0,
        backgroundColor: background,
        borderColor: 'black',
        marginVertical: '2.5%',
        marginHorizontal: '5%',
        borderRadius: 100,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
      }}
      onPress={() => setCurrentPerson(id)}>
      <Text
        style={{
          fontWeight: active ? 'bold' : '400',
        }}>
        {name} is {age} years old.
      </Text>
      {!over18 && <Text>⛔</Text>}
    </Pressable>
  );
};

export default InfoCard;
