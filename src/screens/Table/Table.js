import {
  ActivityIndicator,
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Text,
} from 'react-native';
import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  useSharedValue,
  useAnimatedRef,
  useDerivedValue,
  scrollTo,
} from 'react-native-reanimated';
import AwesomeButton from 'react-native-really-awesome-button';
import TableItem from './TableItem';
import TableHeader from './TableHeader';
import COLORS from '../../services/colors';
import styles from './styles';

const Table = ({navigation}) => {
  const [tableData, setTableData] = useState([]);
  const [cursor, setCursor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const scrollPosition = useRef(null);

  const aref = useAnimatedRef(scrollPosition.current);
  const scroll = useSharedValue(0);
  useDerivedValue(() => {
    scrollTo(aref, scroll.value, 0, false);
  });

  useEffect(() => {
    loadTableItems();
  }, [loadTableItems]);

  const loadTableItems = useCallback(() => {
    setIsLoading(true);
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
      {tableData.length ? (
        <>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            style={styles.headerScroll}
            horizontal={true}
            ref={aref}>
            <TableHeader />
          </ScrollView>
          <ScrollView
            style={styles.tableContainer}
            horizontal={true}
            onScroll={e => {
              scroll.value = e.nativeEvent.contentOffset.x;
            }}>
            <FlatList
              scrollEnabled={true}
              style={styles.listContainer}
              data={tableData}
              renderItem={TableItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.tableContent}
              onEndReached={() => loadTableItems(cursor)}
              refreshControl={
                <RefreshControl
                  progressViewOffset={20}
                  colors={[COLORS.blue, COLORS.darkBlue]}
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
        </>
      ) : (
        <ActivityIndicator
          style={{paddingTop: 20}}
          size={'large'}
          color={COLORS.blue}
        />
      )}
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={'large'} color={COLORS.blue} />
        </View>
      ) : null}
      <AwesomeButton
        style={styles.addButton}
        width={80}
        height={81}
        borderRadius={80}
        backgroundColor={COLORS.blue}
        backgroundDarker={'#072947'}>
        <Text style={styles.textAddButton}>+</Text>
      </AwesomeButton>
    </SafeAreaView>
  );
};

export default Table;
