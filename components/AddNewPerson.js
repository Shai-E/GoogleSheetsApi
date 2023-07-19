import {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {handleAddNewPersonAsync} from '../api/integrationWithGoogleSheetsApi';
import InputElement from './InputElement';

const AddNewPerson = ({id, updateState}) => {
  const [formState, setFormState] = useState({age: '', name: ''});

  const updateFormState = (key, newValue) => {
    setFormState(prevState => ({
      ...prevState,
      [key]: newValue,
    }));
  };

  const handleAddPerson = async () => {
    await handleAddNewPersonAsync({
      Id: id,
      Age: formState.age,
      Name: formState.name,
    });
    updateState(); // Fetch data again to display the updated values
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
      <Button title="Join" onPress={handleAddPerson} />
    </View>
  );
};

export default AddNewPerson;
