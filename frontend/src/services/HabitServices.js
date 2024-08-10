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