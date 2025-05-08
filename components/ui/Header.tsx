import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { ReactNode } from 'react';

interface HeaderProps {
  title: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  style?: ViewStyle;
}

export const Header = ({ title, leftElement, rightElement, style }: HeaderProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftContainer}>
        {leftElement}
      </View>
      
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.rightContainer}>
        {rightElement}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1E293B',
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
});