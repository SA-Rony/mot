import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  leftIcon,
  rightIcon,
  isLoading = false,
  disabled = false,
  style,
  textStyle,
}: ButtonProps) => {
  const getButtonStyles = () => {
    switch (variant) {
      case 'primary':
        return disabled ? styles.primaryDisabled : styles.primary;
      case 'secondary':
        return disabled ? styles.secondaryDisabled : styles.secondary;
      case 'outline':
        return disabled ? styles.outlineDisabled : styles.outline;
      case 'danger':
        return disabled ? styles.dangerDisabled : styles.danger;
      default:
        return disabled ? styles.primaryDisabled : styles.primary;
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryText;
      case 'secondary':
        return styles.secondaryText;
      case 'outline':
        return disabled ? styles.outlineDisabledText : styles.outlineText;
      case 'danger':
        return styles.dangerText;
      default:
        return styles.primaryText;
    }
  };

  const getLoaderColor = () => {
    switch (variant) {
      case 'primary':
        return 'white';
      case 'secondary':
        return 'white';
      case 'outline':
        return '#2563EB';
      case 'danger':
        return 'white';
      default:
        return 'white';
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyles(), style]}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={getLoaderColor()} />
      ) : (
        <>
          {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
          <Text style={[styles.text, getTextStyles(), textStyle]}>{title}</Text>
          {rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>}
        </>
      )}
    </TouchableOpacity>
  );
};

import { View } from 'react-native';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    minHeight: 48,
  },
  primary: {
    backgroundColor: '#2563EB',
  },
  primaryDisabled: {
    backgroundColor: '#BFDBFE',
  },
  secondary: {
    backgroundColor: '#7C3AED',
  },
  secondaryDisabled: {
    backgroundColor: '#D8B4FE',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2563EB',
  },
  outlineDisabled: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  danger: {
    backgroundColor: '#EF4444',
  },
  dangerDisabled: {
    backgroundColor: '#FCA5A5',
  },
  text: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: 'white',
  },
  outlineText: {
    color: '#2563EB',
  },
  outlineDisabledText: {
    color: '#BFDBFE',
  },
  dangerText: {
    color: 'white',
  },
  leftIconContainer: {
    marginRight: 8,
  },
  rightIconContainer: {
    marginLeft: 8,
  },
});