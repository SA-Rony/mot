import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Project } from '@/types';
import { MoveVertical as MoreVertical } from 'lucide-react-native';

interface ProjectRowProps {
  project: Project;
}

export const ProjectRow = ({ project }: ProjectRowProps) => {
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

  const statusColor = getStatusColor(project.status);
  
  return (
    <View style={styles.container}>
      <View style={styles.projectInfo}>
        <Text style={styles.projectName} numberOfLines={1}>
          {project.title}
        </Text>
        <Text style={styles.projectCategory} numberOfLines={1}>
          {project.category}
        </Text>
      </View>
      
      <View style={styles.clientColumn}>
        <Text style={styles.clientName} numberOfLines={1}>
          {project.clientName}
        </Text>
      </View>
      
      <View style={styles.statusColumn}>
        <View style={[styles.statusBadge, { backgroundColor: `${statusColor}15` }]}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusText, { color: statusColor }]}>
            {project.status}
          </Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.actionsButton}
        activeOpacity={0.7}
      >
        <MoreVertical size={20} color="#64748B" />
      </TouchableOpacity>
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
  projectInfo: {
    flex: 2,
    paddingRight: 8,
  },
  projectName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E293B',
    marginBottom: 2,
  },
  projectCategory: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
  },
  clientColumn: {
    flex: 1,
    paddingHorizontal: 4,
  },
  clientName: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#1E293B',
  },
  statusColumn: {
    flex: 1,
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  actionsButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});