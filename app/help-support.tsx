import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/constants/design-system';

interface HelpItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  onPress: () => void;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function HelpSupportScreen() {
  const router = useRouter();

  const contactInfo = {
    email: 'destek@medicalai.com',
    phone: '+90 212 123 45 67',
    address: 'İstanbul Üniversitesi Tıp Fakültesi, Beyazıt/İstanbul'
  };

  const handleEmailSupport = () => {
    Linking.openURL(`mailto:${contactInfo.email}?subject=Uygulama Desteği`);
  };

  const handlePhoneSupport = () => {
    Alert.alert(
      'Telefon Desteği',
      `${contactInfo.phone} numarasını aramak istiyor musunuz?`,
      [
        { text: 'İptal', style: 'cancel' },
        { text: 'Ara', onPress: () => Linking.openURL(`tel:${contactInfo.phone}`) }
      ]
    );
  };

  const handleWhatsAppSupport = () => {
    const whatsappUrl = `whatsapp://send?phone=${contactInfo.phone.replace(/\s/g, '')}&text=Merhaba, uygulamayla ilgili yardıma ihtiyacım var.`;
    Linking.openURL(whatsappUrl).catch(() => {
      Alert.alert('Hata', 'WhatsApp açılamadı. Lütfen WhatsApp\'ın yüklendiğinden emin olun.');
    });
  };

  const helpItems: HelpItem[] = [
    {
      id: 'faq',
      title: 'Sık Sorulan Sorular',
      subtitle: 'En çok merak edilen konular',
      icon: 'frequently-asked-questions',
      color: COLORS.primary,
      onPress: () => {}
    },
    {
      id: 'user-guide',
      title: 'Kullanım Kılavuzu',
      subtitle: 'Adım adım kullanım rehberi',
      icon: 'book-open-page-variant',
      color: COLORS.accent,
      onPress: () => {}
    },
    {
      id: 'video-tutorials',
      title: 'Video Eğitimler',
      subtitle: 'Görsel olarak öğrenin',
      icon: 'play-circle',
      color: COLORS.warning,
      onPress: () => {}
    },
    {
      id: 'report-bug',
      title: 'Hata Bildir',
      subtitle: 'Karşılaştığınız sorunları bildirin',
      icon: 'bug',
      color: COLORS.error,
      onPress: () => {}
    },
    {
      id: 'feature-request',
      title: 'Özellik Öner',
      subtitle: 'Yeni özellik önerilerinizi paylaşın',
      icon: 'lightbulb',
      color: COLORS.success,
      onPress: () => {}
    }
  ];

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'Vaka çözümlerini nasıl kaydedeceğim?',
      answer: 'Vaka çözümleriniz otomatik olarak kaydedilir. İlerlemenizi profil sayfasından takip edebilirsiniz.'
    },
    {
      id: '2',
      question: 'Başarı rozetleri nasıl kazanılır?',
      answer: 'Vaka çözerek, başarılı tanılar koyarak ve düzenli çalışarak rozetler kazanabilirsiniz.'
    },
    {
      id: '3',
      question: 'Hangi cihazlarda kullanabilirim?',
      answer: 'Uygulama iOS ve Android cihazlarda kullanılabilir. Web versiyonu da yakında geliyor.'
    },
    {
      id: '4',
      question: 'Çevrimdışı kullanım mümkün mü?',
      answer: 'Bazı özellikler çevrimdışı kullanılabilir, ancak AI analiz için internet bağlantısı gereklidir.'
    }
  ];

  const HelpItemCard = ({ item }: { item: HelpItem }) => (
    <Pressable style={styles.helpItem} onPress={item.onPress}>
      <View style={[styles.helpItemIcon, { backgroundColor: item.color + '15' }]}>
        <MaterialCommunityIcons name={item.icon as any} size={24} color={item.color} />
      </View>
      <View style={styles.helpItemContent}>
        <Text style={styles.helpItemTitle}>{item.title}</Text>
        <Text style={styles.helpItemSubtitle}>{item.subtitle}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={20} color={COLORS.textMuted} />
    </Pressable>
  );

  const FAQItemCard = ({ item }: { item: FAQItem }) => (
    <View style={styles.faqItem}>
      <View style={styles.faqQuestion}>
        <MaterialCommunityIcons name="help-circle" size={16} color={COLORS.primary} />
        <Text style={styles.faqQuestionText}>{item.question}</Text>
      </View>
      <Text style={styles.faqAnswer}>{item.answer}</Text>
    </View>
  );

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.headerShadow}>
        <View style={styles.headerContainer}>
          <Pressable
            accessibilityRole="button"
            hitSlop={8}
            style={styles.headerIconButton}
            onPress={() => router.back()}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Yardım & Destek</Text>
          <Pressable accessibilityRole="button" hitSlop={8} style={styles.headerIconButton}>
            <MaterialCommunityIcons name="phone" size={24} color={COLORS.primary} />
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Quick Contact */}
        <View style={styles.quickContactCard}>
          <Text style={styles.quickContactTitle}>Hızlı İletişim</Text>
          <Text style={styles.quickContactSubtitle}>Size nasıl yardımcı olabiliriz?</Text>
          
          <View style={styles.contactButtons}>
            <Pressable style={styles.contactButton} onPress={handleEmailSupport}>
              <MaterialCommunityIcons name="email" size={24} color={COLORS.primary} />
              <Text style={styles.contactButtonText}>E-posta</Text>
            </Pressable>
            
            <Pressable style={styles.contactButton} onPress={handlePhoneSupport}>
              <MaterialCommunityIcons name="phone" size={24} color={COLORS.success} />
              <Text style={styles.contactButtonText}>Telefon</Text>
            </Pressable>
            
            <Pressable style={styles.contactButton} onPress={handleWhatsAppSupport}>
              <MaterialCommunityIcons name="whatsapp" size={24} color={COLORS.accent} />
              <Text style={styles.contactButtonText}>WhatsApp</Text>
            </Pressable>
          </View>
        </View>

        {/* Help Categories */}
        <View style={styles.helpSection}>
          <Text style={styles.sectionTitle}>Yardım Kategorileri</Text>
          {helpItems.map((item) => (
            <HelpItemCard key={item.id} item={item} />
          ))}
        </View>

        {/* FAQ */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Sık Sorulan Sorular</Text>
          {faqItems.map((item) => (
            <FAQItemCard key={item.id} item={item} />
          ))}
        </View>

        {/* Contact Info */}
        <View style={styles.contactInfoCard}>
          <Text style={styles.contactInfoTitle}>İletişim Bilgileri</Text>
          
          <View style={styles.contactInfoItem}>
            <MaterialCommunityIcons name="email" size={20} color={COLORS.primary} />
            <Text style={styles.contactInfoText}>{contactInfo.email}</Text>
          </View>
          
          <View style={styles.contactInfoItem}>
            <MaterialCommunityIcons name="phone" size={20} color={COLORS.primary} />
            <Text style={styles.contactInfoText}>{contactInfo.phone}</Text>
          </View>
          
          <View style={styles.contactInfoItem}>
            <MaterialCommunityIcons name="map-marker" size={20} color={COLORS.primary} />
            <Text style={styles.contactInfoText}>{contactInfo.address}</Text>
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfoCard}>
          <Text style={styles.appInfoTitle}>Uygulama Bilgileri</Text>
          <View style={styles.appInfoRow}>
            <Text style={styles.appInfoLabel}>Versiyon:</Text>
            <Text style={styles.appInfoValue}>1.2.3</Text>
          </View>
          <View style={styles.appInfoRow}>
            <Text style={styles.appInfoLabel}>Son Güncelleme:</Text>
            <Text style={styles.appInfoValue}>15 Nisan 2024</Text>
          </View>
          <View style={styles.appInfoRow}>
            <Text style={styles.appInfoLabel}>Platform:</Text>
            <Text style={styles.appInfoValue}>React Native</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerShadow: {
    ...SHADOWS.small,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: 50,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.cardBackground,
  },
  headerIconButton: {
    padding: SPACING.sm,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.fontSizes.xl,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  quickContactCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.xl,
    marginBottom: SPACING.lg,
    ...SHADOWS.medium,
  },
  quickContactTitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  quickContactSubtitle: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  contactButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  contactButton: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.medium,
    backgroundColor: COLORS.background,
    minWidth: 80,
  },
  contactButtonText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.text,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    marginTop: SPACING.xs,
  },
  helpSection: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  helpItem: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  helpItemIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  helpItemContent: {
    flex: 1,
  },
  helpItemTitle: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  helpItemSubtitle: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
  },
  faqSection: {
    marginBottom: SPACING.lg,
  },
  faqItem: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  faqQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  faqQuestionText: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    flex: 1,
  },
  faqAnswer: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
    lineHeight: 20,
    marginLeft: SPACING.lg,
  },
  contactInfoCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.xl,
    marginBottom: SPACING.lg,
    ...SHADOWS.medium,
  },
  contactInfoTitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  contactInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.md,
  },
  contactInfoText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.text,
    flex: 1,
  },
  appInfoCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.xl,
    ...SHADOWS.medium,
  },
  appInfoTitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  appInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  appInfoLabel: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textMuted,
  },
  appInfoValue: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.text,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
});