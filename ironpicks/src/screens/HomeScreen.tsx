import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { GAME, WALLET, STREAK, ACTIVE_QUESTION, LEADERBOARD } from '../constants/mockData';
import Scoreboard from '../components/Scoreboard';
import BIcon from '../components/icons/BIcon';
import FlameIcon from '../components/icons/FlameIcon';
import StarIcon from '../components/icons/StarIcon';

export default function HomeScreen({ navigation }: { navigation: any }) {
  const currentUser = LEADERBOARD.find((p) => p.isCurrentUser);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require('../../assets/ironpigs-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={styles.headerText}>
              <Text style={styles.teamName}>Lehigh Valley IronPigs</Text>
              <Text style={styles.subTitle}>ironpicks · fan picks</Text>
            </View>
          </View>
          <View style={styles.walletChip}>
            <BIcon size={14} color={Colors.navy} />
            <Text style={styles.walletText}>{WALLET.balance} BB</Text>
          </View>
        </View>

        {/* Hero — live game banner */}
        <View style={styles.hero}>
          <View style={styles.livePill}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE NOW · {GAME.venue}</Text>
          </View>
          <Text style={styles.heroMatchup}>
            {GAME.homeTeam} {GAME.homeScore}{'  '}·{'  '}{GAME.awayScore} {GAME.awayTeam}
          </Text>
          <Text style={styles.heroInning}>
            {GAME.inningHalf === 'bottom' ? '▼' : '▲'} {GAME.inning}th INNING
          </Text>
        </View>

        {/* Live scoreboard */}
        <View style={styles.gap10} />
        <Scoreboard />

        {/* Quick-stat chips */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, styles.statIconNavy]}>
              <BIcon size={15} color={Colors.navy} />
            </View>
            <Text style={styles.statValue}>{WALLET.balance}</Text>
            <Text style={styles.statLabel}>BB Balance</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, styles.statIconAmber]}>
              <FlameIcon size={15} />
            </View>
            <Text style={styles.statValue}>{STREAK.correct}</Text>
            <Text style={styles.statLabel}>Pick Streak</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, styles.statIconMaroon]}>
              <StarIcon size={15} color="#F5EBED" />
            </View>
            <Text style={styles.statValue}>#{currentUser?.rank ?? '—'}</Text>
            <Text style={styles.statLabel}>Your Rank</Text>
          </View>
        </View>

        {/* Featured challenge */}
        <View style={styles.sectionLabel}>
          <Text style={styles.sectionLabelText}>FEATURED CHALLENGE</Text>
        </View>
        <TouchableOpacity
          style={styles.challengeCard}
          onPress={() => navigation.navigate('Pick')}
          activeOpacity={0.88}
        >
          <View style={styles.challengeTop}>
            <Text style={styles.challengeMeta}>{ACTIVE_QUESTION.multiplier}× MULTIPLIER · CRITICAL MOMENT</Text>
            <View style={styles.liveBadge}>
              <View style={styles.liveBadgeDot} />
              <Text style={styles.liveBadgeText}>LIVE</Text>
            </View>
          </View>
          <Text style={styles.challengeQuestion}>{ACTIVE_QUESTION.text}</Text>
          <View style={styles.challengeCTA}>
            <Text style={styles.challengeCTAText}>Start Picking  →</Text>
          </View>
        </TouchableOpacity>

        {/* Leaderboard preview */}
        <View style={styles.sectionLabel}>
          <Text style={styles.sectionLabelText}>LEADERBOARD</Text>
        </View>
        <View style={styles.leaderCard}>
          {LEADERBOARD.slice(0, 3).map((player, i) => (
            <View
              key={player.id}
              style={[styles.leaderRow, i < 2 && styles.leaderRowBorder]}
            >
              <Text style={styles.leaderRank}>#{player.rank}</Text>
              <Text style={styles.leaderName}>{player.username}</Text>
              <View style={styles.leaderBB}>
                <BIcon size={10} color={Colors.navy} />
                <Text style={styles.leaderBBText}>{player.bbTotal}</Text>
              </View>
            </View>
          ))}
          {currentUser && currentUser.rank > 3 && (
            <>
              <View style={styles.leaderEllipsis}>
                <Text style={styles.leaderEllipsisText}>· · ·</Text>
              </View>
              <View style={[styles.leaderRow, styles.leaderRowYou]}>
                <Text style={[styles.leaderRank, styles.leaderRankYou]}>#{currentUser.rank}</Text>
                <Text style={[styles.leaderName, styles.leaderNameYou]}>you</Text>
                <View style={styles.leaderBB}>
                  <BIcon size={10} color={Colors.maroon} />
                  <Text style={[styles.leaderBBText, styles.leaderBBYou]}>{currentUser.bbTotal}</Text>
                </View>
              </View>
            </>
          )}
        </View>

        <View style={styles.bottomPad} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.surface },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 24 },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: Colors.card,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: { width: 44, height: 44 },
  headerText: { gap: 2 },
  teamName: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 14,
    color: Colors.navy,
    letterSpacing: 0.2,
  },
  subTitle: {
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

  // Hero
  hero: {
    backgroundColor: Colors.navy,
    paddingHorizontal: 14,
    paddingTop: 20,
    paddingBottom: 22,
    alignItems: 'center',
    gap: 8,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(192,244,220,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(192,244,220,0.25)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#C0F4DC' },
  liveText: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: '#C0F4DC',
    letterSpacing: 0.8,
  },
  heroMatchup: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 42,
    color: '#F0ECE6',
    letterSpacing: 1,
    marginTop: 2,
  },
  heroInning: {
    fontFamily: 'DMMonoMedium',
    fontSize: 10,
    color: '#7A94BC',
    letterSpacing: 0.5,
  },

  gap10: { height: 10 },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 12,
    marginTop: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    gap: 5,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  statIconNavy: { backgroundColor: Colors.navyPale },
  statIconAmber: { backgroundColor: '#FFF5E6' },
  statIconMaroon: { backgroundColor: Colors.maroon },
  statValue: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 22,
    color: Colors.textPrimary,
    lineHeight: 26,
  },
  statLabel: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: Colors.muted,
    letterSpacing: 0.3,
  },

  // Section label
  sectionLabel: { paddingHorizontal: 14, paddingTop: 18, paddingBottom: 8 },
  sectionLabelText: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: Colors.muted,
    letterSpacing: 0.5,
  },

  // Challenge card
  challengeCard: {
    marginHorizontal: 12,
    backgroundColor: Colors.card,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 14,
    overflow: 'hidden',
  },
  challengeTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  challengeMeta: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: Colors.muted,
    letterSpacing: 0.4,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.maroon,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  liveBadgeDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#F5EBED' },
  liveBadgeText: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: '#F5EBED',
    letterSpacing: 0.5,
  },
  challengeQuestion: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 20,
    color: Colors.textPrimary,
    paddingHorizontal: 14,
    paddingVertical: 14,
    lineHeight: 26,
  },
  challengeCTA: {
    backgroundColor: Colors.maroon,
    paddingVertical: 14,
    alignItems: 'center',
  },
  challengeCTAText: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 16,
    color: '#F5EBED',
    letterSpacing: 0.5,
  },

  // Leaderboard
  leaderCard: {
    marginHorizontal: 12,
    backgroundColor: Colors.card,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 14,
    overflow: 'hidden',
  },
  leaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 13,
    gap: 10,
  },
  leaderRowBorder: { borderBottomWidth: 0.5, borderBottomColor: Colors.border },
  leaderRowYou: {
    backgroundColor: '#FEF8F8',
    borderTopWidth: 0.5,
    borderTopColor: Colors.border,
  },
  leaderRank: {
    fontFamily: 'DMMonoMedium',
    fontSize: 11,
    color: Colors.muted,
    width: 28,
  },
  leaderRankYou: { color: Colors.maroon },
  leaderName: {
    flex: 1,
    fontFamily: 'DMSans',
    fontSize: 13,
    color: Colors.textPrimary,
  },
  leaderNameYou: { fontWeight: '500', color: Colors.maroon },
  leaderBB: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  leaderBBText: { fontFamily: 'DMMonoMedium', fontSize: 12, color: Colors.navy },
  leaderBBYou: { color: Colors.maroon },
  leaderEllipsis: {
    alignItems: 'center',
    paddingVertical: 4,
    borderTopWidth: 0.5,
    borderTopColor: Colors.border,
  },
  leaderEllipsisText: {
    fontFamily: 'DMMonoMedium',
    fontSize: 11,
    color: Colors.muted,
    letterSpacing: 2,
  },

  bottomPad: { height: 16 },
});
