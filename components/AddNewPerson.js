import {useState} from 'react';
import {Text, View} from 'react-native';
import {handleAddNewPersonAsync} from '../api/integrationWithGoogleSheetsApi';
import InputElement from './InputElement';
import ButtonElement from './ButtonElement';

const AddNewPerson = ({id, updateState}) => {
  const initialFormState = {age: '', name: ''};
  const [formState, setFormState] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);

  const updateFormState = (key, newValue) => {
    setFormState(prevState => ({
      ...prevState,
      [key]: newValue,
    }));
  };

  const handleAddPerson = async () => {
    setIsLoading(true);
    await handleAddNewPersonAsync({
      Id: id,
      Age: formState.age,
      Name: formState.name,
    });
    updateState(); // Fetch data again to display the updated values
    setIsLoading(false);
    setFormState(initialFormState);
  };
  return (
    <View style={{borderBottomWidth: 2}}>
      <Text style={{textAlign: 'center'}}>New around here? Join The List!</Text>
      <InputElement
        value={formState.name}
        onChangeText={newValue => updateFormState('name', newValue)}
        placeholder="Name"
      />
      <InputElement
        value={formState.age}
        onChangeText={newValue => updateFormState('age', newValue)}
        placeholder="Age"
      />
      <ButtonElement
        title="Join"
        onPress={handleAddPerson}
        isLoading={isLoading}
      />
    </View>
  );
};

export default AddNewPerson;
