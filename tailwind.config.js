/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FAF7F2',
        'paper-warm': '#EFECE4',
        'paper-bright': '#FFFFFF',
        ink: '#11100F',
        'ink-secondary': '#4A4641',
        'ink-ghost': '#9C968E',
        cobalt: '#2563EB',
        'cobalt-dark': '#1D4ED8',
        'cobalt-light': '#60A5FA',
        coral: '#EF4444',
        lime: '#16A34A',
      },
      fontFamily: {
        editorial: ['var(--font-editorial)', 'Fraunces', 'Georgia', 'serif'],
        machine: ['var(--font-machine)', 'IBM Plex Mono', 'monospace'],
        sans: ['var(--font-sans)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
