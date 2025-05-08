import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/ui/Header';
import { mockProjects, mockClients } from '@/data/mockData';
import { Button } from '@/components/ui/Button';
import { Users, FolderPlus, ChartBar as BarChart, MessageSquarePlus } from 'lucide-react-native';
import { ProjectRow } from '@/components/admin/ProjectRow';
import { ClientRow } from '@/components/admin/ClientRow';
import { useState } from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function AdminScreen() {
  const [activeTab, setActiveTab] = useState('projects');
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Admin Dashboard" />
      
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'projects' && styles.activeTabButton]}
          onPress={() => setActiveTab('projects')}
          activeOpacity={0.7}
        >
          <Text 
            style={[styles.tabText, activeTab === 'projects' && styles.activeTabText]}
          >
            Projects
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'clients' && styles.activeTabButton]}
          onPress={() => setActiveTab('clients')}
          activeOpacity={0.7}
        >
          <Text 
            style={[styles.tabText, activeTab === 'clients' && styles.activeTabText]}
          >
            Clients
          </Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'projects' ? (
        <Animated.View 
          style={styles.tabContent}
          entering={FadeIn.duration(300)}
        >
          <View style={styles.actionBar}>
            <Button
              title="New Project"
              leftIcon={<FolderPlus size={18} color="white" />}
              style={styles.actionButton}
            />
          </View>
          
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.listHeader}>
              <Text style={[styles.columnHeader, styles.projectNameColumn]}>Project</Text>
              <Text style={[styles.columnHeader, styles.clientColumn]}>Client</Text>
              <Text style={[styles.columnHeader, styles.statusColumn]}>Status</Text>
            </View>
            
            {mockProjects.map(project => (
              <ProjectRow key={project.id} project={project} />
            ))}
          </ScrollView>
        </Animated.View>
      ) : (
        <Animated.View 
          style={styles.tabContent}
          entering={FadeIn.duration(300)}
        >
          <View style={styles.actionBar}>
            <Button
              title="Add Client"
              leftIcon={<Users size={18} color="white" />}
              style={styles.actionButton}
            />
          </View>
          
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.listHeader}>
              <Text style={[styles.columnHeader, styles.clientNameColumn]}>Client</Text>
              <Text style={[styles.columnHeader, styles.projectsColumn]}>Projects</Text>
              <Text style={[styles.columnHeader, styles.actionsColumn]}>Actions</Text>
            </View>
            
            {mockClients.map(client => (
              <ClientRow key={client.id} client={client} />
            ))}
          </ScrollView>
        </Animated.View>
      )}
      
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickActionButton} activeOpacity={0.7}>
          <BarChart size={24} color="#2563EB" />
          <Text style={styles.quickActionText}>Reports</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.quickActionButton} activeOpacity={0.7}>
          <MessageSquarePlus size={24} color="#2563EB" />
          <Text style={styles.quickActionText}>Announcements</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  activeTabButton: {
    backgroundColor: '#EFF6FF',
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748B',
  },
  activeTabText: {
    color: '#2563EB',
  },
  tabContent: {
    flex: 1,
  },
  actionBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  listHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  columnHeader: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#64748B',
  },
  projectNameColumn: {
    flex: 2,
  },
  clientColumn: {
    flex: 1,
  },
  statusColumn: {
    flex: 1,
    textAlign: 'center',
  },
  clientNameColumn: {
    flex: 2,
  },
  projectsColumn: {
    flex: 1,
    textAlign: 'center',
  },
  actionsColumn: {
    flex: 1,
    textAlign: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    overflow: 'hidden',
  },
  quickActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  quickActionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#2563EB',
    marginLeft: 8,
  },
});