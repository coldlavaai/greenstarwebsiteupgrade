import { client } from './sanity'

export interface ThemeSettings {
  brandColors?: {
    primary?: { hex: string }
    primaryLight?: { hex: string }
    primaryDark?: { hex: string }
    secondary?: { hex: string }
    accent?: { hex: string }
  }
  backgroundColors?: {
    body?: { hex: string }
    surface?: { hex: string }
    surfaceLight?: { hex: string }
    surfaceDark?: { hex: string }
  }
  textColors?: {
    primary?: { hex: string }
    secondary?: { hex: string }
    light?: { hex: string }
    dark?: { hex: string }
  }
  utilityColors?: {
    success?: { hex: string }
    warning?: { hex: string }
    error?: { hex: string }
    info?: { hex: string }
  }
  fontFamilies?: {
    heading?: string
    body?: string
    mono?: string
  }
  fontSizes?: {
    base?: number
    scale?: number
  }
  fontWeights?: {
    light?: number
    normal?: number
    medium?: number
    semibold?: number
    bold?: number
  }
  lineHeights?: {
    tight?: number
    normal?: number
    relaxed?: number
    loose?: number
  }
  spacingUnit?: number
  spacingScale?: number[]
  borderRadius?: {
    small?: string
    medium?: string
    large?: string
    xl?: string
    full?: string
  }
  shadows?: {
    small?: string
    medium?: string
    large?: string
    xl?: string
    xxl?: string
  }
  animations?: {
    durationFast?: number
    durationNormal?: number
    durationSlow?: number
    easing?: string
  }
  containerMaxWidth?: string
  breakpoints?: {
    sm?: string
    md?: string
    lg?: string
    xl?: string
    xxl?: string
  }
}

/**
 * Fetch theme settings from Sanity
 */
export async function getThemeSettings(): Promise<ThemeSettings | null> {
  try {
    const theme = await client.fetch<ThemeSettings>(
      `*[_type == "themeSettings"][0]{
        brandColors,
        backgroundColors,
        textColors,
        utilityColors,
        fontFamilies,
        fontSizes,
        fontWeights,
        lineHeights,
        spacingUnit,
        spacingScale,
        borderRadius,
        shadows,
        animations,
        containerMaxWidth,
        breakpoints
      }`,
      {},
      {
        next: { revalidate: 60 }, // Cache for 60 seconds
      }
    )
    return theme
  } catch (error) {
    console.error('Error fetching theme settings:', error)
    return null
  }
}

/**
 * Generate CSS variables from theme settings
 */
export function generateCSSVariables(theme: ThemeSettings | null): string {
  if (!theme) return ''

  const cssVars: string[] = [':root {']

  // Brand Colors
  if (theme.brandColors?.primary?.hex) {
    cssVars.push(`  --color-primary: ${theme.brandColors.primary.hex};`)
  }
  if (theme.brandColors?.primaryLight?.hex) {
    cssVars.push(`  --color-primary-light: ${theme.brandColors.primaryLight.hex};`)
  }
  if (theme.brandColors?.primaryDark?.hex) {
    cssVars.push(`  --color-primary-dark: ${theme.brandColors.primaryDark.hex};`)
  }
  if (theme.brandColors?.secondary?.hex) {
    cssVars.push(`  --color-secondary: ${theme.brandColors.secondary.hex};`)
  }
  if (theme.brandColors?.accent?.hex) {
    cssVars.push(`  --color-accent: ${theme.brandColors.accent.hex};`)
  }

  // Background Colors
  if (theme.backgroundColors?.body?.hex) {
    cssVars.push(`  --color-bg-body: ${theme.backgroundColors.body.hex};`)
  }
  if (theme.backgroundColors?.surface?.hex) {
    cssVars.push(`  --color-bg-surface: ${theme.backgroundColors.surface.hex};`)
  }
  if (theme.backgroundColors?.surfaceLight?.hex) {
    cssVars.push(`  --color-bg-surface-light: ${theme.backgroundColors.surfaceLight.hex};`)
  }
  if (theme.backgroundColors?.surfaceDark?.hex) {
    cssVars.push(`  --color-bg-surface-dark: ${theme.backgroundColors.surfaceDark.hex};`)
  }

  // Text Colors
  if (theme.textColors?.primary?.hex) {
    cssVars.push(`  --color-text-primary: ${theme.textColors.primary.hex};`)
  }
  if (theme.textColors?.secondary?.hex) {
    cssVars.push(`  --color-text-secondary: ${theme.textColors.secondary.hex};`)
  }
  if (theme.textColors?.light?.hex) {
    cssVars.push(`  --color-text-light: ${theme.textColors.light.hex};`)
  }
  if (theme.textColors?.dark?.hex) {
    cssVars.push(`  --color-text-dark: ${theme.textColors.dark.hex};`)
  }

  // Utility Colors
  if (theme.utilityColors?.success?.hex) {
    cssVars.push(`  --color-success: ${theme.utilityColors.success.hex};`)
  }
  if (theme.utilityColors?.warning?.hex) {
    cssVars.push(`  --color-warning: ${theme.utilityColors.warning.hex};`)
  }
  if (theme.utilityColors?.error?.hex) {
    cssVars.push(`  --color-error: ${theme.utilityColors.error.hex};`)
  }
  if (theme.utilityColors?.info?.hex) {
    cssVars.push(`  --color-info: ${theme.utilityColors.info.hex};`)
  }

  // Typography
  if (theme.fontFamilies?.heading) {
    cssVars.push(`  --font-heading: ${theme.fontFamilies.heading};`)
  }
  if (theme.fontFamilies?.body) {
    cssVars.push(`  --font-body: ${theme.fontFamilies.body};`)
  }
  if (theme.fontFamilies?.mono) {
    cssVars.push(`  --font-mono: ${theme.fontFamilies.mono};`)
  }

  if (theme.fontSizes?.base) {
    cssVars.push(`  --font-size-base: ${theme.fontSizes.base}px;`)
  }
  if (theme.fontSizes?.scale) {
    const base = theme.fontSizes.base || 16
    const scale = theme.fontSizes.scale
    cssVars.push(`  --font-size-xs: ${base / scale / scale}px;`)
    cssVars.push(`  --font-size-sm: ${base / scale}px;`)
    cssVars.push(`  --font-size-md: ${base}px;`)
    cssVars.push(`  --font-size-lg: ${base * scale}px;`)
    cssVars.push(`  --font-size-xl: ${base * scale * scale}px;`)
    cssVars.push(`  --font-size-2xl: ${base * scale * scale * scale}px;`)
    cssVars.push(`  --font-size-3xl: ${base * scale * scale * scale * scale}px;`)
  }

  // Font Weights
  if (theme.fontWeights?.light) {
    cssVars.push(`  --font-weight-light: ${theme.fontWeights.light};`)
  }
  if (theme.fontWeights?.normal) {
    cssVars.push(`  --font-weight-normal: ${theme.fontWeights.normal};`)
  }
  if (theme.fontWeights?.medium) {
    cssVars.push(`  --font-weight-medium: ${theme.fontWeights.medium};`)
  }
  if (theme.fontWeights?.semibold) {
    cssVars.push(`  --font-weight-semibold: ${theme.fontWeights.semibold};`)
  }
  if (theme.fontWeights?.bold) {
    cssVars.push(`  --font-weight-bold: ${theme.fontWeights.bold};`)
  }

  // Line Heights
  if (theme.lineHeights?.tight) {
    cssVars.push(`  --line-height-tight: ${theme.lineHeights.tight};`)
  }
  if (theme.lineHeights?.normal) {
    cssVars.push(`  --line-height-normal: ${theme.lineHeights.normal};`)
  }
  if (theme.lineHeights?.relaxed) {
    cssVars.push(`  --line-height-relaxed: ${theme.lineHeights.relaxed};`)
  }
  if (theme.lineHeights?.loose) {
    cssVars.push(`  --line-height-loose: ${theme.lineHeights.loose};`)
  }

  // Spacing
  if (theme.spacingUnit) {
    cssVars.push(`  --spacing-unit: ${theme.spacingUnit}px;`)

    // Generate spacing scale
    if (theme.spacingScale) {
      theme.spacingScale.forEach((multiplier, index) => {
        cssVars.push(`  --spacing-${index}: ${theme.spacingUnit! * multiplier}px;`)
      })
    }
  }

  // Border Radius
  if (theme.borderRadius?.small) {
    cssVars.push(`  --radius-sm: ${theme.borderRadius.small};`)
  }
  if (theme.borderRadius?.medium) {
    cssVars.push(`  --radius-md: ${theme.borderRadius.medium};`)
  }
  if (theme.borderRadius?.large) {
    cssVars.push(`  --radius-lg: ${theme.borderRadius.large};`)
  }
  if (theme.borderRadius?.xl) {
    cssVars.push(`  --radius-xl: ${theme.borderRadius.xl};`)
  }
  if (theme.borderRadius?.full) {
    cssVars.push(`  --radius-full: ${theme.borderRadius.full};`)
  }

  // Shadows
  if (theme.shadows?.small) {
    cssVars.push(`  --shadow-sm: ${theme.shadows.small};`)
  }
  if (theme.shadows?.medium) {
    cssVars.push(`  --shadow-md: ${theme.shadows.medium};`)
  }
  if (theme.shadows?.large) {
    cssVars.push(`  --shadow-lg: ${theme.shadows.large};`)
  }
  if (theme.shadows?.xl) {
    cssVars.push(`  --shadow-xl: ${theme.shadows.xl};`)
  }
  if (theme.shadows?.xxl) {
    cssVars.push(`  --shadow-2xl: ${theme.shadows.xxl};`)
  }

  // Animations
  if (theme.animations?.durationFast) {
    cssVars.push(`  --duration-fast: ${theme.animations.durationFast}ms;`)
  }
  if (theme.animations?.durationNormal) {
    cssVars.push(`  --duration-normal: ${theme.animations.durationNormal}ms;`)
  }
  if (theme.animations?.durationSlow) {
    cssVars.push(`  --duration-slow: ${theme.animations.durationSlow}ms;`)
  }
  if (theme.animations?.easing) {
    cssVars.push(`  --easing: ${theme.animations.easing};`)
  }

  // Layout
  if (theme.containerMaxWidth) {
    cssVars.push(`  --container-max-width: ${theme.containerMaxWidth};`)
  }

  // Breakpoints
  if (theme.breakpoints?.sm) {
    cssVars.push(`  --breakpoint-sm: ${theme.breakpoints.sm};`)
  }
  if (theme.breakpoints?.md) {
    cssVars.push(`  --breakpoint-md: ${theme.breakpoints.md};`)
  }
  if (theme.breakpoints?.lg) {
    cssVars.push(`  --breakpoint-lg: ${theme.breakpoints.lg};`)
  }
  if (theme.breakpoints?.xl) {
    cssVars.push(`  --breakpoint-xl: ${theme.breakpoints.xl};`)
  }
  if (theme.breakpoints?.xxl) {
    cssVars.push(`  --breakpoint-2xl: ${theme.breakpoints.xxl};`)
  }

  cssVars.push('}')

  return cssVars.join('\n')
}

/**
 * Generate Tailwind-compatible theme configuration
 */
export function generateTailwindTheme(theme: ThemeSettings | null) {
  if (!theme) return {}

  return {
    colors: {
      primary: {
        DEFAULT: theme.brandColors?.primary?.hex || '#10b981',
        light: theme.brandColors?.primaryLight?.hex || '#34d399',
        dark: theme.brandColors?.primaryDark?.hex || '#059669',
      },
      secondary: theme.brandColors?.secondary?.hex || '#6366f1',
      accent: theme.brandColors?.accent?.hex || '#f59e0b',
      success: theme.utilityColors?.success?.hex || '#10b981',
      warning: theme.utilityColors?.warning?.hex || '#f59e0b',
      error: theme.utilityColors?.error?.hex || '#ef4444',
      info: theme.utilityColors?.info?.hex || '#3b82f6',
    },
    fontFamily: {
      heading: theme.fontFamilies?.heading?.split(',') || ['Inter', 'sans-serif'],
      body: theme.fontFamilies?.body?.split(',') || ['Inter', 'sans-serif'],
      mono: theme.fontFamilies?.mono?.split(',') || ['monospace'],
    },
    borderRadius: {
      sm: theme.borderRadius?.small || '0.25rem',
      DEFAULT: theme.borderRadius?.medium || '0.5rem',
      md: theme.borderRadius?.medium || '0.5rem',
      lg: theme.borderRadius?.large || '1rem',
      xl: theme.borderRadius?.xl || '1.5rem',
      full: theme.borderRadius?.full || '9999px',
    },
    boxShadow: {
      sm: theme.shadows?.small || '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      DEFAULT: theme.shadows?.medium || '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      md: theme.shadows?.medium || '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: theme.shadows?.large || '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      xl: theme.shadows?.xl || '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      '2xl': theme.shadows?.xxl || '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    },
  }
}
