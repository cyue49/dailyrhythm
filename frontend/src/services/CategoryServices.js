// get all categories for a user
export const getCategories = () => {
    return fetch(' http://127.0.0.1:5000/api/categories/all', { credentials: 'include' })
        .then((res) => res.json())
        .then((data) => {
            return data
        })
        .catch((e) => {
            console.log(e.message)
        })
}