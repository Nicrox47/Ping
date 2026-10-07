import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';

type BrandLogoProps = { compact?: boolean };

export function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.signal, compact && styles.signalCompact]}>
        <View style={styles.center} />
      </View>
      <Text style={[styles.wordmark, compact && styles.wordmarkCompact]}>
        Ping<Text style={styles.exclamation}>!</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  signal: {
    width: 76, height: 58, borderRadius: 40, borderWidth: 7,
    borderColor: colors.accent, justifyContent: 'center',
    alignItems: 'center', position: 'relative',
  },
  signalCompact: { transform: [{ scale: 0.72 }], marginBottom: -8 },
  center: { width: 25, height: 25, borderRadius: 20, backgroundColor: colors.accent },
  wordmark: {
    marginTop: 10, color: colors.primaryLight, fontSize: 54,
    fontWeight: '900', letterSpacing: -2,
  },
  wordmarkCompact: { fontSize: 34 },
  exclamation: { color: colors.accent },
});
