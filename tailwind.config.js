/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'move-up-down': {
          '0%, 100%': {
            transform: 'translateY(0)', // Start and end position (at the top)
          },
          '50%': {
            transform: 'translateY(20px)', // Move down by 20px at the halfway point
          },
        },
      },
      animation: {
        'move-up-down': 'move-up-down 2s ease-in-out infinite', // Apply animation
      },
    },
  },
  plugins: [],
}

