import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { useGame } from '../context/GameContext';
import { WALLET, STREAK } from '../constants/mockData';
import BasesIcon from '../components/icons/BasesIcon';
import BIcon from '../components/icons/BIcon';
import FlameIcon from '../components/icons/FlameIcon';

const KIND_COLOR = {
  score: '#C0F4DC',
  hit: '#E8C060',
  out: '#F4A0A0',
  neutral: '#7A94BC',
};

export default function HomeScreen({ navigation }: { navigation: any }) {
  const game = useGame();
  const scoreScale = useRef(new Animated.Value(1)).current;
  const tickerOpacity = useRef(new Animated.Value(1)).current;
  const prevEvent = useRef(game.lastEvent);

  // Bounce score on change
  useEffect(() => {
    Animated.sequence([
      Animated.timing(scoreScale, { toValue: 1.2, duration: 200, useNativeDriver: true }),
      Animated.spring(scoreScale, { toValue: 1, useNativeDriver: true, bounciness: 8 }),
    ]).start();
  }, [game.homeScore, game.awayScore]);

  // Fade-flash ticker on new event
  useEffect(() => {
    if (game.lastEvent === prevEvent.current) return;
    prevEvent.current = game.lastEvent;
    Animated.sequence([
      Animated.timing(tickerOpacity, { toValue: 0, duration: 120, useNativeDriver: true }),
      Animated.timing(tickerOpacity, { toValue: 1, duration: 180, useNativeDriver: true }),
    ]).start();
  }, [game.lastEvent]);

  const inningLabel = `${game.inningHalf === 'bottom' ? '▼' : '▲'} ${game.inning}th`;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* ── Top header ─────────────────────────────────────── */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={require('../../assets/ironpigs-logo.png')} style={styles.logo} resizeMode="contain" />
            <View>
              <Text style={styles.teamName}>Lehigh Valley IronPigs</Text>
              <Text style={styles.subTitle}>ironpicks · fan picks</Text>
            </View>
          </View>
          <View style={styles.walletChip}>
            <BIcon size={13} color={Colors.navy} />
            <Text style={styles.walletText}>{WALLET.balance} BB</Text>
          </View>
        </View>

        {/* ── Live game hero ──────────────────────────────────── */}
        <View style={styles.hero}>
          {/* Venue + live badge */}
          <View style={styles.heroTopRow}>
            <Text style={styles.heroVenue}>{game.venue}</Text>
            <View style={styles.livePill}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          </View>

          {/* Big score */}
          <View style={styles.scoreRow}>
            <View style={styles.teamBlock}>
              <Text style={styles.teamAbbr}>{game.awayTeam}</Text>
              <Animated.Text style={[styles.scoreAway, { transform: [{ scale: scoreScale }] }]}>
                {game.awayScore}
              </Animated.Text>
            </View>
            <Text style={styles.scoreDot}>·</Text>
            <View style={[styles.teamBlock, styles.teamBlockHome]}>
              <Text style={styles.teamAbbr}>{game.homeTeam}</Text>
              <Animated.Text style={[styles.scoreHome, { transform: [{ scale: scoreScale }] }]}>
                {game.homeScore}
              </Animated.Text>
            </View>
          </View>

          {/* Situation chips */}
          <View style={styles.situationRow}>
            <View style={styles.sitChip}>
              <Text style={styles.sitChipText}>{inningLabel}</Text>
            </View>
            <View style={styles.sitChip}>
              <BasesIcon size={20} runners={game.runners} />
            </View>
            <View style={styles.sitChip}>
              <Text style={styles.sitChipText}>{game.outs} out{game.outs !== 1 ? 's' : ''}</Text>
            </View>
            <View style={styles.sitChip}>
              <Text style={styles.sitChipText}>{game.count.balls}–{game.count.strikes}</Text>
            </View>
          </View>

          {/* Live ticker */}
          <Animated.View style={[styles.ticker, { opacity: tickerOpacity }]}>
            <View style={[styles.tickerDot, { backgroundColor: KIND_COLOR[game.eventKind] }]} />
            <Text style={[styles.tickerText, { color: KIND_COLOR[game.eventKind] }]}>
              {game.lastEvent}
            </Text>
          </Animated.View>
        </View>

        {/* ── Quick stats ─────────────────────────────────────── */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <BIcon size={15} color={Colors.navy} />
            <Text style={styles.statValue}>{WALLET.balance}</Text>
            <Text style={styles.statLabel}>BB Balance</Text>
          </View>
          <View style={styles.statCard}>
            <FlameIcon size={15} />
            <Text style={styles.statValue}>{STREAK.correct}</Text>
            <Text style={styles.statLabel}>Pick Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>⚾</Text>
            <Text style={styles.statValue}>{game.inning}</Text>
            <Text style={styles.statLabel}>Inning</Text>
          </View>
        </View>

        {/* ── CTA buttons ─────────────────────────────────────── */}
        <TouchableOpacity
          style={styles.ctaPrimary}
          onPress={() => navigation.navigate('Pick')}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaPrimaryText}>🥓  Make a Pick</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ctaSecondary}
          onPress={() => navigation.navigate('Game')}
          activeOpacity={0.8}
        >
          <Text style={styles.ctaSecondaryText}>Watch Live Game  →</Text>
        </TouchableOpacity>

        {/* ── Play log preview ────────────────────────────────── */}
        <View style={styles.sectionLabel}>
          <Text style={styles.sectionLabelText}>PLAY-BY-PLAY</Text>
        </View>
        <View style={styles.logCard}>
          {game.playLog.slice(0, 5).map((entry, i) => (
            <View key={entry.id} style={[styles.logRow, i < 4 && styles.logRowBorder]}>
              <Text style={styles.logInning}>{entry.inning}</Text>
              <Text style={styles.logDesc} numberOfLines={1}>{entry.desc}</Text>
              <View style={[styles.logDot, { backgroundColor: KIND_COLOR[entry.kind] }]} />
            </View>
          ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.surface },
  scroll: { flex: 1 },
  scrollContent: { gap: 0 },

  // Header
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12,
    backgroundColor: Colors.card,
    borderBottomWidth: 0.5, borderBottomColor: Colors.border,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: { width: 40, height: 40 },
  teamName: { fontFamily: 'BarlowCondensedBold', fontSize: 14, color: Colors.navy, letterSpacing: 0.2 },
  subTitle: { fontFamily: 'DMMonoMedium', fontSize: 9, color: Colors.muted, letterSpacing: 0.3, marginTop: 1 },
  walletChip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: Colors.navyPale, borderWidth: 1, borderColor: Colors.borderNavyPale,
    borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5,
  },
  walletText: { fontFamily: 'DMMonoMedium', fontSize: 12, color: Colors.navy },

  // Hero
  hero: {
    backgroundColor: Colors.navy,
    paddingHorizontal: 18, paddingTop: 16, paddingBottom: 18,
    gap: 12,
  },
  heroTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  heroVenue: { fontFamily: 'DMMonoMedium', fontSize: 9, color: '#7A94BC', letterSpacing: 0.4 },
  livePill: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(192,244,220,0.12)',
    borderWidth: 1, borderColor: 'rgba(192,244,220,0.3)',
    borderRadius: 20, paddingHorizontal: 9, paddingVertical: 4,
  },
  liveDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: '#C0F4DC' },
  liveText: { fontFamily: 'DMMonoMedium', fontSize: 9, color: '#C0F4DC', letterSpacing: 0.8 },

  scoreRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 8 },
  teamBlock: { alignItems: 'center', flex: 1 },
  teamBlockHome: { alignItems: 'center' },
  teamAbbr: { fontFamily: 'DMMonoMedium', fontSize: 11, color: '#7A94BC', letterSpacing: 0.5, marginBottom: 2 },
  scoreAway: { fontFamily: 'BarlowCondensedBold', fontSize: 64, color: '#3A526E', lineHeight: 68 },
  scoreHome: { fontFamily: 'BarlowCondensedBold', fontSize: 64, color: '#F0ECE6', lineHeight: 68 },
  scoreDot: { fontFamily: 'DMMonoMedium', fontSize: 28, color: '#2A3E60', paddingBottom: 10 },

  situationRow: { flexDirection: 'row', justifyContent: 'center', gap: 8 },
  sitChip: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6,
    alignItems: 'center', justifyContent: 'center',
    minWidth: 52,
  },
  sitChipText: { fontFamily: 'DMMonoMedium', fontSize: 10, color: '#A0BADC', letterSpacing: 0.2 },

  ticker: {
    flexDirection: 'row', alignItems: 'center', gap: 7,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8,
  },
  tickerDot: { width: 6, height: 6, borderRadius: 3 },
  tickerText: { fontFamily: 'DMMonoMedium', fontSize: 10, letterSpacing: 0.2, flex: 1 },

  // Stats
  statsRow: { flexDirection: 'row', gap: 10, marginHorizontal: 14, marginTop: 14 },
  statCard: {
    flex: 1, backgroundColor: Colors.card,
    borderWidth: 0.5, borderColor: Colors.border, borderRadius: 12,
    paddingVertical: 14, alignItems: 'center', gap: 5,
  },
  statEmoji: { fontSize: 16 },
  statValue: { fontFamily: 'BarlowCondensedBold', fontSize: 22, color: Colors.textPrimary, lineHeight: 26 },
  statLabel: { fontFamily: 'DMMonoMedium', fontSize: 9, color: Colors.muted, letterSpacing: 0.3 },

  // CTAs
  ctaPrimary: {
    backgroundColor: Colors.maroon,
    borderRadius: 12, marginHorizontal: 14, marginTop: 14,
    paddingVertical: 15, alignItems: 'center',
  },
  ctaPrimaryText: { fontFamily: 'BarlowCondensedBold', fontSize: 18, color: '#F5EBED', letterSpacing: 0.5 },
  ctaSecondary: {
    borderWidth: 1, borderColor: Colors.border,
    borderRadius: 12, marginHorizontal: 14, marginTop: 8,
    paddingVertical: 13, alignItems: 'center',
    backgroundColor: Colors.card,
  },
  ctaSecondaryText: { fontFamily: 'BarlowCondensedBold', fontSize: 16, color: Colors.navy, letterSpacing: 0.3 },

  // Play log
  sectionLabel: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 8 },
  sectionLabelText: { fontFamily: 'DMMonoMedium', fontSize: 9, color: Colors.muted, letterSpacing: 0.5 },
  logCard: {
    marginHorizontal: 14,
    backgroundColor: Colors.card,
    borderWidth: 0.5, borderColor: Colors.border, borderRadius: 14, overflow: 'hidden',
  },
  logRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 14, paddingVertical: 11,
  },
  logRowBorder: { borderBottomWidth: 0.5, borderBottomColor: Colors.border },
  logInning: { fontFamily: 'DMMonoMedium', fontSize: 9, color: Colors.muted, width: 42, letterSpacing: 0.2 },
  logDesc: { flex: 1, fontFamily: 'DMSans', fontSize: 12, color: Colors.textPrimary },
  logDot: { width: 7, height: 7, borderRadius: 4 },
});
