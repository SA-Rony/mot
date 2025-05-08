import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, useSegments } from 'expo-router';

export type UserRole = 'admin' | 'client';

export interface User {
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: false,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // Check if we have a user stored
    const checkUser = async () => {
      setIsLoading(true);
      
      try {
        // Simulate fetching user from storage
        // In a real app, you would get this from AsyncStorage or similar
        
        // For demo purposes, we'll just set a timeout
        setTimeout(() => {
          // By default, no user is logged in
          setUser(null);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Failed to get user:', error);
        setUser(null);
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    
    if (!user && !isLoading && !inAuthGroup) {
      // Redirect to login if not authenticated and not already on auth screen
      router.replace('/login');
    } else if (user && !isLoading && inAuthGroup) {
      // Redirect to home if authenticated but still on auth screen
      router.replace('/');
    }
  }, [user, segments, isLoading]);

  const login = (userData: User) => {
    setUser(userData);
    
    // In a real app, you would save the user to storage here
    // AsyncStorage.setItem('user', JSON.stringify(userData));
    
    router.replace('/');
  };

  const logout = () => {
    setUser(null);
    
    // In a real app, you would remove the user from storage here
    // AsyncStorage.removeItem('user');
    
    router.replace('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}