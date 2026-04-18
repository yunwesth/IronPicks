import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { GAME } from '../constants/mockData';
import ArrowDownIcon from './icons/ArrowDownIcon';
import BasesIcon from './icons/BasesIcon';
import ClockIcon from './icons/ClockIcon';

export default function Scoreboard() {
  return (
    <View style={styles.card}>
      {/* Maroon header band */}
      <View style={styles.header}>
        <Text style={styles.venue}>{GAME.venue}</Text>
        <View style={styles.livePill}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>

      {/* Score row */}
      <View style={styles.scoreRow}>
        {/* Away */}
        <View style={styles.awayCol}>
          <Text style={styles.teamLabel}>{GAME.awayTeam}</Text>
          <Text style={styles.scoreDim}>{GAME.awayScore}</Text>
        </View>

        {/* Separator */}
        <View style={styles.centerCol}>
          <Text style={styles.separator}>·</Text>
        </View>

        {/* Home */}
        <View style={styles.homeCol}>
          <Text style={styles.teamLabel}>{GAME.homeTeam}</Text>
          <Text style={styles.scoreBright}>{GAME.homeScore}</Text>
        </View>
      </View>

      {/* Situation strip */}
      <View style={styles.situationStrip}>
        {/* Inning */}
        <View style={styles.situationBlock}>
          <View style={styles.iconTile}>
            <ArrowDownIcon size={14} color="#E8E4DE" />
            <Text style={styles.inningNumber}>{GAME.inning}</Text>
          </View>
          <Text style={styles.situationLabel}>Inning</Text>
        </View>

        {/* Runners */}
        <View style={styles.situationBlock}>
          <BasesIcon size={28} runners={GAME.runners} />
          <Text style={styles.situationLabel}>Runners</Text>
        </View>

        {/* Outs */}
        <View style={styles.situationBlock}>
          <View style={styles.outsRow}>
            {[0, 1, 2].map((i) => (
              <View
                key={i}
                style={[
                  styles.outPip,
                  i < GAME.outs ? styles.outPipFilled : styles.outPipEmpty,
                ]}
              />
            ))}
          </View>
          <Text style={styles.situationLabel}>Outs</Text>
        </View>

        {/* Count */}
        <View style={styles.situationBlock}>
          <View style={styles.iconTile}>
            <ClockIcon size={16} />
          </View>
          <Text style={styles.countText}>
            {GAME.count.balls}–{GAME.count.strikes}
          </Text>
          <Text style={styles.situationLabel}>Count</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.navy,
    borderRadius: 16,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: Colors.maroon,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  venue: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: Colors.scoreboardVenueText,
    letterSpacing: 0.5,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.28)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
    gap: 4,
  },
  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: Colors.scoreboardLiveDot,
  },
  liveText: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: Colors.scoreboardLiveDot,
    letterSpacing: 0.5,
  },
  scoreRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
    alignItems: 'flex-end',
  },
  awayCol: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerCol: {
    width: 28,
    alignItems: 'center',
    paddingBottom: 8,
  },
  homeCol: {
    flex: 1,
    alignItems: 'flex-end',
  },
  teamLabel: {
    fontFamily: 'DMMonoMedium',
    fontSize: 10,
    color: Colors.scoreboardLabel,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  scoreDim: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 60,
    color: Colors.scoreboardDimScore,
    lineHeight: 62,
  },
  scoreBright: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 60,
    color: Colors.scoreboardBrightScore,
    lineHeight: 62,
  },
  separator: {
    fontFamily: 'DMMonoMedium',
    fontSize: 24,
    color: Colors.scoreboardSeparator,
  },
  situationStrip: {
    borderTopWidth: 1,
    borderTopColor: Colors.scoreboardBorderTop,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 14,
  },
  situationBlock: {
    alignItems: 'center',
    gap: 4,
  },
  iconTile: {
    width: 38,
    height: 38,
    backgroundColor: Colors.scoreboardTileBg,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  inningNumber: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 22,
    color: '#E8E4DE',
    lineHeight: 24,
  },
  outsRow: {
    flexDirection: 'row',
    gap: 4,
    height: 38,
    alignItems: 'center',
  },
  outPip: {
    width: 11,
    height: 11,
    borderRadius: 6,
  },
  outPipFilled: {
    backgroundColor: Colors.scoreboardYellow,
  },
  outPipEmpty: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.scoreboardRunnerEmpty,
  },
  countText: {
    fontFamily: 'DMMonoMedium',
    fontSize: 12,
    color: '#E8E4DE',
  },
  situationLabel: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: Colors.scoreboardSituationLabel,
    letterSpacing: 0.3,
    marginTop: 2,
  },
});
