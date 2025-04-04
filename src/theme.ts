import { CSSProperties } from 'react';

// 🎨 Color Palette: Soft, dreamy cosmic theme
export const colors = {
  background: '#0a0a1a',          // Deep night sky
  cream: '#FAF6F0',               // Soft creamy white
  peach: '#FDE1D3',               // Warm peach
  peachHover: '#fbd2be',          // Peach on hover
  cosmicBlue: '#1E293B',          // Dark blue book
  cosmicDark: '#0F172A',          // Deeper cosmic tone
  whiteSoft: 'rgba(255,255,255,0.2)',          // Faint white glow
  whitePlaceholder: 'rgba(255,250,227,0.6)',   // Placeholder text
};

// 🖋️ Font Styles
export const fonts = {
  heading: `'Playfair Display', serif`,
  body: `'Lora', serif`,
};

// 🌿 Radii for Rounded Corners
export const radii = {
  sm: '4px',
  md: '6px',
  lg: '8px',
};

// 🌌 Shadows for Glow Effects
export const shadows = {
  softGlow: '0 0 15px rgba(255, 255, 255, 0.15)',
};

// 🎞️ Keyframe Animations (used via className or inline)
export const animations = {
  floatUp: {
    animationName: 'float-up',
    animationDuration: '1.5s',
    animationTimingFunction: 'ease-out',
    animationFillMode: 'forwards',
  },
  starAppear: {
    animationName: 'star-appear',
    animationDuration: '1s',
    animationTimingFunction: 'ease-out',
    animationFillMode: 'forwards',
  },
};

// 🧵 Base Component Styles

export const baseButtonStyle = {
  backgroundColor: colors.peach,
  color: colors.background,
  padding: '0.75rem 1rem',
  borderRadius: radii.lg,
  fontFamily: fonts.body,
  fontWeight: 500,
  border: 'none',
  transition: 'background 0.2s',
  cursor: 'pointer',
};

export const baseTextareaStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  border: `1px solid ${colors.whiteSoft}`,
  color: colors.cream,
  padding: '0.75rem',
  borderRadius: radii.lg,
  resize: 'none' as const,
  width: '100%',
};

export const layoutStyle = {
  backgroundColor: colors.background,
  color: colors.cream,
  fontFamily: fonts.body,
  minHeight: '100vh',
  margin: 0,
  padding: 0,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
};

// 📖 Journal Book Modal / UI Styles
export const journalBookStyles = {
  overlay: {
    position: 'fixed' as const,
    inset: 0,
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.5s',
  },

  backdrop: {
    position: 'absolute' as const,
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },

  container: {
    perspective: '2000px',
    position: 'relative' as const,
    zIndex: 10,
  },

  book: {
    position: 'relative' as const,
    width: '460px',
    height: '600px',
    backgroundColor: colors.cosmicBlue,
    borderRadius: radii.lg,
    overflow: 'hidden',
    boxShadow: shadows.softGlow,
    // transition: 'transform 0.5s ease-in-out',
    // transformOrigin: 'center center',
  },

  header: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    background: `linear-gradient(to right, ${colors.peach}, ${colors.cream})`,
    padding: '1rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },

  title: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: colors.cosmicDark,
    fontFamily: fonts.heading,
  },

  content: {
    height: '100%',
    background: `linear-gradient(to right, ${colors.cream}E6, ${colors.peach}E6)`,
    borderRadius: `0 ${radii.lg} ${radii.lg} 0`,
    padding: '1.5rem',
    color: colors.cosmicDark,
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
  },

  tabContainer: {
    display: 'flex',
    backgroundColor: `${colors.cosmicDark}20`,
    padding: '0.25rem',
    borderRadius: radii.md,
  },

  chart: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: '1rem',
    borderRadius: radii.lg,
    marginBottom: '1rem',
    height: '8rem',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
    width: '100%',
    flexShrink: 0
  },

  quote: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: '1rem',
    borderRadius: radii.lg,
    marginBottom: '1rem',
    fontStyle: 'italic' as const,
    borderLeft: `4px solid ${colors.cosmicDark}33`,
  },

  navigation: {
    position: 'sticky',
    bottom: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '1rem',
    borderTop: `1px solid ${colors.cosmicDark}20`,
    padding: '1rem 0',
    zIndex: 1,
  } as CSSProperties,

  pageCount: {
    fontSize: '0.875rem',
    color: `${colors.cosmicDark}B3`,
  },

  actionButton: {
    ...baseButtonStyle,
    backgroundColor: colors.cosmicDark,
    color: colors.cream,
    flex: 1,
  },

  actionButtonsContainer: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: 'auto',
    padding: '1rem',
    borderTop: `1px solid ${colors.cosmicDark}20`,
    backgroundColor: colors.cream,
  },

  iconButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem',
    width: '2rem',
    height: '2rem',
    borderRadius: radii.md,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
    backgroundColor: colors.whiteSoft,
    color: colors.cosmicDark,
    backdropFilter: 'blur(2px)',

  
  },
};
