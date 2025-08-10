import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/useAppStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

interface Props {
  navigation: SettingsScreenNavigationProp;
}

export default function SettingsScreen({ navigation }: Props) {
  const { settings, setSettings, clearUsageLogs } = useAppStore();
  const [promptText, setPromptText] = useState(settings.promptText);
  const [delayTime, setDelayTime] = useState(settings.delayTime.toString());
  const [blockKeywords, setBlockKeywords] = useState(settings.blockKeywords.join(', '));

  const handleSavePrompt = () => {
    setSettings({ promptText });
  };

  const handleSaveDelay = () => {
    const delay = parseInt(delayTime);
    if (isNaN(delay) || delay < 0 || delay > 60) {
      Alert.alert('Invalid Delay', 'Please enter a number between 0 and 60 seconds.');
      return;
    }
    setSettings({ delayTime: delay });
  };

  const handleSaveBlockKeywords = () => {
    const keywords = blockKeywords
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0);
    setSettings({ blockKeywords: keywords });
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will permanently delete all your usage logs and reset your mindfulness score. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            clearUsageLogs();
            setSettings({
              mindfulnessScore: 0,
              streakDays: 0,
            });
            Alert.alert('Data Cleared', 'All usage data has been cleared.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-dark-900">
      <ScrollView className="flex-1 px-4">
        {/* Prompt Settings */}
        <View className="bg-dark-800 rounded-xl p-4 mb-6">
          <Text className="text-white text-lg font-semibold mb-4">Prompt Settings</Text>
          <View className="space-y-4">
            <View>
              <Text className="text-gray-400 text-sm mb-2">Custom Prompt</Text>
              <TextInput
                value={promptText}
                onChangeText={setPromptText}
                onBlur={handleSavePrompt}
                placeholder="Why are you opening this app?"
                placeholderTextColor="#6b7280"
                className="bg-dark-700 text-white p-3 rounded-lg"
                multiline
              />
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-400 text-sm">Enable Mood Tracking</Text>
              <Switch
                value={settings.enableMoodTracking}
                onValueChange={(value) => setSettings({ enableMoodTracking: value })}
                trackColor={{ false: '#374151', true: '#10b981' }}
                thumbColor={settings.enableMoodTracking ? '#ffffff' : '#9ca3af'}
              />
            </View>
          </View>
        </View>

        {/* Timing Settings */}
        <View className="bg-dark-800 rounded-xl p-4 mb-6">
          <Text className="text-white text-lg font-semibold mb-4">Timing Settings</Text>
          <View className="space-y-4">
            <View>
              <Text className="text-gray-400 text-sm mb-2">Delay Time (seconds)</Text>
              <TextInput
                value={delayTime}
                onChangeText={setDelayTime}
                onBlur={handleSaveDelay}
                placeholder="5"
                placeholderTextColor="#6b7280"
                keyboardType="numeric"
                className="bg-dark-700 text-white p-3 rounded-lg"
              />
            </View>
          </View>
        </View>

        {/* Block Settings */}
        <View className="bg-dark-800 rounded-xl p-4 mb-6">
          <Text className="text-white text-lg font-semibold mb-4">Block Settings</Text>
          <View className="space-y-4">
            <View>
              <Text className="text-gray-400 text-sm mb-2">Block Keywords (comma-separated)</Text>
              <TextInput
                value={blockKeywords}
                onChangeText={setBlockKeywords}
                onBlur={handleSaveBlockKeywords}
                placeholder="bored, nothing, waste time"
                placeholderTextColor="#6b7280"
                className="bg-dark-700 text-white p-3 rounded-lg"
                multiline
              />
              <Text className="text-gray-500 text-xs mt-1">
                Apps will be blocked if the reason contains these keywords
              </Text>
            </View>
          </View>
        </View>

        {/* Insights Settings */}
        <View className="bg-dark-800 rounded-xl p-4 mb-6">
          <Text className="text-white text-lg font-semibold mb-4">Insights & Analytics</Text>
          <View className="space-y-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-400 text-sm">Enable Insights</Text>
              <Switch
                value={settings.enableInsights}
                onValueChange={(value) => setSettings({ enableInsights: value })}
                trackColor={{ false: '#374151', true: '#10b981' }}
                thumbColor={settings.enableInsights ? '#ffffff' : '#9ca3af'}
              />
            </View>
          </View>
        </View>

        {/* Data Management */}
        <View className="bg-dark-800 rounded-xl p-4 mb-6">
          <Text className="text-white text-lg font-semibold mb-4">Data Management</Text>
          <TouchableOpacity
            onPress={handleClearData}
            className="flex-row items-center justify-between p-3 bg-red-600 rounded-lg"
          >
            <View className="flex-row items-center">
              <Ionicons name="trash" size={20} color="#ffffff" />
              <Text className="text-white ml-2">Clear All Data</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View className="bg-dark-800 rounded-xl p-4 mb-6">
          <Text className="text-white text-lg font-semibold mb-4">App Information</Text>
          <View className="space-y-2">
            <View className="flex-row justify-between">
              <Text className="text-gray-400">Version</Text>
              <Text className="text-white">1.0.0</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-400">Build</Text>
              <Text className="text-white">1</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
