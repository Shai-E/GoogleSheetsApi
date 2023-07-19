// const isDarkMode = useColorScheme() === 'dark';
import React from 'react';
import InfoPage from './containers/InfoPage';
import {SafeAreaView} from 'react-native';

const GoogleSheetsApp = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <InfoPage />
    </SafeAreaView>
  );
};

export default GoogleSheetsApp;
