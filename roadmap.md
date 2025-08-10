# MindGate Development Roadmap

## Phase 1 — Foundation & Planning

### 1. Define MVP
**Goal:** Intercept tracked app launches → Ask "Why are you opening this app?" → Store response → Allow or block access.

**Core MVP Features:**
1. App selection screen (choose tracked apps).
2. Prompt overlay before opening tracked apps.
3. Delay mode & block mode.
4. Local storage for logs.

### 2. Dev Environment Setup
**Install & Configure:**
- Node.js (LTS)
- Expo CLI:
  ```bash
  npm install -g @expo/cli
  ```
- Android Studio (SDK + Emulator) for development builds
- VS Code with React Native tools

**Create Project:**
```bash
npx create-expo-app MindGate --template blank-typescript
```

**Install Expo Dev Client for native modules:**
```bash
npx expo install expo-dev-client
```

---

## Phase 2 — UI & State Management

### 1. Basic Screens
- **HomeScreen** → list tracked apps & quick toggle.
- **SettingsScreen** → set prompt text, delay, block rules.
- **InsightsScreen** → display usage logs.

**Navigation:**  
Install React Navigation:
```bash
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
```

### 2. State Management
Use Zustand (lightweight):
```bash
npm install zustand
```
State example:
```ts
interface AppState {
  trackedApps: string[];
  promptText: string;
  delayTime: number;
  blockKeywords: string[];
}
```

---

## Phase 3 — App Launch Detection (Expo Approach)

### 1. Background Task Setup
- Use Expo TaskManager for background processing:
```bash
npx expo install expo-task-manager expo-background-fetch
```

- Configure background fetch in app.json:
```json
{
  "expo": {
    "plugins": [
      [
        "expo-background-fetch",
        {
          "startOnBoot": true
        }
      ]
    ]
  }
}
```

### 2. App Usage Detection
- Use Expo Device and Permissions:
```bash
npx expo install expo-device expo-permissions
```

- Request necessary permissions:
```ts
import * as Device from 'expo-device';
import * as Permissions from 'expo-permissions';

// Request usage stats permission
const { status } = await Permissions.askAsync(Permissions.USAGE_STATS);
```

### 3. Alternative: Accessibility Service (Development Build)
If native accessibility service is needed:
- Create development build with Expo Dev Client
- Add custom native module for accessibility service
- Use EAS Build for custom builds

---

## Phase 4 — Prompt Overlay & Logic
- React Native component with:
  - App name/icon
  - Reason input
  - Mood selector (optional)
  - Continue / Cancel buttons
- If block → send user to home.
- If delay → set timeout before resuming app.

---

## Phase 5 — Data Storage & Insights
- Install Expo SQLite:
```bash
npx expo install expo-sqlite
```
- Store:
  - App name
  - Timestamp
  - Reason
  - Mood (optional)
- Show insights with Victory Native charts.

---

## Phase 6 — Testing
**Test Scenarios:**
1. App in tracked list opens → Prompt appears.
2. App not in list → Opens instantly.
3. Block keyword triggers → App blocked.
4. Delay works correctly.
5. Battery usage stays low.
6. Works on Android 10–14.

**Expo Testing:**
```bash
# Test on device
npx expo start

# Create development build for testing
eas build --profile development --platform android
```

---

## Phase 7 — Release
1. Configure EAS Build:
```bash
npx eas build:configure
```

2. Build for production:
```bash
eas build --platform android --profile production
```

3. Submit to Google Play Store:
```bash
eas submit --platform android
```

---

## Suggested Timeline
| Week | Milestone |
|------|-----------|
| 1 | Expo project setup, navigation, state |
| 2 | Background tasks, app detection logic |
| 3 | Overlay UI + logic, SQLite integration |
| 4 | Insights screen, testing, Play Store upload |

## Benefits of Expo Approach
- **Faster Development**: Hot reloading and excellent debugging tools
- **Simplified Build Process**: EAS Build handles complex native builds
- **Easier Testing**: Expo Go app for quick testing
- **Better Tooling**: Expo DevTools and error reporting
- **Cross-Platform Ready**: Easy iOS deployment later
