import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = '@users';
const TOKEN_KEY = 'userToken';

export const authService = {
  // Sign up a new user
  async signUp(email, password, fullName) {
    try {
      // Get existing users
      const usersJSON = await AsyncStorage.getItem(USERS_KEY);
      const users = usersJSON ? JSON.parse(usersJSON) : [];

      // Check if user already exists
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        password, // In production, this should be hashed!
        fullName,
        createdAt: new Date().toISOString(),
      };

      // Save user
      users.push(newUser);
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));

      // Create session token
      const token = `token_${newUser.id}_${Date.now()}`;
      await AsyncStorage.setItem(TOKEN_KEY, token);
      await AsyncStorage.setItem('currentUser', JSON.stringify(newUser));

      return { success: true, user: newUser, token };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Login existing user
  async login(email, password) {
    try {
      // Get existing users
      const usersJSON = await AsyncStorage.getItem(USERS_KEY);
      const users = usersJSON ? JSON.parse(usersJSON) : [];

      // Find user
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Create session token
      const token = `token_${user.id}_${Date.now()}`;
      await AsyncStorage.setItem(TOKEN_KEY, token);
      await AsyncStorage.setItem('currentUser', JSON.stringify(user));

      return { success: true, user, token };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Logout user
  async logout() {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem('currentUser');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const userJSON = await AsyncStorage.getItem('currentUser');
      return userJSON ? JSON.parse(userJSON) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  // Check if user is logged in
  async isLoggedIn() {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      return !!token;
    } catch (error) {
      return false;
    }
  },
};

