
# MindGate - Tech Stack 

This document lists the complete tech stack for building the **MindGate** productivity app using **Expo**, focused on **Android first** and **offline-first** operation.

---

## 1. Core App Framework
| Tool | Purpose | Why |
|------|---------|-----|
| **Expo** | React Native development platform | Simplifies development, provides excellent tooling and services. |
| **React Native** | Cross-platform app development | Build for Android now, extend to iOS later. |
| **TypeScript** | Strong typing | Prevents bugs and improves code quality. |

---

## 2. Navigation & Routing
| Tool | Purpose |
|------|---------|
| **React Navigation** | Screen navigation between onboarding, home, settings, and reports. |
| **Expo Router** *(optional)* | File-based routing for simpler navigation setup. |

---

## 3. Local Storage & Database
| Tool | Purpose | Why |
|------|---------|-----|
| **Expo SecureStore** | Secure key-value storage | Best for storing sensitive settings & small data. |
| **Expo SQLite** | Structured data storage | To store app usage logs and user reasons. |
| **AsyncStorage** | Simple key-value storage | For non-sensitive app data. |

---

## 4. Background & Native Integration
| Tool | Purpose |
|------|---------|
| **Expo Background Fetch** | Run periodic checks in the background. |
| **Expo TaskManager** | Manage background tasks and processes. |
| **Expo Device** | Access device information and capabilities. |
| **Expo Permissions** | Request and check app permissions. |

---

## 5. Styling & UI
| Tool | Purpose |
|------|---------|
| **NativeWind (Tailwind CSS for React Native)** | Utility-first, responsive styling. |
| **@expo/vector-icons** | App icons and UI elements (includes MaterialIcons, FontAwesome, etc.). |
| **React Native Paper** *(optional)* | Pre-built UI components. |

---

## 6. Charts & Reports
| Tool | Purpose |
|------|---------|
| **Victory Native** or **react-native-svg-charts** | Visualize usage analytics. |
| **Day.js** | Format dates and times in reports. |

---

## 7. Animations & Gestures
| Tool | Purpose |
|------|---------|
| **React Native Reanimated** | High-performance animations. |
| **react-native-gesture-handler** | Handle swipes, taps, and gestures. |

---

## 8. Extra Add-ons
| Tool | Purpose |
|------|---------|
| **Expo Sharing** | Export usage reports as files. |
| **Expo Print** | Generate reports in PDF format. |
| **Expo FileSystem** | File operations and management. |

---

## 9. Development & Build Tools
| Tool | Purpose |
|------|---------|
| **Expo CLI** | Command-line tools for development. |
| **Expo Dev Client** | Custom development builds for native modules. |
| **EAS Build** | Cloud build service for creating app binaries. |
| **EAS Submit** | Submit apps to app stores. |

---

## Why This Stack?
- **Expo Managed Workflow** → Faster development, easier deployment.
- **100% Offline** → All data stays on device using local storage.
- **Fast** → SecureStore for instant reads, SQLite for structured logs.
- **Extendable** → Easy to add export/backup features later.
- **Cross-Platform Ready** → Can be ported to iOS with minimal changes.
- **Better Tooling** → Expo provides excellent debugging and development tools.

---

## Next Steps
- Set up project using **Expo + TypeScript**.
- Install **navigation, storage, and styling** libraries.
- Configure **Expo Dev Client** for native module access if needed.
- Set up **EAS Build** for app distribution.
