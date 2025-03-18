import { FC, PropsWithChildren } from 'react';

import { View } from 'react-native';

export const StopPropagation: FC<PropsWithChildren> = ({ children }) => {
  return (
    <View onStartShouldSetResponder={() => true} onTouchEnd={e => e.stopPropagation()}>
      {children}
    </View>
  );
};
