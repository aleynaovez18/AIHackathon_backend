import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

type CaseInfo = {
  id: string;
  title: string;
  status: 'success' | 'failed';
  minutes: number;
  favorite: boolean;
};

const FAVORITE_CASES: CaseInfo[] = [
  { id: '1', title: 'Diyabetik Ketoasidoz', status: 'success', minutes: 12, favorite: true },
  { id: '2', title: 'Akut Miyokard Enfarktüsü', status: 'failed', minutes: 25, favorite: true },
  { id: '3', title: 'Astım Krizi', status: 'success', minutes: 8, favorite: true },
];

function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Favori Vakalar</Text>
    </View>
  );
}

function FilterSortBar() {
  return (
    <View style={styles.toolbarRow}>
      <View style={styles.toolbarActions}>
        <View style={styles.pillBtn}><Text style={styles.pillText}>Filtrele</Text><Text style={styles.pillIcon}>⤿</Text></View>
        <View style={styles.pillBtn}><Text style={styles.pillText}>Sırala</Text><Text style={styles.pillIcon}>⇅</Text></View>
      </View>
    </View>
  );
}

function CaseCard({ item }: { item: CaseInfo }) {
  const isSuccess = item.status === 'success';
  return (
    <View style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={[styles.starIcon, item.favorite ? styles.starActive : styles.starMuted]}>
          {item.favorite ? '★' : '☆'}
        </Text>
      </View>
      <View style={styles.metaRow}>
        <View style={styles.metaLeft}>
          <Text style={[styles.statusIcon, isSuccess ? styles.success : styles.failed]}>●</Text>
          <Text style={styles.metaText}>{isSuccess ? 'Başarılı' : 'Başarısız'}</Text>
        </View>
        <View style={styles.metaRight}>
          <Text style={styles.timerIcon}>⏱</Text>
          <Text style={styles.metaText}>{item.minutes} dakika</Text>
        </View>
      </View>
      <Pressable accessibilityRole="button" style={styles.primaryBtn}>
        <Text style={styles.primaryBtnText}>Detayları Gör</Text>
      </Pressable>
    </View>
  );
}

export default function FavoritesScreen() {
  return (
    <View style={styles.root}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <FilterSortBar />
        {FAVORITE_CASES.map(c => (
          <CaseCard key={c.id} item={c} />
        ))}
      </ScrollView>
      <View style={styles.footerNav}>
        <View style={styles.footerItem}><Text style={styles.footerIcon}>📚</Text><Text style={styles.footerLabelMuted}>Kütüphane</Text></View>
        <View style={styles.footerItem}><Text style={styles.footerIcon}>🩺</Text><Text style={styles.footerLabelMuted}>Vakalar</Text></View>
        <View style={[styles.footerItem, styles.footerItemActive]}><Text style={styles.footerIconActive}>❤</Text><Text style={styles.footerLabelActive}>Favoriler</Text></View>
        <View style={styles.footerItem}><Text style={styles.footerIcon}>⚙</Text><Text style={styles.footerLabelMuted}>Ayarlar</Text></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#ffffff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
  headerTitle: { color: '#111827', fontSize: 20, fontWeight: '700' },
  headerIcon: { color: '#111827', fontSize: 18 },

  content: { padding: 16, paddingBottom: 88, gap: 12 },
  toolbarRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  toolbarActions: { flexDirection: 'row', gap: 8 },
  pillBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#ffffff', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 999, borderWidth: StyleSheet.hairlineWidth, borderColor: '#e5e7eb' },
  pillText: { color: '#111827', fontSize: 14, fontWeight: '600' },
  pillIcon: { color: '#111827', fontSize: 12 },

  card: { borderRadius: 12, backgroundColor: '#ffffff', padding: 16, borderWidth: StyleSheet.hairlineWidth, borderColor: '#e5e7eb' },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  cardTitle: { color: '#111827', fontSize: 16, fontWeight: '700' },
  starIcon: { fontSize: 18 },
  starActive: { color: '#facc15' },
  starMuted: { color: '#9ca3af' },

  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  metaLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statusIcon: { fontSize: 10 },
  success: { color: '#16a34a' },
  failed: { color: '#dc2626' },
  timerIcon: { color: '#e5e7eb' },
  metaText: { color: '#9ca3af' },

  primaryBtn: { height: 44, borderRadius: 999, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' },
  primaryBtnText: { color: '#111714', fontSize: 16, fontWeight: '700' },

  footerNav: { position: 'absolute', left: 0, right: 0, bottom: 0, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#e5e7eb', backgroundColor: '#ffffff', paddingHorizontal: 16, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-around' },
  footerItem: { alignItems: 'center', justifyContent: 'flex-end', gap: 2 },
  footerIcon: { color: '#9eb7a8', fontSize: 16 },
  footerIconActive: { color: '#38e07b', fontSize: 16 },
  footerLabelMuted: { color: '#9eb7a8', fontSize: 12, fontWeight: '500' },
  footerLabelActive: { color: '#38e07b', fontSize: 12, fontWeight: '500' },
  footerItemActive: { borderRadius: 999 },
});


