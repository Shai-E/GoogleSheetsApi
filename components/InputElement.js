import {Platform, TextInput} from 'react-native';

const InputElement = props => {
  return (
    <TextInput
      {...props}
      style={[props.style, Platform.OS === 'ios' ? {height: 30} : null]}
    />
  );
};

export default InputElement;
