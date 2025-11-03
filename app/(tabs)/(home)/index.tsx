
import React, { useState } from 'react';
import { Stack, Link } from 'expo-router';
import { ScrollView, Pressable, StyleSheet, View, Text, Platform, Image } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { pcConfigurations } from '@/data/pcConfigurations';
import { ConfigCategory, ConfigType } from '@/types/PCConfig';

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<ConfigCategory>('all');
  const [selectedType, setSelectedType] = useState<ConfigType>('all');

  const filteredConfigs = pcConfigurations.filter(config => {
    const categoryMatch = selectedCategory === 'all' || config.category === selectedCategory;
    const typeMatch = selectedType === 'all' || config.type === selectedType;
    return categoryMatch && typeMatch;
  });

  const renderHeaderRight = () => (
    <Link href="/modal" asChild>
      <Pressable style={styles.headerButtonContainer}>
        <IconSymbol name="info.circle" color={colors.primary} size={24} />
      </Pressable>
    </Link>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Trust ConfigPC',
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
          headerRight: renderHeaderRight,
          headerShadowVisible: true,
        }}
      />
      <View style={[commonStyles.container]}>
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
            <Text style={styles.heroTitle}>Votre PC Gaming Idéal</Text>
            <Text style={styles.heroSubtitle}>
              Configurations fiables et optimisées de 800€ à 1500€
            </Text>
            <View style={styles.trustBadge}>
              <IconSymbol name="checkmark.shield.fill" color={colors.secondary} size={20} />
              <Text style={styles.trustText}>100% Gratuit • Conseils Fiables</Text>
            </View>
          </View>

          {/* Filter Section */}
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Budget</Text>
            <View style={styles.filterButtons}>
              <Pressable
                style={[
                  styles.filterButton,
                  selectedCategory === 'all' && styles.filterButtonActive
                ]}
                onPress={() => setSelectedCategory('all')}
              >
                <Text style={[
                  styles.filterButtonText,
                  selectedCategory === 'all' && styles.filterButtonTextActive
                ]}>
                  Tous
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.filterButton,
                  selectedCategory === 'entry' && styles.filterButtonActive
                ]}
                onPress={() => setSelectedCategory('entry')}
              >
                <Text style={[
                  styles.filterButtonText,
                  selectedCategory === 'entry' && styles.filterButtonTextActive
                ]}>
                  800-900€
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.filterButton,
                  selectedCategory === 'mid' && styles.filterButtonActive
                ]}
                onPress={() => setSelectedCategory('mid')}
              >
                <Text style={[
                  styles.filterButtonText,
                  selectedCategory === 'mid' && styles.filterButtonTextActive
                ]}>
                  900-1200€
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.filterButton,
                  selectedCategory === 'high' && styles.filterButtonActive
                ]}
                onPress={() => setSelectedCategory('high')}
              >
                <Text style={[
                  styles.filterButtonText,
                  selectedCategory === 'high' && styles.filterButtonTextActive
                ]}>
                  1200-1500€
                </Text>
              </Pressable>
            </View>

            <Text style={[styles.filterTitle, { marginTop: 16 }]}>Type</Text>
            <View style={styles.filterButtons}>
              <Pressable
                style={[
                  styles.filterButton,
                  selectedType === 'all' && styles.filterButtonActive
                ]}
                onPress={() => setSelectedType('all')}
              >
                <Text style={[
                  styles.filterButtonText,
                  selectedType === 'all' && styles.filterButtonTextActive
                ]}>
                  Tous
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.filterButton,
                  selectedType === 'prebuild' && styles.filterButtonActive
                ]}
                onPress={() => setSelectedType('prebuild')}
              >
                <Text style={[
                  styles.filterButtonText,
                  selectedType === 'prebuild' && styles.filterButtonTextActive
                ]}>
                  Prébuild
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.filterButton,
                  selectedType === 'custom' && styles.filterButtonActive
                ]}
                onPress={() => setSelectedType('custom')}
              >
                <Text style={[
                  styles.filterButtonText,
                  selectedType === 'custom' && styles.filterButtonTextActive
                ]}>
                  Composants
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Configurations List */}
          <View style={styles.configurationsSection}>
            <Text style={styles.sectionTitle}>
              {filteredConfigs.length} Configuration{filteredConfigs.length > 1 ? 's' : ''} disponible{filteredConfigs.length > 1 ? 's' : ''}
            </Text>
            {filteredConfigs.map((config) => (
              <Link
                key={config.id}
                href={{
                  pathname: '/config-details',
                  params: { id: config.id }
                }}
                asChild
              >
                <Pressable style={styles.configCard}>
                  {config.recommended && (
                    <View style={styles.recommendedBadge}>
                      <IconSymbol name="star.fill" color={colors.accent} size={14} />
                      <Text style={styles.recommendedText}>Recommandé</Text>
                    </View>
                  )}
                  <Image
                    source={{ uri: config.imageUrl }}
                    style={styles.configImage}
                    resizeMode="cover"
                  />
                  <View style={styles.configContent}>
                    <View style={styles.configHeader}>
                      <Text style={styles.configName}>{config.name}</Text>
                      <View style={styles.configTypeBadge}>
                        <Text style={styles.configTypeText}>
                          {config.type === 'prebuild' ? 'Prébuild' : 'Custom'}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.configDescription} numberOfLines={2}>
                      {config.description}
                    </Text>
                    <View style={styles.configFooter}>
                      <View style={styles.performanceTag}>
                        <IconSymbol name="gauge.with.dots.needle.67percent" color={colors.secondary} size={16} />
                        <Text style={styles.performanceText}>{config.performance}</Text>
                      </View>
                      <Text style={styles.configPrice}>{config.price}€</Text>
                    </View>
                  </View>
                </Pressable>
              </Link>
            ))}
          </View>

          {/* Info Section */}
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Pourquoi Trust ConfigPC ?</Text>
            <View style={styles.infoItem}>
              <IconSymbol name="checkmark.circle.fill" color={colors.secondary} size={24} />
              <Text style={styles.infoText}>
                Configurations testées et validées par des experts
              </Text>
            </View>
            <View style={styles.infoItem}>
              <IconSymbol name="checkmark.circle.fill" color={colors.secondary} size={24} />
              <Text style={styles.infoText}>
                Mises à jour régulières selon les prix du marché
              </Text>
            </View>
            <View style={styles.infoItem}>
              <IconSymbol name="checkmark.circle.fill" color={colors.secondary} size={24} />
              <Text style={styles.infoText}>
                Explications détaillées pour chaque composant
              </Text>
            </View>
            <View style={styles.infoItem}>
              <IconSymbol name="checkmark.circle.fill" color={colors.secondary} size={24} />
              <Text style={styles.infoText}>
                100% gratuit, sans publicité intrusive
              </Text>
            </View>
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
  headerButtonContainer: {
    padding: 8,
    marginRight: 8,
  },
  heroSection: {
    backgroundColor: colors.primary,
    padding: 24,
    alignItems: 'center',
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
    marginBottom: 16,
  },
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  trustText: {
    color: colors.card,
    fontSize: 14,
    fontWeight: '600',
  },
  filterSection: {
    padding: 16,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.highlight,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  filterButtonTextActive: {
    color: colors.card,
  },
  configurationsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  configCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  recommendedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.card,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
    zIndex: 1,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.15)',
    elevation: 2,
  },
  recommendedText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  configImage: {
    width: '100%',
    height: 180,
    backgroundColor: colors.highlight,
  },
  configContent: {
    padding: 16,
  },
  configHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  configName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  configTypeBadge: {
    backgroundColor: colors.highlight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  configTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  configDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  configFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  performanceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  performanceText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.secondary,
  },
  configPrice: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
  },
  infoSection: {
    padding: 16,
    backgroundColor: colors.card,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});
