import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import s from '~/static/style';
import YouTube from 'react-native-youtube';
export default function VideoScreen({route, navigation}) {
  const videoId = route?.params?.videoId;
  console.log('____ ', videoId);

  return (
    <View>
      <Text>VideoScreen</Text>
      <YouTube
        apiKey="AIzaSyDtqgw8f2dbgzIHIshuP9PTlhTI3Mjq6B4"
        videoId={videoId}
      />
    </View>
  );
}
