/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                appGreen: 'rgba(var(--appGreen))',
                appBlack: 'rgba(var(--appBlack))',
                appWhite: 'rgba(var(--appWhite))',
                appRed: 'rgba(var(--appRed))',
                appGray: {
                    1: 'rgba(var(--appGray-1))',
                    2: 'rgba(var(--appGray-2))',
                    3: 'rgba(var(--appGray-3))'
                }
            }
        },
        fontFamily: {
            'sans': 'Helvetica, Arial, sans-serif'
        },
    },
    plugins: [],
}

