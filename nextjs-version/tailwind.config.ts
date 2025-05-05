import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blue: {
          400: '#60a5fa', // Dark mode primary blue
          500: '#3b82f6', // Light mode primary blue
        },
        green: {
          500: '#28a745', // Human-Centered, Highly Resilient
        },
        yellow: {
          500: '#f4d03f', // Hybrid Potential, Moderately Resilient
        },
        orange: {
          500: '#e67e22', // Automation-Prone, Vulnerable
        },
        red: {
          500: '#e74c3c', // Automation-Ready, Highly Vulnerable
        }
      }
    },
  },
  plugins: [],
};

export default config;