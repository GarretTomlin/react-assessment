module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
        
          "background": "#E5E5E5",
        },
        
   
      },
    ],
  },
  plugins: [require("daisyui")],
 
  
}