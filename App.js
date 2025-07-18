import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Platform, Alert, View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import MilkCollectionScreen from './screens/MilkCollectionScreen';
import AddMilkScreen from './screens/AddMilkScreen';
import ClientManagementScreen from './screens/ClientManagementScreen';
import AddClientScreen from './screens/AddClientScreen';
import DataManagementScreen from './screens/DataManagementScreen';
import { DatabaseService } from './services/DatabaseService';
import './i18n';

const Stack = createStackNavigator();

export default function App() {
  const { i18n } = useTranslation();
  const [lang, setLang] = React.useState(i18n.language);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLang(lng);
  };

  useEffect(() => {
    // Initialize database when app starts
    const initDatabase = async () => {
      try {
        await DatabaseService.initDatabase();
        console.log('Database initialized successfully');
      } catch (error) {
        console.error('Failed to initialize database:', error);
      }
    };
    initDatabase();
  }, []);

  return (
    <>
      <View style={{ position: 'absolute', top: 20, right: 20, zIndex: 999, flexDirection: 'row', backgroundColor: '#fff', borderRadius: 20, paddingVertical: 6, paddingHorizontal: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4, elevation: 5, alignItems: 'center', borderWidth: 1, borderColor: '#eee' }} pointerEvents="box-none">
        <Text style={{ marginRight: 6 }}>🌐</Text>
        <TouchableOpacity onPress={() => changeLanguage('en')} style={{ marginHorizontal: 2, padding: 4, borderBottomWidth: lang === 'en' ? 2 : 0, borderBottomColor: '#4A6741' }}>
          <Text style={{ color: lang === 'en' ? '#4A6741' : '#333', fontSize: 14 }}>EN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeLanguage('fr')} style={{ marginHorizontal: 2, padding: 4, borderBottomWidth: lang === 'fr' ? 2 : 0, borderBottomColor: '#4A6741' }}>
          <Text style={{ color: lang === 'fr' ? '#4A6741' : '#333', fontSize: 14 }}>FR</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeLanguage('ar')} style={{ marginHorizontal: 2, padding: 4, borderBottomWidth: lang === 'ar' ? 2 : 0, borderBottomColor: '#4A6741' }}>
          <Text style={{ color: lang === 'ar' ? '#4A6741' : '#333', fontSize: 14 }}>AR</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="MilkCollection" component={MilkCollectionScreen} />
            <Stack.Screen name="AddMilk" component={AddMilkScreen} />
            <Stack.Screen name="ClientManagement" component={ClientManagementScreen} />
            <Stack.Screen name="AddClient" component={AddClientScreen} />
            <Stack.Screen name="DataManagement" component={DataManagementScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </>
  );
}