import { Tabs } from 'expo-router';
import {
  CalendarBlankIcon,
  HouseIcon,
  PawPrintIcon,
  StorefrontIcon,
  UserCircleIcon,
} from 'phosphor-react-native';
import { Text } from 'react-native';

import { colors } from '@/src/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <HouseIcon color={color} size={size} weight="regular" />
          ),
        }}
      />
      <Tabs.Screen
        name="aumigos"
        options={{
          title: 'AUmigos',
          tabBarIcon: ({ color, size }) => (
            <PawPrintIcon color={color} size={size} weight="regular" />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={{ fontSize: 10, fontWeight: '600', color }}>
              <Text style={{ color: colors.primary, fontWeight: '700' }}>AU</Text>
              migos
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="produtos"
        options={{
          title: 'Produtos',
          tabBarIcon: ({ color, size }) => (
            <StorefrontIcon color={color} size={size} weight="regular" />
          ),
        }}
      />
      <Tabs.Screen
        name="agenda"
        options={{
          title: 'Agenda',
          tabBarIcon: ({ color, size }) => (
            <CalendarBlankIcon color={color} size={size} weight="regular" />
          ),
        }}
      />
      <Tabs.Screen
        name="configuracoes"
        options={{
          title: 'Config',
          tabBarIcon: ({ color, size }) => (
            <UserCircleIcon color={color} size={size} weight="regular" />
          ),
        }}
      />
    </Tabs>
  );
}
