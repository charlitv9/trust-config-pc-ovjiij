
import React from 'react';
import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View, Text, Platform, Linking, Pressable } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

export default function ProfileScreen() {
  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.log('Error opening link:', err));
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'À Propos',
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
          headerShadowVisible: true,
        }}
      />
      <View style={commonStyles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.logoContainer}>
              <IconSymbol name="desktopcomputer" color={colors.card} size={48} />
            </View>
            <Text style={styles.heroTitle}>Trust ConfigPC</Text>
            <Text style={styles.heroSubtitle}>
              La référence française des configurations PC gaming
            </Text>
          </View>

          {/* Mission Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notre Mission</Text>
            <View style={styles.card}>
              <Text style={styles.cardText}>
                Trust ConfigPC est né de la passion pour le gaming et la technologie, avec pour ambition de devenir la référence française des configurations PC.
              </Text>
              <Text style={[styles.cardText, { marginTop: 12 }]}>
                100% gratuit, nous proposons des solutions fiables et accessibles, permettant à chacun de créer ou choisir son PC idéal sans se perdre dans des comparatifs complexes ou des informations biaisées.
              </Text>
            </View>
          </View>

          {/* Values Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nos Valeurs</Text>
            <View style={styles.valueItem}>
              <View style={styles.valueIconContainer}>
                <IconSymbol name="checkmark.shield.fill" color={colors.secondary} size={28} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.valueTitle}>Transparence</Text>
                <Text style={styles.valueText}>
                  Chaque configuration est pensée pour offrir performance, fiabilité et cohérence, avec des explications claires sur le rôle de chaque composant.
                </Text>
              </View>
            </View>

            <View style={styles.valueItem}>
              <View style={styles.valueIconContainer}>
                <IconSymbol name="star.fill" color={colors.accent} size={28} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.valueTitle}>Expertise</Text>
                <Text style={styles.valueText}>
                  Des configurations testées et validées, avec des mises à jour régulières garantissant des conseils fiables et actuels.
                </Text>
              </View>
            </View>

            <View style={styles.valueItem}>
              <View style={styles.valueIconContainer}>
                <IconSymbol name="gift.fill" color={colors.primary} size={28} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.valueTitle}>Gratuité</Text>
                <Text style={styles.valueText}>
                  Un service 100% gratuit, sans publicité intrusive, porté par la conviction que tout le monde mérite d&apos;accéder à des configurations optimales.
                </Text>
              </View>
            </View>
          </View>

          {/* Features Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ce Que Nous Offrons</Text>
            <View style={styles.card}>
              <View style={styles.featureItem}>
                <IconSymbol name="eurosign.circle.fill" color={colors.primary} size={20} />
                <Text style={styles.featureText}>
                  Configurations de 800€ à 1500€
                </Text>
              </View>
              <View style={styles.featureItem}>
                <IconSymbol name="cube.fill" color={colors.primary} size={20} />
                <Text style={styles.featureText}>
                  Options prébuild et composant par composant
                </Text>
              </View>
              <View style={styles.featureItem}>
                <IconSymbol name="doc.text.fill" color={colors.primary} size={20} />
                <Text style={styles.featureText}>
                  Fiches détaillées pour chaque configuration
                </Text>
              </View>
              <View style={styles.featureItem}>
                <IconSymbol name="arrow.clockwise.circle.fill" color={colors.primary} size={20} />
                <Text style={styles.featureText}>
                  Mises à jour régulières des prix et composants
                </Text>
              </View>
              <View style={styles.featureItem}>
                <IconSymbol name="graduationcap.fill" color={colors.primary} size={20} />
                <Text style={styles.featureText}>
                  Explications pédagogiques et accessibles
                </Text>
              </View>
            </View>
          </View>

          {/* Vision Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notre Vision</Text>
            <View style={styles.card}>
              <Text style={styles.cardText}>
                Au-delà des configurations, Trust ConfigPC incarne une vision ambitieuse : créer un écosystème où l&apos;information technique est accessible à tous, où la communauté peut évoluer avec le projet.
              </Text>
              <Text style={[styles.cardText, { marginTop: 12 }]}>
                Chaque détail, du design aux fiches produits, reflète la volonté de combiner esthétique, praticité et pédagogie, afin de transformer l&apos;expérience d&apos;achat en un véritable parcours de découverte.
              </Text>
            </View>
          </View>

          {/* Promise Section */}
          <View style={styles.promiseSection}>
            <Text style={styles.promiseTitle}>Notre Promesse</Text>
            <Text style={styles.promiseText}>
              Trust ConfigPC n&apos;est pas seulement un site : c&apos;est une promesse de transparence, d&apos;expertise et de gratuité, portée par la conviction que tout le monde mérite d&apos;accéder à des configurations optimales et à des conseils fiables.
            </Text>
            <Text style={[styles.promiseText, { marginTop: 12, fontWeight: '700' }]}>
              Offrir aux gamers français la meilleure expérience possible, en alliant performance, innovation et confiance.
            </Text>
          </View>

          {/* Version Info */}
          <View style={styles.versionSection}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
            <Text style={styles.versionText}>© 2024 Trust ConfigPC</Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  heroSection: {
    backgroundColor: colors.primary,
    padding: 32,
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.card,
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.card,
    textAlign: 'center',
    opacity: 0.9,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  cardText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  valueItem: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  valueIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  valueText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  promiseSection: {
    backgroundColor: colors.secondary,
    padding: 24,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 12,
  },
  promiseTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.card,
    marginBottom: 12,
    textAlign: 'center',
  },
  promiseText: {
    fontSize: 15,
    color: colors.card,
    lineHeight: 22,
    textAlign: 'center',
  },
  versionSection: {
    padding: 24,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
});
