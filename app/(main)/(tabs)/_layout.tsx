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

const tabColor = (focused: boolean) => (focused ? colors.primary : colors.textTertiary);

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
          tabBarIcon: ({ focused, size }) => (
            <HouseIcon color={tabColor(focused)} size={size} weight="regular" />
          ),
        }}
      />
      <Tabs.Screen
        name="aumigos"
        options={{
          title: 'AUmigos',
          tabBarIcon: ({ focused, size }) => (
            <PawPrintIcon color={tabColor(focused)} size={size} weight="regular" />
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
          tabBarIcon: ({ focused, size }) => (
            <StorefrontIcon color={tabColor(focused)} size={size} weight="regular" />
          ),
        }}
      />
      <Tabs.Screen
        name="agenda"
        options={{
          title: 'Agenda',
          tabBarIcon: ({ focused, size }) => (
            <CalendarBlankIcon color={tabColor(focused)} size={size} weight="regular" />
          ),
        }}
      />
      <Tabs.Screen
        name="configuracoes"
        options={{
          title: 'Config',
          tabBarIcon: ({ focused, size }) => (
            <UserCircleIcon color={tabColor(focused)} size={size} weight="regular" />
          ),
        }}
      />
    </Tabs>
  );
}
