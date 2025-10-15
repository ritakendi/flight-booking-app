import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function ResultsScreen({ route, navigation }) {
  const { flights, searchParams } = route.params;

  const renderFlightCard = ({ item }) => (
    <TouchableOpacity
      style={styles.flightCard}
      onPress={() => navigation.navigate('FlightDetails', { flight: item })}
    >
      <View style={styles.flightHeader}>
        <Text style={styles.airline}>{item.airline}</Text>
        <Text style={styles.flightNumber}>{item.flightNumber}</Text>
      </View>

      <View style={styles.flightRoute}>
        <View style={styles.timeSection}>
          <Text style={styles.time}>{item.departureTime}</Text>
          <Text style={styles.airport}>{item.origin}</Text>
        </View>

        <View style={styles.durationSection}>
          <Text style={styles.duration}>{item.duration}</Text>
          <View style={styles.line} />
          <Text style={styles.stops}>
            {item.stops === 0 ? 'Non-stop' : `${item.stops} stop${item.stops > 1 ? 's' : ''}`}
          </Text>
        </View>

        <View style={styles.timeSection}>
          <Text style={styles.time}>{item.arrivalTime}</Text>
          <Text style={styles.airport}>{item.destination}</Text>
        </View>
      </View>

      <View style={styles.flightFooter}>
        <View>
          <Text style={styles.class}>{item.class}</Text>
          <Text style={styles.seatsAvailable}>
            {item.seatsAvailable} seats left
          </Text>
        </View>
        <View style={styles.priceSection}>
          <Text style={styles.price}>
            ${item.price}
          </Text>
          <Text style={styles.currency}>per person</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>
        {searchParams.origin} → {searchParams.destination}
      </Text>
      <Text style={styles.headerSubtitle}>
        {searchParams.departureDate} • {searchParams.adults} adult{searchParams.adults > 1 ? 's' : ''}
      </Text>
      <Text style={styles.resultsCount}>
        {flights.length} flights found
      </Text>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No flights found</Text>
      <Text style={styles.emptySubtext}>
        Try adjusting your search criteria
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={flights}
        renderItem={renderFlightCard}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 15,
    paddingBottom: 30,
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  resultsCount: {
    fontSize: 14,
    color: '#1a73e8',
    fontWeight: '600',
  },
  flightCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  flightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  airline: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  flightNumber: {
    fontSize: 14,
    color: '#999',
  },
  flightRoute: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  timeSection: {
    flex: 1,
    alignItems: 'center',
  },
  time: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  airport: {
    fontSize: 14,
    color: '#666',
  },
  durationSection: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  duration: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: '#1a73e8',
    marginBottom: 5,
  },
  stops: {
    fontSize: 12,
    color: '#666',
  },
  flightFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  class: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  seatsAvailable: {
    fontSize: 12,
    color: '#f57c00',
    fontWeight: '600',
  },
  priceSection: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a73e8',
  },
  currency: {
    fontSize: 12,
    color: '#999',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
});

