import { PropsWithChildren } from 'react';

import { MenuView } from '@react-native-menu/menu';
import { useRouter } from 'expo-router';
import Snackbar from 'react-native-snackbar';
import { Track } from 'react-native-track-player';
import { match } from 'ts-pattern';

type TrackShortcutsMenuProps = PropsWithChildren<{ track: Track }>;

export const TrackShortcutsMenu = ({ track, children }: TrackShortcutsMenuProps) => {
  const router = useRouter();

  const handlePressAction = (id: string) => {
    match(id)
      .with('add-to-playlist', () => {
        // @ts-expect-error it should work
        router.push({ pathname: 'addToPlaylist', params: { trackUrl: track.url } });
      })
      .otherwise(() => console.warn(`Unknown menu action ${id}`));
  };

  return (
    <MenuView
      onPressAction={({ nativeEvent: { event } }) => handlePressAction(event)}
      actions={[
        {
          id: 'add-to-playlist',
          title: 'Add to playlist',
        },
      ]}
    >
      {children}
    </MenuView>
  );
};
