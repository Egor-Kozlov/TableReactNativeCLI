// import React from 'react';
// import {StyleSheet} from 'react-native';
// import Animated, {
//   useAnimatedScrollHandler,
//   useSharedValue,
// } from 'react-native-reanimated';
// import {Page} from './Page';

// const WORDS = ["What's", 'up', 'mobile', 'devs?'];

// export default function Test() {
//   const translateX = useSharedValue(0);

//   const scrollHandler = useAnimatedScrollHandler(event => {
//     translateX.value = event.contentOffset.x;
//   });

//   return (
//     <Animated.ScrollView
//       onScroll={scrollHandler}
//       pagingEnabled
//       scrollEventThrottle={16}
//       horizontal
//       style={styles.container}>
//       {WORDS.map((title, index) => {
//         return (
//           <Page
//             key={index.toString()}
//             title={title}
//             translateX={translateX}
//             index={index}
//           />
//         );
//       })}
//     </Animated.ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });

import {
  StyleSheet,
  Text,
  FlatList,
  Button,
  View,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const Test = () => {
  const [music, setMusic] = useState(null);

  useEffect(() => {
    fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
      .then(res => res.json())
      .then(data => setMusic(data));
  }, []);

  const Item = ({title, logoLink}) => (
    <View style={styles.item}>
      <Text>{title}</Text>
      <Image
        style={styles.logo}
        source={{
          uri: logoLink,
        }}
      />
    </View>
  );

  const renderItem = ({item}) => (
    <Item title={item['im:name'].label} logoLink={item['im:image'][1].label} />
  );

  return (
    <View style={styles.container}>
      {music ? (
        <FlatList
          data={music.feed.entry}
          renderItem={renderItem}
          keyExtractor={item => item.id.attributes['im:id']}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  item: {
    borderWidth: 1,
    padding: 10,
  },
  logo: {
    width: 60,
    height: 60,
  },
});
