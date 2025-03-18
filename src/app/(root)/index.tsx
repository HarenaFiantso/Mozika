import { View } from 'react-native';

import { Album, Artists, Navbar, Tracks } from '@/components';
import { useArtists } from '@/store/library-store';

export default function Home() {
  return (
    <View className="flex-1 bg-black">
      <Navbar
        tabs={[
          {
            name: 'Tracks',
            component: <Tracks />,
          },
          {
            name: 'Artists',
            component: <Artists />,
          },
        ]}
      />
    </View>
  );
}
