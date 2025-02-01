/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DF427B',
        yellowCustom: '#FFDD00',
        blue: {
          DEFAULT: '#3e75a6', // Establece el azul predeterminado
          50: '#e8f1f8',
          100: '#c9e0f0',
          200: '#90bde0',
          300: '#5c98ce',
          400: '#437eb9',
          500: '#3e75a6', // Azul personalizado
          600: '#356290',
          700: '#2b5076',
          800: '#213d5b',
          900: '#192e45',
        },
        pink: {
            DEFAULT: '#DF427B', // Establece el azul predeterminado
            50: '#FDECF1',    // Muy claro
            100: '#FBD9E4',   // Claro
            200: '#F6AEC8',   // Más claro
            300: '#F083AC',   // Suave
            400: '#EA588F',   // Semi suave
            500: '#DF427B',   // Color base
            600: '#C43A6D',   // Un poco más oscuro
            700: '#A3325C',   // Oscuro
            800: '#82294A',   // Muy oscuro
            900: '#621F39',   // Más oscuro
        },
        blueCustom: '#004884',
        redCustom: '#CE1126',
        bluelightCustom: '#070765',
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.custom-label': {
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          fontSize: '1.25rem', // equivalente a text-xl
          fontWeight: 'bold',
          color: '#1e3a8a', // equivalente a text-blue-950
          marginTop: '0.5rem', // equivalente a my-2
          marginBottom: '0.5rem', // equivalente a my-2
          marginLeft: '1.5rem', // equivalente a ml-6
        },
        '.btn-aceptar': {
          display: 'inline-block',
          padding: '0.5rem 1rem',
          fontWeight: 'bold',
          borderRadius: '0.375rem',
          color: '#ffffff',
          backgroundImage: 'linear-gradient(to right, #FFD700 45%, #005BBB 75%, #FF0000 100%)',
          transition: 'background-color 0.3s ease',
          width: '100%',
        },
        '.btn-aceptar:hover': {
          backgroundImage: 'linear-gradient(to right, #FFC700 45%, #004BBB 75%, #E60000 100%)',
        },

        '.gradient-border-button': {
          display: 'inline-block',
          padding: '0.5rem 1rem',
          height: '2.5rem',
          backgroundColor: 'white',
          borderRadius: '0.375rem',
          position: 'relative',
          overflow: 'hidden',
          width: 'auto',
        },
        '.gradient-border-button::before': {
          content: '""',
          position: 'absolute',
          inset: '-2px',
          background: 'linear-gradient(90deg, #FFDD00, #0038A8, #CE1126)',
          zIndex: '-1',
          borderRadius: 'inherit',
        },
        '.gradient-border-button:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        },
      });
    },

  ],
}