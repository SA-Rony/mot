import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Project } from '@/types';
import { ProgressBar } from './ProgressBar';
import { Clock, Calendar, ArrowRight } from 'lucide-react-native';
import { format } from 'date-fns';

interface ProjectCardProps {
  project: Project;
  style?: ViewStyle;
  onPress?: () => void;
}

export const ProjectCard = ({ project, style, onPress }: ProjectCardProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Digital Marketing':
        return '#2563EB'; // Primary blue
      case 'SEO':
        return '#7C3AED'; // Purple
      case 'Web Development':
        return '#0D9488'; // Teal
      case 'E-commerce':
        return '#D97706'; // Amber
      default:
        return '#64748B'; // Gray
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return '#22C55E'; // Green
      case 'In Progress':
        return '#2563EB'; // Blue
      case 'On Hold':
        return '#EAB308'; // Yellow
      case 'Delayed':
        return '#EF4444'; // Red
      default:
        return '#64748B'; // Gray
    }
  };

  const categoryColor = getCategoryColor(project.category);
  const statusColor = getStatusColor(project.status);
  
  return (
    <TouchableOpacity 
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={[styles.categoryTag, { backgroundColor: `${categoryColor}15` }]}>
          <Text style={[styles.categoryText, { color: categoryColor }]}>
            {project.category}
          </Text>
        </View>
        
        <View style={[styles.statusIndicator, { backgroundColor: `${statusColor}15` }]}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusText, { color: statusColor }]}>
            {project.status}
          </Text>
        </View>
      </View>
      
      <Text style={styles.title}>{project.title}</Text>
      
      <View style={styles.progressSection}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>Progress</Text>
          <Text style={styles.progressPercentage}>{project.progress}%</Text>
        </View>
        <ProgressBar progress={project.progress} />
      </View>
      
      <View style={styles.metaContainer}>
        <View style={styles.metaItem}>
          <Clock size={16} color="#64748B" />
          <Text style={styles.metaText}>{project.timeline}</Text>
        </View>
        
        <View style={styles.metaItem}>
          <Calendar size={16} color="#64748B" />
          <Text style={styles.metaText}>
            {format(new Date(project.updatedAt), 'MMM d, yyyy')}
          </Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.clientName}>{project.clientName}</Text>
        <TouchableOpacity 
          style={styles.viewButton}
          activeOpacity={0.7}
        >
          <Text style={styles.viewButtonText}>View Details</Text>
          <ArrowRight size={16} color="#2563EB" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 16,
  },
  progressSection: {
    marginBottom: 16,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  progressPercentage: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1E293B',
  },
  metaContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  clientName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E293B',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#2563EB',
    marginRight: 4,
  },
});