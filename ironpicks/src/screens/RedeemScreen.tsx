import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import { Colors } from '../constants/colors';
import { WALLET, REDEMPTION_TIERS, REDEMPTION_HISTORY } from '../constants/mockData';

export default function RedeemScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Page header */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Redeem</Text>
        </View>

        {/* Balance + QR */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceAmount}>{WALLET.balance} BB</Text>
          <Text style={styles.balanceValue}>≈ ${(WALLET.balance / 100).toFixed(2)} value</Text>

          <View style={styles.qrContainer}>
            <QRCode
              value={`ironpicks://redeem?uid=user_4&balance=${WALLET.balance}`}
              size={240}
              color={Colors.navy}
              backgroundColor={Colors.card}
            />
          </View>

          <Text style={styles.showScreenText}>Show this screen to staff</Text>
        </View>

        {/* Redemption tiers */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>REDEMPTION TIERS</Text>
        </View>

        <View style={styles.tiersCard}>
          {REDEMPTION_TIERS.map((tier, index) => (
            <View
              key={tier.id}
              style={[
                styles.tierRow,
                index < REDEMPTION_TIERS.length - 1 && styles.tierRowBorder,
                WALLET.balance >= tier.cost && styles.tierRowAffordable,
              ]}
            >
              <View style={styles.tierCostChip}>
                <Text style={styles.tierCostText}>{tier.cost} BB</Text>
              </View>
              <Text style={styles.tierReward}>{tier.reward}</Text>
              {WALLET.balance >= tier.cost && (
                <View style={styles.tierAvailableBadge}>
                  <Text style={styles.tierAvailableText}>Available</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Redemption history */}
        {REDEMPTION_HISTORY.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>RECENT REDEMPTIONS</Text>
            </View>
            <View style={styles.historyCard}>
              {REDEMPTION_HISTORY.map((item, index) => (
                <View
                  key={item.id}
                  style={[
                    styles.historyRow,
                    index < REDEMPTION_HISTORY.length - 1 && styles.historyRowBorder,
                  ]}
                >
                  <View style={styles.historyLeft}>
                    <Text style={styles.historyReward}>{item.reward}</Text>
                    <Text style={styles.historyDate}>{item.date}</Text>
                  </View>
                  <Text style={styles.historyCost}>−{item.cost} BB</Text>
                </View>
              ))}
            </View>
          </>
        )}

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
  // Balance card
  balanceCard: {
    backgroundColor: Colors.card,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 16,
    marginHorizontal: 12,
    marginTop: 12,
    paddingTop: 28,
    paddingBottom: 20,
    alignItems: 'center',
    gap: 6,
  },
  balanceAmount: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 52,
    color: Colors.navy,
    lineHeight: 56,
  },
  balanceValue: {
    fontFamily: 'DMMonoMedium',
    fontSize: 12,
    color: Colors.muted,
    marginBottom: 16,
  },
  qrContainer: {
    padding: 16,
    backgroundColor: Colors.card,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 12,
  },
  showScreenText: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: Colors.muted,
    letterSpacing: 0.5,
    marginTop: 10,
  },
  // Section header
  sectionHeader: {
    paddingHorizontal: 14,
    paddingTop: 18,
    paddingBottom: 8,
  },
  sectionHeaderText: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: Colors.muted,
    letterSpacing: 0.5,
  },
  // Tiers
  tiersCard: {
    backgroundColor: Colors.card,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 14,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  tierRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 10,
  },
  tierRowBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  tierRowAffordable: {
    backgroundColor: '#FDFCFA',
  },
  tierCostChip: {
    backgroundColor: Colors.navyPale,
    borderWidth: 1,
    borderColor: Colors.borderNavyPale,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 64,
    alignItems: 'center',
  },
  tierCostText: {
    fontFamily: 'DMMonoMedium',
    fontSize: 11,
    color: Colors.navy,
  },
  tierReward: {
    flex: 1,
    fontFamily: 'DMSans',
    fontSize: 13,
    color: Colors.textPrimary,
  },
  tierAvailableBadge: {
    backgroundColor: Colors.greenBg,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  tierAvailableText: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: Colors.green,
    letterSpacing: 0.3,
  },
  // History
  historyCard: {
    backgroundColor: Colors.card,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 14,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  historyRowBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  historyLeft: {
    gap: 3,
  },
  historyReward: {
    fontFamily: 'DMSans',
    fontSize: 13,
    color: Colors.textPrimary,
  },
  historyDate: {
    fontFamily: 'DMMonoMedium',
    fontSize: 10,
    color: Colors.muted,
  },
  historyCost: {
    fontFamily: 'DMMonoMedium',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  bottomPad: { height: 16 },
});
