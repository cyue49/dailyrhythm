/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                appPrimaryColor: 'rgba(var(--appPrimaryColor))',
                appPrimaryDark: 'rgba(var(--appPrimaryDark))',
                appPrimaryLight: 'rgba(var(--appPrimaryLight))',
                appImportant: 'rgba(var(--appImportant))',
                appVariant: {
                    1: 'rgba(var(--appVariant-1))',
                    2: 'rgba(var(--appVariant-2))',
                    3: 'rgba(var(--appVariant-3))'
                }
            }
        },
        fontFamily: {
            'sans': 'Helvetica, Arial, sans-serif'
        },
    },
    plugins: [],
}

