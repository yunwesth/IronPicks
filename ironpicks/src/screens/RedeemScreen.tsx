import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import { Colors } from '../constants/colors';
import { WALLET, REDEMPTION_HISTORY, REDEEM_ITEMS, RedeemCategory } from '../constants/mockData';
import BIcon from '../components/icons/BIcon';

type RedeemItem = typeof REDEEM_ITEMS[0];

const CATEGORIES: { id: RedeemCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'food', label: '🍟 Food' },
  { id: 'merch', label: '👕 Merch' },
  { id: 'experience', label: '⭐ Exp' },
];

function randomCode() {
  return 'IRON-' + Math.random().toString(36).toUpperCase().slice(2, 6);
}

export default function RedeemScreen() {
  const [balance, setBalance] = useState(WALLET.balance);
  const [category, setCategory] = useState<RedeemCategory>('all');
  const [confirming, setConfirming] = useState<RedeemItem | null>(null);
  const [redeemed, setRedeemed] = useState<{ item: RedeemItem; code: string } | null>(null);
  const [history, setHistory] = useState(REDEMPTION_HISTORY);

  const filtered = category === 'all'
    ? REDEEM_ITEMS
    : REDEEM_ITEMS.filter((i) => i.category === category);

  const handleRedeem = (item: RedeemItem) => setConfirming(item);

  const handleConfirm = () => {
    if (!confirming) return;
    const code = randomCode();
    setBalance((b) => b - confirming.cost);
    setHistory((h) => [
      { id: code, date: 'Today', reward: confirming.name, cost: confirming.cost },
      ...h,
    ]);
    setRedeemed({ item: confirming, code });
    setConfirming(null);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* ── Header ──────────────────────────────────────────── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Redeem</Text>
          <Text style={styles.headerSub}>Trade Bacon Bucks for rewards</Text>
        </View>
        <View style={styles.balanceChip}>
          <BIcon size={13} color={Colors.navy} />
          <Text style={styles.balanceChipText}>{balance} BB</Text>
        </View>
      </View>

      {/* ── Category tabs ────────────────────────────────────── */}
      <View style={styles.tabs}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsInner}>
          {CATEGORIES.map((c) => (
            <TouchableOpacity
              key={c.id}
              style={[styles.tab, category === c.id && styles.tabActive]}
              onPress={() => setCategory(c.id)}
              activeOpacity={0.75}
            >
              <Text style={[styles.tabText, category === c.id && styles.tabTextActive]}>
                {c.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* ── Items list ───────────────────────────────────────── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {filtered.map((item) => {
            const canAfford = balance >= item.cost;
            return (
              <View key={item.id} style={[styles.itemCard, !canAfford && styles.itemCardLocked]}>
                {/* Tag */}
                {item.tag && (
                  <View style={[styles.itemTag, item.tag === 'Legendary' && styles.itemTagLegendary]}>
                    <Text style={styles.itemTagText}>{item.tag}</Text>
                  </View>
                )}

                {/* Emoji + info */}
                <Text style={styles.itemEmoji}>{item.emoji}</Text>
                <Text style={[styles.itemName, !canAfford && styles.itemNameLocked]}>{item.name}</Text>
                <Text style={styles.itemDesc}>{item.desc}</Text>

                {/* Cost row */}
                <View style={styles.itemCostRow}>
                  <View style={[styles.costChip, !canAfford && styles.costChipLocked]}>
                    <BIcon size={11} color={canAfford ? Colors.navy : Colors.muted} />
                    <Text style={[styles.costText, !canAfford && styles.costTextLocked]}>
                      {item.cost} BB
                    </Text>
                  </View>
                  {!canAfford && (
                    <Text style={styles.needMore}>
                      Need {item.cost - balance} more
                    </Text>
                  )}
                </View>

                {/* Redeem button */}
                <TouchableOpacity
                  style={[styles.redeemBtn, !canAfford && styles.redeemBtnLocked]}
                  onPress={() => canAfford && handleRedeem(item)}
                  activeOpacity={canAfford ? 0.82 : 1}
                  disabled={!canAfford}
                >
                  <Text style={[styles.redeemBtnText, !canAfford && styles.redeemBtnTextLocked]}>
                    {canAfford ? 'Redeem →' : 'Can\'t Afford'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {/* ── History ─────────────────────────────────────────── */}
        {history.length > 0 && (
          <>
            <View style={styles.sectionLabel}>
              <Text style={styles.sectionLabelText}>RECENT REDEMPTIONS</Text>
            </View>
            <View style={styles.historyCard}>
              {history.map((h, i) => (
                <View
                  key={h.id}
                  style={[styles.historyRow, i < history.length - 1 && styles.historyRowBorder]}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.historyName}>{h.reward}</Text>
                    <Text style={styles.historyDate}>{h.date}</Text>
                  </View>
                  <Text style={styles.historyCost}>−{h.cost} BB</Text>
                </View>
              ))}
            </View>
          </>
        )}

        <View style={{ height: 24 }} />
      </ScrollView>

      {/* ── Confirm modal ────────────────────────────────────── */}
      <Modal visible={!!confirming} transparent animationType="slide" onRequestClose={() => setConfirming(null)}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setConfirming(null)} />
          {confirming && (
            <View style={styles.sheet}>
              <View style={styles.sheetHandle} />
              <Text style={styles.sheetLabel}>CONFIRM REDEMPTION</Text>

              <View style={styles.confirmItem}>
                <Text style={styles.confirmEmoji}>{confirming.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.confirmName}>{confirming.name}</Text>
                  <Text style={styles.confirmDesc}>{confirming.desc}</Text>
                </View>
              </View>

              <View style={styles.costBreakdown}>
                <View style={styles.costLine}>
                  <Text style={styles.costLineLabel}>Cost</Text>
                  <Text style={styles.costLineValue}>−{confirming.cost} BB</Text>
                </View>
                <View style={[styles.costLine, styles.costLineBorder]}>
                  <Text style={styles.costLineLabel}>Your balance</Text>
                  <Text style={styles.costLineValue}>{balance} BB</Text>
                </View>
                <View style={styles.costLine}>
                  <Text style={[styles.costLineLabel, { fontWeight: '600' }]}>After redemption</Text>
                  <Text style={[styles.costLineValue, { color: Colors.navy }]}>
                    {balance - confirming.cost} BB
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm} activeOpacity={0.85}>
                <Text style={styles.confirmBtnText}>Confirm — {confirming.cost} BB</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setConfirming(null)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>

      {/* ── Success modal ────────────────────────────────────── */}
      <Modal visible={!!redeemed} transparent animationType="fade" onRequestClose={() => setRedeemed(null)}>
        <View style={styles.successOverlay}>
          {redeemed && (
            <View style={styles.successCard}>
              <Text style={styles.successEmoji}>{redeemed.item.emoji}</Text>
              <View style={styles.successBadge}>
                <Text style={styles.successBadgeText}>REDEEMED ✓</Text>
              </View>
              <Text style={styles.successTitle}>{redeemed.item.name}</Text>
              <Text style={styles.successDesc}>{redeemed.item.desc}</Text>

              <View style={styles.qrWrap}>
                <QRCode
                  value={`ironpicks://coupon?code=${redeemed.code}`}
                  size={160}
                  color={Colors.navy}
                  backgroundColor={Colors.card}
                />
              </View>

              <Text style={styles.successCode}>{redeemed.code}</Text>
              <Text style={styles.successInstruction}>Show this screen to staff</Text>

              <TouchableOpacity style={styles.doneBtn} onPress={() => setRedeemed(null)} activeOpacity={0.85}>
                <Text style={styles.doneBtnText}>Done</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.surface },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 12,
    backgroundColor: Colors.card,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 22,
    color: Colors.navy,
    lineHeight: 26,
  },
  headerSub: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: Colors.muted,
    letterSpacing: 0.3,
    marginTop: 1,
  },
  balanceChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.navyPale,
    borderWidth: 1,
    borderColor: Colors.borderNavyPale,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  balanceChipText: {
    fontFamily: 'DMMonoMedium',
    fontSize: 13,
    color: Colors.navy,
  },

  // Tabs
  tabs: {
    backgroundColor: Colors.card,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  tabsInner: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 6,
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: Colors.card2,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  tabActive: {
    backgroundColor: Colors.maroon,
    borderColor: Colors.maroon,
  },
  tabText: {
    fontFamily: 'DMMonoMedium',
    fontSize: 11,
    color: Colors.textSecondary,
  },
  tabTextActive: { color: '#F5EBED' },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: { paddingTop: 12, paddingHorizontal: 12 },

  // Item grid
  grid: { gap: 10 },
  itemCard: {
    backgroundColor: Colors.card,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 14,
    padding: 14,
    position: 'relative',
    overflow: 'hidden',
  },
  itemCardLocked: { opacity: 0.55 },
  itemTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: Colors.maroon,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  itemTagLegendary: { backgroundColor: '#B8860B' },
  itemTagText: {
    fontFamily: 'DMMonoMedium',
    fontSize: 8,
    color: '#FFF',
    letterSpacing: 0.4,
  },
  itemEmoji: { fontSize: 30, marginBottom: 8 },
  itemName: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 18,
    color: Colors.textPrimary,
    lineHeight: 22,
    marginBottom: 3,
  },
  itemNameLocked: { color: Colors.muted },
  itemDesc: {
    fontFamily: 'DMSans',
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
    marginBottom: 12,
  },
  itemCostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  costChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.navyPale,
    borderWidth: 1,
    borderColor: Colors.borderNavyPale,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  costChipLocked: {
    backgroundColor: Colors.card2,
    borderColor: Colors.border,
  },
  costText: {
    fontFamily: 'DMMonoMedium',
    fontSize: 11,
    color: Colors.navy,
  },
  costTextLocked: { color: Colors.muted },
  needMore: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: Colors.red,
    letterSpacing: 0.2,
  },
  redeemBtn: {
    backgroundColor: Colors.maroon,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  redeemBtnLocked: { backgroundColor: Colors.card2 },
  redeemBtnText: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 15,
    color: '#F5EBED',
    letterSpacing: 0.4,
  },
  redeemBtnTextLocked: { color: Colors.muted },

  // Section label
  sectionLabel: { paddingTop: 20, paddingBottom: 8 },
  sectionLabelText: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: Colors.muted,
    letterSpacing: 0.5,
  },

  // History
  historyCard: {
    backgroundColor: Colors.card,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 14,
    overflow: 'hidden',
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  historyRowBorder: { borderBottomWidth: 0.5, borderBottomColor: Colors.border },
  historyName: {
    fontFamily: 'DMSans',
    fontSize: 13,
    color: Colors.textPrimary,
  },
  historyDate: {
    fontFamily: 'DMMonoMedium',
    fontSize: 10,
    color: Colors.muted,
    marginTop: 1,
  },
  historyCost: {
    fontFamily: 'DMMonoMedium',
    fontSize: 12,
    color: Colors.textSecondary,
  },

  // Modals shared
  modalOverlay: { flex: 1, justifyContent: 'flex-end' },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(23,19,15,0.5)',
  },
  sheet: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    alignSelf: 'center',
    marginBottom: 20,
  },
  sheetLabel: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: Colors.muted,
    letterSpacing: 0.8,
    marginBottom: 16,
  },

  // Confirm sheet
  confirmItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: Colors.card2,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  confirmEmoji: { fontSize: 32 },
  confirmName: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 18,
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  confirmDesc: {
    fontFamily: 'DMSans',
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  costBreakdown: {
    backgroundColor: Colors.card2,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  costLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 11,
  },
  costLineBorder: {
    borderTopWidth: 0.5,
    borderTopColor: Colors.border,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  costLineLabel: {
    fontFamily: 'DMSans',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  costLineValue: {
    fontFamily: 'DMMonoMedium',
    fontSize: 13,
    color: Colors.textPrimary,
  },
  confirmBtn: {
    backgroundColor: Colors.maroon,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  confirmBtnText: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 17,
    color: '#F5EBED',
    letterSpacing: 0.5,
  },
  cancelBtn: { paddingVertical: 10, alignItems: 'center' },
  cancelBtnText: {
    fontFamily: 'DMSans',
    fontSize: 13,
    color: Colors.muted,
  },

  // Success modal
  successOverlay: {
    flex: 1,
    backgroundColor: 'rgba(23,19,15,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  successCard: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    gap: 0,
  },
  successEmoji: { fontSize: 44, marginBottom: 10 },
  successBadge: {
    backgroundColor: Colors.greenBg,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 12,
  },
  successBadgeText: {
    fontFamily: 'DMMonoMedium',
    fontSize: 10,
    color: Colors.green,
    letterSpacing: 0.6,
  },
  successTitle: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 24,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  successDesc: {
    fontFamily: 'DMSans',
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  qrWrap: {
    padding: 14,
    backgroundColor: Colors.card,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 12,
    marginBottom: 14,
  },
  successCode: {
    fontFamily: 'DMMonoMedium',
    fontSize: 18,
    color: Colors.navy,
    letterSpacing: 2,
    marginBottom: 4,
  },
  successInstruction: {
    fontFamily: 'DMMonoMedium',
    fontSize: 9,
    color: Colors.muted,
    letterSpacing: 0.4,
    marginBottom: 20,
  },
  doneBtn: {
    backgroundColor: Colors.navy,
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 40,
    alignItems: 'center',
    width: '100%',
  },
  doneBtnText: {
    fontFamily: 'BarlowCondensedBold',
    fontSize: 16,
    color: '#F0ECE6',
    letterSpacing: 0.4,
  },
});
