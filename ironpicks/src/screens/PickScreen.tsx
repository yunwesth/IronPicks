import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { SCENARIOS, STREAK, WALLET } from '../constants/mockData';
import Scoreboard from '../components/Scoreboard';
import BIcon from '../components/icons/BIcon';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';
import XCircleIcon from '../components/icons/XCircleIcon';
import FlameIcon from '../components/icons/FlameIcon';

type ResultState = 'correct' | 'incorrect' | null;

export default function PickScreen() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [wager, setWager] = useState(50);
  const [result, setResult] = useState<ResultState>(null);
  const [streakCount, setStreakCount] = useState(STREAK.correct);
  const [balance, setBalance] = useState(WALLET.balance);

  const scenario = SCENARIOS[scenarioIndex % SCENARIOS.length];

  // Animations
  const cardAnim = useRef(new Animated.Value(0)).current;
  const resultAnim = useRef(new Animated.Value(0)).current;
  const optionScaleA = useRef(new Animated.Value(1)).current;
  const optionScaleB = useRef(new Animated.Value(1)).current;
  const lockBtnPulse = useRef(new Animated.Value(1)).current;

  // Card entrance on scenario change
  useEffect(() => {
    cardAnim.setValue(0);
    Animated.spring(cardAnim, {
      toValue: 1,
      tension: 60,
      friction: 10,
      useNativeDriver: true,
    }).start();
  }, [scenarioIndex]);

  // Pulse lock-in button when an option is selected
  useEffect(() => {
    if (selected && !result) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(lockBtnPulse, { toValue: 1.03, duration: 600, useNativeDriver: true }),
          Animated.timing(lockBtnPulse, { toValue: 1, duration: 600, useNativeDriver: true }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    } else {
      lockBtnPulse.setValue(1);
    }
  }, [selected, result]);

  // Clamp wager whenever balance changes
  useEffect(() => {
    setWager((w) => Math.min(w, balance));
  }, [balance]);

  const animateOptionTap = (isA: boolean) => {
    const anim = isA ? optionScaleA : optionScaleB;
    Animated.sequence([
      Animated.spring(anim, { toValue: 0.92, tension: 200, friction: 8, useNativeDriver: true }),
      Animated.spring(anim, { toValue: 1, tension: 200, friction: 8, useNativeDriver: true }),
    ]).start();
  };

  const handleSelect = (id: string, isA: boolean) => {
    animateOptionTap(isA);
    setSelected(id);
  };

  const handleLockIn = () => {
    const isCorrect = selected === scenario.correctId;
    resultAnim.setValue(0);
    setResult(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) {
      setBalance((b) => b + wager * scenario.multiplier);
      setStreakCount((s) => s + 1);
    } else {
      setBalance((b) => Math.max(0, b - wager));
      setStreakCount(0);
    }
    Animated.spring(resultAnim, {
      toValue: 1,
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  const handleNextPick = () => {
    setSelected(null);
    setResult(null);
    setWager((prev) => Math.min(50, balance));
    setScenarioIndex((i) => i + 1);
  };

  const adjustWager = (delta: number) => {
    setWager((w) => Math.min(balance, Math.max(10, w + delta)));
  };

  const cardStyle = {
    opacity: cardAnim,
    transform: [
      {
        translateY: cardAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [24, 0],
        }),
      },
    ],
  };

  const resultStyle = {
    opacity: resultAnim,
    transform: [
      {
        scale: resultAnim.interpolate({
          inputRange: [0, 0.6, 1],
          outputRange: [0.75, 1.04, 1],
        }),
      },
    ],
  };

  const renderHeader = () => (
    <View style={styles.headerBar}>
      <View style={styles.headerLeft}>
        <Image
          source={require('../../assets/ironpigs-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.headerTextBlock}>
          <Text style={styles.headerTeamName}>Lehigh Valley IronPigs</Text>
          <Text style={styles.headerSubtitle}>ironpicks · fan picks</Text>
        </View>
      </View>
      <View style={styles.walletChip}>
        <BIcon size={14} color={Colors.navy} />
        <Text style={styles.walletText}>{balance} BB</Text>
      </View>
    </View>
  );

  const renderDivider = () => (
    <View style={styles.divider}>
      <View style={styles.hairline} />
      <Text style={styles.dividerText}>{scenario.label}</Text>
      <View style={styles.hairline} />
    </View>
  );

  const renderChallenge = () => {
    if (result !== null) {
      const isCorrect = result === 'correct';
      return (
        <Animated.View style={[styles.resultCard, resultStyle]}>
          <Text style={[styles.resultLabel, { color: isCorrect ? Colors.green : Colors.red }]}>
            {isCorrect ? 'CORRECT' : 'INCORRECT'}
          </Text>
          <Text style={[styles.resultPoints, { color: isCorrect ? Colors.green : Colors.red }]}>
            {isCorrect ? `+${wager * scenario.multiplier} BB` : `-${wager} BB`}
          </Text>
          <Text style={styles.resultDescription}>
            {isCorrect ? scenario.correctMsg : scenario.incorrectMsg}
          </Text>
          <TouchableOpacity style={styles.nextButton} onPress={handleNextPick} activeOpacity={0.8}>
            <Text style={styles.nextButtonText}>Next pick →</Text>
          </TouchableOpacity>
        </Animated.View>
      );
    }

    const [optA, optB] = scenario.options;

    return (
      <Animated.View style={[styles.challengeCard, cardStyle]}>
        <View style={styles.challengeHeader}>
          <Text style={styles.challengeHeaderLabel}>IRONPICKS CHALLENGE</Text>
          <View style={styles.streakBadge}>
            <Text style={styles.streakBadgeText}>{scenario.multiplier}× BONUS</Text>
          </View>
        </View>

        <Text style={styles.questionText}>{scenario.text}</Text>

        <View style={styles.optionsGrid}>
          <Animated.View style={{ flex: 1, transform: [{ scale: optionScaleA }] }}>
            <TouchableOpacity
              style={[styles.optionButton, selected === optA.id && styles.optionButtonGreen]}
              onPress={() => handleSelect(optA.id, true)}
              activeOpacity={0.8}
            >
              <CheckCircleIcon size={20} color={selected === optA.id ? Colors.green : Colors.muted} />
              <Text style={[styles.optionLabel, selected === optA.id && styles.optionLabelGreen]}>
                {optA.label}
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{ flex: 1, transform: [{ scale: optionScaleB }] }}>
            <TouchableOpacity
              style={[styles.optionButton, selected === optB.id && styles.optionButtonRed]}
              onPress={() => handleSelect(optB.id, false)}
              activeOpacity={0.8}
            >
              <XCircleIcon size={20} color={selected === optB.id ? Colors.red : Colors.muted} />
              <Text style={[styles.optionLabel, selected === optB.id && styles.optionLabelRed]}>
                {optB.label}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={styles.wagerRow}>
          <Text style={styles.wagerLabel}>Wager</Text>
          <View style={styles.wagerControls}>
            <TouchableOpacity style={styles.wagerBtn} onPress={() => adjustWager(-10)}>
              <Text style={styles.wagerBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.wagerAmount}>{wager} BB</Text>
            <TouchableOpacity style={styles.wagerBtn} onPress={() => adjustWager(10)}>
              <Text style={styles.wagerBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Animated.View style={{ transform: [{ scale: lockBtnPulse }] }}>
          <TouchableOpacity
            style={[styles.lockInBtn, (!selected || wager > balance) && styles.lockInBtnDisabled]}
            onPress={handleLockIn}
            disabled={!selected || wager > balance}
            activeOpacity={0.85}
          >
            <Text style={styles.lockInBtnText}>Lock In Pick</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  };

  const renderStreakBar = () => (
    <Animated.View style={[styles.streakBar, cardStyle]}>
      <View style={styles.streakLeft}>
        <FlameIcon size={16} />
        <Text style={styles.streakCorrect}>{streakCount} correct</Text>
        <Text style={styles.streakInARow}>in a row</Text>
      </View>
      <View style={styles.streakPips}>
        {[0, 1, 2, 3, 4].map((i) => {
          let pipColor: string;
          if (i < streakCount) pipColor = Colors.green;
          else if (i === streakCount) pipColor = Colors.maroon;
          else pipColor = '#C8C2BA';
          return <View key={i} style={[styles.streakPip, { backgroundColor: pipColor }]} />;
        })}
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderHeader()}
        <View style={styles.gap8} />
        <Scoreboard />
        {renderDivider()}
        {renderChallenge()}
        {renderStreakBar()}
        <View style={styles.gap16} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.surface },
  scroll: { flex: 1 },
  scrollContent: { gap: 0 },
  headerBar: {
    backgroundColor: Colors.card,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: { width: 44, height: 44 },
  headerTextBlock: { gap: 2 },
  headerTeamName: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 14,
    color: Colors.navy,
    letterSpacing: 0.2,
  },
  headerSubtitle: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: Colors.muted,
    letterSpacing: 0.3,
  },
  walletChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.navyPale,
    borderWidth: 1,
    borderColor: Colors.borderNavyPale,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 5,
  },
  walletText: { fontFamily: 'DMMonoMedium', fontSize: 12, color: Colors.navy },
  gap8: { height: 8 },
  gap16: { height: 16 },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 10,
    gap: 8,
  },
  hairline: { flex: 1, height: 0.5, backgroundColor: Colors.border },
  dividerText: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: Colors.maroon,
    letterSpacing: 1,
  },
  challengeCard: {
    backgroundColor: Colors.card,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 14,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  challengeHeaderLabel: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: Colors.muted,
    letterSpacing: 0.5,
  },
  streakBadge: {
    backgroundColor: Colors.maroon,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  streakBadgeText: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: '#F5EBED',
    letterSpacing: 0.3,
  },
  questionText: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 20,
    color: Colors.textPrimary,
    paddingHorizontal: 14,
    paddingTop: 13,
    paddingBottom: 10,
    lineHeight: 26,
  },
  optionsGrid: { flexDirection: 'row', gap: 8, marginHorizontal: 14, marginBottom: 12 },
  optionButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 10,
    backgroundColor: Colors.card,
    gap: 5,
  },
  optionButtonGreen: { borderColor: Colors.green, backgroundColor: Colors.greenBg, borderWidth: 1 },
  optionButtonRed: { borderColor: Colors.red, backgroundColor: Colors.redBg, borderWidth: 1 },
  optionLabel: { fontFamily: 'BarlowCondensedBold', fontSize: 15, color: Colors.muted },
  optionLabelGreen: { color: Colors.green },
  optionLabelRed: { color: Colors.red },
  wagerRow: {
    backgroundColor: Colors.card2,
    borderRadius: 10,
    marginHorizontal: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  wagerLabel: { fontFamily: 'DMSans', fontSize: 12, fontWeight: '500', color: Colors.textSecondary },
  wagerControls: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  wagerBtn: {
    width: 28,
    height: 28,
    borderRadius: 7,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.wagerBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wagerBtnText: { fontFamily: 'DMMonoMedium', fontSize: 16, color: Colors.textPrimary, lineHeight: 20 },
  wagerAmount: {
    fontFamily: 'DMMonoMedium',
    fontSize: 13,
    color: Colors.navy,
    minWidth: 60,
    textAlign: 'center',
  },
  lockInBtn: {
    backgroundColor: Colors.maroon,
    borderRadius: 10,
    marginHorizontal: 14,
    marginBottom: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  lockInBtnDisabled: { opacity: 0.28 },
  lockInBtnText: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 17,
    color: '#F5EBED',
    letterSpacing: 0.5,
  },
  resultCard: {
    backgroundColor: Colors.card,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 14,
    marginHorizontal: 12,
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  resultLabel: { fontFamily: 'DMMonoMedium', fontSize: 9, letterSpacing: 1 },
  resultPoints: { fontFamily: 'BarlowCondensedBold', fontSize: 42, lineHeight: 46 },
  resultDescription: {
    fontFamily: 'DMSans',
    fontSize: 12,
    color: Colors.muted,
    textAlign: 'center',
    marginBottom: 4,
  },
  nextButton: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 9,
    marginTop: 4,
  },
  nextButtonText: { fontFamily: 'DMSans', fontSize: 13, fontWeight: '500', color: Colors.textPrimary },
  streakBar: {
    backgroundColor: Colors.card,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 10,
    marginHorizontal: 12,
    marginTop: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  streakLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  streakCorrect: { fontFamily: 'DMMonoMedium', fontSize: 13, color: Colors.textPrimary },
  streakInARow: { fontFamily: 'DMSans', fontSize: 11, color: Colors.muted },
  streakPips: { flexDirection: 'row', gap: 5 },
  streakPip: { width: 8, height: 8, borderRadius: 4 },
});
