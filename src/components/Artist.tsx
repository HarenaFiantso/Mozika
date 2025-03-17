import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import { unknownArtistImageUri } from '@/constants/images';
import { useArtists } from '@/store/library-store';
import { Link } from 'expo-router';

const ItemSeparatorComponent = () => {
  return <View style={[styles.itemSeparator, { marginLeft: 50, marginVertical: 12 }]} />;
};

export const Artists = () => {
  const artists = useArtists();

  return (
    <View className="flex-1">
      <ScrollView style={{ paddingHorizontal: 24 }} contentInsetAdjustmentBehavior="automatic">
        <FlatList
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 120 }}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListFooterComponent={ItemSeparatorComponent}
          scrollEnabled={false}
          ListEmptyComponent={
            <View className="items-center justify-center">
              <Text className="text-2xl text-white">No artist found</Text>
            </View>
          }
          data={artists}
          renderItem={({ item: artist }) => {
            return (
              <Link href={`/artists/${artist.name}`} asChild>
                <TouchableHighlight activeOpacity={0.8}>
                  <View style={styles.artistItemContainer}>
                    <View>
                      <Image
                        source={{
                          uri: artist.tracks[0].artwork,
                        }}
                        style={styles.artistImage}
                      />
                    </View>

                    <View style={{ width: '100%' }}>
                      <Text numberOfLines={1} style={styles.artistNameText}>
                        {artist.name}
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>
              </Link>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  itemSeparator: {
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    opacity: 0.3,
  },
  emptyContentImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 40,
    opacity: 0.3,
  },
  artistItemContainer: {
    flexDirection: 'row',
    columnGap: 14,
    alignItems: 'center',
  },
  artistImage: {
    borderRadius: 32,
    width: 40,
    height: 40,
  },
  artistNameText: {
    color: 'white',
    fontSize: 17,
    maxWidth: '80%',
  },
});
