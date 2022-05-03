import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Button,
} from 'react-native';
import React, {useState, useEffect, useCallback, useRef} from 'react';
import TableItem from './TableItem';
import Loader from './Loader';

const Table = ({navigation}) => {
  const [tableData, setTableData] = useState([]);
  const [visibleTableData, setVisibleTableData] = useState([]);
  const [cursor, setCursor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const scrollPosition = useRef(null);
  const [scroll, setScroll] = useState();
  // const newScrollPosition = useRef(null);
  const [scrollRef, setScrollRef] = useState();

  // useEffect(() => {
  //   console.log(scroll);
  //   // newScrollPosition.scrollTo({y: 40, animated: true});
  //   scrollRef.scrollTo({x: scroll, y: 0, animated: false});
  // }, [scroll, scrollRef]);

  // https://620c0082b573632593845707.mockapi.io/table
  useEffect(() => {
    loadTableItems();
  }, [loadTableItems]);

  const loadTableItems = useCallback(() => {
    setIsLoading(true);
    console.log('load');
    console.log('cursor', cursor);
    fetch(`https://callbook-core.herokuapp.com/v1/records?cursor=${cursor}`)
      .then(response => response.json())
      .then(json => {
        setCursor(json.data.next);
        setIsLoading(false);
        setRefreshing(false);
        setTableData([...tableData, ...json.data.items]);
      });
  }, [cursor, tableData]);

  return (
    <SafeAreaView style={styles.container}>
      <Button
        onPress={() => {
          console.log(scrollPosition.current);
          // console.log(newScrollPosition);
          // newScrollPosition.current.scrollTo({x: 40, y: 0, animated: false});
          scrollRef.scrollTo({
            x: scrollPosition.current,
            y: 0,
            animated: false,
          });
        }}
        title="Sync"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      {tableData.length ? (
        <View>
          <ScrollView
            style={{paddingLeft: 20}}
            horizontal={true}
            ref={ref => {
              // newScrollPosition.current = ref;
              setScrollRef(ref);
            }}>
            <TableItem />
          </ScrollView>
          <ScrollView
            style={styles.tableContainer}
            horizontal={true}
            onScroll={e => {
              // setScroll(e.nativeEvent.contentOffset.x);
              scrollPosition.current = e.nativeEvent.contentOffset.x;
            }}>
            <FlatList
              style={styles.listContainer}
              data={tableData}
              renderItem={TableItem}
              keyExtractor={item => item.id}
              contentContainerStyle={{
                padding: 20,
                paddingBottom: 30,
                paddingTop: 0,
              }}
              onEndReached={() => loadTableItems(cursor)}
              refreshControl={
                <RefreshControl
                  progressViewOffset={20}
                  colors={['#9Bd35A', '#689F38']}
                  refreshing={refreshing}
                  onRefresh={() => {
                    setCursor('');
                    setTableData([]);
                    loadTableItems();
                  }}
                />
              }
            />
          </ScrollView>
        </View>
      ) : (
        <ActivityIndicator size={'large'} />
      )}
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default Table;

const styles = StyleSheet.create({
  tableContainer: {},
  listContainer: {},
  rowContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 30,
    left: 185,
  },
});
