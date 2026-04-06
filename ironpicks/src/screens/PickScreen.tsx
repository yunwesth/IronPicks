import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { ACTIVE_QUESTION, STREAK, WALLET } from '../constants/mockData';
import Scoreboard from '../components/Scoreboard';
import BIcon from '../components/icons/BIcon';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';
import XCircleIcon from '../components/icons/XCircleIcon';
import FlameIcon from '../components/icons/FlameIcon';

type PickOption = 'scores' | 'holds' | null;
type ResultState = 'correct' | 'incorrect' | null;

export default function PickScreen() {
  const [selected, setSelected] = useState<PickOption>(null);
  const [wager, setWager] = useState(50);
  const [result, setResult] = useState<ResultState>(null);
  const [streakCount, setStreakCount] = useState(STREAK.correct);
  const [balance, setBalance] = useState(WALLET.balance);

  const handleLockIn = () => {
    // Simulate result — correct if 'scores' picked
    const isCorrect = selected === 'scores';
    setResult(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) {
      setBalance((b) => b + wager * ACTIVE_QUESTION.multiplier);
      setStreakCount((s) => s + 1);
    } else {
      setBalance((b) => Math.max(0, b - wager));
      setStreakCount(0);
    }
  };

  const handleNextPick = () => {
    setSelected(null);
    setResult(null);
    setWager(50);
  };

  const adjustWager = (delta: number) => {
    setWager((w) => Math.min(balance, Math.max(10, w + delta)));
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
      <Text style={styles.dividerText}>{ACTIVE_QUESTION.label}</Text>
      <View style={styles.hairline} />
    </View>
  );

  const renderChallenge = () => {
    if (result !== null) {
      const isCorrect = result === 'correct';
      return (
        <View style={styles.resultCard}>
          <Text style={[styles.resultLabel, { color: isCorrect ? Colors.green : Colors.red }]}>
            {isCorrect ? 'CORRECT' : 'INCORRECT'}
          </Text>
          <Text
            style={[
              styles.resultPoints,
              { color: isCorrect ? Colors.green : Colors.red },
            ]}
          >
            {isCorrect ? `+${wager * ACTIVE_QUESTION.multiplier} BB` : `-${wager} BB`}
          </Text>
          <Text style={styles.resultDescription}>
            {isCorrect
              ? 'Alcantara drove in the run — streak continues!'
              : 'Alcantara was retired — better luck next at-bat.'}
          </Text>
          <TouchableOpacity style={styles.nextButton} onPress={handleNextPick}>
            <Text style={styles.nextButtonText}>Next pick</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.challengeCard}>
        {/* Card header */}
        <View style={styles.challengeHeader}>
          <Text style={styles.challengeHeaderLabel}>IRONPICKS CHALLENGE</Text>
          <View style={styles.streakBadge}>
            <Text style={styles.streakBadgeText}>{ACTIVE_QUESTION.multiplier}× STREAK</Text>
          </View>
        </View>

        {/* Question */}
        <Text style={styles.questionText}>{ACTIVE_QUESTION.text}</Text>

        {/* Options */}
        <View style={styles.optionsGrid}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selected === 'scores' && styles.optionButtonGreen,
            ]}
            onPress={() => setSelected('scores')}
            activeOpacity={0.8}
          >
            <CheckCircleIcon
              size={20}
              color={selected === 'scores' ? Colors.green : Colors.muted}
            />
            <Text
              style={[
                styles.optionLabel,
                selected === 'scores' && styles.optionLabelGreen,
              ]}
            >
              Scores
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionButton,
              selected === 'holds' && styles.optionButtonRed,
            ]}
            onPress={() => setSelected('holds')}
            activeOpacity={0.8}
          >
            <XCircleIcon
              size={20}
              color={selected === 'holds' ? Colors.red : Colors.muted}
            />
            <Text
              style={[
                styles.optionLabel,
                selected === 'holds' && styles.optionLabelRed,
              ]}
            >
              Holds
            </Text>
          </TouchableOpacity>
        </View>

        {/* Wager row */}
        <View style={styles.wagerRow}>
          <Text style={styles.wagerLabel}>Wager</Text>
          <View style={styles.wagerControls}>
            <TouchableOpacity
              style={styles.wagerBtn}
              onPress={() => adjustWager(-10)}
            >
              <Text style={styles.wagerBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.wagerAmount}>{wager} BB</Text>
            <TouchableOpacity
              style={styles.wagerBtn}
              onPress={() => adjustWager(10)}
            >
              <Text style={styles.wagerBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Lock in button */}
        <TouchableOpacity
          style={[styles.lockInBtn, !selected && styles.lockInBtnDisabled]}
          onPress={handleLockIn}
          disabled={!selected}
          activeOpacity={0.85}
        >
          <Text style={styles.lockInBtnText}>Lock In Pick</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderStreakBar = () => (
    <View style={styles.streakBar}>
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
    </View>
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
  safe: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    gap: 0,
  },
  // Header
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 44,
    height: 44,
  },
  headerTextBlock: {
    gap: 2,
  },
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
  walletText: {
    fontFamily: 'DMMonoMedium',
    fontSize: 12,
    color: Colors.navy,
  },
  gap8: { height: 8 },
  gap16: { height: 16 },
  // Divider
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 10,
    gap: 8,
  },
  hairline: {
    flex: 1,
    height: 0.5,
    backgroundColor: Colors.border,
  },
  dividerText: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: Colors.maroon,
    letterSpacing: 1,
  },
  // Challenge card
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
  optionsGrid: {
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 14,
    marginBottom: 12,
  },
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
  optionButtonGreen: {
    borderColor: Colors.green,
    backgroundColor: Colors.greenBg,
    borderWidth: 1,
  },
  optionButtonRed: {
    borderColor: Colors.red,
    backgroundColor: Colors.redBg,
    borderWidth: 1,
  },
  optionLabel: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 15,
    color: Colors.muted,
  },
  optionLabelGreen: {
    color: Colors.green,
  },
  optionLabelRed: {
    color: Colors.red,
  },
  // Wager
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
  wagerLabel: {
    fontFamily: 'DMSans',
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  wagerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
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
  wagerBtnText: {
    fontFamily: 'DMMonoMedium',
    fontSize: 16,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  wagerAmount: {
    fontFamily: 'DMMonoMedium',
    fontSize: 13,
    color: Colors.navy,
    minWidth: 60,
    textAlign: 'center',
  },
  // Lock in button
  lockInBtn: {
    backgroundColor: Colors.maroon,
    borderRadius: 10,
    marginHorizontal: 14,
    marginBottom: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  lockInBtnDisabled: {
    opacity: 0.28,
  },
  lockInBtnText: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 17,
    color: '#F5EBED',
    letterSpacing: 0.5,
  },
  // Result card
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
  resultLabel: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    letterSpacing: 1,
  },
  resultPoints: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 42,
    lineHeight: 46,
  },
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
  nextButtonText: {
    fontFamily: 'DMSans',
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  // Streak bar
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
  streakLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  streakCorrect: {
    fontFamily: 'DMMonoMedium',
    fontSize: 13,
    color: Colors.textPrimary,
  },
  streakInARow: {
    fontFamily: 'DMSans',
    fontSize: 11,
    color: Colors.muted,
  },
  streakPips: {
    flexDirection: 'row',
    gap: 5,
  },
  streakPip: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
