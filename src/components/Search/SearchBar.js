import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import s from '~/static/style';
import {useSearchContext} from '~contexts/searchContext';
export default function SearchBar({navigation}) {
  const {searchHandler, searchValue, setSearchValue, setIsFocusInputSearch} =
    useSearchContext();

  const clickSearch = () => {
    searchHandler();
  };
  const focusHandler = () => {
    setIsFocusInputSearch(true);
    navigation.navigate('SearchScreen', {screen: 'SearchHistory'});
  };
  return (
    <View
      style={[
        s.fdr,
        s.jcsb,
        s.aic,
        s.w('100%'),
        s.pa(10),
        s.bb(1),
        s.bbc('#ddd'),
      ]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" type="font-awesome" size={16} />
      </TouchableOpacity>
      <View style={[s.plr(10), s.fg1, s.por, s.w('80%')]}>
        <TextInput
          onFocus={focusHandler}
          onBlur={() => setIsFocusInputSearch(false)}
          onSubmitEditing={() => searchHandler()}
          style={[s.bg('#ddd'), s.pa(5), s.pr(25)]}
          onChangeText={setSearchValue}
          value={searchValue}
        />
        {!searchValue ? null : (
          <TouchableOpacity
            style={[
              s.poa,
              s.t0,
              s.r0,
              s.z(99),
              s.h('100%'),
              s.fdr,
              s.aic,
              s.aic,
              s.pr(15),
            ]}
            onPress={() => setSearchValue('')}>
            <Icon name="close" type="font-awesome" size={14} />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity onPress={clickSearch}>
        <Icon name="search" type="font-awesome" size={18} />
      </TouchableOpacity>
    </View>
  );
}
