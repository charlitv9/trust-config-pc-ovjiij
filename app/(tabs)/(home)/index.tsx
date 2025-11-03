
import React, { useState, useRef } from 'react';
import { Stack, Link, router } from 'expo-router';
import { ScrollView, Pressable, StyleSheet, View, Text, Platform, Image, TextInput, Animated } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { pcConfigurations } from '@/data/pcConfigurations';
import { ConfigCategory, ConfigType } from '@/types/PCConfig';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<ConfigCategory>('all');
  const [selectedType, setSelectedType] = useState<ConfigType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const filteredConfigs = pcConfigurations.filter(config => {
    const categoryMatch = selectedCategory === 'all' || config.category === selectedCategory;
    const typeMatch = selectedType === 'all' || config.type === selectedType;
    const searchMatch = searchQuery === '' || 
      config.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      config.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && typeMatch && searchMatch;
  });

  const stats = {
    total: pcConfigurations.length,
    entry: pcConfigurations.filter(c => c.category === 'entry').length,
    mid: pcConfigurations.filter(c => c.category === 'mid').length,
    high: pcConfigurations.filter(c => c.category === 'high').length,
    recommended: pcConfigurations.filter(c => c.recommended).length,
  };

  const handleCategoryPress = (category: ConfigCategory) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedCategory(category);
  };

  const handleTypePress = (type: ConfigType) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedType(type);
  };

  const handleCardPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleFABPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    router.push('/fiche-perso');
  };

  const renderHeaderRight = () => (
    <View style={styles.headerRightContainer}>
      <Pressable 
        style={styles.headerButton}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setShowSearch(!showSearch);
        }}
      >
        <IconSymbol name={showSearch ? "xmark.circle.fill" : "magnifyingglass"} color={colors.primary} size={24} />
      </Pressable>
      <Link href="/modal" asChild>
        <Pressable style={styles.headerButton}>
          <IconSymbol name="info.circle" color={colors.primary} size={24} />
        </Pressable>
      </Link>
    </View>
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
          {/* Hero Section with Gradient */}
          <LinearGradient
            colors={[colors.primary, '#1e4db7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroSection}
          >
            <Text style={styles.heroTitle}>Votre PC Gaming Idéal</Text>
            <Text style={styles.heroSubtitle}>
              Configurations fiables et optimisées de 800€ à 1500€
            </Text>
            <View style={styles.trustBadge}>
              <IconSymbol name="checkmark.shield.fill" color={colors.secondary} size={20} />
              <Text style={styles.trustText}>100% Gratuit • Conseils Fiables</Text>
            </View>
          </LinearGradient>

          {/* Search Bar */}
          {showSearch && (
            <View style={styles.searchContainer}>
              <IconSymbol name="magnifyingglass" color={colors.textSecondary} size={20} />
              <TextInput
                style={styles.searchInput}
                placeholder="Rechercher une configuration..."
                placeholderTextColor={colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
              {searchQuery.length > 0 && (
                <Pressable onPress={() => setSearchQuery('')}>
                  <IconSymbol name="xmark.circle.fill" color={colors.textSecondary} size={20} />
                </Pressable>
              )}
            </View>
          )}

          {/* Stats Dashboard */}
          <View style={styles.statsSection}>
            <View style={styles.statCard}>
              <IconSymbol name="square.stack.3d.up.fill" color={colors.primary} size={28} />
              <Text style={styles.statNumber}>{stats.total}</Text>
              <Text style={styles.statLabel}>Configs</Text>
            </View>
            <View style={styles.statCard}>
              <IconSymbol name="star.fill" color={colors.accent} size={28} />
              <Text style={styles.statNumber}>{stats.recommended}</Text>
              <Text style={styles.statLabel}>Recommandées</Text>
            </View>
            <View style={styles.statCard}>
              <IconSymbol name="eurosign.circle.fill" color={colors.secondary} size={28} />
              <Text style={styles.statNumber}>800-1500</Text>
              <Text style={styles.statLabel}>Budget €</Text>
            </View>
          </View>

          {/* Filter Section */}
          <View style={styles.filterSection}>
            <View style={styles.filterHeader}>
              <IconSymbol name="slider.horizontal.3" color={colors.primary} size={20} />
              <Text style={styles.filterHeaderText}>Filtres</Text>
            </View>
            
            <Text style={styles.filterTitle}>Budget</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterScrollContent}
            >
              <Pressable
                style={[
                  styles.filterButton,
                  selectedCategory === 'all' && styles.filterButtonActive
                ]}
                onPress={() => handleCategoryPress('all')}
              >
                <IconSymbol 
                  name="square.grid.2x2" 
                  color={selectedCategory === 'all' ? colors.card : colors.text} 
                  size={18} 
                />
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
                onPress={() => handleCategoryPress('entry')}
              >
                <IconSymbol 
                  name="1.circle.fill" 
                  color={selectedCategory === 'entry' ? colors.card : colors.text} 
                  size={18} 
                />
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
                onPress={() => handleCategoryPress('mid')}
              >
                <IconSymbol 
                  name="2.circle.fill" 
                  color={selectedCategory === 'mid' ? colors.card : colors.text} 
                  size={18} 
                />
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
                onPress={() => handleCategoryPress('high')}
              >
                <IconSymbol 
                  name="3.circle.fill" 
                  color={selectedCategory === 'high' ? colors.card : colors.text} 
                  size={18} 
                />
                <Text style={[
                  styles.filterButtonText,
                  selectedCategory === 'high' && styles.filterButtonTextActive
                ]}>
                  1200-1500€
                </Text>
              </Pressable>
            </ScrollView>

            <Text style={[styles.filterTitle, { marginTop: 16 }]}>Type</Text>
            <View style={styles.filterButtons}>
              <Pressable
                style={[
                  styles.filterButton,
                  selectedType === 'all' && styles.filterButtonActive
                ]}
                onPress={() => handleTypePress('all')}
              >
                <IconSymbol 
                  name="square.grid.2x2" 
                  color={selectedType === 'all' ? colors.card : colors.text} 
                  size={18} 
                />
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
                onPress={() => handleTypePress('prebuild')}
              >
                <IconSymbol 
                  name="cube.box.fill" 
                  color={selectedType === 'prebuild' ? colors.card : colors.text} 
                  size={18} 
                />
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
                onPress={() => handleTypePress('custom')}
              >
                <IconSymbol 
                  name="wrench.and.screwdriver.fill" 
                  color={selectedType === 'custom' ? colors.card : colors.text} 
                  size={18} 
                />
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
            <View style={styles.configsHeader}>
              <Text style={styles.sectionTitle}>
                {filteredConfigs.length} Configuration{filteredConfigs.length > 1 ? 's' : ''}
              </Text>
              {searchQuery && (
                <Text style={styles.searchResultText}>
                  pour &quot;{searchQuery}&quot;
                </Text>
              )}
            </View>
            
            {filteredConfigs.length === 0 ? (
              <View style={styles.emptyState}>
                <IconSymbol name="magnifyingglass" color={colors.textSecondary} size={48} />
                <Text style={styles.emptyStateTitle}>Aucune configuration trouvée</Text>
                <Text style={styles.emptyStateText}>
                  Essayez de modifier vos filtres ou votre recherche
                </Text>
              </View>
            ) : (
              filteredConfigs.map((config) => (
                <Link
                  key={config.id}
                  href={{
                    pathname: '/config-details',
                    params: { id: config.id }
                  }}
                  asChild
                >
                  <Pressable 
                    style={styles.configCard}
                    onPress={handleCardPress}
                  >
                    {config.recommended && (
                      <LinearGradient
                        colors={['#ffd54f', colors.accent]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.recommendedBadge}
                      >
                        <IconSymbol name="star.fill" color={colors.text} size={14} />
                        <Text style={styles.recommendedText}>Recommandé</Text>
                      </LinearGradient>
                    )}
                    <Image
                      source={{ uri: config.imageUrl }}
                      style={styles.configImage}
                      resizeMode="cover"
                    />
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.7)']}
                      style={styles.imageOverlay}
                    >
                      <View style={styles.imageOverlayContent}>
                        <View style={styles.configTypeBadge}>
                          <IconSymbol 
                            name={config.type === 'prebuild' ? 'cube.box.fill' : 'wrench.and.screwdriver.fill'} 
                            color={colors.card} 
                            size={12} 
                          />
                          <Text style={styles.configTypeText}>
                            {config.type === 'prebuild' ? 'Prébuild' : 'Custom'}
                          </Text>
                        </View>
                      </View>
                    </LinearGradient>
                    <View style={styles.configContent}>
                      <View style={styles.configHeader}>
                        <Text style={styles.configName}>{config.name}</Text>
                      </View>
                      <Text style={styles.configDescription} numberOfLines={2}>
                        {config.description}
                      </Text>
                      <View style={styles.configFooter}>
                        <View style={styles.performanceTag}>
                          <IconSymbol name="gauge.with.dots.needle.67percent" color={colors.secondary} size={16} />
                          <Text style={styles.performanceText}>{config.performance}</Text>
                        </View>
                        <View style={styles.priceContainer}>
                          <Text style={styles.configPrice}>{config.price}€</Text>
                          <IconSymbol name="chevron.right" color={colors.primary} size={20} />
                        </View>
                      </View>
                      <View style={styles.componentCount}>
                        <IconSymbol name="cpu" color={colors.textSecondary} size={14} />
                        <Text style={styles.componentCountText}>
                          {config.components.length} composants
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                </Link>
              ))
            )}
          </View>

          {/* Info Section */}
          <View style={styles.infoSection}>
            <View style={styles.infoHeader}>
              <IconSymbol name="lightbulb.fill" color={colors.accent} size={24} />
              <Text style={styles.infoTitle}>Pourquoi Trust ConfigPC ?</Text>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <IconSymbol name="checkmark.circle.fill" color={colors.secondary} size={24} />
              </View>
              <Text style={styles.infoText}>
                Configurations testées et validées par des experts
              </Text>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <IconSymbol name="checkmark.circle.fill" color={colors.secondary} size={24} />
              </View>
              <Text style={styles.infoText}>
                Mises à jour régulières selon les prix du marché
              </Text>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <IconSymbol name="checkmark.circle.fill" color={colors.secondary} size={24} />
              </View>
              <Text style={styles.infoText}>
                Explications détaillées pour chaque composant
              </Text>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <IconSymbol name="checkmark.circle.fill" color={colors.secondary} size={24} />
              </View>
              <Text style={styles.infoText}>
                100% gratuit, sans publicité intrusive
              </Text>
            </View>
          </View>

          {/* Quick Action Banner */}
          <Pressable 
            style={styles.quickActionBanner}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              router.push('/fiche-perso');
            }}
          >
            <LinearGradient
              colors={[colors.secondary, '#388e3c']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.quickActionGradient}
            >
              <View style={styles.quickActionContent}>
                <View>
                  <Text style={styles.quickActionTitle}>Besoin d&apos;aide ?</Text>
                  <Text style={styles.quickActionText}>
                    Contactez-nous pour une configuration personnalisée
                  </Text>
                </View>
                <IconSymbol name="arrow.right.circle.fill" color={colors.card} size={32} />
              </View>
            </LinearGradient>
          </Pressable>
        </ScrollView>

        {/* Floating Action Button */}
        <Animated.View style={[styles.fab, { transform: [{ scale: scaleAnim }] }]}>
          <Pressable onPress={handleFABPress}>
            <LinearGradient
              colors={[colors.accent, '#ffa000']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.fabGradient}
            >
              <IconSymbol name="envelope.fill" color={colors.text} size={24} />
            </LinearGradient>
          </Pressable>
        </Animated.View>
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
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerButton: {
    padding: 8,
    marginRight: 4,
  },
  heroSection: {
    padding: 32,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.card,
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.card,
    textAlign: 'center',
    opacity: 0.95,
    marginBottom: 20,
  },
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    gap: 8,
  },
  trustText: {
    color: colors.card,
    fontSize: 14,
    fontWeight: '700',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 4,
  },
  filterSection: {
    padding: 16,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  filterHeaderText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  filterScrollContent: {
    gap: 8,
    paddingRight: 16,
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.highlight,
    gap: 6,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  filterButtonTextActive: {
    color: colors.card,
  },
  configurationsSection: {
    padding: 16,
  },
  configsHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  searchResultText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  configCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 5,
  },
  recommendedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
    zIndex: 2,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
    elevation: 3,
  },
  recommendedText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
  },
  configImage: {
    width: '100%',
    height: 200,
    backgroundColor: colors.highlight,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    justifyContent: 'flex-end',
    padding: 12,
  },
  imageOverlayContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  configTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  configTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.card,
  },
  configContent: {
    padding: 16,
  },
  configHeader: {
    marginBottom: 8,
  },
  configName: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  configDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  configFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  performanceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  performanceText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.secondary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  configPrice: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
  },
  componentCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.highlight,
  },
  componentCountText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  infoSection: {
    padding: 16,
    backgroundColor: colors.card,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 16,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  infoIconContainer: {
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  quickActionBanner: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 5,
  },
  quickActionGradient: {
    padding: 20,
  },
  quickActionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quickActionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.card,
    marginBottom: 4,
  },
  quickActionText: {
    fontSize: 14,
    color: colors.card,
    opacity: 0.95,
  },
  fab: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 100 : 90,
    right: 20,
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.3)',
    elevation: 8,
    borderRadius: 32,
  },
  fabGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
