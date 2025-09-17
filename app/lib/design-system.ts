// Minimal design tokens for typography used by Title
export const typography = {
  // Large page title
  title: "text-6xl font-black title",
  // Section titles
  sectionTitleLg: "text-4xl font-black title",
  sectionTitleSm: "text-3xl font-bold title",
  // Small title
  small: "text-base font-bold title",
  // Body text
  bodyLg: "font-bold text-xl md:text-2xl",
  bodyMd: "text-base md:text-lg",
  bodySm: "text-sm",
} as const

export const spacing = {
  container: 'container my-6 mx-auto px-6 lg:px-8',
  section: 'py-4 lg:py-8',
} as const

export const colors = {
  textDefault: 'text-black dark:text-white',
  bgDefault: 'bg-white dark:bg-black',
  bgInverse: 'bg-black dark:bg-white',
} as const

export const borders = {
  thick: 'border-4 border-black dark:border-white',
  rounded: 'rounded',
  roundedLg: 'rounded-lg',
} as const

export const links = {
  inline: 'underline text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400 transition-colors',
  block: 'title text-xl md:text-3xl underline block',
} as const

export const divider = {
  base: 'w-full h-1 bg-black dark:bg-white',
} as const
