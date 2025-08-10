import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/useAppStore';
import { TrackedApp } from '../types';

export default function AppSelectionScreen() {
  const { trackedApps, toggleAppTracking, addTrackedApp, removeTrackedApp } = useAppStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAppName, setNewAppName] = useState('');
  const [newPackageName, setNewPackageName] = useState('');
  const [newCategory, setNewCategory] = useState<'social' | 'entertainment' | 'games' | 'shopping' | 'other'>('other');

  const categories = [
    { id: 'social', label: 'Social Media', icon: 'people' },
    { id: 'entertainment', label: 'Entertainment', icon: 'play' },
    { id: 'games', label: 'Games', icon: 'game-controller' },
    { id: 'shopping', label: 'Shopping', icon: 'cart' },
    { id: 'other', label: 'Other', icon: 'apps' },
  ] as const;

  const handleAddApp = () => {
    if (!newAppName.trim() || !newPackageName.trim()) {
      Alert.alert('Error', 'Please fill in both app name and package name.');
      return;
    }

    const newApp: TrackedApp = {
      packageName: newPackageName.trim(),
      appName: newAppName.trim(),
      isEnabled: true,
      category: newCategory,
    };

    addTrackedApp(newApp);
    setNewAppName('');
    setNewPackageName('');
    setNewCategory('other');
    setShowAddForm(false);
  };

  const handleRemoveApp = (packageName: string) => {
    Alert.alert(
      'Remove App',
      'Are you sure you want to remove this app from tracking?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => removeTrackedApp(packageName) },
      ]
    );
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(c => c.id === category);
    return categoryData?.icon || 'apps';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'social': return 'bg-blue-500';
      case 'entertainment': return 'bg-purple-500';
      case 'games': return 'bg-green-500';
      case 'shopping': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const enabledApps = trackedApps.filter(app => app.isEnabled);
  const disabledApps = trackedApps.filter(app => !app.isEnabled);

  return (
    <SafeAreaView className="flex-1 bg-dark-900">
      <ScrollView className="flex-1 px-4">
        {/* Add New App */}
        <View className="bg-dark-800 rounded-xl p-4 mb-6">
          <TouchableOpacity
            onPress={() => setShowAddForm(!showAddForm)}
            className="flex-row items-center justify-between"
          >
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-primary-500 rounded-lg mr-3 items-center justify-center">
                <Ionicons name="add" size={20} color="#ffffff" />
              </View>
              <Text className="text-white text-lg font-semibold">Add New App</Text>
            </View>
            <Ionicons 
              name={showAddForm ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#ffffff" 
            />
          </TouchableOpacity>

          {showAddForm && (
            <View className="mt-4 space-y-4">
              <View>
                <Text className="text-gray-400 text-sm mb-2">App Name</Text>
                <TextInput
                  value={newAppName}
                  onChangeText={setNewAppName}
                  placeholder="e.g., Instagram"
                  placeholderTextColor="#6b7280"
                  className="bg-dark-700 text-white p-3 rounded-lg"
                />
              </View>
              <View>
                <Text className="text-gray-400 text-sm mb-2">Package Name</Text>
                <TextInput
                  value={newPackageName}
                  onChangeText={setNewPackageName}
                  placeholder="e.g., com.instagram.android"
                  placeholderTextColor="#6b7280"
                  className="bg-dark-700 text-white p-3 rounded-lg"
                />
              </View>
              <View>
                <Text className="text-gray-400 text-sm mb-2">Category</Text>
                <View className="flex-row flex-wrap gap-2">
                  {categories.map((category) => (
                    <TouchableOpacity
                      key={category.id}
                      onPress={() => setNewCategory(category.id)}
                      className={`px-3 py-2 rounded-lg border ${
                        newCategory === category.id
                          ? 'border-primary-500 bg-primary-500'
                          : 'border-dark-600 bg-dark-700'
                      }`}
                    >
                      <Text className={`text-sm ${
                        newCategory === category.id ? 'text-white' : 'text-gray-400'
                      }`}>
                        {category.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <TouchableOpacity
                onPress={handleAddApp}
                className="bg-primary-600 rounded-lg p-3 items-center"
              >
                <Text className="text-white font-semibold">Add App</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Enabled Apps */}
        {enabledApps.length > 0 && (
          <View className="bg-dark-800 rounded-xl p-4 mb-6">
            <Text className="text-white text-lg font-semibold mb-4">
              Active Apps ({enabledApps.length})
            </Text>
            <View className="space-y-3">
              {enabledApps.map((app) => (
                <View key={app.packageName} className="flex-row items-center justify-between p-3 bg-dark-700 rounded-lg">
                  <View className="flex-row items-center flex-1">
                    <View className={`w-10 h-10 ${getCategoryColor(app.category)} rounded-lg mr-3 items-center justify-center`}>
                      <Ionicons name={getCategoryIcon(app.category) as any} size={20} color="#ffffff" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-white font-medium">{app.appName}</Text>
                      <Text className="text-gray-400 text-sm">{app.packageName}</Text>
                    </View>
                  </View>
                  <View className="flex-row items-center space-x-2">
                    <Switch
                      value={app.isEnabled}
                      onValueChange={() => toggleAppTracking(app.packageName)}
                      trackColor={{ false: '#374151', true: '#10b981' }}
                      thumbColor={app.isEnabled ? '#ffffff' : '#9ca3af'}
                    />
                    <TouchableOpacity
                      onPress={() => handleRemoveApp(app.packageName)}
                      className="p-2"
                    >
                      <Ionicons name="trash" size={16} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Disabled Apps */}
        {disabledApps.length > 0 && (
          <View className="bg-dark-800 rounded-xl p-4 mb-6">
            <Text className="text-white text-lg font-semibold mb-4">
              Inactive Apps ({disabledApps.length})
            </Text>
            <View className="space-y-3">
              {disabledApps.map((app) => (
                <View key={app.packageName} className="flex-row items-center justify-between p-3 bg-dark-700 rounded-lg opacity-60">
                  <View className="flex-row items-center flex-1">
                    <View className={`w-10 h-10 ${getCategoryColor(app.category)} rounded-lg mr-3 items-center justify-center`}>
                      <Ionicons name={getCategoryIcon(app.category) as any} size={20} color="#ffffff" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-white font-medium">{app.appName}</Text>
                      <Text className="text-gray-400 text-sm">{app.packageName}</Text>
                    </View>
                  </View>
                  <View className="flex-row items-center space-x-2">
                    <Switch
                      value={app.isEnabled}
                      onValueChange={() => toggleAppTracking(app.packageName)}
                      trackColor={{ false: '#374151', true: '#10b981' }}
                      thumbColor={app.isEnabled ? '#ffffff' : '#9ca3af'}
                    />
                    <TouchableOpacity
                      onPress={() => handleRemoveApp(app.packageName)}
                      className="p-2"
                    >
                      <Ionicons name="trash" size={16} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Empty State */}
        {trackedApps.length === 0 && (
          <View className="bg-dark-800 rounded-xl p-8 mb-6 items-center">
            <Ionicons name="phone-portrait" size={48} color="#6b7280" />
            <Text className="text-gray-400 text-lg mt-4 text-center">
              No apps being tracked
            </Text>
            <Text className="text-gray-500 text-sm mt-2 text-center">
              Add apps to start monitoring your usage
            </Text>
          </View>
        )}

        {/* Help Section */}
        <View className="bg-dark-800 rounded-xl p-4 mb-6">
          <Text className="text-white text-lg font-semibold mb-4">How to Find Package Names</Text>
          <View className="space-y-2">
            <Text className="text-gray-400 text-sm">
              • For most apps, the package name follows the pattern: com.company.appname
            </Text>
            <Text className="text-gray-400 text-sm">
              • You can find package names in the app's Play Store URL
            </Text>
            <Text className="text-gray-400 text-sm">
              • Or use developer tools to inspect installed apps
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
