import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { LEADERBOARD } from '../constants/mockData';

const top3 = LEADERBOARD.slice(0, 3);
const rest = LEADERBOARD.slice(3);

function PodiumBlock({
  entry,
  rank,
  height,
  color,
}: {
  entry: (typeof LEADERBOARD)[0];
  rank: number;
  height: number;
  color: string;
}) {
  return (
    <View style={styles.podiumCol}>
      <Text style={styles.podiumUsername} numberOfLines={1}>
        {entry.username}
      </Text>
      <Text style={styles.podiumBB}>{entry.bbTotal}</Text>
      <Text style={styles.podiumBBLabel}>BB</Text>
      <View style={[styles.podiumBlock, { height, backgroundColor: color }]}>
        <Text style={styles.podiumRankNum}>{rank}</Text>
      </View>
    </View>
  );
}

export default function RankScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Season Leaderboard</Text>
          <Text style={styles.pageSeason}>2025 Season</Text>
        </View>

        {/* Top 3 podium */}
        <View style={styles.podiumSection}>
          {/* 2nd place — left */}
          <PodiumBlock
            entry={top3[1]}
            rank={2}
            height={72}
            color={Colors.navy}
          />
          {/* 1st place — center, tallest */}
          <PodiumBlock
            entry={top3[0]}
            rank={1}
            height={96}
            color={Colors.maroon}
          />
          {/* 3rd place — right */}
          <PodiumBlock
            entry={top3[2]}
            rank={3}
            height={52}
            color={Colors.navy}
          />
        </View>

        {/* Rest of leaderboard */}
        <View style={styles.listSection}>
          {[...rest].map((entry) => (
            <View
              key={entry.id}
              style={[
                styles.listRow,
                entry.isCurrentUser && styles.listRowCurrent,
              ]}
            >
              <Text
                style={[
                  styles.listRank,
                  entry.isCurrentUser && styles.listRankCurrent,
                ]}
              >
                {entry.rank}
              </Text>
              <Text
                style={[
                  styles.listUsername,
                  entry.isCurrentUser && styles.listUsernameCurrent,
                ]}
              >
                {entry.username}
              </Text>
              <Text
                style={[
                  styles.listBB,
                  entry.isCurrentUser && styles.listBBCurrent,
                ]}
              >
                {entry.bbTotal} BB
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.bottomPad} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  scroll: { flex: 1 },
  scrollContent: { gap: 0 },
  pageHeader: {
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 14,
    backgroundColor: Colors.card,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  pageTitle: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 22,
    color: Colors.navy,
  },
  pageSeason: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: Colors.muted,
    letterSpacing: 0.5,
    marginTop: 2,
  },
  // Podium
  podiumSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 0,
    gap: 6,
  },
  podiumCol: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  podiumUsername: {
    fontFamily: 'DMSans',
    fontSize: 11,
    color: Colors.textSecondary,
    maxWidth: 90,
    textAlign: 'center',
  },
  podiumBB: {
    fontFamily: 'DMMonoMedium',
    fontSize: 13,
    color: Colors.navy,
  },
  podiumBBLabel: {
    fontFamily: 'DMMonoMedium',
    fontSize: 8,
    color: Colors.muted,
  },
  podiumBlock: {
    width: '100%',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  podiumRankNum: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 28,
    color: 'rgba(255,255,255,0.85)',
    paddingTop: 8,
  },
  // List
  listSection: {
    marginHorizontal: 12,
    marginTop: 10,
    backgroundColor: Colors.card,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 14,
    overflow: 'hidden',
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
    gap: 12,
  },
  listRowCurrent: {
    borderLeftColor: Colors.maroon,
    backgroundColor: '#FDF8F8',
  },
  listRank: {
    fontFamily: 'DMMonoMedium',
    fontSize: 13,
    color: Colors.muted,
    width: 22,
    textAlign: 'right',
  },
  listRankCurrent: {
    color: Colors.maroon,
  },
  listUsername: {
    flex: 1,
    fontFamily: 'DMSans',
    fontSize: 14,
    color: Colors.textPrimary,
  },
  listUsernameCurrent: {
    fontWeight: '500',
  },
  listBB: {
    fontFamily: 'DMMonoMedium',
    fontSize: 13,
    color: Colors.navy,
  },
  listBBCurrent: {
    color: Colors.maroon,
  },
  bottomPad: { height: 16 },
});
