/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primaryColor: 'rgba(var(--primaryColor))',
                primaryTextColor: 'rgba(var(--primaryTextColor))',
                secondaryTextColor: 'rgba(var(--secondaryTextColor))',
                webBgColor: 'rgba(var(--webBgColor))',
                mainBgColor: 'rgba(var(--mainBgColor))',
                subBgColor: 'rgba(var(--subBgColor))',
                mainCardColor: 'rgba(var(--mainCardColor))',
                subCardColor: 'rgba(var(--subCardColor))',
                confirmColor: 'rgba(var(--confirmColor))',
                neutralColor: 'rgba(var(--neutralColor))',
                importantColor: 'rgba(var(--importantColor))',
                whiteColor: 'rgba(var(--whiteColor))',
                variantColor: 'rgba(var(--variantColor))'
            }
        },
        fontFamily: {
            'sans': 'Helvetica, Arial, sans-serif'
        },
    },
    plugins: [],
}

