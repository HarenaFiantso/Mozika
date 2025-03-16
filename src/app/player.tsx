import { unknownTrackImageUri } from '@/constants/images';
import { usePlayerBackground } from '@/hooks/usePlayerBackground';
import { LinearGradient } from 'expo-linear-gradient';
import { useActiveTrack } from 'react-native-track-player';

export default function Player() {
  const activeTrack = useActiveTrack();
  const { imageColors } = usePlayerBackground(activeTrack?.artwork ?? unknownTrackImageUri);

  return (
    <LinearGradient
      className="flex-1"
      colors={imageColors ? [imageColors.background, imageColors.primary] : ['#000', '#000']}
    ></LinearGradient>
  );
}
