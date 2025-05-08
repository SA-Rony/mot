import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Circle as XCircle } from 'lucide-react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const filters = [
  { id: 'all', label: 'All Projects' },
  { id: 'Digital Marketing', label: 'Digital Marketing' },
  { id: 'SEO', label: 'SEO' },
  { id: 'Web Development', label: 'Web Development' },
  { id: 'E-commerce', label: 'E-commerce' },
];

interface ProjectFilterMenuProps {
  activeFilter: string;
  onSelect: (filter: string) => void;
  onClose: () => void;
}

export const ProjectFilterMenu = ({
  activeFilter,
  onSelect,
  onClose,
}: ProjectFilterMenuProps) => {
  return (
    <Animated.View 
      style={styles.container}
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Filter Projects</Text>
        <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
          <XCircle size={24} color="#64748B" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.filterOptions}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterOption,
              activeFilter === filter.id && styles.activeFilterOption,
            ]}
            onPress={() => onSelect(filter.id)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter.id && styles.activeFilterText,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 72,
    right: 16,
    left: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    zIndex: 10,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
  },
  filterOptions: {
    gap: 8,
  },
  filterOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
  },
  activeFilterOption: {
    backgroundColor: '#EFF6FF',
  },
  filterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748B',
  },
  activeFilterText: {
    color: '#2563EB',
  },
});