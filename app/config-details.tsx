
import React, { useState, useRef } from 'react';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { ScrollView, Pressable, StyleSheet, View, Text, Platform, Image, TextInput, Alert, KeyboardAvoidingView, Animated } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { pcConfigurations } from '@/data/pcConfigurations';
import { Component } from '@/types/PCConfig';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

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

const componentTypeColors: Record<Component['type'], string> = {
  cpu: '#2962ff',
  gpu: '#d32f2f',
  ram: '#388e3c',
  storage: '#f57c00',
  motherboard: '#7b1fa2',
  psu: '#fbc02d',
  case: '#0097a7',
  cooling: '#5d4037',
};

export default function ConfigDetailsScreen() {
  const { id } = useLocalSearchParams();
  const config = pcConfigurations.find(c => c.id === id);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showPersonalizedForm, setShowPersonalizedForm] = useState(false);
  const [expandedComponent, setExpandedComponent] = useState<string | null>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  if (!config) {
    return (
      <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <IconSymbol name="exclamationmark.triangle" color={colors.textSecondary} size={48} />
        <Text style={[commonStyles.text, { marginTop: 16 }]}>Configuration non trouvée</Text>
      </View>
    );
  }

  const renderHeaderLeft = () => (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.back();
      }}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="chevron.left" color={colors.primary} size={24} />
    </Pressable>
  );

  const handleSendMessage = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert(
        'Champs requis',
        'Veuillez remplir tous les champs avant d\'envoyer votre message.',
        [{ text: 'OK' }]
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert(
        'Email invalide',
        'Veuillez entrer une adresse email valide.',
        [{ text: 'OK' }]
      );
      return;
    }

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    Alert.alert(
      'Message envoyé ! ✅',
      `Votre demande personnalisée pour "${config.name}" a été envoyée avec succès. Nous vous répondrons dans les plus brefs délais à ${email}.`,
      [
        {
          text: 'OK',
          onPress: () => {
            setMessage('');
            setName('');
            setEmail('');
            setShowPersonalizedForm(false);
          }
        }
      ]
    );

    console.log('Message envoyé:', {
      configId: config.id,
      configName: config.name,
      name,
      email,
      message,
      timestamp: new Date().toISOString()
    });
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

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
      <KeyboardAvoidingView 
        style={commonStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <Animated.ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          {/* Hero Image with Parallax */}
          <View style={styles.heroImageContainer}>
            <Image
              source={{ uri: config.imageUrl }}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.heroGradient}
            >
              {config.recommended && (
                <View style={styles.recommendedBadge}>
                  <IconSymbol name="star.fill" color={colors.accent} size={16} />
                  <Text style={styles.recommendedText}>Recommandé</Text>
                </View>
              )}
            </LinearGradient>
          </View>

          {/* Config Overview */}
          <View style={styles.overviewSection}>
            <View style={styles.overviewHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.configName}>{config.name}</Text>
                <View style={styles.categoryBadge}>
                  <IconSymbol 
                    name={config.type === 'prebuild' ? 'cube.box.fill' : 'wrench.and.screwdriver.fill'} 
                    color={colors.primary} 
                    size={16} 
                  />
                  <Text style={styles.configCategory}>
                    {config.type === 'prebuild' ? 'Configuration Prébuild' : 'Configuration Custom'}
                  </Text>
                </View>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>Prix total</Text>
                <Text style={styles.configPrice}>{config.price}€</Text>
              </View>
            </View>

            <Text style={styles.configDescription}>{config.description}</Text>

            <LinearGradient
              colors={['#e8f5e9', '#c8e6c9']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.performanceCard}
            >
              <IconSymbol name="gauge.with.dots.needle.67percent" color={colors.secondary} size={28} />
              <View style={{ flex: 1 }}>
                <Text style={styles.performanceLabel}>Performance</Text>
                <Text style={styles.performanceValue}>{config.performance}</Text>
              </View>
              <IconSymbol name="checkmark.circle.fill" color={colors.secondary} size={24} />
            </LinearGradient>
          </View>

          {/* Quick Stats */}
          <View style={styles.quickStatsSection}>
            <View style={styles.quickStatCard}>
              <IconSymbol name="cpu" color={colors.primary} size={24} />
              <Text style={styles.quickStatNumber}>{config.components.length}</Text>
              <Text style={styles.quickStatLabel}>Composants</Text>
            </View>
            <View style={styles.quickStatCard}>
              <IconSymbol name="bolt.fill" color={colors.accent} size={24} />
              <Text style={styles.quickStatNumber}>
                {config.components.find(c => c.type === 'psu')?.specs[0] || 'N/A'}
              </Text>
              <Text style={styles.quickStatLabel}>Alimentation</Text>
            </View>
            <View style={styles.quickStatCard}>
              <IconSymbol name="memorychip" color={colors.secondary} size={24} />
              <Text style={styles.quickStatNumber}>
                {config.components.find(c => c.type === 'ram')?.specs[0] || 'N/A'}
              </Text>
              <Text style={styles.quickStatLabel}>RAM</Text>
            </View>
          </View>

          {/* Components List */}
          <View style={styles.componentsSection}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="square.stack.3d.up.fill" color={colors.primary} size={24} />
              <Text style={styles.sectionTitle}>Composants Détaillés</Text>
            </View>
            {config.components.map((component, index) => (
              <Pressable
                key={component.id}
                style={styles.componentCard}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setExpandedComponent(expandedComponent === component.id ? null : component.id);
                }}
              >
                <View style={styles.componentHeader}>
                  <View style={[
                    styles.componentIconContainer,
                    { backgroundColor: componentTypeColors[component.type] + '20' }
                  ]}>
                    <IconSymbol
                      name={componentTypeIcons[component.type] as any}
                      color={componentTypeColors[component.type]}
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
                  <View style={styles.componentPriceContainer}>
                    <Text style={styles.componentPrice}>{component.price}€</Text>
                    <IconSymbol 
                      name={expandedComponent === component.id ? "chevron.up" : "chevron.down"} 
                      color={colors.textSecondary} 
                      size={20} 
                    />
                  </View>
                </View>

                {expandedComponent === component.id && (
                  <View style={styles.componentExpanded}>
                    <Text style={styles.componentDescription}>{component.description}</Text>
                    <View style={styles.specsContainer}>
                      {component.specs.map((spec, idx) => (
                        <View key={idx} style={styles.specTag}>
                          <IconSymbol name="checkmark" color={colors.secondary} size={14} />
                          <Text style={styles.specText}>{spec}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </Pressable>
            ))}
          </View>

          {/* Price Breakdown */}
          <View style={styles.priceSection}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="chart.bar.fill" color={colors.primary} size={24} />
              <Text style={styles.sectionTitle}>Répartition du Budget</Text>
            </View>
            <View style={styles.priceCard}>
              {config.components.map((component) => {
                const percentage = ((component.price / config.price) * 100).toFixed(1);
                return (
                  <View key={component.id} style={styles.priceRow}>
                    <View style={styles.priceRowLeft}>
                      <View style={[
                        styles.priceColorDot,
                        { backgroundColor: componentTypeColors[component.type] }
                      ]} />
                      <Text style={styles.priceLabel}>
                        {componentTypeLabels[component.type]}
                      </Text>
                    </View>
                    <View style={styles.priceRowRight}>
                      <Text style={styles.pricePercentage}>{percentage}%</Text>
                      <Text style={styles.priceValue}>{component.price}€</Text>
                    </View>
                  </View>
                );
              })}
              <View style={styles.priceDivider} />
              <View style={styles.priceRow}>
                <Text style={styles.priceTotalLabel}>Total</Text>
                <Text style={styles.priceTotalValue}>{config.price}€</Text>
              </View>
            </View>
          </View>

          {/* Why This Config */}
          <View style={styles.whySection}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="lightbulb.fill" color={colors.accent} size={24} />
              <Text style={styles.sectionTitle}>Pourquoi cette configuration ?</Text>
            </View>
            <View style={styles.whyCard}>
              <View style={styles.whyItem}>
                <View style={styles.whyIconContainer}>
                  <IconSymbol name="checkmark.circle.fill" color={colors.secondary} size={24} />
                </View>
                <Text style={styles.whyText}>
                  Équilibre optimal entre performance et prix
                </Text>
              </View>
              <View style={styles.whyItem}>
                <View style={styles.whyIconContainer}>
                  <IconSymbol name="checkmark.circle.fill" color={colors.secondary} size={24} />
                </View>
                <Text style={styles.whyText}>
                  Composants de marques reconnues et fiables
                </Text>
              </View>
              <View style={styles.whyItem}>
                <View style={styles.whyIconContainer}>
                  <IconSymbol name="checkmark.circle.fill" color={colors.secondary} size={24} />
                </View>
                <Text style={styles.whyText}>
                  Évolutivité garantie pour les années à venir
                </Text>
              </View>
              <View style={styles.whyItem}>
                <View style={styles.whyIconContainer}>
                  <IconSymbol name="checkmark.circle.fill" color={colors.secondary} size={24} />
                </View>
                <Text style={styles.whyText}>
                  Compatible avec tous les jeux récents
                </Text>
              </View>
            </View>
          </View>

          {/* Personalized Message Section */}
          <View style={styles.personalizedSection}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="envelope.fill" color={colors.primary} size={24} />
              <Text style={styles.sectionTitle}>Personnaliser cette Config</Text>
            </View>
            
            {!showPersonalizedForm ? (
              <Pressable
                style={styles.personalizedIntro}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  setShowPersonalizedForm(true);
                }}
              >
                <LinearGradient
                  colors={[colors.primary, '#1e4db7']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.personalizedIntroGradient}
                >
                  <IconSymbol name="sparkles" color={colors.card} size={32} />
                  <Text style={styles.personalizedIntroTitle}>
                    Besoin d&apos;ajustements ?
                  </Text>
                  <Text style={styles.personalizedIntroText}>
                    Envoyez-nous vos modifications souhaitées
                  </Text>
                  <View style={styles.personalizedIntroButton}>
                    <Text style={styles.personalizedIntroButtonText}>Personnaliser</Text>
                    <IconSymbol name="arrow.right" color={colors.primary} size={18} />
                  </View>
                </LinearGradient>
              </Pressable>
            ) : (
              <View style={styles.personalizedForm}>
                <Text style={styles.formDescription}>
                  Décrivez-nous les modifications que vous souhaitez apporter à cette configuration.
                </Text>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Votre nom</Text>
                  <View style={styles.inputWrapper}>
                    <IconSymbol name="person.circle" color={colors.textSecondary} size={20} />
                    <TextInput
                      style={styles.input}
                      placeholder="Ex: Jean Dupont"
                      placeholderTextColor={colors.textSecondary}
                      value={name}
                      onChangeText={setName}
                      autoCapitalize="words"
                    />
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Votre email</Text>
                  <View style={styles.inputWrapper}>
                    <IconSymbol name="envelope" color={colors.textSecondary} size={20} />
                    <TextInput
                      style={styles.input}
                      placeholder="Ex: jean.dupont@email.com"
                      placeholderTextColor={colors.textSecondary}
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Vos modifications</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Ex: Remplacer le GPU par un RTX 4070, augmenter la RAM à 32Go..."
                    placeholderTextColor={colors.textSecondary}
                    value={message}
                    onChangeText={setMessage}
                    multiline
                    numberOfLines={6}
                    textAlignVertical="top"
                  />
                </View>

                <View style={styles.formButtons}>
                  <Pressable
                    style={styles.cancelButton}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      setShowPersonalizedForm(false);
                      setMessage('');
                      setName('');
                      setEmail('');
                    }}
                  >
                    <Text style={styles.cancelButtonText}>Annuler</Text>
                  </Pressable>

                  <Pressable
                    style={styles.sendButtonContainer}
                    onPress={handleSendMessage}
                  >
                    <LinearGradient
                      colors={[colors.secondary, '#388e3c']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.sendButton}
                    >
                      <IconSymbol name="paperplane.fill" color={colors.card} size={18} />
                      <Text style={styles.sendButtonText}>Envoyer</Text>
                    </LinearGradient>
                  </Pressable>
                </View>

                <View style={styles.infoBox}>
                  <IconSymbol name="info.circle" color={colors.primary} size={16} />
                  <Text style={styles.infoText}>
                    Votre message sera envoyé directement au PDG de Trust ConfigPC
                  </Text>
                </View>
              </View>
            )}
          </View>
        </Animated.ScrollView>
      </KeyboardAvoidingView>
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
  heroImageContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.highlight,
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    justifyContent: 'flex-end',
    padding: 16,
  },
  recommendedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    alignSelf: 'flex-start',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
    elevation: 3,
  },
  recommendedText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  overviewSection: {
    padding: 20,
    backgroundColor: colors.card,
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  configName: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  configCategory: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  configPrice: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
  },
  configDescription: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 20,
  },
  performanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    gap: 16,
  },
  performanceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  performanceValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.secondary,
  },
  quickStatsSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
    backgroundColor: colors.background,
  },
  quickStatCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  quickStatNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    marginTop: 8,
  },
  quickStatLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  componentsSection: {
    padding: 16,
    backgroundColor: colors.background,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  componentCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  componentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  componentIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  componentType: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 4,
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
  componentPriceContainer: {
    alignItems: 'flex-end',
    gap: 4,
  },
  componentPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  componentExpanded: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.highlight,
  },
  componentDescription: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  specsContainer: {
    gap: 8,
  },
  specTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  specText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.text,
  },
  priceSection: {
    padding: 16,
    backgroundColor: colors.background,
  },
  priceCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  priceRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  priceColorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  priceRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pricePercentage: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  priceValue: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    minWidth: 60,
    textAlign: 'right',
  },
  priceDivider: {
    height: 2,
    backgroundColor: colors.highlight,
    marginVertical: 12,
  },
  priceTotalLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  priceTotalValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
  },
  whySection: {
    padding: 16,
    backgroundColor: colors.background,
  },
  whyCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  whyItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  whyIconContainer: {
    marginTop: 2,
  },
  whyText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  personalizedSection: {
    padding: 16,
    marginBottom: 20,
    backgroundColor: colors.background,
  },
  personalizedIntro: {
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 5,
  },
  personalizedIntroGradient: {
    padding: 32,
    alignItems: 'center',
  },
  personalizedIntroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.card,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  personalizedIntroText: {
    fontSize: 15,
    color: colors.card,
    opacity: 0.95,
    textAlign: 'center',
    marginBottom: 24,
  },
  personalizedIntroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  personalizedIntroButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  personalizedForm: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  formDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.highlight,
    borderRadius: 12,
    paddingHorizontal: 12,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    paddingVertical: 12,
  },
  textArea: {
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.highlight,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text,
    minHeight: 120,
  },
  formButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.background,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.highlight,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  sendButtonContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 8,
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.card,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.highlight,
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    gap: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: colors.text,
    lineHeight: 18,
  },
});
