import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { TextInput } from '@/components/ui/TextInput';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const router = useRouter();
  const { login } = useAuth();
  
  useEffect(() => {
    // Clear errors when inputs change
    if (errors.email && email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
    
    if (errors.accessCode && accessCode) {
      setErrors(prev => ({ ...prev, accessCode: '' }));
    }
  }, [email, accessCode]);
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!accessCode) {
      newErrors.accessCode = 'Access code is required';
    } else if (accessCode.length < 6) {
      newErrors.accessCode = 'Access code must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleLogin = () => {
    if (!validate()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      // For demo, we'll simulate a successful login with client role
      login({ 
        email,
        name: 'Client User',
        role: 'client'
      });
      setIsLoading(false);
    }, 1500);
  };
  
  const goToForgotCode = () => {
    router.push('/forgot-code');
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Email Address"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
      />
      
      <TextInput
        label="Access Code"
        placeholder="Enter your access code"
        value={accessCode}
        onChangeText={setAccessCode}
        isPassword
        error={errors.accessCode}
      />
      
      <TouchableOpacity 
        style={styles.forgotCodeLink}
        onPress={goToForgotCode}
        activeOpacity={0.7}
      >
        <Text style={styles.forgotCodeText}>Forgot access code?</Text>
      </TouchableOpacity>
      
      <Button 
        title="Sign In" 
        onPress={handleLogin} 
        isLoading={isLoading}
        style={styles.loginButton}
      />
      
      {/* Admin login shortcut for demo */}
      <TouchableOpacity 
        style={styles.adminLoginLink}
        onPress={() => {
          login({ 
            email: 'admin@agency.com',
            name: 'Admin User',
            role: 'admin'
          });
        }}
        activeOpacity={0.7}
      >
        <Text style={styles.adminLoginText}>Admin Demo Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  forgotCodeLink: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotCodeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#2563EB',
  },
  loginButton: {
    marginTop: 8,
  },
  adminLoginLink: {
    alignSelf: 'center',
    marginTop: 24,
    paddingVertical: 8,
  },
  adminLoginText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    textDecorationLine: 'underline',
  },
});