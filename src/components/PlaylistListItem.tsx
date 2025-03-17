import { FC } from 'react';

import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableHighlightProps,
  View,
} from 'react-native';

import { Playlist } from '@/utils/types';
import { AntDesign } from '@expo/vector-icons';

type PlaylistListItemProps = {
  playlist: Playlist;
} & TouchableHighlightProps;

export const PlaylistListItem: FC<PlaylistListItemProps> = ({ playlist, ...props }) => {
  return (
    <TouchableHighlight activeOpacity={0.8} {...props}>
      <View style={styles.playlistItemContainer}>
        <View>
          <Image
            source={{
              uri: playlist.artworkPreview,
            }}
            style={styles.playlistArtworkImage}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Text numberOfLines={1} style={styles.playlistNameText}>
            {playlist.name}
          </Text>

          <AntDesign name="right" size={16} color="white" style={{ opacity: 0.5 }} />
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  playlistItemContainer: {
    flexDirection: 'row',
    columnGap: 14,
    alignItems: 'center',
    paddingRight: 90,
  },
  playlistArtworkImage: {
    borderRadius: 8,
    width: 70,
    height: 70,
  },
  playlistNameText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
    maxWidth: '80%',
  },
});
