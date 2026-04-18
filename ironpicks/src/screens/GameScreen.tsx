import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { PLAY_BY_PLAY, PITCHER_STATS, BATTER, PITCHER } from '../constants/mockData';
import Scoreboard from '../components/Scoreboard';

const STAT_TILES = [
  { label: 'ERA', value: PITCHER_STATS.era },
  { label: 'AVG', value: PITCHER_STATS.avg },
  { label: 'K', value: PITCHER_STATS.k },
  { label: 'BB', value: PITCHER_STATS.bb },
];

export default function GameScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Page header */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>LIVE GAME</Text>
        </View>

        <Scoreboard />

        {/* Pitcher / batter stat strip */}
        <View style={styles.statSection}>
          <View style={styles.statSectionHeader}>
            <Text style={styles.statSectionLabel}>CURRENT MATCHUP</Text>
          </View>
          <View style={styles.matchupRow}>
            <View style={styles.matchupPlayer}>
              <Text style={styles.matchupRole}>BATTING</Text>
              <Text style={styles.matchupName}>{BATTER.name}</Text>
              <Text style={styles.matchupAvg}>AVG {BATTER.avg}</Text>
            </View>
            <View style={styles.matchupVs}>
              <Text style={styles.vsText}>vs</Text>
            </View>
            <View style={[styles.matchupPlayer, styles.matchupPlayerRight]}>
              <Text style={styles.matchupRole}>PITCHING</Text>
              <Text style={styles.matchupName}>{PITCHER.name}</Text>
              <Text style={styles.matchupAvg}>ERA {PITCHER.era}</Text>
            </View>
          </View>
          <View style={styles.statTiles}>
            {STAT_TILES.map((tile) => (
              <View key={tile.label} style={styles.statTile}>
                <Text style={styles.statValue}>{tile.value}</Text>
                <Text style={styles.statLabel}>{tile.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Play-by-play feed */}
        <View style={styles.pbpSection}>
          <View style={styles.pbpHeader}>
            <Text style={styles.pbpHeaderText}>PLAY-BY-PLAY</Text>
          </View>
          {PLAY_BY_PLAY.map((play) => (
            <View
              key={play.id}
              style={[styles.playCard, play.isScoring && styles.playCardScoring]}
            >
              <Text style={styles.playInning}>{play.inning}</Text>
              <Text style={styles.playDescription}>{play.description}</Text>
              <View
                style={[
                  styles.resultBadge,
                  play.isScoring ? styles.resultBadgeScoring : styles.resultBadgeDefault,
                ]}
              >
                <Text
                  style={[
                    styles.resultBadgeText,
                    play.isScoring && styles.resultBadgeTextScoring,
                  ]}
                >
                  {play.result}
                </Text>
              </View>
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
  scrollContent: { gap: 0, paddingBottom: 24 },
  pageHeader: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.card,
  },
  pageTitle: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 22,
    color: Colors.navy,
    letterSpacing: 0.5,
  },
  // Stat section
  statSection: {
    backgroundColor: Colors.card,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 14,
    marginHorizontal: 12,
    marginTop: 10,
    overflow: 'hidden',
  },
  statSectionHeader: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  statSectionLabel: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: Colors.muted,
    letterSpacing: 0.5,
  },
  matchupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  matchupPlayer: {
    flex: 1,
    gap: 2,
  },
  matchupPlayerRight: {
    alignItems: 'flex-end',
  },
  matchupRole: {
    fontFamily: 'DMMonoMedium',
    fontSize: 8,
    color: Colors.muted,
    letterSpacing: 0.5,
  },
  matchupName: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 15,
    color: Colors.textPrimary,
  },
  matchupAvg: {
    fontFamily: 'DMMonoMedium',
    fontSize: 10,
    color: Colors.navy,
  },
  matchupVs: {
    paddingHorizontal: 12,
  },
  vsText: {
    fontFamily: 'DMSans',
    fontSize: 11,
    color: Colors.muted,
  },
  statTiles: {
    flexDirection: 'row',
  },
  statTile: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRightWidth: 0.5,
    borderRightColor: Colors.border,
    gap: 3,
  },
  statValue: {
    fontFamily: 'DMMonoMedium',
    fontSize: 16,
    color: Colors.navy,
  },
  statLabel: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: Colors.muted,
    letterSpacing: 0.5,
  },
  // Play-by-play
  pbpSection: {
    marginHorizontal: 12,
    marginTop: 10,
    gap: 0,
  },
  pbpHeader: {
    paddingVertical: 8,
  },
  pbpHeaderText: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: Colors.muted,
    letterSpacing: 0.5,
  },
  playCard: {
    backgroundColor: Colors.card,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: 12,
    marginBottom: 6,
    borderLeftWidth: 2,
    borderLeftColor: 'transparent',
    gap: 4,
  },
  playCardScoring: {
    borderLeftWidth: 2,
    borderLeftColor: Colors.maroon,
  },
  playInning: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: Colors.muted,
    letterSpacing: 0.5,
  },
  playDescription: {
    fontFamily: 'DMSans',
    fontSize: 14,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  resultBadge: {
    alignSelf: 'flex-start',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 2,
  },
  resultBadgeDefault: {
    backgroundColor: Colors.navyPale,
  },
  resultBadgeScoring: {
    backgroundColor: '#F5EBED',
  },
  resultBadgeText: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: Colors.navy,
    letterSpacing: 0.3,
  },
  resultBadgeTextScoring: {
    color: Colors.maroon,
  },
  bottomPad: { height: 16 },
});
