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
import s from '~/static/style';
import {useSearchContext} from '~contexts/searchContext';

const TypeBar = memo(({searchDataHandler, route}) => {
  const types = ['All', 'Video', 'Channel', 'Playlist'];
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
const Result = memo(({searchResult, searchDataHandler, route}) => {
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
        item._id = JSON.stringify(item.id);
      }}
      renderItem={({item, index}) => {
        index === 1 && console.log(item?.snippet);

        return (
          <TouchableOpacity
            style={[s.fdr, s.pa(5), s.bg('#eee'), s.mb(15), s.shadow1]}>
            <View style={[s.w('30%'), s.pa(5)]}>
              <Image
                style={[s.w('100%'), {aspectRatio: 1 / 1}]}
                resizeMode="cover"
                source={{uri: item?.snippet?.thumbnails?.medium?.url}}
              />
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
      />
    </View>
  );
}
