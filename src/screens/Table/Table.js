import {
  ActivityIndicator,
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Text,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useDerivedValue,
  useAnimatedRef,
  scrollTo,
} from 'react-native-reanimated';
import AwesomeButton from 'react-native-really-awesome-button';
import TableItem from './TableItem';
import TableHeader from './TableHeader';
import COLORS from '../../services/colors';
import styles from './styles';
import RenderFirstColumn from './RenderFirstColumn';

const Table = ({navigation}) => {
  const [tableData, setTableData] = useState([]);
  const [cursor, setCursor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(true);

  const firstColumnRef = useAnimatedRef();
  const translationY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    translationY.value = event.contentOffset.y;
  });
  useDerivedValue(() => {
    scrollTo(firstColumnRef, 0, translationY.value, false);
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
    <SafeAreaView>
      {tableData.length ? (
        <View style={styles.tableContainer}>
          <View>
            <View style={styles.idSection}>
              <Text>ID</Text>
            </View>
            <FlatList
              style={styles.firstColumn}
              data={tableData}
              keyExtractor={item => item.id}
              renderItem={RenderFirstColumn}
              ref={firstColumnRef}
              scrollEventThrottle={1}
            />
          </View>
          <ScrollView style={styles.tableContainer} horizontal>
            <View>
              <TableHeader />
              <Animated.FlatList
                scrollEnabled={true}
                style={styles.listContainer}
                data={tableData}
                renderItem={TableItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.tableContent}
                onEndReached={() => loadTableItems(cursor)}
                scrollEventThrottle={1}
                onScroll={scrollHandler}
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
            </View>
          </ScrollView>
        </View>
      ) : (
        <ActivityIndicator
          style={styles.firstLoadingIndicator}
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
