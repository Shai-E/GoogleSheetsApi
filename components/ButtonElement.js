import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const ButtonElement = ({isLoading, onPress, title}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justify: 'center',
    backgroundColor: '#2196f3',
    color: 'white',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ButtonElement;
