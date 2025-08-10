import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type OnboardingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

interface Props {
  navigation: OnboardingScreenNavigationProp;
}

export default function OnboardingScreen({ navigation }: Props) {
  const features = [
    {
      icon: 'shield-checkmark',
      title: 'Intentional App Usage',
      description: 'Pause and reflect before opening apps that might lead to mindless scrolling.',
    },
    {
      icon: 'analytics',
      title: 'Usage Insights',
      description: 'Track your patterns and understand what drives your app usage.',
    },
    {
      icon: 'settings',
      title: 'Customizable',
      description: 'Choose which apps to monitor and set your own prompts and rules.',
    },
    {
      icon: 'trophy',
      title: 'Build Better Habits',
      description: 'Develop mindfulness and reduce unconscious phone usage.',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-dark-900">
      <ScrollView className="flex-1 px-4">
        {/* Header */}
        <View className="items-center py-8">
          <View className="w-20 h-20 bg-primary-600 rounded-full items-center justify-center mb-4">
            <Ionicons name="shield" size={40} color="#ffffff" />
          </View>
          <Text className="text-white text-3xl font-bold mb-2">MindGate</Text>
          <Text className="text-gray-400 text-lg text-center">
            Your Intentional App Unlock
          </Text>
        </View>

        {/* Features */}
        <View className="space-y-6 mb-8">
          {features.map((feature, index) => (
            <View key={index} className="bg-dark-800 rounded-xl p-6">
              <View className="flex-row items-start">
                <View className="w-12 h-12 bg-primary-500 rounded-lg mr-4 items-center justify-center">
                  <Ionicons name={feature.icon as any} size={24} color="#ffffff" />
                </View>
                <View className="flex-1">
                  <Text className="text-white text-lg font-semibold mb-2">
                    {feature.title}
                  </Text>
                  <Text className="text-gray-400 text-sm leading-5">
                    {feature.description}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* How it works */}
        <View className="bg-dark-800 rounded-xl p-6 mb-8">
          <Text className="text-white text-lg font-semibold mb-4 text-center">
            How It Works
          </Text>
          <View className="space-y-4">
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-primary-500 rounded-full items-center justify-center mr-3">
                <Text className="text-white text-sm font-bold">1</Text>
              </View>
              <Text className="text-gray-400 text-sm flex-1">
                Select apps you want to monitor
              </Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-primary-500 rounded-full items-center justify-center mr-3">
                <Text className="text-white text-sm font-bold">2</Text>
              </View>
              <Text className="text-gray-400 text-sm flex-1">
                When you try to open a monitored app, MindGate will ask why
              </Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-primary-500 rounded-full items-center justify-center mr-3">
                <Text className="text-white text-sm font-bold">3</Text>
              </View>
              <Text className="text-gray-400 text-sm flex-1">
                Based on your answer, the app may be delayed, blocked, or allowed
              </Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-primary-500 rounded-full items-center justify-center mr-3">
                <Text className="text-white text-sm font-bold">4</Text>
              </View>
              <Text className="text-gray-400 text-sm flex-1">
                Review your patterns and build better habits
              </Text>
            </View>
          </View>
        </View>

        {/* Privacy Note */}
        <View className="bg-dark-800 rounded-xl p-6 mb-8">
          <View className="flex-row items-start">
            <Ionicons name="lock-closed" size={20} color="#10b981" className="mr-3 mt-1" />
            <View className="flex-1">
              <Text className="text-white font-semibold mb-2">Privacy First</Text>
              <Text className="text-gray-400 text-sm">
                All your data stays on your device. We don't collect or share any personal information.
              </Text>
            </View>
          </View>
        </View>

        {/* Get Started Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          className="bg-primary-600 rounded-xl p-4 mb-8"
        >
          <Text className="text-white text-lg font-semibold text-center">
            Get Started
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
