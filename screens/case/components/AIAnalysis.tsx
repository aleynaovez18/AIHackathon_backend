import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '@/constants/design-system';

interface AIAnalysisProps {
  isAnalyzing: boolean;
  confidenceScore: number;
  insights: string[];
}

export const AIAnalysis: React.FC<AIAnalysisProps> = ({ 
  isAnalyzing, 
  confidenceScore, 
  insights 
}) => {
  if (!isAnalyzing && confidenceScore === 0) return null;

  return (
    <View style={styles.aiSection}>
      <View style={styles.aiHeader}>
        <MaterialCommunityIcons name="robot" size={24} color={COLORS.primary} />
        <Text style={styles.aiTitle}>AI Analysis</Text>
        {confidenceScore > 0 && (
          <View style={styles.confidenceBadge}>
            <Text style={styles.confidenceText}>{confidenceScore}% confident</Text>
          </View>
        )}
      </View>
      {isAnalyzing ? (
        <View style={styles.loadingContainer}>
          <MaterialCommunityIcons name="loading" size={24} color={COLORS.primary} />
          <Text style={styles.loadingText}>AI is analyzing symptoms...</Text>
        </View>
      ) : (
        <>
          {insights.map((insight, index) => (
            <View key={index} style={styles.aiInsight}>
              <MaterialCommunityIcons name="lightbulb" size={16} color={COLORS.warning} />
              <Text style={styles.aiText}>{insight}</Text>
            </View>
          ))}
          <View style={styles.aiRecommendation}>
            <Text style={styles.aiRecommendationTitle}>💡 AI Recommendation</Text>
            <Text style={styles.aiRecommendationText}>
              Based on selected symptoms: Consider acute myocardial infarction. 
              Immediate cardiac workup recommended.
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  aiSection: {
    backgroundColor: COLORS.primary + '10',
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 2,
    borderColor: COLORS.primary + '30',
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  aiTitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.primary,
    marginLeft: SPACING.sm,
  },
  confidenceBadge: {
    backgroundColor: COLORS.success + '20',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.small,
    marginLeft: SPACING.sm,
  },
  confidenceText: {
    color: COLORS.success,
    fontSize: TYPOGRAPHY.fontSizes.sm,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  loadingText: {
    marginLeft: SPACING.sm,
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.fontSizes.md,
  },
  aiInsight: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  aiText: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.text,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  aiRecommendation: {
    backgroundColor: COLORS.warning + '15',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.small,
    marginTop: SPACING.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
  },
  aiRecommendationTitle: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  aiRecommendationText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.text,
    lineHeight: 18,
  },
});