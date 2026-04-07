import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  BarlowCondensed_700Bold,
} from '@expo-google-fonts/barlow-condensed';
import {
  DMMono_500Medium,
} from '@expo-google-fonts/dm-mono';
import {
  DMSans_400Regular,
  DMSans_500Medium,
} from '@expo-google-fonts/dm-sans';

import { Colors } from './src/constants/colors';
import PickScreen from './src/screens/PickScreen';
import GameScreen from './src/screens/GameScreen';
import RankScreen from './src/screens/RankScreen';
import RedeemScreen from './src/screens/RedeemScreen';

import StarIcon from './src/components/icons/StarIcon';
import CalendarIcon from './src/components/icons/CalendarIcon';
import BarChartIcon from './src/components/icons/BarChartIcon';
import LockIcon from './src/components/icons/LockIcon';

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: styles.tabBar,
            tabBarActiveTintColor: Colors.maroon,
            tabBarInactiveTintColor: Colors.tabInactive,
            tabBarLabelStyle: styles.tabLabel,
            tabBarItemStyle: styles.tabItem,
            tabBarIcon: ({ color }) => {
              const size = 22;
              if (route.name === 'Pick') return <StarIcon size={size} color={color} />;
              if (route.name === 'Game') return <CalendarIcon size={size} color={color} />;
              if (route.name === 'Rank') return <BarChartIcon size={size} color={color} />;
              if (route.name === 'Redeem') return <LockIcon size={size} color={color} />;
              return null;
            },
          })}
        >
          <Tab.Screen name="Pick" component={PickScreen} />
          <Tab.Screen name="Game" component={GameScreen} />
          <Tab.Screen name="Rank" component={RankScreen} />
          <Tab.Screen name="Redeem" component={RedeemScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    BarlowCondensedBold: BarlowCondensed_700Bold,
    DMMonoMedium: DMMono_500Medium,
    DMSans: DMSans_400Regular,
    DMSansMedium: DMSans_500Medium,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Colors.maroon} />
      </View>
    );
  }

  // On web: render app inside a phone-shaped frame centered on the page
  if (Platform.OS === 'web') {
    return (
      <View style={styles.webBackground}>
        <View style={styles.phoneShadow}>
          <View style={styles.phoneFrame}>
            <AppNavigator />
          </View>
        </View>
      </View>
    );
  }

  return <AppNavigator />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
  },
  tabBar: {
    backgroundColor: Colors.card,
    borderTopWidth: 0.5,
    borderTopColor: Colors.tabBorder,
    height: 62,
    paddingTop: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabLabel: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    letterSpacing: 0.3,
    marginBottom: 0,
  },
  tabItem: {
    paddingTop: 11,
    paddingBottom: 13,
  },
  // Web-only phone frame
  webBackground: {
    flex: 1,
    backgroundColor: '#0F1623',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneShadow: {
    borderRadius: 44,
    // Web shadow via elevation fallback — actual CSS shadow applied via style prop
    elevation: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.6,
    shadowRadius: 48,
  },
  phoneFrame: {
    width: 390,
    height: 844,
    borderRadius: 44,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
});
