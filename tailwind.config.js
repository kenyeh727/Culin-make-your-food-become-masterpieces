/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                chef: {
                    50: '#f2f7f1',
                    100: '#e1efe0',
                    200: '#c5e0c3',
                    300: '#9bc698',
                    400: '#6ea56a',
                    500: '#4d8849',
                    600: '#2d5a27',
                    700: '#2d5a27', // Primary from original CSS
                    800: '#254422',
                    900: '#1f381d',
                    950: '#0e1f0d',
                },
                stone: {
                    50: '#fcfaf7', // --bg from original CSS
                }
            },
            fontFamily: {
                serif: ['"Noto Serif TC"', 'serif'],
                display: ['"Playfair Display"', 'serif'],
                sans: ['system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
