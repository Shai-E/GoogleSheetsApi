import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import InfoCard from '../components/InfoCard';
import {fetchDataFromSpreadsheetAsync} from '../api/integrationWithGoogleSheetsApi';
import ChangeAgeForm from '../components/ChangeAgeForm';
import AddNewPerson from '../components/AddNewPerson';
import {useKeyboardState} from '../hooks/useKeyboardState';

const InfoPage = () => {
  const [data, setData] = useState([]);
  const [currentPerson, setCurrentPerson] = useState('1');
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

  const currHeight = isKeyboardOpen
    ? Platform.OS === 'ios'
      ? currentPerson
        ? '46%'
        : '58%'
      : currentPerson
      ? '75%'
      : '89%'
    : currentPerson
    ? '83%'
    : '90%';

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setCurrentPerson(null);
      }}>
      <View style={styles.screen}>
        {data?.length === 0 ? (
          <Text>No data found.</Text>
        ) : (
          <>
            <AddNewPerson id={data?.length + 1} updateState={updateState} />
            <View style={styles.container}>
              <View style={{flex: 1}}>
                {currentPerson && (
                  <ChangeAgeForm id={currentPerson} updateState={updateState} />
                )}
                <View style={styles.header}>
                  <Text>Welcome to The List</Text>
                  <Text>Are You In?</Text>
                </View>
                <KeyboardAvoidingView>
                  <View style={{height: currHeight}}>
                    <ScrollView
                      ref={scrollViewRef}
                      contentContainerStyle={styles.scrollview}>
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

const styles = StyleSheet.create({
  screen: {flex: 1, justifyContent: 'flex-start'},
  header: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {flex: 1, justifyContent: 'space-between'},
  scrollview: {
    justifyContent: 'space-between',
  },
});

export default InfoPage;
