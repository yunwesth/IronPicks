import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Animated,
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
import HomeScreen from './src/screens/HomeScreen';
import PickScreen from './src/screens/PickScreen';
import GameScreen from './src/screens/GameScreen';
import RankScreen from './src/screens/RankScreen';
import RedeemScreen from './src/screens/RedeemScreen';

import HomeIcon from './src/components/icons/HomeIcon';
import StarIcon from './src/components/icons/StarIcon';
import CalendarIcon from './src/components/icons/CalendarIcon';
import BarChartIcon from './src/components/icons/BarChartIcon';
import LockIcon from './src/components/icons/LockIcon';

const Tab = createBottomTabNavigator();

// Random in-game events that pop up during the game
const GAME_EVENTS = [
  {
    id: 'scoring',
    tag: 'SCORING PLAY',
    tagColor: Colors.maroon,
    title: 'IronPigs Score!',
    body: 'Romero scores from third on Alcantara\'s RBI walk. IronPigs now lead 3–2 in the bottom of the 6th!',
    cta: 'Make a Pick',
    ctaTab: 'Pick',
  },
  {
    id: 'bonus',
    tag: 'BONUS CHALLENGE',
    tagColor: Colors.navy,
    title: 'Double-or-Nothing!',
    body: 'Bases loaded, 2 outs. Will the IronPigs extend their lead? Pick now for a 3× multiplier!',
    cta: 'Accept Challenge',
    ctaTab: 'Pick',
  },
  {
    id: 'streak',
    tag: 'STREAK BONUS',
    tagColor: '#1A7A47',
    title: 'You\'re On Fire!',
    body: 'Your 3-pick streak just earned you 50 bonus BB. Keep the momentum going!',
    cta: 'Keep Picking',
    ctaTab: 'Pick',
  },
  {
    id: 'rally',
    tag: 'RALLY TIME',
    tagColor: Colors.maroon,
    title: 'IronPigs Rally!',
    body: 'Runners on 2nd and 3rd, 2 outs — bottom of the 6th. This is a critical moment!',
    cta: 'Predict the Play',
    ctaTab: 'Pick',
  },
  {
    id: 'pitching',
    tag: 'PITCHING CHANGE',
    tagColor: Colors.navy,
    title: 'New Pitcher Coming In',
    body: 'Manager goes to the bullpen. New matchup, new odds. Update your picks for the next at-bat!',
    cta: 'View Game',
    ctaTab: 'Game',
  },
];

function getRandomEvent() {
  return GAME_EVENTS[Math.floor(Math.random() * GAME_EVENTS.length)];
}

// Random delay between events: 15–35 seconds (first one after 6s for quick demo)
function nextDelay(isFirst: boolean) {
  if (isFirst) return 6000;
  return 15000 + Math.random() * 20000;
}

export default function App() {
  const [fontsLoaded] = useFonts({
    BarlowCondensedBold: BarlowCondensed_700Bold,
    DMMonoMedium: DMMono_500Medium,
    DMSans: DMSans_400Regular,
    DMSansMedium: DMSans_500Medium,
  });

  const [eventVisible, setEventVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(GAME_EVENTS[0]);
  const navRef = useRef<any>(null);
  const isFirstEvent = useRef(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(60)).current;

  useEffect(() => {
    if (!fontsLoaded) return;

    let timeout: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      timeout = setTimeout(() => {
        setCurrentEvent(getRandomEvent());
        setEventVisible(true);
        isFirstEvent.current = false;
        // next one schedules after this is dismissed — see handleDismiss
      }, nextDelay(isFirstEvent.current));
    };

    scheduleNext();
    return () => clearTimeout(timeout);
  }, [fontsLoaded]);

  useEffect(() => {
    if (eventVisible) {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 220, useNativeDriver: true }),
        Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, bounciness: 6 }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      slideAnim.setValue(60);
    }
  }, [eventVisible]);

  const handleDismiss = () => {
    setEventVisible(false);
    // Schedule the next event after dismissal
    const timeout = setTimeout(() => {
      setCurrentEvent(getRandomEvent());
      setEventVisible(true);
    }, nextDelay(false));
    return () => clearTimeout(timeout);
  };

  const handleCTA = () => {
    setEventVisible(false);
    if (navRef.current) {
      navRef.current.navigate(currentEvent.ctaTab);
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Colors.maroon} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navRef}>
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
              if (route.name === 'Home') return <HomeIcon size={size} color={color} />;
              if (route.name === 'Pick') return <StarIcon size={size} color={color} />;
              if (route.name === 'Game') return <CalendarIcon size={size} color={color} />;
              if (route.name === 'Rank') return <BarChartIcon size={size} color={color} />;
              if (route.name === 'Redeem') return <LockIcon size={size} color={color} />;
              return null;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Pick" component={PickScreen} />
          <Tab.Screen name="Game" component={GameScreen} />
          <Tab.Screen name="Rank" component={RankScreen} />
          <Tab.Screen name="Redeem" component={RedeemScreen} />
        </Tab.Navigator>
      </NavigationContainer>

      {/* Random event popup */}
      <Modal
        visible={eventVisible}
        transparent
        animationType="none"
        onRequestClose={handleDismiss}
      >
        <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
          <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={handleDismiss} />
          <Animated.View style={[styles.eventSheet, { transform: [{ translateY: slideAnim }] }]}>
            {/* Tag */}
            <View style={[styles.eventTag, { backgroundColor: currentEvent.tagColor }]}>
              <View style={styles.eventTagDot} />
              <Text style={styles.eventTagText}>{currentEvent.tag}</Text>
            </View>

            {/* Content */}
            <Text style={styles.eventTitle}>{currentEvent.title}</Text>
            <Text style={styles.eventBody}>{currentEvent.body}</Text>

            {/* Actions */}
            <TouchableOpacity style={styles.eventCTA} onPress={handleCTA} activeOpacity={0.85}>
              <Text style={styles.eventCTAText}>{currentEvent.cta}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.eventDismiss} onPress={handleDismiss} activeOpacity={0.7}>
              <Text style={styles.eventDismissText}>Dismiss</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </Modal>
    </SafeAreaProvider>
  );
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

  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(23,19,15,0.45)',
  },
  eventSheet: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 36,
    gap: 0,
  },
  eventTag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 14,
  },
  eventTagDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(255,255,255,0.75)',
  },
  eventTagText: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: '#FFFFFF',
    letterSpacing: 0.8,
  },
  eventTitle: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 28,
    color: Colors.textPrimary,
    lineHeight: 32,
    marginBottom: 8,
  },
  eventBody: {
    fontFamily: 'DMSans',
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 21,
    marginBottom: 24,
  },
  eventCTA: {
    backgroundColor: Colors.maroon,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  eventCTAText: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 17,
    color: '#F5EBED',
    letterSpacing: 0.5,
  },
  eventDismiss: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  eventDismissText: {
    fontFamily: 'DMSans',
    fontSize: 13,
    color: Colors.muted,
  },
});
