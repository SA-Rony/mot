import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { TextInput } from '@/components/ui/TextInput';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { AgencyLogo } from '@/components/ui/AgencyLogo';

export default function ForgotCodeScreen() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  const goBack = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoid}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerContainer}>
            <AgencyLogo size={64} />
            <Text style={styles.title}>Forgot Access Code</Text>
            <Text style={styles.subtitle}>
              {isSuccess 
                ? "We've sent recovery instructions to your email" 
                : "Enter your email and we'll send you a new access code"}
            </Text>
          </View>
          
          {!isSuccess ? (
            <View>
              <TextInput
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                containerStyle={styles.inputContainer}
              />
              
              <Button 
                title="Send Recovery Email" 
                onPress={handleSubmit} 
                isLoading={isLoading}
                style={styles.button}
              />
              
              <Button 
                title="Back to Login" 
                onPress={goBack} 
                variant="outline"
                style={styles.backButton}
              />
            </View>
          ) : (
            <View>
              <Text style={styles.successMessage}>
                Please check your email for instructions on how to access your account.
              </Text>
              <Button 
                title="Back to Login" 
                onPress={goBack} 
                style={styles.button}
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1E293B',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  backButton: {
    marginTop: 16,
  },
  successMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
});