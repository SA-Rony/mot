import { View, Text, StyleSheet, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/ui/Header';
import { useState, useRef } from 'react';
import { mockConversations, mockMessages } from '@/data/mockData';
import { ConversationItem } from '@/components/messages/ConversationItem';
import { MessageList } from '@/components/messages/MessageList';
import { MessageInput } from '@/components/messages/MessageInput';
import { ChevronLeft } from 'lucide-react-native';
import Animated, { FadeIn, FadeOut, SlideInRight, SlideOutRight } from 'react-native-reanimated';

export default function MessagesScreen() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [conversations, setConversations] = useState(mockConversations);
  const [messages, setMessages] = useState(mockMessages);
  
  const currentConversation = conversations.find(c => c.id === selectedConversation);
  
  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id);
    
    // Mark conversation as read
    setConversations(conversations.map(conv => 
      conv.id === id ? { ...conv, unread: 0 } : conv
    ));
  };
  
  const handleBackToConversations = () => {
    setSelectedConversation(null);
  };
  
  const handleSendMessage = (text: string) => {
    if (!selectedConversation || !text.trim()) return;
    
    const newMessage = {
      id: `msg-${Date.now()}`,
      conversationId: selectedConversation,
      sender: 'user',
      text,
      timestamp: new Date().toISOString(),
      read: true,
    };
    
    setMessages([...messages, newMessage]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        {!selectedConversation ? (
          <Animated.View 
            style={styles.conversationsContainer}
            entering={FadeIn}
            exiting={FadeOut}
          >
            <Header title="Messages" />
            
            <FlatList
              data={conversations}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ConversationItem
                  conversation={item}
                  onPress={() => handleSelectConversation(item.id)}
                />
              )}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateTitle}>No messages yet</Text>
                  <Text style={styles.emptyStateSubtitle}>
                    When you have conversations with your project team, they'll appear here.
                  </Text>
                </View>
              }
            />
          </Animated.View>
        ) : (
          <Animated.View 
            style={styles.messageDetailContainer}
            entering={SlideInRight}
            exiting={SlideOutRight}
          >
            <View style={styles.messageHeader}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={handleBackToConversations}
                activeOpacity={0.7}
              >
                <ChevronLeft size={24} color="#1E293B" />
              </TouchableOpacity>
              
              <View style={styles.conversationInfo}>
                <Text style={styles.conversationTitle}>
                  {currentConversation?.title}
                </Text>
                <Text style={styles.conversationSubtitle}>
                  {currentConversation?.subtitle}
                </Text>
              </View>
            </View>
            
            <View style={styles.messagesContainer}>
              <MessageList 
                messages={messages.filter(m => m.conversationId === selectedConversation)} 
              />
            </View>
            
            <MessageInput onSend={handleSendMessage} />
          </Animated.View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  keyboardAvoid: {
    flex: 1,
  },
  conversationsContainer: {
    flex: 1,
  },
  messageDetailContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: 'white',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  conversationInfo: {
    flex: 1,
  },
  conversationTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
  },
  conversationSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyStateTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
  },
});