module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {animation: {
      'move-left-right': 'moveLeftRight 2s ease-in-out infinite',
    },
    keyframes: {
      moveLeftRight: {
        '0%': { transform: 'translateX(0)' },
        '50%': { transform: 'translateX(10px)' },
        '100%': { transform: 'translateX(0)' },
      },
    },},
  },
  plugins: [],
}