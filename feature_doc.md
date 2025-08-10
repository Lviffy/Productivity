# MindGate – Your Intentional App Unlock

## 1. Problem Statement
Many users open certain apps out of habit, leading to doomscrolling and unproductive screen time. There's no built-in mechanism to make them pause and reflect before diving into such apps.

## 2. Goal
To help users become more intentional with their app usage by introducing a pause-and-reflect checkpoint before opening selected apps, reducing unconscious scrolling and increasing mindful phone use.

## 3. Target Audience
- Productivity enthusiasts
- People trying to reduce social media usage
- Students and professionals wanting to focus
- Digital minimalists

## 4. Key Features

### 4.1 Selective App Targeting
- User selects which apps require the checkpoint prompt.
- Presets: Social Media, Entertainment, Games, Shopping.

### 4.2 Customizable Prompts
- Default: "Why are you opening this app?"
- User can create their own prompts.
- Optional: Random prompt selection to prevent autopilot responses.

### 4.3 Mood-based Checkpoint (Unique Twist)
- Ask "How are you feeling?" before the main prompt.
- Track emotions that lead to app openings (bored, stressed, etc.).

### 4.4 Intent Capture
- User must enter/select a reason for opening the app.
- Quick replies (Post content, Check messages, Pass time, etc.).
- **Block Mode:** Certain answers (e.g., "bored") can block access.
- **Delay Mode:** Adds 5–15 seconds wait before continuing.

### 4.5 Action Redirect (Unique Twist)
- Suggest alternative productive apps or activities if the reason is unproductive.
- Integration with habit apps, Google Tasks, or Notion.

### 4.6 Intent Replay & Insights (Unique Twist)
- Weekly log of:
  - Apps opened
  - Reasons given
  - Time spent vs. intended use
- Shows patterns ("Most doomscrolling happens at night when bored").

### 4.7 Gamification
- Streaks for mindful app openings.
- "Mindfulness score" based on intentional usage.
- Unlock motivational quotes or badges.

### 4.8 Privacy-First
- All reasons stored locally.
- Optional cloud sync with encryption.

## 5. Technical Approach
- **Platform:** Android-first using Expo + React Native.
- **Permissions Needed:** Usage Stats, Background processing, Overlay permissions.
- **Flow:**
  1. Monitor app usage using Expo background tasks and device APIs.
  2. Detect app launches and check against tracked apps.
  3. Show React Native overlay UI for prompt.
  4. Record user input and store locally.
  5. Pass control to target app or block based on logic.
  6. Store interaction for analytics and insights.

## 6. Tech Stack

### Core App (Expo + React Native)
- **Framework:** Expo with TypeScript
- **UI:** React Native + NativeWind (Tailwind CSS)
- **State:** Zustand (lightweight state management)
- **Storage:** Expo SQLite + Expo SecureStore
- **Navigation:** React Navigation
- **Icons:** @expo/vector-icons

### Background Processing & Device Integration
- **Expo TaskManager** for background tasks
- **Expo Background Fetch** for periodic checks
- **Expo Device** for device information
- **Expo Permissions** for permission management

### Data & Analytics
- **Local DB:** Expo SQLite
- **Secure Storage:** Expo SecureStore for sensitive data
- **File Operations:** Expo FileSystem
- **Sharing:** Expo Sharing for report exports

### Development & Build Tools
- **Expo CLI** for development
- **Expo Dev Client** for custom native modules
- **EAS Build** for app builds
- **EAS Submit** for app store submission

## 7. App Flow

1. **First-Time Setup**
   - Ask for Usage Stats and Background processing permissions.
   - User selects which apps to monitor.
   - Customize prompts, delay/block mode, and mood tracking.

2. **Background Monitoring (Expo TaskManager)**
   - Use background fetch to periodically check app usage.
   - Detect app launches using device APIs.
   - Pause app opening if monitored.
   - Send app name to React Native layer.

3. **Prompt Display (React Native Overlay)**
   - Show prompt with app icon & mood selector.
   - User chooses Continue, Cancel, or auto Block.

4. **Logging & Insights**
   - Store logs locally using Expo SQLite.
   - Delay or block opening based on settings.

5. **Analytics & Reflection**
   - Show weekly breakdowns, mood patterns, and intent replays.
   - Export reports using Expo Sharing.

6. **Gamification**
   - Streaks, mindfulness score, motivational quotes.

### Flow Diagram (Text Representation)

```
[App Launch Attempt]  
       ↓  
[Expo Background Task detects launch]  
       ↓  
[Is app in tracked list?] → No → [Open app normally]  
       ↓ Yes  
[Show React Native overlay]  
       ↓  
[Show prompt → Ask reason/mood]  
       ↓  
[User input]  
  ↓            ↓
[Reason OK]   [Reason matches block]  
  ↓            ↓  
[Delay → Open] [Block → Return home]  
       ↓  
[Log data in Expo SQLite]  
       ↓  
[Insights screen for reflection]
```

## 8. Monetization
- Free tier: Core blocking + basic stats.
- Premium:
  - Advanced insights & emotion tracking.
  - Cloud sync.
  - Unlimited custom prompts.

## 9. Success Metrics
- Reduction in daily time spent on targeted apps.
- % of unproductive sessions blocked or redirected.
- User retention & streaks maintained.

## 10. Risks & Mitigation
- **Risk:** Users disable background processing to bypass it.  
  **Mitigation:** Gentle reminders and gamification to encourage consistency.

- **Risk:** Background tasks drain battery.  
  **Mitigation:** Optimize background fetch frequency and use Expo's efficient task management.

- **Risk:** Limited app detection capabilities in Expo managed workflow.  
  **Mitigation:** Use Expo Dev Client for development builds when native accessibility service is needed.
