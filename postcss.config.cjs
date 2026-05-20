const tailwindPostcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    tailwindPostcss(),
    autoprefixer(),
  ],
}
