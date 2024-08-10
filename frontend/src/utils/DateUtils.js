// dates related arrays
export const weekDaysShort = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const weekDaysLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const monthsLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// given a date, returns a string of the date in the format yyyy-mm-dd
export const formatDate = (date) => {
    const offset = date.getTimezoneOffset()
    return new Date(date.getTime() - (offset * 60 * 1000)).toISOString().split('T')[0]
}

// returns a string of the date a week ago in the format yyyy-mm-dd
export const formatDateWeekAgo = () => {
    const weekAgoDate = new Date() 
    weekAgoDate.setDate(weekAgoDate.getDate() - 7)
    return formatDate(weekAgoDate)
}

export const formatDateMonthStart = () => {
    const monthStart = new Date()
    monthStart.setDate(1)
    return formatDate(monthStart)
}