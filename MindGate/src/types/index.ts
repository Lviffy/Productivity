export interface TrackedApp {
  packageName: string;
  appName: string;
  icon?: string;
  isEnabled: boolean;
  category: 'social' | 'entertainment' | 'games' | 'shopping' | 'other';
}

export interface UsageLog {
  id?: number;
  packageName: string;
  appName: string;
  timestamp: number;
  reason: string;
  mood?: string;
  wasBlocked: boolean;
  delayTime?: number;
  sessionDuration?: number;
}

export interface AppSettings {
  promptText: string;
  delayTime: number;
  blockKeywords: string[];
  enableMoodTracking: boolean;
  enableInsights: boolean;
  mindfulnessScore: number;
  streakDays: number;
}

export interface MoodOption {
  id: string;
  label: string;
  emoji: string;
  color: string;
}

export interface QuickReason {
  id: string;
  label: string;
  category: 'productive' | 'neutral' | 'unproductive';
}

export interface AppState {
  trackedApps: TrackedApp[];
  settings: AppSettings;
  usageLogs: UsageLog[];
  isMonitoring: boolean;
  currentSession?: {
    packageName: string;
    startTime: number;
  };
}

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  Insights: undefined;
  AppSelection: undefined;
  Onboarding: undefined;
};
