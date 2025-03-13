import { FlatList, Text, View, StyleSheet, Image } from 'react-native';

const DATA = [
  { id: '1', title: 'Coffee & Jazz', image: require('assets/images/coffee.jpg') },
  { id: '2', title: 'RELEASED', image: require('assets/images/coffee.jpg') },
  { id: '3', title: 'Anything goes', image: require('assets/images/coffee.jpg') },
  { id: '4', title: 'Anime OSTs', image: require('assets/images/coffee.jpg') },
  { id: '5', title: 'Rap', image: require('assets/images/coffee.jpg') },
  { id: '6', title: 'Lo-Fi Beats', image: require('assets/images/coffee.jpg') },
];
export const ContinueListening = () => {
  return (
    <View className="mt-10 w-full px-5">
      <Text className="text-2xl font-bold text-white capitalize mb-5">Continue listening</Text>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.item} className="my-3 mx-3 p-5 bg-[#436369] rounded-[10px] items-center">
            <View style={styles.itemContent} className="w-full">
              <Image source={item.image} style={styles.image} />
              <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
                {item.title}
              </Text>
            </View>
          </View>
        )}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: '#436369',
    borderRadius: 10,
    justifyContent: 'center',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    objectFit: "cover",
    marginRight: 10,
    borderRadius: 10,
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    flexShrink: 1,
  },
});
