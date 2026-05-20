import { createRequire } from 'module'
import autoprefixer from 'autoprefixer'

const require = createRequire(import.meta.url)

let tailwindPlugin
try {
  // Prefer the new PostCSS plugin package
  tailwindPlugin = require('@tailwindcss/postcss')
  if (tailwindPlugin && tailwindPlugin.default) tailwindPlugin = tailwindPlugin.default
} catch (e) {
  // Fallback to classic `tailwindcss` package if the new plugin isn't installed
  // This avoids install-time failures and prints a helpful warning.
  // Install `@tailwindcss/postcss` in your project to silence this warning.
  // eslint-disable-next-line no-console
  console.warn('[postcss] @tailwindcss/postcss not found — falling back to tailwindcss package')
  tailwindPlugin = require('tailwindcss')
  if (tailwindPlugin && tailwindPlugin.default) tailwindPlugin = tailwindPlugin.default
}

const config = {
  plugins: [
    tailwindPlugin(),
    autoprefixer(),
  ],
}

export default config
