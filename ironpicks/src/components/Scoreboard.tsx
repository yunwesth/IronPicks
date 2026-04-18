import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors } from '../constants/colors';
import { useGame } from '../context/GameContext';
import ArrowDownIcon from './icons/ArrowDownIcon';
import BasesIcon from './icons/BasesIcon';
import ClockIcon from './icons/ClockIcon';

export default function Scoreboard() {
  const game = useGame();
  const scoreScale = useRef(new Animated.Value(1)).current;

  // Flash score on change
  useEffect(() => {
    Animated.sequence([
      Animated.timing(scoreScale, { toValue: 1.18, duration: 180, useNativeDriver: true }),
      Animated.timing(scoreScale, { toValue: 1, duration: 180, useNativeDriver: true }),
    ]).start();
  }, [game.homeScore, game.awayScore]);

  return (
    <View style={styles.card}>
      {/* Maroon header */}
      <View style={styles.header}>
        <Text style={styles.venue}>{game.venue}</Text>
        <View style={styles.livePill}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>

      {/* Score row */}
      <View style={styles.scoreRow}>
        <View style={styles.awayCol}>
          <Text style={styles.teamLabel}>{game.awayTeam}</Text>
          <Animated.Text style={[styles.scoreDim, { transform: [{ scale: scoreScale }] }]}>
            {game.awayScore}
          </Animated.Text>
        </View>
        <View style={styles.centerCol}>
          <Text style={styles.separator}>·</Text>
        </View>
        <View style={styles.homeCol}>
          <Text style={styles.teamLabel}>{game.homeTeam}</Text>
          <Animated.Text style={[styles.scoreBright, { transform: [{ scale: scoreScale }] }]}>
            {game.homeScore}
          </Animated.Text>
        </View>
      </View>

      {/* Last event ticker */}
      <View style={styles.ticker}>
        <Text style={styles.tickerText} numberOfLines={1}>{game.lastEvent}</Text>
      </View>

      {/* Situation strip */}
      <View style={styles.situationStrip}>
        <View style={styles.situationBlock}>
          <View style={styles.iconTile}>
            <ArrowDownIcon size={12} color="#E8E4DE" />
            <Text style={styles.inningNumber}>{game.inning}</Text>
          </View>
          <Text style={styles.situationLabel}>Inning</Text>
        </View>

        <View style={styles.situationBlock}>
          <BasesIcon size={26} runners={game.runners} />
          <Text style={styles.situationLabel}>Runners</Text>
        </View>

        <View style={styles.situationBlock}>
          <View style={styles.outsRow}>
            {[0, 1, 2].map((i) => (
              <View key={i} style={[styles.outPip, i < game.outs ? styles.outPipFilled : styles.outPipEmpty]} />
            ))}
          </View>
          <Text style={styles.situationLabel}>Outs</Text>
        </View>

        <View style={styles.situationBlock}>
          <View style={styles.iconTile}>
            <ClockIcon size={15} />
          </View>
          <Text style={styles.countText}>{game.count.balls}–{game.count.strikes}</Text>
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
    marginHorizontal: 14,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: Colors.maroon,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
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
  liveDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: Colors.scoreboardLiveDot },
  liveText: { fontFamily: 'DMMonoMedium', fontSize: 9, color: Colors.scoreboardLiveDot, letterSpacing: 0.5 },

  scoreRow: {
    flexDirection: 'row',
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 8,
    alignItems: 'flex-end',
  },
  awayCol: { flex: 1, alignItems: 'flex-start' },
  centerCol: { width: 28, alignItems: 'center', paddingBottom: 8 },
  homeCol: { flex: 1, alignItems: 'flex-end' },
  teamLabel: { fontFamily: 'DMMonoMedium', fontSize: 10, color: Colors.scoreboardLabel, letterSpacing: 0.5, marginBottom: 2 },
  scoreDim: { fontFamily: 'BarlowCondensedBold', fontSize: 58, color: Colors.scoreboardDimScore, lineHeight: 60 },
  scoreBright: { fontFamily: 'BarlowCondensedBold', fontSize: 58, color: Colors.scoreboardBrightScore, lineHeight: 60 },
  separator: { fontFamily: 'DMMonoMedium', fontSize: 22, color: Colors.scoreboardSeparator },

  ticker: {
    marginHorizontal: 14,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tickerText: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: '#A0C4E8',
    letterSpacing: 0.3,
  },

  situationStrip: {
    borderTopWidth: 1,
    borderTopColor: Colors.scoreboardBorderTop,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 14,
  },
  situationBlock: { alignItems: 'center', gap: 4 },
  iconTile: {
    width: 36,
    height: 36,
    backgroundColor: Colors.scoreboardTileBg,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  inningNumber: { fontFamily: 'BarlowCondensedBold', fontSize: 20, color: '#E8E4DE', lineHeight: 22 },
  outsRow: { flexDirection: 'row', gap: 4, height: 36, alignItems: 'center' },
  outPip: { width: 10, height: 10, borderRadius: 5 },
  outPipFilled: { backgroundColor: Colors.scoreboardYellow },
  outPipEmpty: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: Colors.scoreboardRunnerEmpty },
  countText: { fontFamily: 'DMMonoMedium', fontSize: 12, color: '#E8E4DE' },
  situationLabel: { fontFamily: 'DMMonoMedium', fontSize: 9, color: Colors.scoreboardSituationLabel, letterSpacing: 0.3 },
});
