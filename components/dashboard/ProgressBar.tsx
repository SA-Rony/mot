import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';

interface ProgressBarProps {
  progress: number;
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
}

export const ProgressBar = ({
  progress,
  height = 8,
  backgroundColor = '#E2E8F0',
  progressColor = '#2563EB',
}: ProgressBarProps) => {
  const progressWidth = useSharedValue(0);
  
  useEffect(() => {
    progressWidth.value = withTiming(progress / 100, { duration: 1000 });
  }, [progress]);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progressWidth.value * 100}%`,
    };
  });
  
  const getProgressColor = () => {
    if (progress < 25) return '#EF4444'; // Red
    if (progress < 50) return '#F59E0B'; // Amber
    if (progress < 75) return '#3B82F6'; // Blue
    return '#22C55E'; // Green
  };
  
  const progressStyles = StyleSheet.create({
    container: {
      width: '100%',
      height,
      backgroundColor,
      borderRadius: height / 2,
      overflow: 'hidden',
    },
    progress: {
      height: '100%',
      backgroundColor: progressColor || getProgressColor(),
      borderRadius: height / 2,
    },
  });

  return (
    <View style={progressStyles.container}>
      <Animated.View style={[progressStyles.progress, animatedStyle]} />
    </View>
  );
};