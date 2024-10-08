import { baseURL } from './baseURL'

// get all habits of a category
export const getHabitsForCategory = (category_id) => {
    return fetch(`${baseURL}/api/custom_habits/active/${category_id}`, { credentials: 'include' })
        .then((res) => res.json())
        .then((data) => {
            return data;
        })
        .catch((e) => {
            console.log(e.message)
        })
}

// get all archived habits
export const getArchivedHabits = () => {
    return fetch(`${baseURL}/api/custom_habits/archived`, { credentials: 'include' })
        .then((res) => res.json())
        .then((data) => {
            return data;
        })
        .catch((e) => {
            console.log(e.message)
        })
}
// archive / unarchive a habit
export const updateHabitArchive = (habit_id, data) => {
    return fetch(`${baseURL}/api/custom_habits/edit/active/${habit_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: data
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

// delete a habit
export const deleteHabit = (habit_id) => {
    return fetch(`${baseURL}/api/custom_habits/delete/${habit_id}`,
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

// create a new habit
export const addHabit = (data) => {
    return fetch(`${baseURL}/api/custom_habits`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: data
        })
        .then((res) => res.json())
        .then((result) => {
            return result
        })
        .catch((e) => {
            console.log(e.message)
        })
}

// update a habit
export const updateHabit = (habit_id, data) => {
    return fetch(`${baseURL}/api/custom_habits/edit/${habit_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: data
    })
        .then((res) => res.json())
        .then((result) => {
            return result
        })
        .catch((e) => {
            console.log(e.message)
        })
}