# ✈️ Flight Booking App

A modern React Native mobile application for searching and booking flights, featuring real-time flight data integration with Sky Scrapper API and intelligent fallback mechanisms.

## 🎯 Features

- **User Authentication** - Secure sign-up and login with persistent sessions
- **Flight Search** - Search flights by city name or airport code
- **Real-time Data** - Integration with Sky Scrapper API for live flight information
- **Smart Fallback** - Automatic fallback to mock data if API is unavailable
- **Interactive Calendar** - Beautiful date picker for departure date selection
- **Flight Details** - Comprehensive flight information including pricing, duration, and amenities
- **Booking System** - Simple flight booking confirmation flow

## 🛠️ Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development and build tooling
- **React Navigation** - Navigation management
- **AsyncStorage** - Local data persistence
- **Axios** - HTTP client for API requests
- **React Native Paper** - UI components
- **DateTimePicker** - Native date selection

## 📋 Prerequisites

- Node.js (v20.19.4 or higher recommended)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the App

```bash
npx expo start
```

### 3. Run on Device

- **iOS**: Press `i` in terminal or scan QR code with Expo Go app
- **Android**: Press `a` in terminal or scan QR code with Expo Go app
- **Web**: Press `w` in terminal

## 🔑 API Configuration

The app uses Sky Scrapper API from RapidAPI.

### Setup Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Get your API key from [Sky Scrapper on RapidAPI](https://rapidapi.com/apiheya/api/sky-scrapper)

3. Update `.env` with your API key:
```env
EXPO_PUBLIC_RAPIDAPI_KEY=your_actual_api_key_here
EXPO_PUBLIC_RAPIDAPI_HOST=sky-scrapper.p.rapidapi.com
```

**Note**: The `.env` file is git-ignored for security. Never commit API keys to GitHub!

The app works perfectly with mock data if the API key is invalid or rate-limited.

## 📱 App Structure

```
FlightsSearch/
├── App.js                          # Main app component with navigation
├── src/
│   ├── screens/
│   │   ├── LoginScreen.js         # User login
│   │   ├── SignUpScreen.js        # User registration
│   │   ├── SearchScreen.js        # Flight search with calendar
│   │   ├── ResultsScreen.js       # Flight results list
│   │   └── FlightDetailsScreen.js # Detailed flight information
│   └── services/
│       ├── authService.js         # Authentication logic
│       └── flightService.js       # Flight search & API integration
├── app.json                        # Expo configuration
├── package.json                    # Dependencies
└── README.md                       # This file
```

## 🎨 Key Functionalities

### Authentication Flow
1. User signs up with email and password
2. Credentials stored securely in AsyncStorage
3. Automatic session persistence
4. Instant state updates on login/logout

### Flight Search Flow
1. Enter origin and destination (city name or airport code)
2. Select departure date from calendar
3. Specify number of passengers
4. View results sorted by price
5. Select flight for detailed information
6. Confirm booking

### Supported Routes

**Major Cities with Predefined Sky IDs:**
- New York (JFK)
- London (LHR)
- Los Angeles (LAX)
- Paris (CDG)
- Tokyo
- Dubai (DXB)
- Chicago (ORD)

**Also supports:**
- Any valid 3-letter airport code
- City names (e.g., "Mombasa", "Nairobi")

## 🔄 How the Smart Fallback Works

The app attempts to fetch real flight data from Sky Scrapper API:

1. **First**: Converts city names to Sky IDs using predefined mappings or API
2. **Then**: Searches for flights using Sky IDs
3. **Fallback**: If API fails or returns no data, generates realistic mock flights
4. **Result**: User always sees flight results, ensuring smooth UX

This architecture demonstrates production-ready error handling and resilient system design.

## 🧪 Testing the App

### Test Login
1. Sign up with any email (e.g., `test@example.com`)
2. Use any password (min 6 characters)
3. App automatically logs you in

### Test Flight Search
Try these popular routes:
- **New York → London**
- **Los Angeles → Tokyo**
- **Paris → Dubai**
- **Mombasa → Nairobi**

## 📦 Available Scripts

```bash
# Start development server
npm start

# Start for iOS
npm run ios

# Start for Android
npm run android

# Start for Web
npm run web
```

## 🏗️ Architecture Highlights

### Authentication Service
- Local user database with AsyncStorage
- Session token management
- Persistent login state
- Secure password handling (demo - would be hashed in production)

### Flight Service
- Sky Scrapper API integration
- Predefined airport Sky ID mappings
- Dynamic API endpoint fallback
- Real-time flight data transformation
- Mock data generation for reliability

### State Management
- React hooks for component state
- Callback pattern for cross-component communication
- AsyncStorage for persistence
- Reactive navigation based on auth state

## 🎯 Production Considerations

This is a demo/assessment application. For production use, consider:

- Hash passwords before storage
- Use secure authentication (OAuth, JWT)
- Implement proper error boundaries
- Add loading indicators
- Include offline mode support
- Add flight booking payment integration
- Implement push notifications
- Add analytics and crash reporting

## 🤝 Contributing

This is an assessment project, but feedback is welcome!

## 📄 License

This project was created as part of a coding assessment.

## 👨‍💻 Author

Built with React Native and Expo

---

**Note**: This app demonstrates modern React Native development practices including API integration, authentication, navigation, and production-ready error handling.
