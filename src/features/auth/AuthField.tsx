import { Text, TextInput, StyleSheet } from 'react-native';
import { colors, radius, spacing } from '@/constants/theme';

type Props = {
  label: string;
  value: string;
  placeholder: string;
  secure?: boolean;
  keyboardType?: 'default' | 'email-address';
  onChangeText: (value: string) => void;
};

export function AuthField({ label, value, placeholder, secure, keyboardType = 'default', onChangeText }: Props) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        secureTextEntry={secure}
        keyboardType={keyboardType}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
        style={styles.input}
      />
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  input: {
    minHeight: 54,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    color: colors.text,
    fontSize: 16,
  },
});
