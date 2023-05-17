import React from 'react';
import {SafeAreaView} from 'react-native';
import MainNavigator from './src/navigation/navigation.js';

function App() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <MainNavigator></MainNavigator>
    </SafeAreaView>
  )
}
export default App;