export const GA4_CONFIG = {
  measurementId: import.meta.env.VITE_GA4_MEASUREMENT_ID || '',
  isEnabled: !!import.meta.env.VITE_GA4_MEASUREMENT_ID,
}