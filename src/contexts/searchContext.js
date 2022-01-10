import axios from 'axios';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {AsyncStorage} from 'react-native';
// import {AsyncStorage} from 'react-native';

const Context = createContext({});

export const useSearchContext = () => useContext(Context);
const storeData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@search_history', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getData = async fn => {
  let value = [];
  try {
    const res = await AsyncStorage.getItem('@search_history');
    if (res) value = JSON.parse(res);
  } catch (e) {
    console.log(e);
  } finally {
    fn && fn(value);
    return value;
  }
};

const searchYoutubeApi = async params => {
  try {
    const res = await axios.get(
      'https://youtube.googleapis.com/youtube/v3/search',
      {
        params: {
          ...params,
          key: 'AIzaSyDtqgw8f2dbgzIHIshuP9PTlhTI3Mjq6B4',
          part: 'snippet',
        },
      },
    );

    return res?.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const SearchScreenProvider = ({children}) => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState({});
  const [isFocusInputSearch, setIsFocusInputSearch] = useState(false);
  const navigation = useContext(NavigationContext);

  const addHistory = useCallback(
    val => {
      let newHistory = [...searchHistory];
      val = val?.trim();
      if (newHistory?.indexOf(val) >= 0)
        newHistory?.splice(newHistory?.indexOf(val), 1);
      newHistory.push(val);
      console.log({newHistory});
      if (newHistory?.length > 20)
        newHistory = newHistory.splice(newHistory.length - 20, 20);
      storeData(newHistory);
      setSearchHistory(newHistory);
    },
    [searchHistory],
  );
  const removeHistory = useCallback(
    key => {
      let newHistory = [...searchHistory];
      if (key === true) newHistory = [];
      newHistory = newHistory.filter(s => s !== key);
      setSearchHistory(newHistory);
      storeData(newHistory);
    },
    [searchHistory],
  );
  const searchDataHandler = useCallback(
    async (params, add = false) => {
      const data = await searchYoutubeApi({...params, maxResults: 10});
      if (data) {
        add
          ? setSearchResult(oldData => ({
              ...oldData,
              ...data,
              items: [...oldData?.items, ...data?.items],
            }))
          : setSearchResult(data);
      }
      navigation.setParams({params});
    },
    [navigation],
  );
  const searchHandler = useCallback(
    async keyword => {
      let key = searchValue;
      if (keyword) {
        key = keyword?.trim();
        setSearchValue(key);
      }
      addHistory(key);
      // Xử lý tìm kiếm
      searchDataHandler({q: key});
      navigation.navigate('SearchScreen', {screen: 'SearchResult'});
    },
    [addHistory, searchDataHandler, searchValue, navigation],
  );
  useEffect(() => {
    getData(val => {
      setSearchHistory(val);
    });
  }, []);
  const value = useMemo(
    () => ({
      searchHistory,
      searchValue,
      isFocusInputSearch,
      searchResult,
      setSearchValue,
      searchHandler,
      removeHistory,
      setIsFocusInputSearch,
      searchDataHandler,
    }),
    [
      searchHistory,
      searchValue,
      isFocusInputSearch,
      searchResult,
      searchHandler,
      removeHistory,
      searchDataHandler,
    ],
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
