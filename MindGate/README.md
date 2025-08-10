# MindGate - Your Intentional App Unlock

A React Native productivity app that helps users become more intentional with their app usage by introducing checkpoints before opening selected apps.

## Features

- **Selective App Targeting**: Choose which apps require checkpoint prompts
- **Customizable Prompts**: Set your own reflection questions
- **Mood-based Checkpoint**: Track emotions that lead to app openings
- **Intent Capture**: Record reasons for opening apps
- **Block/Delay Mode**: Block or delay access based on responses
- **Usage Insights**: Weekly logs and pattern analysis
- **Gamification**: Mindfulness score and streaks
- **Privacy-First**: All data stored locally on device

## Tech Stack

- **Framework**: Expo + React Native with TypeScript
- **UI**: NativeWind (Tailwind CSS for React Native)
- **State Management**: Zustand
- **Navigation**: React Navigation
- **Storage**: Expo SQLite + Expo SecureStore
- **Icons**: @expo/vector-icons
- **Background Tasks**: Expo TaskManager + Background Fetch

## Getting Started

### Prerequisites

- Node.js (LTS version)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd MindGate
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on Android:
```bash
npm run android
```

### Development Build

For testing background tasks and native features:

```bash
# Install Expo Dev Client
npx expo install expo-dev-client

# Create development build
eas build --profile development --platform android
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # App screens
│   ├── HomeScreen.tsx
│   ├── SettingsScreen.tsx
│   ├── InsightsScreen.tsx
│   ├── AppSelectionScreen.tsx
│   └── OnboardingScreen.tsx
├── navigation/         # Navigation configuration
├── store/             # Zustand state management
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
└── types/             # TypeScript type definitions
```

## Key Features Implementation

### App Monitoring
- Uses Expo Background Fetch for periodic app usage checks
- Detects app launches using device APIs
- Shows overlay prompts before opening tracked apps

### State Management
- Zustand store with persistence
- Tracks apps, settings, usage logs, and monitoring status
- Computed properties for analytics

### UI/UX
- Dark theme with modern design
- Responsive layout using NativeWind
- Intuitive navigation and interactions

## Configuration

### App Settings
- Custom prompt text
- Delay time (0-60 seconds)
- Block keywords
- Mood tracking toggle
- Insights enable/disable

### Tracked Apps
- Add/remove apps by package name
- Categorize apps (social, entertainment, games, shopping, other)
- Enable/disable individual app tracking

## Building for Production

1. Configure EAS Build:
```bash
npx eas build:configure
```

2. Build for Android:
```bash
eas build --platform android --profile production
```

3. Submit to Google Play Store:
```bash
eas submit --platform android
```

## Permissions Required

- `PACKAGE_USAGE_STATS`: Monitor app usage
- `SYSTEM_ALERT_WINDOW`: Show overlay prompts
- `FOREGROUND_SERVICE`: Background monitoring

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Roadmap

- [ ] iOS support
- [ ] Cloud sync (optional)
- [ ] Advanced analytics
- [ ] Custom themes
- [ ] Export reports
- [ ] Integration with habit tracking apps
