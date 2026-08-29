import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  USERS: '@petfacil:users',
  CURRENT_USER: '@petfacil:currentUser',
  PURCHASES: '@petfacil:purchases',
  PETS: '@petfacil:pets',
  APPOINTMENTS: '@petfacil:appointments',
} as const;

export async function getItem<T>(key: string): Promise<T | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch {
    return null;
  }
}

export async function setItem<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export async function removeItem(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {}
}
