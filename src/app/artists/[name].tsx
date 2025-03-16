import { ScrollView, View } from 'react-native';

import { ArtistTracksList } from '@/components';
import { useArtists } from '@/store/library-store';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import Snackbar from 'react-native-snackbar';

export default function ArtistDetails() {
  const { name: artistName } = useLocalSearchParams<{ name: string }>();
  const router = useRouter();

  const artists = useArtists();

  const artist = artists.find(artist => artist.name === artistName);

  if (!artist) {
    Snackbar.show({
      text: `Artist ${artistName} not found!`,
      duration: Snackbar.LENGTH_INDEFINITE,
      action: {
        text: 'UNDO',
        textColor: 'green',
        onPress: () => router.push('/(root)'),
      },
    });

    return <Redirect href={'/(root)'} />;
  }

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ paddingHorizontal: 10 }}>
        <ArtistTracksList artist={artist} />
      </ScrollView>
    </View>
  );
}
