export interface Project {
  id: string;
  title: string;
  category: string;
  status: string;
  progress: number;
  clientName: string;
  timeline: string;
  updatedAt: string;
  description: string;
}

export interface Conversation {
  id: string;
  title: string;
  subtitle: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: 'user' | 'agency';
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  projectsCount: number;
  accessCode: string;
}