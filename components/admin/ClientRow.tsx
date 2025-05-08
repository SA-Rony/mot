import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Client } from '@/types';
import { MessageSquare, CreditCard as Edit } from 'lucide-react-native';

interface ClientRowProps {
  client: Client;
}

export const ClientRow = ({ client }: ClientRowProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.clientInfo}>
        <Text style={styles.clientName} numberOfLines={1}>
          {client.name}
        </Text>
        <Text style={styles.clientEmail} numberOfLines={1}>
          {client.email}
        </Text>
      </View>
      
      <View style={styles.projectsColumn}>
        <View style={styles.projectsCountBadge}>
          <Text style={styles.projectsCountText}>
            {client.projectsCount}
          </Text>
        </View>
      </View>
      
      <View style={styles.actionsColumn}>
        <TouchableOpacity 
          style={styles.actionButton}
          activeOpacity={0.7}
        >
          <MessageSquare size={16} color="#2563EB" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          activeOpacity={0.7}
        >
          <Edit size={16} color="#2563EB" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  clientInfo: {
    flex: 2,
    paddingRight: 8,
  },
  clientName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E293B',
    marginBottom: 2,
  },
  clientEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
  },
  projectsColumn: {
    flex: 1,
    alignItems: 'center',
  },
  projectsCountBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    minWidth: 32,
    alignItems: 'center',
  },
  projectsCountText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#2563EB',
  },
  actionsColumn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});