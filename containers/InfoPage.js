import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import InfoCard from '../components/InfoCard';
import {fetchDataFromSpreadsheetAsync} from '../api/integrationWithGoogleSheetsApi';
import ChangeAgeForm from '../components/ChangeAgeForm';
import AddNewPerson from '../components/AddNewPerson';
import {useKeyboardState} from '../hooks/useKeyboardState';

const InfoPage = () => {
  const [data, setData] = useState([]);
  const [currentPerson, setCurrentPerson] = useState();
  const isKeyboardOpen = useKeyboardState();
  const scrollViewRef = useRef();

  useEffect(() => {
    updateState();
  }, []);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({animated: true});
  }, [data]);

  const updateState = async () => {
    const values = await fetchDataFromSpreadsheetAsync();
    const newData = values
      ?.slice(1)
      .map((row, rowIndex) =>
        row.reduce((acc, cellValue, columnIndex) => {
          return cellValue
            ? [
                ...acc,
                {
                  value: cellValue,
                  coordinates: `${String.fromCharCode(65 + columnIndex)}${
                    rowIndex + 1
                  }`,
                },
              ]
            : acc;
        }, []),
      )
      .filter(row => row.length > 0);
    setData(newData);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setCurrentPerson(null);
      }}>
      <View style={{flex: 1, justifyContent: 'flex-start'}}>
        {data?.length === 0 ? (
          <Text>No data found.</Text>
        ) : (
          <>
            <AddNewPerson id={data?.length + 1} updateState={updateState} />
            <View style={{flex: 1, justifyContent: 'space-between'}}>
              <View style={{flex: 1}}>
                {currentPerson && (
                  <ChangeAgeForm id={currentPerson} updateState={updateState} />
                )}
                <View
                  style={{
                    height: '20%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text>Welcome to The List</Text>
                  <Text>Are You In?</Text>
                </View>
                <KeyboardAvoidingView>
                  <View
                    style={{
                      height: isKeyboardOpen
                        ? Platform.OS === 'ios'
                          ? currentPerson
                            ? '46%'
                            : '58%'
                          : currentPerson
                          ? '75%'
                          : '89%'
                        : currentPerson
                        ? '83%'
                        : '90%',
                    }}>
                    <ScrollView
                      ref={scrollViewRef}
                      contentContainerStyle={{
                        justifyContent: 'space-between',
                      }}>
                      {data?.map((row, index) => (
                        <InfoCard
                          key={index}
                          name={row[1].value}
                          age={row[2].value}
                          id={row[0].value}
                          active={row[0].value === currentPerson}
                          setCurrentPerson={setCurrentPerson}
                        />
                      ))}
                    </ScrollView>
                  </View>
                </KeyboardAvoidingView>
              </View>
            </View>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default InfoPage;
