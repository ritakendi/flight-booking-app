import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SearchScreen from './src/screens/SearchScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import FlightDetailsScreen from './src/screens/FlightDetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      setIsLoggedIn(!!userToken);
    } catch (error) {
      console.error('Error checking login status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to update login state - passed to screens
  const updateLoginState = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    setIsLoggedIn(!!userToken);
  };

  if (isLoading) {
    return null; // Or a loading screen
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#1a73e8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          {!isLoggedIn ? (
            <>
              <Stack.Screen 
                name="Login" 
                options={{ title: 'Welcome' }}
              >
                {(props) => <LoginScreen {...props} onLoginSuccess={updateLoginState} />}
              </Stack.Screen>
              <Stack.Screen 
                name="SignUp" 
                options={{ title: 'Create Account' }}
              >
                {(props) => <SignUpScreen {...props} onSignUpSuccess={updateLoginState} />}
              </Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen 
                name="Search" 
                options={{ title: 'Search Flights' }}
              >
                {(props) => <SearchScreen {...props} onLogoutSuccess={updateLoginState} />}
              </Stack.Screen>
              <Stack.Screen 
                name="Results" 
                component={ResultsScreen}
                options={{ title: 'Available Flights' }}
              />
              <Stack.Screen 
                name="FlightDetails" 
                component={FlightDetailsScreen}
                options={{ title: 'Flight Details' }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

