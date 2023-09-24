/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // basically to run the tailwind first install it then use command npx tailwindcss init then config file would be created then inside it neeche waali line likhni hoti hai 
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
    },
  },
  // when you copy compnent from the tailwind website there in the code they say that this changes should be done to your config file which is below line ,you have to install it as well
  plugins: [require('@tailwindcss/aspect-ratio'),require('@tailwindcss/forms'),
],
}

