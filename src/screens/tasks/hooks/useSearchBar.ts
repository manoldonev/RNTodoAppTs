import { useLayoutEffect } from 'react';
import { useAtom } from 'jotai';
import { useTailwind } from '@theming';
import { queryAtom } from '../atoms';
import type { TasksHomeNavigationProp } from '../types';

const useSearchBar = (navigation: TasksHomeNavigationProp): void => {
  const tw = useTailwind();
  const [, setQuery] = useAtom(queryAtom);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: (event) => setQuery(event.nativeEvent.text),
        textColor: tw.color('text-on-primary'),
        headerIconColor: tw.color('text-on-primary'),
        hintTextColor: tw.color('text-on-primary-variant'),
        shouldShowHintSearchIcon: false /* search icon color customization not exposed... */,
        placeholder: 'Search',
      },
    });
  }, [navigation, tw, setQuery]);
};

export { useSearchBar };
