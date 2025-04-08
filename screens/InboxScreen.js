// screens/InboxScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { firebase } from '../firebaseConfig'; // Ensure firebase is set up properly

const InboxScreen = () => {
  const [messages, setMessages] = useState([]);
  const [selectedTab, setSelectedTab] = useState('PeblsSent'); // Options: 'PeblsSent', 'RipplesSent', 'RipplesReceived'
  const [selectedPond, setSelectedPond] = useState('All');

  // A list of pond options – add any additional categories as needed.
  const pondOptions = [
    'All',
    'Work',
    'Relationships',
    'Dreams',
    'Gaming',
    'Personal Help',
    'Sports',
  ];

  // Subscribe to Firestore messages
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(
        (snapshot) => {
          const msgs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMessages(msgs);
        },
        (error) => console.error(error)
      );
    return () => unsubscribe();
  }, []);

  // Filter messages based on selected tab and selected pond
  const filteredMessages = messages.filter((msg) => {
    let matchesType = false;
    if (selectedTab === 'PeblsSent') {
      matchesType = msg.type === 'pebl' && msg.direction === 'sent';
    } else if (selectedTab === 'RipplesSent') {
      matchesType = msg.type === 'ripple' && msg.direction === 'sent';
    } else if (selectedTab === 'RipplesReceived') {
      matchesType = msg.type === 'ripple' && msg.direction === 'received';
    }
    // If "All" ponds is selected, let all messages through; otherwise, match the specific pond.
    const matchesPond = selectedPond === 'All' || msg.pond === selectedPond;
    return matchesType && matchesPond;
  });

  // Render each message item
  const renderMessageItem = ({ item }) => (
    <View style={styles.messageItem}>
      <Text style={styles.messagePond}>Pond: {item.pond}</Text>
      <Text style={styles.messageText}>
        {item.content ? item.content : 'Audio Message'}
      </Text>
      {item.timestamp && (
        <Text style={styles.messageTime}>
          {new Date(item.timestamp.seconds * 1000).toLocaleString()}
        </Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Ripple Inbox</Text>
      {/* Pond Filter */}
      <ScrollView
        horizontal
        style={styles.pondFilterContainer}
        showsHorizontalScrollIndicator={false}
      >
        {pondOptions.map((pond) => (
          <TouchableOpacity
            key={pond}
            style={[
              styles.pondOption,
              selectedPond === pond && styles.activePondOption,
            ]}
            onPress={() => setSelectedPond(pond)}
          >
            <Text
              style={[
                styles.pondOptionText,
                selectedPond === pond && styles.activePondOptionText,
              ]}
            >
              {pond}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Toggle Tabs for Message Type */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity onPress={() => setSelectedTab('PeblsSent')}>
          <Text
            style={[
              styles.tab,
              selectedTab === 'PeblsSent' && styles.activeTab,
            ]}
          >
            Pebls (Sent)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('RipplesSent')}>
          <Text
            style={[
              styles.tab,
              selectedTab === 'RipplesSent' && styles.activeTab,
            ]}
          >
            Ripples (Sent)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('RipplesReceived')}>
          <Text
            style={[
              styles.tab,
              selectedTab === 'RipplesReceived' && styles.activeTab,
            ]}
          >
            Ripples (Received)
          </Text>
        </TouchableOpacity>
      </View>
      {/* List of Messages */}
      <FlatList
        data={filteredMessages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessageItem}
        contentContainerStyle={styles.messageList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No messages to display.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  pondFilterContainer: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  pondOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginRight: 8,
  },
  pondOptionText: {
    color: '#CCCCCC',
    fontSize: 14,
  },
  activePondOption: {
    backgroundColor: '#009688',
    borderColor: '#009688',
  },
  activePondOptionText: {
    color: '#FFFFFF',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingVertical: 4,
  },
  tab: {
    fontSize: 16,
    color: '#CCCCCC',
    paddingVertical: 4,
  },
  activeTab: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#009688',
  },
  messageList: {
    paddingBottom: 20,
  },
  messageItem: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  messagePond: {
    fontSize: 12,
    color: '#AAAAAA',
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  messageTime: {
    fontSize: 12,
    color: '#888888',
    marginTop: 5,
  },
  emptyText: {
    color: '#AAAAAA',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default InboxScreen;
