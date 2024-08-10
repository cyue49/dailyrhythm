// get all habits of a category
export const getHabitsForCategory = (category_id) => {
    return fetch(`http://127.0.0.1:5000/api/custom_habits/active/${category_id}`, { credentials: 'include' })
        .then((res) => res.json())
        .then((data) => {
            return data;
        })
        .catch((e) => {
            console.log(e.message)
        })
}

// archive a habit
export const archiveHabit = (id, data) => {
    return fetch(` http://127.0.0.1:5000/api/custom_habits/edit/active/${id}`, {
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