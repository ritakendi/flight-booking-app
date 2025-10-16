import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { authService } from '../services/authService';
import { flightService } from '../services/flightService';

export default function SearchScreen({ navigation, onLogoutSuccess }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [adults, setAdults] = useState('1');
  const [loading, setLoading] = useState(false);

  // Helper function to show alerts that works on both web and mobile
  const showAlert = (title, message) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.alert) {
      window.alert(message || title);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios'); // Keep open on iOS
    if (selectedDate) {
      setDate(selectedDate);
      // Format date as YYYY-MM-DD
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      setDepartureDate(`${year}-${month}-${day}`);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleLogout = async () => {
    // For web compatibility, use window.confirm if available
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.confirm) {
      const confirmed = window.confirm('Are you sure you want to logout?');
      
      if (confirmed) {
        await authService.logout();
        if (onLogoutSuccess) {
          await onLogoutSuccess();
        }
      }
    } else {
      // Mobile: use Alert.alert
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Logout',
            style: 'destructive',
            onPress: async () => {
              await authService.logout();
              if (onLogoutSuccess) {
                await onLogoutSuccess();
              }
            },
          },
        ]
      );
    }
  };

  const handleSearch = async () => {
    // Validation
    if (!origin || !destination || !departureDate) {
      showAlert('Error', 'Please fill in all required fields');
      return;
    }

    if (origin.trim().length < 2 || destination.trim().length < 2) {
      showAlert('Error', 'Please enter valid airport codes or city names');
      return;
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(departureDate)) {
      showAlert('Error', 'Please enter date in YYYY-MM-DD format');
      return;
    }

    const adultsNum = parseInt(adults);
    if (isNaN(adultsNum) || adultsNum < 1 || adultsNum > 9) {
      showAlert('Error', 'Number of adults must be between 1 and 9');
      return;
    }

    setLoading(true);
    const result = await flightService.searchFlights({
      origin: origin.toUpperCase(),
      destination: destination.toUpperCase(),
      departureDate,
      adults: adultsNum,
    });
    setLoading(false);

    if (result.success && result.data && result.data.length > 0) {
      navigation.navigate('Results', {
        flights: result.data,
        searchParams: {
          origin: origin.toUpperCase(),
          destination: destination.toUpperCase(),
          departureDate,
          adults: adultsNum,
        },
      });
    } else if (result.success && (!result.data || result.data.length === 0)) {
      showAlert('No Flights Found', 'No flights available for this route. Try different dates or destinations.');
    } else {
      showAlert('Search Failed', result.error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search Flights</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchCard}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>From (Origin) *</Text>
          <TextInput
            style={styles.input}
            placeholder="City or airport code (e.g., Mombasa or MBA)"
            value={origin}
            onChangeText={setOrigin}
            autoCapitalize="words"
          />
          <Text style={styles.hint}>Examples: Mombasa, MBA, New York, JFK, Nairobi, NBO</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>To (Destination) *</Text>
          <TextInput
            style={styles.input}
            placeholder="City or airport code (e.g., Nairobi or NBO)"
            value={destination}
            onChangeText={setDestination}
            autoCapitalize="words"
          />
          <Text style={styles.hint}>Examples: Nairobi, NBO, Los Angeles, LAX, London, LHR</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Departure Date *</Text>
          {Platform.OS === 'web' ? (
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              style={{
                padding: 12,
                fontSize: 16,
                borderWidth: 1,
                borderColor: '#ddd',
                borderRadius: 8,
                backgroundColor: '#f9f9f9',
                borderStyle: 'solid',
                width: '100%',
                boxSizing: 'border-box',
              }}
            />
          ) : (
            <>
              <TouchableOpacity 
                style={styles.dateButton}
                onPress={showDatepicker}
              >
                <Text style={styles.dateButtonText}>
                  {departureDate || 'Select Date 📅'}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                />
              )}
            </>
          )}
          <Text style={styles.hint}>
            {Platform.OS === 'web' ? 'Select a date' : 'Tap to select a date from calendar'}
          </Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Number of Adults</Text>
          <TextInput
            style={styles.input}
            placeholder="1"
            value={adults}
            onChangeText={setAdults}
            keyboardType="number-pad"
            maxLength={1}
          />
        </View>

        <TouchableOpacity
          style={[styles.searchButton, loading && styles.searchButtonDisabled]}
          onPress={handleSearch}
          disabled={loading}
        >
          <Text style={styles.searchButtonText}>
            {loading ? 'Searching...' : 'Search Flights ✈️'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>💡 Quick Tips</Text>
        <Text style={styles.infoText}>
          • Use city names or 3-letter airport codes{'\n'}
          • Popular routes: Mombasa ↔ Nairobi, New York ↔ LA{'\n'}
          • Book in advance for better prices{'\n'}
          • Flexible dates can save you money{'\n'}
          • Compare different airlines
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d32f2f',
    cursor: 'pointer',
  },
  logoutText: {
    color: '#d32f2f',
    fontSize: 16,
    fontWeight: '600',
  },
  searchCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
  },
  hint: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  searchButton: {
    backgroundColor: '#1a73e8',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  searchButtonDisabled: {
    backgroundColor: '#999',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoCard: {
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
});

