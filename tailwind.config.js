module.exports = {
  content: [
    './index.html',
    './paginas/**/*.html',
    './scripts/**/*.js',
    './styles/**/*.css',
  ],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#247ba0', // Azul principal
        'primary-light': '#1b98e0', // Azul claro
        'primary-dark': '#13293d', // Azul escuro
        secondary: '#006494', // Azul secundário
        accent: '#13293d', // Cor de destaque
        success: '#10b981', // Verde sucesso
        error: '#ef4444', // Vermelho erro
        dark: '#13293d', // Fundo escuro
        light: '#E8F1F2', // Fundo claro
        border: '#e2e8f0', // Cor de borda
        'text-primary': '#13293d',
        'text-secondary': '#006494',
        'text-light': '#247ba0',
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '3rem',
      },
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'full': '9999px',
      },
      boxShadow: {
        'tech': '0 4px 20px rgba(0, 0, 0, 0.03)',
        'tech-lg': '0 8px 32px rgba(36, 123, 160, 0.10)',
      },
    },
  },
  plugins: [],
} 