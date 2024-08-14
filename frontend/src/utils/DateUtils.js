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
export const formatDateWeekAgo = (date) => {
    const weekAgoDate = new Date(date)
    weekAgoDate.setDate(weekAgoDate.getDate() - 6)
    return formatDate(weekAgoDate)
}

// returns a string of the date at the start of this month in the format yyyy-mm-dd
export const formatDateMonthStart = (date) => {
    const monthStart = new Date(date)
    monthStart.setDate(1)
    return formatDate(monthStart)
}

// returns an array of Date objects for the current month, including the last few days of last month if the first of this month is not a monday
export const getThisMonthArray = (dayStartTime) => {
    const thisMonth = [] // dates to be displayed

    // date for the first of this month
    const monthStart = new Date(Date.now() - parseInt(dayStartTime) * 60 * 60 * 1000)
    monthStart.setDate(1)

    // if first of month is not a saturday, add the dates from the previous monday from last month
    for (let i = monthStart.getDay(); i > 0; i--) {
        const prevDate = new Date(monthStart)
        prevDate.setDate(prevDate.getDate() - i)
        thisMonth.push(prevDate)
    }

    // this month and year
    const month = monthStart.getMonth()
        
    // push all days of this month
    while(monthStart.getMonth() === month) {
        thisMonth.push(new Date(monthStart))
        monthStart.setDate(monthStart.getDate() + 1)
    }

    return thisMonth
}