import { useWindowDimensions } from 'react-native';

export function useResponsiveLayout() {
  const { width } = useWindowDimensions();

  return {
    width,
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
    contentMaxWidth: width >= 1024 ? 1180 : width >= 768 ? 900 : width - 32,
    horizontalPadding: width >= 1024 ? 32 : width >= 768 ? 24 : 16,
  };
}
