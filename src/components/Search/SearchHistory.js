import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import s from '~/static/style';
import {useSearchContext} from '~contexts/searchContext';

export default function SearchHistory() {
  const {
    searchHistory,
    searchHandler,
    removeHistory,
    isFocusInputSearch,
    searchValue,
  } = useSearchContext();
  return (
    <View>
      <TouchableOpacity
        style={[s.fdr, s.jcc, s.aic, s.pa(10)]}
        onPress={() => {
          Alert.alert(
            'Xác nhận',
            'Bạn có chắc chắn muốn xóa tất cả lịch sử tìm kiếm!',
            [
              {text: 'Cancel'},
              {text: 'OK', onPress: () => removeHistory(true)},
            ],
          );
        }}>
        <Icon name="delete" type="ant-design" size={14} color={'#666'} />
        <Text style={[s.c('#666'), s.ml(5)]}>Xóa lịch sử tìm kiếm</Text>
      </TouchableOpacity>
      <ScrollView>
        {[...searchHistory]?.reverse()?.map((v, i) => {
          if (isFocusInputSearch && !v.includes(searchValue)) return null;
          return (
            <TouchableOpacity
              onPress={() => searchHandler(v)}
              key={i}
              style={[
                s.ptb(10),
                s.plr(5),
                s.mlr(5),
                s.bb(1),
                s.bbc('#ddd'),
                s.fdr,
                s.jcsb,
              ]}>
              <Text>{v}</Text>
              <Icon
                name="close"
                type="font-awesome"
                size={14}
                onPress={() => removeHistory(v)}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
