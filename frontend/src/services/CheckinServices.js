// get checkin count for a habit for a day
export const getDayCount = (habit_id, date) => {
    return fetch(`http://127.0.0.1:5000/api/custom_habits_checkins/habit/${habit_id}/count/day/${date}`, { credentials: 'include' })
        .then((res) => res.json())
        .then((data) => {
            return parseInt(data.count)
        })
        .catch((e) => {
            console.log(e.message);
        })
}

// get checkin count for a habit between two dates
export const getCountBetween = (habit_id, startDate, endDate) => {
    return fetch(`http://127.0.0.1:5000/api/custom_habits_checkins/habit/${habit_id}/count/from/${startDate}/to/${endDate}`, { credentials: 'include' })
        .then((res) => res.json())
        .then((data) => {
            return parseInt(data.count)
        })
        .catch((e) => {
            console.log(e.message);
        })
}

// get total checkin counts for a habit
export const getTotalCount = (habit_id) => {
    return fetch(`http://127.0.0.1:5000/api/custom_habits_checkins/habit/${habit_id}/count`, { credentials: 'include' })
        .then((res) => res.json())
        .then((data) => {
            return parseInt(data.count)
        })
        .catch((e) => {
            console.log(e.message);
        })
}

// make a post request to create a new checkin 
export const incrementCheckin = (data) => {
    return fetch('http://127.0.0.1:5000/api/custom_habits_checkins/',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: data
        }
    ).then((res) => {
        if (res.status === 200 && res.ok) {
            return 1
        } else if (res.status === 400) {
            return 0
        }
    }).catch((e) => {
        console.log(e.message)
    })
} 

// make a post request to delete the latest checkin for a day
export const removeCheckin = (habit_id, date) => {
    return fetch(` http://127.0.0.1:5000/api/custom_habits_checkins/delete/habit/${habit_id}/date/${date}`, 
        { 
            method: 'DELETE',
            credentials: 'include' 
        })
        .then((res) => {
            if (res.status === 200 && res.ok) {
                return 1
            } else {
                return 0
            }
        })
        .catch((e) => {
            console.log(e.message)
        })
}