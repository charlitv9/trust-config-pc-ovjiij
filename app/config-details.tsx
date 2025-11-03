
import React from 'react';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { ScrollView, Pressable, StyleSheet, View, Text, Platform, Image } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { pcConfigurations } from '@/data/pcConfigurations';
import { Component } from '@/types/PCConfig';

const componentTypeLabels: Record<Component['type'], string> = {
  cpu: 'Processeur',
  gpu: 'Carte Graphique',
  ram: 'Mémoire RAM',
  storage: 'Stockage',
  motherboard: 'Carte Mère',
  psu: 'Alimentation',
  case: 'Boîtier',
  cooling: 'Refroidissement',
};

const componentTypeIcons: Record<Component['type'], string> = {
  cpu: 'cpu',
  gpu: 'rectangle.3.group',
  ram: 'memorychip',
  storage: 'internaldrive',
  motherboard: 'square.grid.3x3',
  psu: 'bolt.fill',
  case: 'cube',
  cooling: 'wind',
};

export default function ConfigDetailsScreen() {
  const { id } = useLocalSearchParams();
  const config = pcConfigurations.find(c => c.id === id);

  if (!config) {
    return (
      <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={commonStyles.text}>Configuration non trouvée</Text>
      </View>
    );
  }

  const renderHeaderLeft = () => (
    <Pressable
      onPress={() => router.back()}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="chevron.left" color={colors.primary} size={24} />
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: config.name,
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
          headerLeft: renderHeaderLeft,
          headerShadowVisible: true,
        }}
      />
      <View style={commonStyles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Image */}
          <Image
            source={{ uri: config.imageUrl }}
            style={styles.heroImage}
            resizeMode="cover"
          />

          {/* Config Overview */}
          <View style={styles.overviewSection}>
            <View style={styles.overviewHeader}>
              <View>
                <Text style={styles.configName}>{config.name}</Text>
                <Text style={styles.configCategory}>
                  {config.type === 'prebuild' ? 'Configuration Prébuild' : 'Configuration Custom'}
                </Text>
              </View>
              <Text style={styles.configPrice}>{config.price}€</Text>
            </View>

            <Text style={styles.configDescription}>{config.description}</Text>

            <View style={styles.performanceCard}>
              <IconSymbol name="gauge.with.dots.needle.67percent" color={colors.secondary} size={24} />
              <View style={{ flex: 1 }}>
                <Text style={styles.performanceLabel}>Performance</Text>
                <Text style={styles.performanceValue}>{config.performance}</Text>
              </View>
            </View>
          </View>

          {/* Components List */}
          <View style={styles.componentsSection}>
            <Text style={styles.sectionTitle}>Composants ({config.components.length})</Text>
            {config.components.map((component) => (
              <View key={component.id} style={styles.componentCard}>
                <View style={styles.componentHeader}>
                  <View style={styles.componentIconContainer}>
                    <IconSymbol
                      name={componentTypeIcons[component.type] as any}
                      color={colors.primary}
                      size={24}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.componentType}>
                      {componentTypeLabels[component.type]}
                    </Text>
                    <Text style={styles.componentName}>{component.name}</Text>
                    <Text style={styles.componentBrand}>{component.brand}</Text>
                  </View>
                  <Text style={styles.componentPrice}>{component.price}€</Text>
                </View>

                <Text style={styles.componentDescription}>{component.description}</Text>

                <View style={styles.specsContainer}>
                  {component.specs.map((spec, index) => (
                    <View key={index} style={styles.specTag}>
                      <Text style={styles.specText}>{spec}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>

          {/* Price Breakdown */}
          <View style={styles.priceSection}>
            <Text style={styles.sectionTitle}>Détail du Prix</Text>
            <View style={styles.priceCard}>
              {config.components.map((component) => (
                <View key={component.id} style={styles.priceRow}>
                  <Text style={styles.priceLabel}>
                    {componentTypeLabels[component.type]}
                  </Text>
                  <Text style={styles.priceValue}>{component.price}€</Text>
                </View>
              ))}
              <View style={styles.priceDivider} />
              <View style={styles.priceRow}>
                <Text style={styles.priceTotalLabel}>Total</Text>
                <Text style={styles.priceTotalValue}>{config.price}€</Text>
              </View>
            </View>
          </View>

          {/* Why This Config */}
          <View style={styles.whySection}>
            <Text style={styles.sectionTitle}>Pourquoi cette configuration ?</Text>
            <View style={styles.whyCard}>
              <View style={styles.whyItem}>
                <IconSymbol name="checkmark.circle.fill" color={colors.secondary} size={20} />
                <Text style={styles.whyText}>
                  Équilibre optimal entre performance et prix
                </Text>
              </View>
              <View style={styles.whyItem}>
                <IconSymbol name="checkmark.circle.fill" color={colors.secondary} size={20} />
                <Text style={styles.whyText}>
                  Composants de marques reconnues et fiables
                </Text>
              </View>
              <View style={styles.whyItem}>
                <IconSymbol name="checkmark.circle.fill" color={colors.secondary} size={20} />
                <Text style={styles.whyText}>
                  Évolutivité garantie pour les années à venir
                </Text>
              </View>
              <View style={styles.whyItem}>
                <IconSymbol name="checkmark.circle.fill" color={colors.secondary} size={20} />
                <Text style={styles.whyText}>
                  Compatible avec tous les jeux récents
                </Text>
              </View>
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
    paddingBottom: 40,
  },
  headerButtonContainer: {
    padding: 8,
    marginLeft: 8,
  },
  heroImage: {
    width: '100%',
    height: 250,
    backgroundColor: colors.highlight,
  },
  overviewSection: {
    padding: 16,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  configName: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  configCategory: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  configPrice: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
  },
  configDescription: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  performanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  performanceLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 2,
  },
  performanceValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.secondary,
  },
  componentsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  componentCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  componentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  componentIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.highlight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  componentType: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  componentName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  componentBrand: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  componentPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  componentDescription: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  specsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  specTag: {
    backgroundColor: colors.background,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  specText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
  },
  priceSection: {
    padding: 16,
  },
  priceCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  priceDivider: {
    height: 1,
    backgroundColor: colors.highlight,
    marginVertical: 8,
  },
  priceTotalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  priceTotalValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
  },
  whySection: {
    padding: 16,
  },
  whyCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  whyItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  whyText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});
