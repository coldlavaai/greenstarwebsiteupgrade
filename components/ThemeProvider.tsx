import { getThemeSettings, generateCSSVariables } from '@/lib/theme'

export async function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = await getThemeSettings()
  const cssVariables = generateCSSVariables(theme)

  return (
    <>
      {cssVariables && (
        <style
          dangerouslySetInnerHTML={{
            __html: cssVariables,
          }}
        />
      )}
      {children}
    </>
  )
}
