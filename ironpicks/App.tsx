import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from 'react-native';
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

const PHONE_ASPECT = 390 / 780; // width / height ratio

function AppNavigator() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
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

function PhoneFrame({ children }: { children: React.ReactNode }) {
  const { width, height } = useWindowDimensions();

  // On narrow viewports (actual phone) skip the frame
  if (width < 500) {
    return <View style={{ flex: 1 }}>{children}</View>;
  }

  // Scale phone to fit available height with margin
  const phoneH = Math.min(height - 48, 780);
  const phoneW = Math.round(phoneH * PHONE_ASPECT);
  const screenR = 36;
  const bezel = 13;

  return (
    <View style={styles.page}>
      {/* Subtle background label */}
      <Text style={styles.bgLabel}>IronPicks · Lehigh Valley IronPigs</Text>

      {/* Phone shell */}
      <View style={[styles.phoneShell, { width: phoneW + bezel * 2, height: phoneH + bezel * 2, borderRadius: screenR + bezel }]}>
        {/* Left buttons */}
        <View style={[styles.sideBtn, styles.sideBtnLeft, { top: phoneH * 0.22 }]} />
        <View style={[styles.sideBtn, styles.sideBtnLeft, { top: phoneH * 0.32 }]} />
        <View style={[styles.sideBtn, styles.sideBtnLeft, { top: phoneH * 0.40 }]} />
        {/* Right button */}
        <View style={[styles.sideBtn, styles.sideBtnRight, { top: phoneH * 0.28, height: 64 }]} />

        {/* Screen */}
        <View style={[styles.screen, { width: phoneW, height: phoneH, borderRadius: screenR }]}>
          {/* Dynamic island */}
          <View style={styles.dynamicIsland} />
          {/* App content — padded below the dynamic island */}
          <View style={{ flex: 1, paddingTop: 54 }}>
            {children}
          </View>
          {/* Home indicator */}
          <View style={styles.homeBar} />
        </View>
      </View>
    </View>
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

  if (Platform.OS === 'web') {
    return (
      <PhoneFrame>
        <AppNavigator />
      </PhoneFrame>
    );
  }

  return <AppNavigator />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D0D12',
  },

  // Phone frame (web only)
  page: {
    flex: 1,
    backgroundColor: '#0D0D12',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgLabel: {
    position: 'absolute',
    bottom: 16,
    fontFamily: 'DMMonoMedium',
    fontSize: 10,
    color: 'rgba(255,255,255,0.15)',
    letterSpacing: 1,
  },
  phoneShell: {
    backgroundColor: '#1A1A1E',
    alignItems: 'center',
    justifyContent: 'center',
    // Outer shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.7,
    shadowRadius: 48,
    elevation: 30,
    // Subtle highlight on top edge
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    position: 'relative',
  },
  sideBtn: {
    position: 'absolute',
    width: 4,
    height: 36,
    borderRadius: 2,
    backgroundColor: '#2A2A30',
  },
  sideBtnLeft: { left: -5 },
  sideBtnRight: { right: -5 },
  screen: {
    backgroundColor: Colors.surface,
    overflow: 'hidden',
    position: 'relative',
  },
  dynamicIsland: {
    position: 'absolute',
    top: 12,
    alignSelf: 'center',
    width: 120,
    height: 34,
    backgroundColor: '#1A1A1E',
    borderRadius: 20,
    zIndex: 100,
  },
  homeBar: {
    height: 5,
    width: 120,
    backgroundColor: 'rgba(0,0,0,0.18)',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 8,
  },

  // Tab bar
  tabBar: {
    backgroundColor: Colors.card,
    borderTopWidth: 0.5,
    borderTopColor: Colors.tabBorder,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabLabel: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    letterSpacing: 0.3,
  },
  tabItem: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});
