/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                appGreen: 'var(--appGreen)',
                appBlack: 'var(--appBlack)',
                appWhite: 'var(--appWhite)',
                appRed: 'var(--appRed)',
                appGray: {
                    1: 'var(--appGray-1)',
                    2: 'var(--appGray-2)',
                    3: 'var(--appGray-3)'
                }
            }
        },
        fontFamily: {
            'sans': 'Helvetica, Arial, sans-serif'
        },
    },
    plugins: [],
}

