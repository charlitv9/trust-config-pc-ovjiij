
import React from 'react';
import { router } from 'expo-router';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function Modal() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Guide d&apos;Utilisation</Text>
        <Pressable onPress={() => router.back()} style={styles.closeButton}>
          <IconSymbol name="xmark.circle.fill" color={colors.textSecondary} size={28} />
        </Pressable>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Comment choisir votre configuration ?</Text>
          <Text style={styles.text}>
            1. Définissez votre budget (800€ à 1500€)
          </Text>
          <Text style={styles.text}>
            2. Choisissez entre prébuild (PC complet) ou custom (composants séparés)
          </Text>
          <Text style={styles.text}>
            3. Consultez les détails de chaque configuration
          </Text>
          <Text style={styles.text}>
            4. Vérifiez la compatibilité avec vos jeux préférés
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Comprendre les catégories</Text>
          <View style={styles.categoryItem}>
            <Text style={styles.categoryTitle}>800-900€ - Entrée de gamme</Text>
            <Text style={styles.categoryText}>
              Parfait pour débuter dans le gaming PC. Jeux en 1080p avec paramètres moyens à élevés.
            </Text>
          </View>
          <View style={styles.categoryItem}>
            <Text style={styles.categoryTitle}>900-1200€ - Milieu de gamme</Text>
            <Text style={styles.categoryText}>
              Excellent rapport qualité-prix. Gaming fluide en 1440p pour tous les jeux récents.
            </Text>
          </View>
          <View style={styles.categoryItem}>
            <Text style={styles.categoryTitle}>1200-1500€ - Haut de gamme</Text>
            <Text style={styles.categoryText}>
              Performances maximales. 1440p/4K avec paramètres ultra et ray tracing.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prébuild vs Custom</Text>
          <View style={styles.comparisonItem}>
            <Text style={styles.comparisonTitle}>Prébuild</Text>
            <Text style={styles.comparisonText}>
              - PC complet prêt à l&apos;emploi
            </Text>
            <Text style={styles.comparisonText}>
              - Garantie globale
            </Text>
            <Text style={styles.comparisonText}>
              - Idéal pour les débutants
            </Text>
          </View>
          <View style={styles.comparisonItem}>
            <Text style={styles.comparisonTitle}>Custom</Text>
            <Text style={styles.comparisonText}>
              - Composants à acheter séparément
            </Text>
            <Text style={styles.comparisonText}>
              - Plus de flexibilité
            </Text>
            <Text style={styles.comparisonText}>
              - Montage à faire soi-même
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conseils d&apos;achat</Text>
          <Text style={styles.text}>
            - Vérifiez les prix actuels avant d&apos;acheter
          </Text>
          <Text style={styles.text}>
            - Privilégiez les vendeurs reconnus
          </Text>
          <Text style={styles.text}>
            - Conservez les factures et garanties
          </Text>
          <Text style={styles.text}>
            - N&apos;hésitez pas à demander conseil
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 8,
  },
  categoryItem: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  comparisonItem: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  comparisonTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.secondary,
    marginBottom: 8,
  },
  comparisonText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 4,
  },
});
