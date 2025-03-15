import { Image } from 'react-native';

export const unknownTrackImageUri = Image.resolveAssetSource(
  require('assets/images/unknown_track.png')
).uri;
export const unknownArtistImageUri = Image.resolveAssetSource(
  require('assets/images/unknown_artist.png')
).uri;
