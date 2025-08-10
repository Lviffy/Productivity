import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/useAppStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: Props) {
  const {
    isMonitoring,
    setMonitoring,
    trackedApps,
    settings,
    getTodayLogs,
    getWeeklyStats,
  } = useAppStore();

  const todayLogs = getTodayLogs();
  const weeklyStats = getWeeklyStats();
  const enabledApps = trackedApps.filter(app => app.isEnabled);

  const handleToggleMonitoring = () => {
    if (!isMonitoring) {
      Alert.alert(
        'Start Monitoring',
        'MindGate will now monitor your app usage and show prompts before opening tracked apps.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Start', onPress: () => setMonitoring(true) },
        ]
      );
    } else {
      setMonitoring(false);
    }
  };

  const getStatusColor = () => {
    return isMonitoring ? 'text-green-400' : 'text-red-400';
  };

  const getStatusText = () => {
    return isMonitoring ? 'Active' : 'Inactive';
  };

  return (
    <SafeAreaView className="flex-1 bg-dark-900">
      <ScrollView className="flex-1 px-4">
        {/* Status Card */}
        <View className="bg-dark-800 rounded-xl p-4 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white text-lg font-semibold">Monitoring Status</Text>
            <Switch
              value={isMonitoring}
              onValueChange={handleToggleMonitoring}
              trackColor={{ false: '#374151', true: '#10b981' }}
              thumbColor={isMonitoring ? '#ffffff' : '#9ca3af'}
            />
          </View>
          <View className="flex-row items-center">
            <View className={`w-3 h-3 rounded-full mr-2 ${isMonitoring ? 'bg-green-400' : 'bg-red-400'}`} />
            <Text className={`text-sm ${getStatusColor()}`}>
              {getStatusText()}
            </Text>
          </View>
          <Text className="text-gray-400 text-sm mt-2">
            {isMonitoring 
              ? `${enabledApps.length} apps being monitored`
              : 'Tap to start monitoring your app usage'
            }
          </Text>
        </View>

        {/* Quick Stats */}
        <View className="bg-dark-800 rounded-xl p-4 mb-6">
          <Text className="text-white text-lg font-semibold mb-4">Today's Activity</Text>
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-white text-2xl font-bold">{todayLogs.length}</Text>
              <Text className="text-gray-400 text-sm">Sessions</Text>
            </View>
            <View className="items-center">
              <Text className="text-white text-2xl font-bold">{settings.streakDays}</Text>
              <Text className="text-gray-400 text-sm">Day Streak</Text>
            </View>
            <View className="items-center">
              <Text className="text-white text-2xl font-bold">{settings.mindfulnessScore}</Text>
              <Text className="text-gray-400 text-sm">Mindfulness</Text>
            </View>
          </View>
        </View>

        {/* Tracked Apps */}
        <View className="bg-dark-800 rounded-xl p-4 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white text-lg font-semibold">Tracked Apps</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('AppSelection')}
              className="flex-row items-center"
            >
              <Text className="text-primary-400 text-sm mr-1">Manage</Text>
              <Ionicons name="chevron-forward" size={16} color="#60a5fa" />
            </TouchableOpacity>
          </View>
          {enabledApps.length > 0 ? (
            <View>
              {enabledApps.slice(0, 3).map((app) => (
                <View key={app.packageName} className="flex-row items-center py-2">
                  <View className="w-8 h-8 bg-primary-500 rounded-lg mr-3 items-center justify-center">
                    <Ionicons name="phone-portrait" size={16} color="#ffffff" />
                  </View>
                  <Text className="text-white flex-1">{app.appName}</Text>
                  <View className="bg-green-500 px-2 py-1 rounded-full">
                    <Text className="text-white text-xs">Active</Text>
                  </View>
                </View>
              ))}
              {enabledApps.length > 3 && (
                <Text className="text-gray-400 text-sm mt-2">
                  +{enabledApps.length - 3} more apps
                </Text>
              )}
            </View>
          ) : (
            <Text className="text-gray-400 text-sm">No apps being tracked</Text>
          )}
        </View>

        {/* Quick Actions */}
        <View className="bg-dark-800 rounded-xl p-4 mb-6">
          <Text className="text-white text-lg font-semibold mb-4">Quick Actions</Text>
          <View className="flex-row space-x-3">
            <TouchableOpacity
              onPress={() => navigation.navigate('Insights')}
              className="flex-1 bg-primary-600 rounded-lg p-4 items-center"
            >
              <Ionicons name="analytics" size={24} color="#ffffff" />
              <Text className="text-white text-sm mt-2">Insights</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Settings')}
              className="flex-1 bg-dark-700 rounded-lg p-4 items-center"
            >
              <Ionicons name="settings" size={24} color="#ffffff" />
              <Text className="text-white text-sm mt-2">Settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Weekly Summary */}
        {weeklyStats.totalSessions > 0 && (
          <View className="bg-dark-800 rounded-xl p-4 mb-6">
            <Text className="text-white text-lg font-semibold mb-4">This Week</Text>
            <View className="space-y-2">
              <View className="flex-row justify-between">
                <Text className="text-gray-400">Total Sessions</Text>
                <Text className="text-white">{weeklyStats.totalSessions}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-400">Blocked Sessions</Text>
                <Text className="text-white">{weeklyStats.blockedSessions}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-400">Avg Session Time</Text>
                <Text className="text-white">
                  {Math.round(weeklyStats.averageSessionTime / 1000 / 60)}m
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
