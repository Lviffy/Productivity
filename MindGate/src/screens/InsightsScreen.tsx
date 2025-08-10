import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/useAppStore';

export default function InsightsScreen() {
  const { usageLogs, settings, getTodayLogs, getWeeklyStats } = useAppStore();

  const todayLogs = getTodayLogs();
  const weeklyStats = getWeeklyStats();

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 1000 / 60);
    const seconds = Math.floor((milliseconds / 1000) % 60);
    return `${minutes}m ${seconds}s`;
  };

  const getMostUsedApps = () => {
    const appCounts: Record<string, number> = {};
    usageLogs.forEach(log => {
      appCounts[log.appName] = (appCounts[log.appName] || 0) + 1;
    });
    
    return Object.entries(appCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([appName, count]) => ({ appName, count }));
  };

  const getMostCommonReasons = () => {
    const reasonCounts: Record<string, number> = {};
    usageLogs.forEach(log => {
      reasonCounts[log.reason] = (reasonCounts[log.reason] || 0) + 1;
    });
    
    return Object.entries(reasonCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([reason, count]) => ({ reason, count }));
  };

  const mostUsedApps = getMostUsedApps();
  const mostCommonReasons = getMostCommonReasons();

  return (
    <SafeAreaView className="flex-1 bg-dark-900">
      <ScrollView className="flex-1 px-4">
        {/* Mindfulness Score */}
        <View className="bg-dark-800 rounded-xl p-4 mb-6">
          <Text className="text-white text-lg font-semibold mb-4">Mindfulness Score</Text>
          <View className="items-center">
            <View className="w-24 h-24 bg-primary-600 rounded-full items-center justify-center mb-4">
              <Text className="text-white text-3xl font-bold">{settings.mindfulnessScore}</Text>
            </View>
            <Text className="text-gray-400 text-sm">Current Score</Text>
            <Text className="text-white text-sm mt-2">
              {settings.streakDays} day streak
            </Text>
          </View>
        </View>

        {/* Weekly Overview */}
        <View className="bg-dark-800 rounded-xl p-4 mb-6">
          <Text className="text-white text-lg font-semibold mb-4">This Week</Text>
          <View className="space-y-3">
            <View className="flex-row justify-between">
              <Text className="text-gray-400">Total Sessions</Text>
              <Text className="text-white font-semibold">{weeklyStats.totalSessions}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-400">Blocked Sessions</Text>
              <Text className="text-white font-semibold">{weeklyStats.blockedSessions}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-400">Block Rate</Text>
              <Text className="text-white font-semibold">
                {weeklyStats.totalSessions > 0 
                  ? Math.round((weeklyStats.blockedSessions / weeklyStats.totalSessions) * 100)
                  : 0}%
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-400">Avg Session Time</Text>
              <Text className="text-white font-semibold">
                {weeklyStats.averageSessionTime > 0 
                  ? formatDuration(weeklyStats.averageSessionTime)
                  : '0m 0s'}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-400">Most Common Reason</Text>
              <Text className="text-white font-semibold text-right flex-1 ml-2">
                {weeklyStats.mostUsedReason}
              </Text>
            </View>
          </View>
        </View>

        {/* Most Used Apps */}
        {mostUsedApps.length > 0 && (
          <View className="bg-dark-800 rounded-xl p-4 mb-6">
            <Text className="text-white text-lg font-semibold mb-4">Most Used Apps</Text>
            <View className="space-y-3">
              {mostUsedApps.map((app, index) => (
                <View key={app.appName} className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <View className="w-8 h-8 bg-primary-500 rounded-lg mr-3 items-center justify-center">
                      <Text className="text-white text-xs font-bold">{index + 1}</Text>
                    </View>
                    <Text className="text-white flex-1">{app.appName}</Text>
                  </View>
                  <Text className="text-gray-400">{app.count} times</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Most Common Reasons */}
        {mostCommonReasons.length > 0 && (
          <View className="bg-dark-800 rounded-xl p-4 mb-6">
            <Text className="text-white text-lg font-semibold mb-4">Most Common Reasons</Text>
            <View className="space-y-3">
              {mostCommonReasons.map((reason, index) => (
                <View key={reason.reason} className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <View className="w-8 h-8 bg-green-500 rounded-lg mr-3 items-center justify-center">
                      <Text className="text-white text-xs font-bold">{index + 1}</Text>
                    </View>
                    <Text className="text-white flex-1">{reason.reason}</Text>
                  </View>
                  <Text className="text-gray-400">{reason.count} times</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Recent Activity */}
        {usageLogs.length > 0 && (
          <View className="bg-dark-800 rounded-xl p-4 mb-6">
            <Text className="text-white text-lg font-semibold mb-4">Recent Activity</Text>
            <View className="space-y-3">
              {usageLogs.slice(0, 10).map((log) => (
                <View key={log.id} className="border-b border-dark-700 pb-3 last:border-b-0">
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-white font-medium">{log.appName}</Text>
                    <Text className="text-gray-400 text-sm">
                      {formatTime(log.timestamp)}
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-gray-400 text-sm flex-1 mr-2">
                      "{log.reason}"
                    </Text>
                    <View className={`px-2 py-1 rounded-full ${
                      log.wasBlocked ? 'bg-red-500' : 'bg-green-500'
                    }`}>
                      <Text className="text-white text-xs">
                        {log.wasBlocked ? 'Blocked' : 'Allowed'}
                      </Text>
                    </View>
                  </View>
                  {log.mood && (
                    <Text className="text-gray-500 text-xs mt-1">
                      Mood: {log.mood}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Empty State */}
        {usageLogs.length === 0 && (
          <View className="bg-dark-800 rounded-xl p-8 mb-6 items-center">
            <Ionicons name="analytics" size={48} color="#6b7280" />
            <Text className="text-gray-400 text-lg mt-4 text-center">
              No usage data yet
            </Text>
            <Text className="text-gray-500 text-sm mt-2 text-center">
              Start monitoring your apps to see insights here
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
