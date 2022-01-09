import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import s from '~/static/style';
import Routes from '~Routes';

export default function App() {
  return (
    <SafeAreaView style={[s.container]}>
      <Routes />
    </SafeAreaView>
  );
}
