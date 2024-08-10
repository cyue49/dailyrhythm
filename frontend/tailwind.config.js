/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                appGreen: '#528E6C',
                appBlack: '#353535',
                appWhite: '#F3F3F3',
                appRed: '#AE5A5A',
                appGray: {
                    1: '#e6e6e6',
                    2: '#B9B9B9',
                    3: '#858585'
                }
            }
        },
        fontFamily: {
            'sans': 'Helvetica, Arial, sans-serif'
        },
    },
    plugins: [],
}

