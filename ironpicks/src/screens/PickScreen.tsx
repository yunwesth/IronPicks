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
import { ACTIVE_QUESTION, STREAK, WALLET, GAME } from '../constants/mockData';
import Scoreboard from '../components/Scoreboard';
import BIcon from '../components/icons/BIcon';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';
import XCircleIcon from '../components/icons/XCircleIcon';
import FlameIcon from '../components/icons/FlameIcon';

type PickOption = 'scores' | 'holds' | null;
type ResultState = 'correct' | 'incorrect' | null;
type Phase = 'picking' | 'locked' | 'resolving' | 'resolved';

export default function PickScreen() {
  const [selected, setSelected] = useState<PickOption>(null);
  const [wager, setWager] = useState(50);
  const [result, setResult] = useState<ResultState>(null);
  const [streakCount, setStreakCount] = useState(STREAK.correct);
  const [balance, setBalance] = useState(WALLET.balance);
  const [phase, setPhase] = useState<Phase>('picking');
  const [liveHomeScore, setLiveHomeScore] = useState(GAME.homeScore);

  // Capture selection + wager at lock-in time
  const lockedRef = useRef<{ selection: PickOption; wager: number } | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Pulsing animation for the resolving phase
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Pulse animation while resolving
  useEffect(() => {
    if (phase === 'resolving') {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 0.3, duration: 600, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    } else {
      pulseAnim.setValue(1);
    }
  }, [phase]);

  const handleLockIn = () => {
    // Capture values now — not from closure later
    const sel = selected;
    const w = wager;
    lockedRef.current = { selection: sel, wager: w };

    setPhase('locked');

    // locked → resolving after 1.5s
    timerRef.current = setTimeout(() => {
      setPhase('resolving');

      // resolving → resolved after 2.5s
      timerRef.current = setTimeout(() => {
        const isCorrect = sel === 'scores';
        if (isCorrect) {
          setBalance((b) => b + w * ACTIVE_QUESTION.multiplier);
          setStreakCount((s) => s + 1);
          setLiveHomeScore((s) => s + 1);
        } else {
          setBalance((b) => Math.max(0, b - w));
          setStreakCount(0);
        }
        setResult(isCorrect ? 'correct' : 'incorrect');
        setPhase('resolved');
      }, 2500);
    }, 1500);
  };

  const handleNextPick = () => {
    setSelected(null);
    setResult(null);
    setWager(50);
    setPhase('picking');
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

  const renderPickingCard = () => (
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

  const renderLockedCard = () => (
    <View style={styles.challengeCard}>
      <View style={styles.challengeHeader}>
        <Text style={styles.challengeHeaderLabel}>IRONPICKS CHALLENGE</Text>
        <View style={styles.streakBadge}>
          <Text style={styles.streakBadgeText}>{ACTIVE_QUESTION.multiplier}× STREAK</Text>
        </View>
      </View>

      <View style={styles.lockedBody}>
        <View style={styles.lockedIconRow}>
          <CheckCircleIcon size={28} color={Colors.green} />
          <Text style={styles.lockedTitle}>Pick Locked In!</Text>
        </View>

        <View style={[
          styles.lockedPickBadge,
          selected === 'scores' ? styles.lockedPickBadgeGreen : styles.lockedPickBadgeRed,
        ]}>
          <Text style={[
            styles.lockedPickBadgeText,
            selected === 'scores' ? { color: Colors.green } : { color: Colors.red },
          ]}>
            {selected === 'scores' ? 'YES — Scores' : 'NO — Holds'}
          </Text>
        </View>

        <Text style={styles.lockedWagerText}>{wager} BB wagered · {ACTIVE_QUESTION.multiplier}× payout</Text>

        <View style={styles.waitingRow}>
          <View style={styles.waitingDot} />
          <Text style={styles.waitingText}>Waiting for the play...</Text>
        </View>
      </View>
    </View>
  );

  const renderResolvingCard = () => (
    <View style={styles.challengeCard}>
      <View style={[styles.challengeHeader, styles.challengeHeaderLive]}>
        <View style={styles.liveRow}>
          <Animated.View style={[styles.livePulseDot, { opacity: pulseAnim }]} />
          <Text style={styles.liveLabel}>LIVE</Text>
        </View>
        <Text style={styles.challengeHeaderLabel}>PLAY IN PROGRESS</Text>
      </View>

      <View style={styles.resolvingBody}>
        <Text style={styles.questionText}>{ACTIVE_QUESTION.text}</Text>
        <View style={styles.watchingRow}>
          <Animated.View style={[styles.watchingDot, { opacity: pulseAnim }]} />
          <Text style={styles.watchingText}>Watching the at-bat...</Text>
        </View>
      </View>
    </View>
  );

  const renderResultCard = () => {
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
  };

  const renderChallenge = () => {
    switch (phase) {
      case 'picking':   return renderPickingCard();
      case 'locked':    return renderLockedCard();
      case 'resolving': return renderResolvingCard();
      case 'resolved':  return renderResultCard();
    }
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
        <Scoreboard homeScore={liveHomeScore} />
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
  // Challenge card (shared shell)
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
  challengeHeaderLive: {
    backgroundColor: '#0D1F12',
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
  // Locked phase card
  lockedBody: {
    paddingHorizontal: 14,
    paddingTop: 18,
    paddingBottom: 20,
    alignItems: 'center',
    gap: 12,
  },
  lockedIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  lockedTitle: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 22,
    color: Colors.textPrimary,
    letterSpacing: 0.3,
  },
  lockedPickBadge: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
  },
  lockedPickBadgeGreen: {
    backgroundColor: Colors.greenBg,
    borderColor: Colors.green,
  },
  lockedPickBadgeRed: {
    backgroundColor: Colors.redBg,
    borderColor: Colors.red,
  },
  lockedPickBadgeText: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 16,
    letterSpacing: 0.3,
  },
  lockedWagerText: {
    fontFamily: 'DMMonoMedium',
    fontSize: 11,
    color: Colors.muted,
    letterSpacing: 0.3,
  },
  waitingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  waitingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.muted,
  },
  waitingText: {
    fontFamily: 'DMSans',
    fontSize: 12,
    color: Colors.muted,
  },
  // Resolving phase card
  liveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  livePulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.scoreboardLiveDot,
  },
  liveLabel: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: Colors.scoreboardLiveDot,
    letterSpacing: 0.5,
  },
  resolvingBody: {
    paddingBottom: 18,
  },
  watchingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingBottom: 4,
  },
  watchingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.maroon,
  },
  watchingText: {
    fontFamily: 'DMSans',
    fontSize: 12,
    color: Colors.muted,
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
