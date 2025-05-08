import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProjectCard } from '@/components/dashboard/ProjectCard';
import { Header } from '@/components/ui/Header';
import { useState, useCallback } from 'react';
import { mockProjects } from '@/data/mockData';
import { Filter } from 'lucide-react-native';
import { ProjectFilterMenu } from '@/components/dashboard/ProjectFilterMenu';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function DashboardScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filteredProjects = activeFilter === 'all' 
    ? mockProjects 
    : mockProjects.filter(project => project.category === activeFilter);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate fetching data
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const toggleFilterMenu = () => {
    setShowFilterMenu(!showFilterMenu);
  };

  const handleFilterSelect = (filter: string) => {
    setActiveFilter(filter);
    setShowFilterMenu(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header 
        title="Dashboard" 
        rightElement={
          <TouchableOpacity 
            style={styles.filterButton} 
            onPress={toggleFilterMenu}
            activeOpacity={0.7}
          >
            <Filter size={20} color={activeFilter !== 'all' ? '#2563EB' : '#64748B'} />
          </TouchableOpacity>
        }
      />
      
      {showFilterMenu && (
        <ProjectFilterMenu 
          activeFilter={activeFilter} 
          onSelect={handleFilterSelect}
          onClose={() => setShowFilterMenu(false)}
        />
      )}
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {activeFilter !== 'all' && (
          <View style={styles.filterIndicator}>
            <Text style={styles.filterText}>
              Filtering by: {activeFilter}
            </Text>
          </View>
        )}
        
        {filteredProjects.map((project, index) => (
          <Animated.View 
            key={project.id}
            entering={FadeInUp.delay(index * 100).springify()}
          >
            <ProjectCard 
              project={project}
              style={styles.projectCard}
            />
          </Animated.View>
        ))}

        {filteredProjects.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No projects found</Text>
            <Text style={styles.emptyStateSubtitle}>Try changing your filter or check back later</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  projectCard: {
    marginBottom: 16,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterIndicator: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#2563EB',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
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
  },
});