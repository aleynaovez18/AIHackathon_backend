import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const PRIMARY = '#38e07b';

type CaseGuessData = {
  story: string;
  disease: string;
  exampleSymptoms: string[];
};

const SAMPLE_GUESS_CASES: Record<string, CaseGuessData[]> = {
  hepatology: [
    {
      story:
        '32 yaşında erkek hasta, 2 haftadır halsizlik, iştahsızlık ve karın ağrısı. Fizik muayenede hepatomegali ve hassasiyet. KFT yüksek.',
      disease: 'Hepatit',
      exampleSymptoms: ['Sarılık', 'Koyu renkli idrar', 'Halsizlik'],
    },
  ],
};

export default function CaseGuessScreen() {
  const router = useRouter();
  const { deptId } = useLocalSearchParams<{ deptId?: string }>();

  const data = useMemo<CaseGuessData>(() => {
    const list = SAMPLE_GUESS_CASES[deptId ?? 'hepatology'] ?? SAMPLE_GUESS_CASES.hepatology;
    return list[0];
  }, [deptId]);

  const [revealed, setRevealed] = useState<boolean>(false);
  const [guessInput, setGuessInput] = useState<string>('');
  const [correctGuesses, setCorrectGuesses] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);

  const onRevealDisease = (): void => {
    setRevealed(true);
    Alert.alert('Hastalık', data.disease);
  };

  const onCheckGuess = (): void => {
    const normalized = guessInput.trim().toLocaleLowerCase('tr');
    if (!normalized) return;
    const isCorrect = data.exampleSymptoms.some(s => s.toLocaleLowerCase('tr') === normalized);
    if (isCorrect) {
      if (!correctGuesses.includes(normalized)) setCorrectGuesses(prev => [...prev, normalized]);
      Alert.alert('Doğru', 'Tahmin doğru, doğru tahminler tablosuna eklendi.');
    } else {
      if (!wrongGuesses.includes(normalized)) setWrongGuesses(prev => [...prev, normalized]);
      Alert.alert('Yanlış', 'Tahmin yanlış, yanlış tahminler tablosuna eklendi.');
    }
    setGuessInput('');
  };

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

        {/* Story */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Hasta Hikayesi</Text>
            <Pressable style={styles.listenBtn}>
              <Text style={styles.listenIcon}>🔊</Text>
              <Text style={styles.listenText}>Dinle</Text>
            </Pressable>
          </View>
          <Text style={styles.paragraph}>{data.story}</Text>
        </View>

        {/* Actions - revised */}
        <View style={styles.actions}>
          <Pressable style={styles.primaryBtn} onPress={onRevealDisease}>
            <Text style={styles.primaryBtnText}>Hastalığı Gör</Text>
          </Pressable>

          <View style={styles.longInputBlock}>
            <Text style={styles.longInputLabel}>Semptomları Tahmin Et</Text>
            <TextInput
              value={guessInput}
              onChangeText={setGuessInput}
              placeholder="örn: Sarılık"
              placeholderTextColor="#9ca3af"
              style={styles.longInput}
              returnKeyType="done"
              onSubmitEditing={onCheckGuess}
            />
          </View>

          <Pressable style={styles.ghostBtn} onPress={onCheckGuess}>
            <Text style={styles.ghostBtnText}>Tahmini Kontrol Et</Text>
          </Pressable>

          {/* Results tables */}
          <View style={styles.resultTables}>
            <View style={styles.table}>
              <Text style={styles.tableTitle}>Doğru Tahminler</Text>
              {correctGuesses.length === 0 ? (
                <Text style={styles.tableEmpty}>Henüz yok</Text>
              ) : (
                correctGuesses.map((g, i) => (
                  <Text key={`${g}-${i}`} style={styles.tableRow}>• {g}</Text>
                ))
              )}
            </View>
            <View style={styles.table}>
              <Text style={styles.tableTitle}>Yanlış Tahminler</Text>
              {wrongGuesses.length === 0 ? (
                <Text style={styles.tableEmpty}>Henüz yok</Text>
              ) : (
                wrongGuesses.map((g, i) => (
                  <Text key={`${g}-${i}`} style={styles.tableRow}>• {g}</Text>
                ))
              )}
            </View>
          </View>
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
  paragraph: { color: '#374151', lineHeight: 22, fontSize: 14 },

  actions: { gap: 12 },
  primaryBtn: { height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: PRIMARY },
  primaryBtnText: { color: '#000000', fontSize: 16, fontWeight: '700' },
  longInputBlock: { gap: 8 },
  longInputLabel: { fontSize: 12, color: '#6b7280' },
  longInput: { height: 48, borderRadius: 12, paddingHorizontal: 12, backgroundColor: '#e5e7eb', color: '#111827' },
  ghostBtn: { height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  ghostBtnText: { color: '#4b5563', fontSize: 16, fontWeight: '700' },

  resultTables: { flexDirection: 'row', gap: 12 },
  table: { flex: 1, backgroundColor: '#ffffff', borderRadius: 12, padding: 12, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 1 },
  tableTitle: { fontSize: 14, fontWeight: '700', marginBottom: 6, color: '#111827' },
  tableEmpty: { color: '#9ca3af' },
  tableRow: { color: '#374151' },

  footerButtons: { flexDirection: 'row', gap: 12, backgroundColor: '#ffffff', padding: 8, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#e5e7eb' },
  footerBtnMuted: { flex: 1, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6' },
  footerBtnMutedText: { color: '#374151', fontSize: 16, fontWeight: '700' },
  footerBtn: { flex: 1, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: '#111827' },
  footerBtnText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
});



