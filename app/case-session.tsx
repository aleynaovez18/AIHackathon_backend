import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const PRIMARY = '#38e07b';

export default function CaseSessionScreen() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Pressable accessibilityRole="button" style={styles.headerBtn} onPress={() => router.back()}>
            <Text style={styles.headerBtnText}>‹</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Vaka 1/5</Text>
          <Pressable accessibilityRole="button" style={styles.headerBtn}>
            <Text style={styles.headerBtnText}>⋮</Text>
          </Pressable>
        </View>
        <View style={styles.progressTrack}>
          <View style={styles.progressFill} />
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Timer */}
        <View style={styles.timerRow}>
          <View style={styles.timerBlock}>
            <View style={styles.timerBox}><Text style={styles.timerText}>09</Text></View>
            <Text style={styles.timerLabel}>Dakika</Text>
          </View>
          <Text style={styles.timerColon}>:</Text>
          <View style={styles.timerBlock}>
            <View style={styles.timerBox}><Text style={styles.timerText}>59</Text></View>
            <Text style={styles.timerLabel}>Saniye</Text>
          </View>
        </View>

        {/* Card with story and actions */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Hasta Hikayesi</Text>
            <Pressable style={styles.listenBtn}>
              <Text style={styles.listenIcon}>🔊</Text>
              <Text style={styles.listenText}>Dinle</Text>
            </Pressable>
          </View>
          <Text style={styles.sectionTitle}>Klinik Bulgular</Text>
          <Text style={styles.paragraph}>
            32 yaşında erkek hasta, son 2 haftadır devam eden halsizlik, iştahsızlık ve karın ağrısı şikayetleriyle başvuruyor. Hastanın öyküsünde, son 1 aydır düzensiz beslenme ve
            aşırı alkol tüketimi olduğu öğreniliyor. Fizik muayenede karaciğer büyüklüğü ve hassasiyeti tespit ediliyor. Laboratuvar tetkiklerinde karaciğer fonksiyon testlerinde
            belirgin yükselme saptanıyor.
          </Text>
        </View>

        {/* Primary and secondary actions */}
        <View style={styles.actions}>
          <Pressable style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>Semptomları Gör</Text>
          </Pressable>
          <View style={styles.actionsRow}>
            <View style={[styles.secondaryBtn, styles.disabled]}>
              <Text style={[styles.secondaryBtnText, styles.disabledText]}>Hastalığı Tahmin Et</Text>
            </View>
            <View style={[styles.secondaryBtn, styles.disabled]}>
              <Text style={[styles.secondaryBtnText, styles.disabledText]}>Daha Fazla Semptom İste</Text>
            </View>
          </View>
          <Pressable style={styles.ghostBtn}>
            <Text style={styles.ghostBtnText}>Cevabı Gör</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Footer controls */}
      <View style={styles.footerButtons}>
        <Pressable style={styles.footerBtnMuted}><Text style={styles.footerBtnMutedText}>Geri</Text></Pressable>
        <Pressable style={styles.footerBtn}><Text style={styles.footerBtnText}>İleri</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f9fafb' },
  header: { backgroundColor: '#ffffff', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  headerBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerBtnText: { color: '#374151', fontSize: 18 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '700', color: '#111827' },
  progressTrack: { paddingHorizontal: 16, paddingBottom: 8 },
  progressFill: { width: '20%', height: 8, backgroundColor: PRIMARY, borderRadius: 4 },

  scroll: { flex: 1 },
  scrollContent: { padding: 16, gap: 16 },
  timerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16 },
  timerBlock: { alignItems: 'center' },
  timerBox: { height: 64, width: 64, borderRadius: 12, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' },
  timerText: { fontSize: 28, fontWeight: '700', color: '#111827' },
  timerLabel: { marginTop: 6, fontSize: 12, fontWeight: '500', color: '#6b7280' },
  timerColon: { fontSize: 28, fontWeight: '700', color: '#111827', paddingBottom: 16 },

  card: { backgroundColor: '#ffffff', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 1 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  cardTitle: { fontSize: 20, fontWeight: '700', color: '#111827' },
  listenBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, height: 48, paddingHorizontal: 16, borderRadius: 999, backgroundColor: '#f3f4f6' },
  listenIcon: { fontSize: 18 },
  listenText: { fontSize: 14, fontWeight: '700', color: '#1f2937' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 8 },
  paragraph: { color: '#374151', lineHeight: 22, fontSize: 14 },

  actions: { gap: 12 },
  primaryBtn: { height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: PRIMARY },
  primaryBtnText: { color: '#000000', fontSize: 16, fontWeight: '700' },
  actionsRow: { flexDirection: 'row', gap: 12 },
  secondaryBtn: { flex: 1, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: '#e5e7eb' },
  secondaryBtnText: { color: '#374151', fontSize: 14, fontWeight: '700' },
  disabled: { opacity: 0.5 },
  disabledText: { color: '#6b7280' },
  ghostBtn: { height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  ghostBtnText: { color: '#4b5563', fontSize: 16, fontWeight: '700' },

  footerButtons: { flexDirection: 'row', gap: 12, backgroundColor: '#ffffff', padding: 8, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#e5e7eb' },
  footerBtnMuted: { flex: 1, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6' },
  footerBtnMutedText: { color: '#374151', fontSize: 16, fontWeight: '700' },
  footerBtn: { flex: 1, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: '#111827' },
  footerBtnText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
});





