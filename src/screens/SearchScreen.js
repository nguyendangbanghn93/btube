import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import s from '~/static/style';
import SearchBar from '~components/Search/SearchBar';
import SearchHistory from '~components/Search/SearchHistory';
import {SearchScreenProvider} from '~contexts/searchContext';
import SearchResult from '~components/Search/SearchResult';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const SearchStack = createNativeStackNavigator();

const StackContainer = () => (
  <SearchStack.Navigator initialRouteName="SearchHistory">
    <SearchStack.Screen name="SearchHistory" component={SearchHistory} />
    <SearchStack.Screen name="SearchResult" component={SearchResult} />
  </SearchStack.Navigator>
);

const SearchScreenImplement = ({navigation, route}) => {
  return (
    <SearchStack.Navigator
      initialRouteName="SearchHistory"
      screenOptions={{
        headerShown: false,
      }}>
      <SearchStack.Screen name="SearchHistory" component={SearchHistory} />
      <SearchStack.Screen name="SearchResult" component={SearchResult} />
    </SearchStack.Navigator>
  );
};
export default function SearchScreen(props) {
  return (
    <SearchScreenProvider>
      <SearchBar navigation={props.navigation} />
      <SearchScreenImplement {...props} />
    </SearchScreenProvider>
  );
}
