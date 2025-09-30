/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Look in the 'pages' directory for Next.js (if you're using the Pages Router)
    './pages/**/*.{js,ts,jsx,tsx,mdx}', 
    
    // Look in the 'app' directory for Next.js (if you're using the App Router)
    './app/**/*.{js,ts,jsx,tsx,mdx}', 
    
    // Look in the 'components' directory for reusable components
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    
    // Include the path for your previous plugin setup
    // This is often where you keep the tailwind.config.js
    // For the context of your previous question, you might need this:
    './src/**/*.{js,ts,jsx,tsx,mdx}', 
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

