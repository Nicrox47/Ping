import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { colors, radius, spacing } from '@/constants/theme';
import { INTERESTS, MAX_INTERESTS, MIN_INTERESTS, type Interest } from '@/features/profile/interests';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [selected, setSelected] = useState<Interest[]>([]);

  function toggleInterest(interest: Interest) {
    setSelected((current) => {
      if (current.includes(interest)) {
        return current.filter((item) => item !== interest);
      }

      if (current.length >= MAX_INTERESTS) {
        Alert.alert('Límite alcanzado', `Puedes seleccionar máximo ${MAX_INTERESTS} intereses.`);
        return current;
      }

      return [...current, interest];
    });
  }

  function saveProfile() {
    if (name.trim().length < 2) {
      Alert.alert('Nombre requerido', 'Escribe tu nombre para continuar.');
      return;
    }

    if (selected.length < MIN_INTERESTS) {
      Alert.alert('Selecciona más intereses', `Elige al menos ${MIN_INTERESTS} intereses.`);
      return;
    }

    router.replace('/home');
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>‹ Volver</Text>
      </Pressable>

      <Text style={styles.eyebrow}>TU PERFIL</Text>
      <Text style={styles.title}>Cuéntanos sobre ti.</Text>
      <Text style={styles.subtitle}>
        Tus intereses ayudan a Ping a encontrar mejores conexiones dentro de un evento.
      </Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="¿Cómo te llamas?"
        placeholderTextColor={colors.textMuted}
        style={styles.input}
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.label}>Intereses</Text>
        <Text style={styles.counter}>{selected.length}/{MAX_INTERESTS}</Text>
      </View>

      <View style={styles.interests}>
        {INTERESTS.map((interest) => {
          const active = selected.includes(interest);

          return (
            <Pressable
              key={interest}
              onPress={() => toggleInterest(interest)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {interest}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.hint}>Selecciona entre {MIN_INTERESTS} y {MAX_INTERESTS} intereses.</Text>

      <Pressable style={styles.button} onPress={saveProfile}>
        <Text style={styles.buttonText}>Guardar perfil</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingTop: spacing.xxl, paddingBottom: spacing.xxl },
  back: { color: colors.accent, fontSize: 16, fontWeight: '700' },
  eyebrow: { color: colors.accent, fontSize: 12, fontWeight: '900', letterSpacing: 2, marginTop: spacing.xxl },
  title: { color: colors.text, fontSize: 32, lineHeight: 38, fontWeight: '800', marginTop: spacing.sm },
  subtitle: { color: colors.textMuted, fontSize: 15, lineHeight: 23, marginTop: spacing.sm },
  label: { color: colors.text, fontSize: 14, fontWeight: '700' },
  input: {
    minHeight: 54, backgroundColor: colors.surface, borderWidth: 1,
    borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: spacing.md,
    color: colors.text, fontSize: 16, marginTop: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginTop: spacing.xl,
  },
  counter: { color: colors.primaryLight, fontSize: 13, fontWeight: '800' },
  interests: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  chip: {
    borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface,
    borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 12,
  },
  chipActive: { borderColor: colors.accent, backgroundColor: colors.primary },
  chipText: { color: colors.textMuted, fontSize: 14, fontWeight: '700' },
  chipTextActive: { color: colors.text, fontWeight: '800' },
  hint: { color: colors.textMuted, fontSize: 12, marginTop: spacing.md },
  button: {
    minHeight: 56, borderRadius: radius.md, backgroundColor: colors.accent,
    justifyContent: 'center', alignItems: 'center', marginTop: spacing.xl,
  },
  buttonText: { color: colors.background, fontSize: 17, fontWeight: '800' },
});
