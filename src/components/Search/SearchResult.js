import React, {memo} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  TouchableOpacityComponent,
} from 'react-native';
import {Icon} from 'react-native-elements';
import s from '~/static/style';
import {useSearchContext} from '~contexts/searchContext';
import md5 from 'react-native-md5';
import axios from 'axios';
const TypeBar = memo(({searchDataHandler, route}) => {
  const types = ['All', 'Video', 'Playlist'];
  return (
    <ScrollView horizontal style={[s.fdr, s.pa(10), s.bb(1), s.bbc('#ddd')]}>
      {types.map((t, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => {
            searchDataHandler({
              ...route?.params,
              type: t !== 'All' ? t?.toLowerCase() : null,
            });
          }}>
          <Text
            style={[
              s.pa(5),
              s.bw(1),
              s.bra(10),
              s.bc('#ddd'),
              s.ml(5),
              s.oh,
              ...(route?.params?.type === t.toLowerCase() ||
              (!route?.params?.type && t === 'All')
                ? [s.bg('#3C99FC'), s.cf]
                : []),
            ]}>
            {t}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
});
const Result = memo(({searchResult, searchDataHandler, route, navigation}) => {
  return (
    <FlatList
      ListHeaderComponent={
        <View style={[s.fdr, s.jcc, s.pa(5)]}>
          <Text style={[s.c('#666')]}>
            Tổng số kết quả: {searchResult?.pageInfo?.totalResults || 0}
          </Text>
        </View>
      }
      data={searchResult?.items}
      // inverted
      // enableAutoscrollToTop={enableAutoscrollToTop}
      onEndReached={() => {
        searchDataHandler(
          {
            ...route.params,
            pageToken: searchResult?.nextPageToken,
          },
          true,
        );
      }}
      keyExtractor={(item, index) => {
        item._id = md5.str_md5(JSON.stringify(item));
      }}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            onPress={async () => {
              navigation.navigate('VideoScreen', {...item.id});
            }}
            style={[s.fdr, s.pa(5), s.bg('#eee'), s.mb(15), s.shadow1]}>
            <View style={[s.w('30%'), s.pa(5), s.por]}>
              <View style={s.por}>
                {item.id.kind === 'youtube#video' && (
                  <View
                    style={[
                      s.poa,
                      s.r0,
                      s.t0,
                      s.b0,
                      s.l0,
                      s.z(1),
                      s.fdr,
                      s.jcc,
                      s.aic,
                    ]}>
                    <View
                      style={[
                        s.bg('#0000008a'),
                        s.pa(10),
                        s.bra(10),
                        s.oh,
                        s.bra(50),
                      ]}>
                      <Icon
                        name="caretright"
                        type="ant-design"
                        size={16}
                        color={'#fff'}
                      />
                    </View>
                  </View>
                )}
                {item.id.kind === 'youtube#playlist' && (
                  <View
                    style={[
                      s.poa,
                      s.r0,
                      s.t0,
                      s.b0,
                      s.z(1),
                      s.fdr,
                      s.jcc,
                      s.aic,
                      s.w('40%'),
                      s.bg('#0000008a'),
                    ]}>
                    <Icon
                      name="menu-fold"
                      type="ant-design"
                      size={16}
                      color={'#fff'}
                    />
                  </View>
                )}
                {item.id.kind === 'youtube#channel' && (
                  <Text style={[s.c('red')]}>channel</Text>
                )}
                <Image
                  style={[s.w('100%'), {aspectRatio: 1 / 1}]}
                  resizeMode="cover"
                  source={{uri: item?.snippet?.thumbnails?.medium?.url}}
                />
              </View>
            </View>
            <View style={[s.w('70%'), s.pa(5)]}>
              <Text style={[s.fwb]} numberOfLines={2}>
                {item?.snippet?.title}
              </Text>
              <Text style={[s.mt(10)]} numberOfLines={3}>
                {item?.snippet?.description}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
});
export default function SearchResult(props) {
  const {searchResult, searchDataHandler} = useSearchContext();
  return (
    <View>
      <TypeBar route={props.route} searchDataHandler={searchDataHandler} />
      <Result
        searchResult={searchResult}
        searchDataHandler={searchDataHandler}
        route={props.route}
        navigation={props.navigation}
      />
    </View>
  );
}
