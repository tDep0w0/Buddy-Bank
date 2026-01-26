import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors'
import { Ionicons } from '@expo/vector-icons';

type Friend = {
  id: string;
  name: string;
};

const mockFriends: Friend[] = [
  { id: '1', name: 'Thien Xuan Bui' },
  { id: '2', name: 'Duc Minh Le' },
  { id: '3', name: 'Hieu Xuan Ho' },
  { id: '4', name: 'Nam Thanh Nguyen' },
  { id: '5', name: 'Jason Kelly' },
  { id: '6', name: 'Alessan Norman' },
  { id: '7', name: 'Alex Nguyen' },
  { id: '8', name: 'Peter Ortic' },
  { id: '9', name: 'Tony Faith' },
  { id: '10', name: 'Lucci Nguyen' },
];

const FriendsSelector = () => {
  const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);

  const toggleSelect = (friend: Friend) => {
    const isSeleted = selectedFriends.some(f => f.id === friend.id);
    if (isSeleted) {
      setSelectedFriends(prev => prev.filter(f => f.id !== friend.id));
    } else {
      setSelectedFriends(prev => [...prev, friend]);
    }
  };

  const removeSelected = (friend: Friend) => {
    setSelectedFriends(prev => prev.filter(f => f.id !== friend.id));
  };

  const getFirstName = (name: string) => {
    return name.split(' ')[0];
  };

  const renderSelected = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[
        styles.selectedContainer, 
        { height: selectedFriends.length > 0 ? 135 : 0 },
        { paddingTop: selectedFriends.length > 0 ? 5 : 0 }
      ]}
    >
      {selectedFriends.map(friend => (
        <View key={friend.id} style={styles.selectedItem}>
          <View style={styles.avatarWrapper}>
            <Image source={require('../../../assets/images/default_ava.jpg')} style={styles.avatarSmall} />
            <TouchableOpacity style={styles.removeIcon} onPress={() => removeSelected(friend)}>
              <Ionicons name="close-circle" size={18} color="red" />
            </TouchableOpacity>
          </View>
          <Text style={styles.nameSmall}>{getFirstName(friend.name)}</Text>
        </View>

      ))}
    </ScrollView>
  );

  const renderFriend = ({ item }: { item: Friend }) => {
    const isSelected = selectedFriends.some(f => f.id === item.id);
    return (
      <TouchableOpacity
        style={[styles.friendItem, isSelected && styles.friendItemSelected]}
        onPress={() => toggleSelect(item)}
      >
        <Image source={require('../../../assets/images/default_ava.jpg')} style={styles.avatar} />
        <Text style={styles.name}>{item.name}</Text>
        <View style={[styles.circle, { backgroundColor: isSelected ? Colors.primary : Colors.background }, { borderColor: isSelected ? Colors.primary : Colors.textGray }]}>
          {isSelected && <Ionicons name="checkmark" size={25} color={Colors.background} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderSelected()}
      <FlatList
        data={mockFriends}
        keyExtractor={item => item.id}
        renderItem={renderFriend}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default FriendsSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '93%',
    alignSelf: 'center',
  },
  selectedContainer: {
    flexDirection: 'row',
    marginStart: 6,
  },
  selectedItem: {
    alignItems: 'center',
    position: 'relative',
    marginEnd: 30,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarSmall: {
    width: 70,
    height: 70,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  nameSmall: {
    fontSize: 16,
    marginTop: 4,
    color: 'white',
    textAlign: 'center',
  },
  removeIcon: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 10,
  },
  friendItemSelected: {
    backgroundColor: "rgb(30,35,31)",
    borderColor: "rgb(30,35,31)",
    borderRadius: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    marginLeft: 12,
  },
  name: {
    flex: 1,
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.textGray,
    marginRight: 12,
  },
});


