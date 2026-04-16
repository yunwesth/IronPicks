import React from 'react';
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
import { GAME, WALLET, STREAK, LEADERBOARD, REDEMPTION_HISTORY } from '../constants/mockData';
import Scoreboard from '../components/Scoreboard';
import BIcon from '../components/icons/BIcon';
import FlameIcon from '../components/icons/FlameIcon';
import StarIcon from '../components/icons/StarIcon';

interface Props {
  navigation: any;
}

export default function HomeScreen({ navigation }: Props) {
  const currentUser = LEADERBOARD.find((u) => u.isCurrentUser);

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
        <Text style={styles.walletText}>{WALLET.balance} BB</Text>
      </View>
    </View>
  );

  const renderGameSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>TODAY'S GAME</Text>
      <Scoreboard />
    </View>
  );

  const renderStatsRow = () => (
    <View style={styles.statsRow}>
      <View style={styles.statCard}>
        <View style={styles.statIconRow}>
          <BIcon size={16} color={Colors.navy} />
        </View>
        <Text style={styles.statValue}>{WALLET.balance}</Text>
        <Text style={styles.statLabel}>IronPigs Bucks</Text>
      </View>

      <View style={[styles.statCard, styles.statCardMiddle]}>
        <View style={styles.statIconRow}>
          <FlameIcon size={16} />
        </View>
        <Text style={styles.statValue}>{STREAK.correct}</Text>
        <Text style={styles.statLabel}>Pick Streak</Text>
      </View>

      <View style={styles.statCard}>
        <View style={styles.statIconRow}>
          <StarIcon size={16} color={Colors.maroon} />
        </View>
        <Text style={styles.statValue}>#{currentUser?.rank ?? '—'}</Text>
        <Text style={styles.statLabel}>Leaderboard</Text>
      </View>
    </View>
  );

  const renderPlayNow = () => (
    <View style={styles.playNowCard}>
      <View style={styles.playNowTextBlock}>
        <View style={styles.livePill}>
          <View style={styles.liveDot} />
          <Text style={styles.livePillText}>LIVE NOW</Text>
        </View>
        <Text style={styles.playNowTitle}>Game is in progress</Text>
        <Text style={styles.playNowSubtitle}>
          New pick challenges available every at-bat. Lock in your predictions and earn IronPigs Bucks.
        </Text>
      </View>
      <TouchableOpacity
        style={styles.playNowBtn}
        onPress={() => navigation.navigate('Pick')}
        activeOpacity={0.85}
      >
        <Text style={styles.playNowBtnText}>Start Picking</Text>
      </TouchableOpacity>
    </View>
  );

  const renderRecentActivity = () => {
    if (REDEMPTION_HISTORY.length === 0) return null;
    return (
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>RECENT REDEMPTIONS</Text>
        <View style={styles.activityList}>
          {REDEMPTION_HISTORY.map((item) => (
            <View key={item.id} style={styles.activityRow}>
              <View style={styles.activityLeft}>
                <Text style={styles.activityReward}>{item.reward}</Text>
                <Text style={styles.activityDate}>{item.date}</Text>
              </View>
              <View style={styles.activityCost}>
                <BIcon size={11} color={Colors.maroon} />
                <Text style={styles.activityCostText}>{item.cost}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderNextGameInfo = () => (
    <View style={styles.infoCard}>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>VENUE</Text>
        <Text style={styles.infoValue}>{GAME.venue}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>MATCHUP</Text>
        <Text style={styles.infoValue}>
          {GAME.awayTeamFull} @ {GAME.homeTeamFull}
        </Text>
      </View>
      <View style={[styles.infoRow, styles.infoRowLast]}>
        <Text style={styles.infoLabel}>STATUS</Text>
        <View style={styles.liveStatusPill}>
          <View style={styles.liveDotSmall} />
          <Text style={styles.liveStatusText}>IN PROGRESS · {GAME.inningHalf === 'bottom' ? 'BOT' : 'TOP'} {GAME.inning}</Text>
        </View>
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
        {renderStatsRow()}
        {renderPlayNow()}
        {renderGameSection()}
        <View style={styles.gap4} />
        {renderNextGameInfo()}
        {renderRecentActivity()}
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
  gap4: { height: 4 },
  gap8: { height: 8 },
  gap16: { height: 16 },
  // Stats row
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 12,
    marginBottom: 10,
    gap: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 6,
    gap: 3,
  },
  statCardMiddle: {
    borderColor: Colors.maroon,
    backgroundColor: '#FDF5F6',
  },
  statIconRow: {
    height: 20,
    justifyContent: 'center',
  },
  statValue: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 22,
    color: Colors.textPrimary,
    lineHeight: 26,
  },
  statLabel: {
    fontFamily: 'DMMonoMedium',
    fontSize: 8,
    color: Colors.muted,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  // Play now card
  playNowCard: {
    backgroundColor: Colors.maroon,
    borderRadius: 14,
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 16,
    gap: 12,
  },
  playNowTextBlock: {
    gap: 6,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#C0F4DC',
  },
  livePillText: {
    fontFamily: 'DMMonoMedium',
    fontSize: 8,
    color: '#C0F4DC',
    letterSpacing: 0.5,
  },
  playNowTitle: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 22,
    color: '#F5EBED',
    letterSpacing: 0.3,
  },
  playNowSubtitle: {
    fontFamily: 'DMSans',
    fontSize: 12,
    color: 'rgba(245, 235, 237, 0.75)',
    lineHeight: 17,
  },
  playNowBtn: {
    backgroundColor: '#F5EBED',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },
  playNowBtnText: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 17,
    color: Colors.maroon,
    letterSpacing: 0.5,
  },
  // Section
  section: {
    marginHorizontal: 12,
    marginBottom: 12,
    gap: 8,
  },
  sectionLabel: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: Colors.muted,
    letterSpacing: 0.8,
    marginTop: 4,
  },
  // Info card
  infoCard: {
    backgroundColor: Colors.card,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  infoRowLast: {
    borderBottomWidth: 0,
  },
  infoLabel: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: Colors.muted,
    letterSpacing: 0.5,
  },
  infoValue: {
    fontFamily: 'DMSans',
    fontSize: 12,
    color: Colors.textPrimary,
    fontWeight: '500',
    maxWidth: '70%',
    textAlign: 'right',
  },
  liveStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.greenBg,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  liveDotSmall: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: Colors.green,
  },
  liveStatusText: {
    fontFamily: 'DMMonoMedium',
    fontSize: 8,
    color: Colors.green,
    letterSpacing: 0.4,
  },
  // Activity
  activityList: {
    backgroundColor: Colors.card,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 12,
    overflow: 'hidden',
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  activityLeft: {
    gap: 2,
  },
  activityReward: {
    fontFamily: 'DMSans',
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  activityDate: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: Colors.muted,
  },
  activityCost: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  activityCostText: {
    fontFamily: 'DMMonoMedium',
    fontSize: 12,
    color: Colors.maroon,
  },
});
