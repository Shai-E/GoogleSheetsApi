import {useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {handleValueChangeAsync} from '../api/integrationWithGoogleSheetsApi';
import InputElement from './InputElement';
import ButtonElement from './ButtonElement';

const ChangeAgeForm = ({id, updateState}) => {
  const [newAge, setNewAge] = useState('');
  const [isLoading, setIsLoading] = useState();

  const handleAgeChange = async () => {
    setIsLoading(true);
    await handleValueChangeAsync('Age', newAge, id);
    updateState(); // Fetch data again to display the updated values
    setNewAge('');
    setIsLoading(false);
  };
  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>
        If there has been a mistake, insert your actual age:
      </Text>
      <InputElement
        value={newAge}
        onChangeText={setNewAge}
        placeholder="New Age"
      />
      <ButtonElement
        onPress={handleAgeChange}
        title={'UPDATE AGE'}
        isLoading={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    justifyContent: 'space-between',
    height: Dimensions.get('window').height * 0.1,
    borderBottomWidth: 2,
  },
  title: {textAlign: 'center'},
});

export default ChangeAgeForm;
