import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, TrackedApp, AppSettings, UsageLog } from '../types';

const defaultSettings: AppSettings = {
  promptText: "Why are you opening this app?",
  delayTime: 5,
  blockKeywords: ['bored', 'nothing', 'waste time'],
  enableMoodTracking: true,
  enableInsights: true,
  mindfulnessScore: 0,
  streakDays: 0,
};

const defaultTrackedApps: TrackedApp[] = [
  {
    packageName: 'com.facebook.katana',
    appName: 'Facebook',
    isEnabled: true,
    category: 'social',
  },
  {
    packageName: 'com.instagram.android',
    appName: 'Instagram',
    isEnabled: true,
    category: 'social',
  },
  {
    packageName: 'com.twitter.android',
    appName: 'Twitter',
    isEnabled: true,
    category: 'social',
  },
  {
    packageName: 'com.netflix.mediaclient',
    appName: 'Netflix',
    isEnabled: true,
    category: 'entertainment',
  },
];

interface AppStore extends AppState {
  // Actions
  setTrackedApps: (apps: TrackedApp[]) => void;
  toggleAppTracking: (packageName: string) => void;
  addTrackedApp: (app: TrackedApp) => void;
  removeTrackedApp: (packageName: string) => void;
  
  setSettings: (settings: Partial<AppSettings>) => void;
  updateMindfulnessScore: (score: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  
  addUsageLog: (log: Omit<UsageLog, 'id'>) => void;
  clearUsageLogs: () => void;
  
  setMonitoring: (isMonitoring: boolean) => void;
  setCurrentSession: (session?: { packageName: string; startTime: number }) => void;
  
  // Computed
  getEnabledApps: () => TrackedApp[];
  getAppByPackage: (packageName: string) => TrackedApp | undefined;
  getTodayLogs: () => UsageLog[];
  getWeeklyStats: () => {
    totalSessions: number;
    blockedSessions: number;
    averageSessionTime: number;
    mostUsedReason: string;
  };
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Initial state
      trackedApps: defaultTrackedApps,
      settings: defaultSettings,
      usageLogs: [],
      isMonitoring: false,
      currentSession: undefined,

      // Actions
      setTrackedApps: (apps) => set({ trackedApps: apps }),
      
      toggleAppTracking: (packageName) =>
        set((state) => ({
          trackedApps: state.trackedApps.map((app) =>
            app.packageName === packageName
              ? { ...app, isEnabled: !app.isEnabled }
              : app
          ),
        })),
      
      addTrackedApp: (app) =>
        set((state) => ({
          trackedApps: [...state.trackedApps, app],
        })),
      
      removeTrackedApp: (packageName) =>
        set((state) => ({
          trackedApps: state.trackedApps.filter(
            (app) => app.packageName !== packageName
          ),
        })),

      setSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      updateMindfulnessScore: (score) =>
        set((state) => ({
          settings: { ...state.settings, mindfulnessScore: score },
        })),

      incrementStreak: () =>
        set((state) => ({
          settings: { ...state.settings, streakDays: state.settings.streakDays + 1 },
        })),

      resetStreak: () =>
        set((state) => ({
          settings: { ...state.settings, streakDays: 0 },
        })),

      addUsageLog: (log) =>
        set((state) => ({
          usageLogs: [...state.usageLogs, { ...log, id: Date.now() }],
        })),

      clearUsageLogs: () => set({ usageLogs: [] }),

      setMonitoring: (isMonitoring) => set({ isMonitoring }),

      setCurrentSession: (session) => set({ currentSession: session }),

      // Computed
      getEnabledApps: () => get().trackedApps.filter((app) => app.isEnabled),

      getAppByPackage: (packageName) =>
        get().trackedApps.find((app) => app.packageName === packageName),

      getTodayLogs: () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayStart = today.getTime();
        
        return get().usageLogs.filter((log) => log.timestamp >= todayStart);
      },

      getWeeklyStats: () => {
        const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        const weeklyLogs = get().usageLogs.filter((log) => log.timestamp >= weekAgo);
        
        const totalSessions = weeklyLogs.length;
        const blockedSessions = weeklyLogs.filter((log) => log.wasBlocked).length;
        const averageSessionTime = weeklyLogs.length > 0
          ? weeklyLogs.reduce((sum, log) => sum + (log.sessionDuration || 0), 0) / weeklyLogs.length
          : 0;

        // Find most used reason
        const reasonCounts: Record<string, number> = {};
        weeklyLogs.forEach((log) => {
          reasonCounts[log.reason] = (reasonCounts[log.reason] || 0) + 1;
        });
        const mostUsedReason = Object.entries(reasonCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';

        return {
          totalSessions,
          blockedSessions,
          averageSessionTime,
          mostUsedReason,
        };
      },
    }),
    {
      name: 'mindgate-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
