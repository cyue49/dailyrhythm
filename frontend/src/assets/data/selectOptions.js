const inBetweenColor = '#858585'
const lightColor = '#dbdbdb'
const darkColor = '#636363'

// styles for select
export const selectStyles = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        borderColor: state.isDisabled ? inBetweenColor : darkColor,
        borderRadius: '25px',
        backgroundColor: lightColor
    }),
    option: (baseStyles, { data, isDisabled, isFocused, isSelected }) => ({
        ...baseStyles,
        backgroundColor: isFocused ? inBetweenColor : 'white',
        color: isFocused ? lightColor : darkColor
    })
}

// app theme options
export const themeOptions = [
    { value: 'default', label: 'Default' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' }
]

// time day start options
export const timeOptions = [
    { value: '00:00', label: '00:00' },
    { value: '01:00', label: '01:00' },
    { value: '02:00', label: '02:00' },
    { value: '03:00', label: '03:00' },
    { value: '04:00', label: '04:00' },
    { value: '05:00', label: '05:00' },
    { value: '06:00', label: '06:00' },
    { value: '07:00', label: '07:00' },
    { value: '08:00', label: '08:00' },
    { value: '09:00', label: '09:00' },
    { value: '10:00', label: '10:00' },
    { value: '11:00', label: '11:00' },
    { value: '12:00', label: '12:00' },
]

// habit frequency type options
export const frequencyOptions = [
    { value: 'day', label: 'day' },
    { value: 'week', label: 'week' },
    { value: 'month', label: 'month' }
]