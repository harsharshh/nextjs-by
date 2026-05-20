let tailwindPostcss
try {
  tailwindPostcss = require('@tailwindcss/postcss')
  if (tailwindPostcss && tailwindPostcss.default) tailwindPostcss = tailwindPostcss.default
} catch (e) {
  // Fallback to classic `tailwindcss` if new package isn't installed
  // eslint-disable-next-line no-console
  console.warn('[postcss] @tailwindcss/postcss not found — falling back to tailwindcss package')
  tailwindPostcss = require('tailwindcss')
  if (tailwindPostcss && tailwindPostcss.default) tailwindPostcss = tailwindPostcss.default
}

const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    tailwindPostcss(),
    autoprefixer(),
  ],
}
