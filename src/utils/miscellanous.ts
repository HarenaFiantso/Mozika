import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const generateTracksListId = (prefix: string) => {
  return `${prefix}-${uuidv4()}`;
};

export const formatSecondsToMinutes = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
};
