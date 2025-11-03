
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import FloatingTabBar from '@/components/FloatingTabBar';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  const tabs = [
    {
      name: '(home)',
      title: 'Accueil',
      icon: 'house.fill',
      route: '/(tabs)/(home)',
    },
    {
      name: 'fiche-perso',
      title: 'Contact',
      icon: 'envelope.fill',
      route: '/fiche-perso',
    },
    {
      name: 'profile',
      title: 'À Propos',
      icon: 'info.circle.fill',
      route: '/(tabs)/profile',
    },
  ];

  if (Platform.OS === 'ios') {
    return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: {
            backgroundColor: colors.card,
            borderTopColor: colors.highlight,
          },
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: 'Accueil',
            tabBarIcon: ({ color }) => (
              <IconSymbol name="house.fill" color={color} size={28} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'À Propos',
            tabBarIcon: ({ color }) => (
              <IconSymbol name="info.circle.fill" color={color} size={28} />
            ),
          }}
        />
      </Tabs>
    );
  }

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
        tabBar={() => <FloatingTabBar tabs={tabs} />}
      >
        <Tabs.Screen name="(home)" />
        <Tabs.Screen name="profile" />
      </Tabs>
    </>
  );
}

import { IconSymbol } from '@/components/IconSymbol';
