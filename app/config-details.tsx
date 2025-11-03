
import React, { useState } from 'react';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { ScrollView, Pressable, StyleSheet, View, Text, Platform, Image, TextInput, Alert, KeyboardAvoidingView } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { pcConfigurations } from '@/data/pcConfigurations';
import { Component } from '@/types/PCConfig';
import * as Haptics from 'expo-haptics';

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
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showPersonalizedForm, setShowPersonalizedForm] = useState(false);

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

  const handleSendMessage = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      Alert.alert(
        'Champs requis',
        'Veuillez remplir tous les champs avant d\'envoyer votre message.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert(
        'Email invalide',
        'Veuillez entrer une adresse email valide.',
        [{ text: 'OK' }]
      );
      return;
    }

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    Alert.alert(
      'Message envoyé !',
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

          {/* Personalized Message Section */}
          <View style={styles.personalizedSection}>
            <View style={styles.personalizedHeader}>
              <IconSymbol name="envelope.fill" color={colors.primary} size={24} />
              <Text style={styles.sectionTitle}>Fiche Personnalisée</Text>
            </View>
            
            {!showPersonalizedForm ? (
              <View style={styles.personalizedIntro}>
                <Text style={styles.personalizedIntroText}>
                  Besoin d&apos;une configuration sur mesure ? Envoyez-nous votre demande personnalisée et nous vous répondrons rapidement.
                </Text>
                <Pressable
                  style={styles.showFormButton}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setShowPersonalizedForm(true);
                  }}
                >
                  <IconSymbol name="pencil" color={colors.card} size={20} />
                  <Text style={styles.showFormButtonText}>Créer une demande personnalisée</Text>
                </Pressable>
              </View>
            ) : (
              <View style={styles.personalizedForm}>
                <Text style={styles.formDescription}>
                  Décrivez-nous vos besoins spécifiques pour cette configuration et nous vous contacterons avec une proposition personnalisée.
                </Text>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Votre nom</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: Jean Dupont"
                    placeholderTextColor={colors.textSecondary}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Votre email</Text>
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

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Votre message</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Décrivez vos besoins : budget, utilisation, préférences de composants, etc."
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
                    style={styles.sendButton}
                    onPress={handleSendMessage}
                  >
                    <IconSymbol name="paperplane.fill" color={colors.card} size={18} />
                    <Text style={styles.sendButtonText}>Envoyer au PDG</Text>
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
        </ScrollView>
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
  personalizedSection: {
    padding: 16,
    marginBottom: 20,
  },
  personalizedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  personalizedIntro: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  personalizedIntroText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  showFormButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  showFormButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.card,
  },
  personalizedForm: {
    backgroundColor: colors.card,
    borderRadius: 12,
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
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.highlight,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text,
  },
  textArea: {
    minHeight: 120,
    paddingTop: 12,
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
    borderWidth: 1,
    borderColor: colors.highlight,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  sendButton: {
    flex: 1,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
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
