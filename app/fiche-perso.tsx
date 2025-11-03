
import React, { useState } from 'react';
import { Stack, router } from 'expo-router';
import { ScrollView, Pressable, StyleSheet, View, Text, Platform, TextInput, Alert, KeyboardAvoidingView } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

export default function FichePersoScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState('');
  const [usage, setUsage] = useState('');
  const [message, setMessage] = useState('');
  const [selectedUsageType, setSelectedUsageType] = useState<string>('');

  const usageTypes = [
    { id: 'gaming', label: 'Gaming', icon: 'gamecontroller.fill' },
    { id: 'streaming', label: 'Streaming', icon: 'video.fill' },
    { id: 'work', label: 'Travail', icon: 'desktopcomputer' },
    { id: 'creation', label: 'Création', icon: 'paintbrush.fill' },
  ];

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
    if (!name.trim() || !email.trim() || !budget.trim() || !message.trim()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert(
        'Champs requis',
        'Veuillez remplir tous les champs obligatoires avant d\'envoyer votre demande.',
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

    const budgetNum = parseInt(budget);
    if (isNaN(budgetNum) || budgetNum < 500 || budgetNum > 5000) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert(
        'Budget invalide',
        'Veuillez entrer un budget entre 500€ et 5000€.',
        [{ text: 'OK' }]
      );
      return;
    }

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    Alert.alert(
      'Demande envoyée ! ✅',
      `Merci ${name} ! Votre demande personnalisée a été envoyée avec succès au PDG de Trust ConfigPC.\n\nNous vous répondrons dans les plus brefs délais à ${email}.`,
      [
        {
          text: 'Retour à l\'accueil',
          onPress: () => {
            setName('');
            setEmail('');
            setBudget('');
            setUsage('');
            setMessage('');
            setSelectedUsageType('');
            router.back();
          }
        }
      ]
    );

    console.log('Fiche personnalisée envoyée:', {
      name,
      email,
      budget,
      usage: selectedUsageType || usage,
      message,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Fiche Personnalisée',
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
          {/* Hero Section */}
          <LinearGradient
            colors={[colors.primary, '#1e4db7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroSection}
          >
            <View style={styles.heroIconContainer}>
              <IconSymbol name="envelope.fill" color={colors.card} size={40} />
            </View>
            <Text style={styles.heroTitle}>Configuration Sur Mesure</Text>
            <Text style={styles.heroSubtitle}>
              Décrivez-nous vos besoins et recevez une configuration personnalisée
            </Text>
          </LinearGradient>

          {/* Form Section */}
          <View style={styles.formSection}>
            <View style={styles.formCard}>
              <View style={styles.formHeader}>
                <IconSymbol name="person.fill" color={colors.primary} size={24} />
                <Text style={styles.formHeaderText}>Vos Informations</Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  Nom complet <Text style={styles.required}>*</Text>
                </Text>
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
                <Text style={styles.inputLabel}>
                  Email <Text style={styles.required}>*</Text>
                </Text>
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
            </View>

            <View style={styles.formCard}>
              <View style={styles.formHeader}>
                <IconSymbol name="gearshape.fill" color={colors.primary} size={24} />
                <Text style={styles.formHeaderText}>Votre Projet</Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  Budget (€) <Text style={styles.required}>*</Text>
                </Text>
                <View style={styles.inputWrapper}>
                  <IconSymbol name="eurosign.circle" color={colors.textSecondary} size={20} />
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: 1200"
                    placeholderTextColor={colors.textSecondary}
                    value={budget}
                    onChangeText={setBudget}
                    keyboardType="numeric"
                  />
                </View>
                <Text style={styles.inputHint}>
                  Budget recommandé : 800€ - 1500€
                </Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Utilisation principale</Text>
                <View style={styles.usageTypeContainer}>
                  {usageTypes.map((type) => (
                    <Pressable
                      key={type.id}
                      style={[
                        styles.usageTypeButton,
                        selectedUsageType === type.id && styles.usageTypeButtonActive
                      ]}
                      onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        setSelectedUsageType(type.id);
                      }}
                    >
                      <IconSymbol 
                        name={type.icon as any} 
                        color={selectedUsageType === type.id ? colors.card : colors.text} 
                        size={24} 
                      />
                      <Text style={[
                        styles.usageTypeText,
                        selectedUsageType === type.id && styles.usageTypeTextActive
                      ]}>
                        {type.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Autre utilisation (optionnel)</Text>
                <View style={styles.inputWrapper}>
                  <IconSymbol name="text.alignleft" color={colors.textSecondary} size={20} />
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: Montage vidéo, développement..."
                    placeholderTextColor={colors.textSecondary}
                    value={usage}
                    onChangeText={setUsage}
                  />
                </View>
              </View>
            </View>

            <View style={styles.formCard}>
              <View style={styles.formHeader}>
                <IconSymbol name="text.bubble.fill" color={colors.primary} size={24} />
                <Text style={styles.formHeaderText}>Votre Message</Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  Détails de votre demande <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Décrivez vos besoins spécifiques, préférences de composants, contraintes particulières, etc."
                  placeholderTextColor={colors.textSecondary}
                  value={message}
                  onChangeText={setMessage}
                  multiline
                  numberOfLines={8}
                  textAlignVertical="top"
                />
                <Text style={styles.inputHint}>
                  Plus vous êtes précis, mieux nous pourrons vous aider
                </Text>
              </View>
            </View>

            {/* Info Box */}
            <View style={styles.infoBox}>
              <IconSymbol name="info.circle.fill" color={colors.primary} size={20} />
              <View style={{ flex: 1 }}>
                <Text style={styles.infoBoxTitle}>Réponse rapide garantie</Text>
                <Text style={styles.infoBoxText}>
                  Votre demande sera envoyée directement au PDG de Trust ConfigPC. Vous recevrez une réponse personnalisée sous 24-48h.
                </Text>
              </View>
            </View>

            {/* Submit Button */}
            <Pressable
              style={styles.submitButton}
              onPress={handleSendMessage}
            >
              <LinearGradient
                colors={[colors.secondary, '#388e3c']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.submitGradient}
              >
                <IconSymbol name="paperplane.fill" color={colors.card} size={20} />
                <Text style={styles.submitButtonText}>Envoyer ma demande</Text>
              </LinearGradient>
            </Pressable>

            {/* Features */}
            <View style={styles.featuresSection}>
              <View style={styles.featureItem}>
                <IconSymbol name="checkmark.seal.fill" color={colors.secondary} size={24} />
                <Text style={styles.featureText}>Conseils d&apos;experts</Text>
              </View>
              <View style={styles.featureItem}>
                <IconSymbol name="clock.fill" color={colors.secondary} size={24} />
                <Text style={styles.featureText}>Réponse rapide</Text>
              </View>
              <View style={styles.featureItem}>
                <IconSymbol name="gift.fill" color={colors.secondary} size={24} />
                <Text style={styles.featureText}>100% gratuit</Text>
              </View>
            </View>
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
  heroSection: {
    padding: 32,
    alignItems: 'center',
  },
  heroIconContainer: {
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
    opacity: 0.95,
    paddingHorizontal: 20,
  },
  formSection: {
    padding: 16,
  },
  formCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: colors.highlight,
  },
  formHeaderText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
  },
  required: {
    color: '#f44336',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.highlight,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
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
    fontSize: 16,
    color: colors.text,
    minHeight: 140,
  },
  inputHint: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 6,
    fontStyle: 'italic',
  },
  usageTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  usageTypeButton: {
    flex: 1,
    minWidth: '45%',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.highlight,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    gap: 8,
  },
  usageTypeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  usageTypeText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  usageTypeTextActive: {
    color: colors.card,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.highlight,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    gap: 12,
  },
  infoBoxTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  infoBoxText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  submitButton: {
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)',
    elevation: 6,
    marginBottom: 24,
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    gap: 12,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.card,
  },
  featuresSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  featureItem: {
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
});
