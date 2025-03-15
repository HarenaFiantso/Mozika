import { View } from 'react-native';

import { Album, Artists, Navbar, Tracks } from '@/components';

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
          {
            name: 'Albums',
            component: <Album />,
          },
        ]}
      />
    </View>
  );
}
