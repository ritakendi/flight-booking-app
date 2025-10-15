import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function FlightDetailsScreen({ route, navigation }) {
  const { flight } = route.params;

  const handleBookFlight = () => {
    Alert.alert(
      'Booking Confirmed',
      `Your flight with ${flight.airline} has been booked!\n\nFlight: ${flight.flightNumber}\nFrom: ${flight.origin}\nTo: ${flight.destination}\nDate: ${flight.date}\nPrice: $${flight.price}`,
      [
        {
          text: 'Back to Search',
          onPress: () => navigation.navigate('Search'),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.airline}>{flight.airline}</Text>
        <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Flight Details</Text>
        
        <View style={styles.detailRow}>
          <Text style={styles.label}>Departure</Text>
          <Text style={styles.value}>
            {flight.departureTime} - {flight.origin}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Arrival</Text>
          <Text style={styles.value}>
            {flight.arrivalTime} - {flight.destination}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Duration</Text>
          <Text style={styles.value}>{flight.duration}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Stops</Text>
          <Text style={styles.value}>
            {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{flight.date}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Class</Text>
          <Text style={styles.value}>{flight.class}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Baggage Allowance</Text>
        
        <View style={styles.detailRow}>
          <Text style={styles.label}>Cabin Baggage</Text>
          <Text style={styles.value}>{flight.baggage.cabin}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Checked Baggage</Text>
          <Text style={styles.value}>{flight.baggage.checked}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pricing</Text>
        
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Total Price</Text>
          <Text style={styles.priceValue}>${flight.price}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Seats Available</Text>
          <Text style={[styles.value, styles.seatsAvailable]}>
            {flight.seatsAvailable} seats
          </Text>
        </View>
      </View>

      <View style={styles.amenitiesSection}>
        <Text style={styles.sectionTitle}>Amenities</Text>
        <View style={styles.amenitiesGrid}>
          <View style={styles.amenityItem}>
            <Text style={styles.amenityIcon}>📱</Text>
            <Text style={styles.amenityText}>Wi-Fi</Text>
          </View>
          <View style={styles.amenityItem}>
            <Text style={styles.amenityIcon}>🍽️</Text>
            <Text style={styles.amenityText}>Meals</Text>
          </View>
          <View style={styles.amenityItem}>
            <Text style={styles.amenityIcon}>📺</Text>
            <Text style={styles.amenityText}>Entertainment</Text>
          </View>
          <View style={styles.amenityItem}>
            <Text style={styles.amenityIcon}>⚡</Text>
            <Text style={styles.amenityText}>Power Outlets</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.bookButton}
        onPress={handleBookFlight}
      >
        <Text style={styles.bookButtonText}>
          Book for ${flight.price}
        </Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Price includes taxes and fees
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
    backgroundColor: '#1a73e8',
    padding: 30,
    alignItems: 'center',
  },
  airline: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  flightNumber: {
    fontSize: 16,
    color: '#e3f2fd',
  },
  section: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#1a73e8',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'right',
    flex: 1,
    marginLeft: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  priceLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  priceValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a73e8',
  },
  seatsAvailable: {
    color: '#f57c00',
  },
  amenitiesSection: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  amenityItem: {
    width: '48%',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 10,
  },
  amenityIcon: {
    fontSize: 30,
    marginBottom: 5,
  },
  amenityText: {
    fontSize: 14,
    color: '#666',
  },
  bookButton: {
    backgroundColor: '#1a73e8',
    margin: 15,
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
});

