import { useLayoutEffect, useState } from 'react';

import { useNavigation } from 'expo-router';
import { SearchBarProps } from 'react-native-screens';

const defaultSearchOptions: SearchBarProps = {
  tintColor: '#fc3c44',
  hideWhenScrolling: false,
};

export const useNavigationSearch = ({
  searchBarOptions,
}: {
  searchBarOptions?: SearchBarProps;
}) => {
  const [search, setSearch] = useState('');

  const navigation = useNavigation();

  const handleOnChangeText: SearchBarProps['onChangeText'] = ({ nativeEvent: { text } }) => {
    setSearch(text);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        ...defaultSearchOptions,
        ...searchBarOptions,
        onChangeText: handleOnChangeText,
      },
    });
  }, [navigation, searchBarOptions]);

  return search;
};
