import { useState } from 'react';

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

export const PlayerBottom = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlay = () => setIsPlaying(prev => !prev);

  return (
    <View className="h-24 flex-col" style={styles.container}>
      <Slider
        style={{ width: '100%' }}
        minimumValue={0}
        minimumTrackTintColor="#005252FF"
        maximumTrackTintColor="#005252FF"
        onValueChange={setCurrentTime}
      />
      <View className="h-20 flex-row" style={styles.playerContainer}>
        <View style={styles.coverContainer}>
          <Image source={require('assets/images/song_cover.jpg')} style={styles.coverImage} />
        </View>
        <View style={styles.songInfoContainer}>
          <Text style={styles.songTitle}>Hafa mihitsy</Text>
          <Text style={styles.artistName}>REKO BAND</Text>
        </View>
        <View style={styles.playButtonContainer}>
          <TouchableOpacity onPress={togglePlay}>
            <FontAwesome name={isPlaying ? 'pause' : 'play'} size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  artistName: {
    color: '#939b9b',
    fontSize: 12,
  },
  container: {
    backgroundColor: 'black',
    padding: 5,
  },
  coverContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverImage: {
    borderRadius: 10,
    height: 50,
    width: 50,
  },
  playButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerContainer: {
    backgroundColor: 'black',
    padding: 5,
  },
  slider: {
    width: '100%',
  },
  songInfoContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PlayerBottom;
