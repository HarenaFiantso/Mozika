import { useEffect, useState } from 'react';

import { getColors } from 'react-native-image-colors';
import { IOSImageColors } from 'react-native-image-colors/build/types';

export const usePlayerBackground = (imageUrl: string) => {
  const [imageColors, setImageColors] = useState<IOSImageColors | null>(null);

  useEffect(() => {
    getColors(imageUrl, {
      fallback: '#000',
      cache: true,
      key: imageUrl,
    }).then((colors: any) => setImageColors(colors as IOSImageColors));
  }, [imageUrl]);

  return { imageColors };
};
