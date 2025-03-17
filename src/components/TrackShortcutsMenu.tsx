import { MenuView } from '@react-native-menu/menu';
import { useRouter } from 'expo-router';
import { PropsWithChildren } from 'react';
import { match } from 'ts-pattern';
import Snackbar from 'react-native-snackbar';

type TrackShortcutsMenuProps = PropsWithChildren

export const TrackShortcutsMenu = ({ children }: TrackShortcutsMenuProps) => {
  const router = useRouter();

  const handlePressAction = (id: string) => {
    match(id)
      .with('add-to-playlist', () => {
        // TODO: Handle the playlist creation
        Snackbar.show({
          text: 'Added to playlist',
          duration: Snackbar.LENGTH_SHORT,
        });
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
