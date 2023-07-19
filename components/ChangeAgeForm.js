import {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {handleValueChangeAsync} from '../api/integrationWithGoogleSheetsApi';
import InputElement from './InputElement';

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
    <View
      style={{
        // flex: 1,
        // backgroundColor: 'red',
        justifyContent: 'space-between',
        height: Dimensions.get('window').height * 0.1,

        borderBottomWidth: 2,
      }}>
      <Text style={{textAlign: 'center'}}>
        If there has been a mistake, insert your actual age:
      </Text>
      <InputElement
        value={newAge}
        onChangeText={setNewAge}
        placeholder="New Age"
      />
      <TouchableOpacity
        onPress={handleAgeChange}
        style={{
          width: '100%',
          alignItems: 'center',
          justify: 'center',
          backgroundColor: '#2196f3',
          color: 'white',
          justifyContent: 'center',
        }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text
            style={{
              fontWeight: 'bold',
              color: 'white',
            }}>
            UPDATE AGE
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ChangeAgeForm;
