import { baseURL } from './baseURL'

// get all categories for a user
export const getCategories = () => {
    return fetch(`${baseURL}/api/categories/all`, { credentials: 'include' })
        .then((res) => res.json())
        .then((data) => {
            return data
        })
        .catch((e) => {
            console.log(e.message)
        })
}

// add a category for a user
export const addCategory = (data) => {
    return fetch(`${baseURL}/api/categories`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: data
        })
        .then((res) => res.json())
        .then((data) => {
            return data
        })
        .catch((e) => {
            console.log(e.message)
        })
}

// update a category name
export const renameCategory = (category_id, data) => {
    return fetch(`${baseURL}/api/categories/edit/${category_id}`, {
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

// delete a category
export const deleteCategory = (category_id) => {
    return fetch(`${baseURL}/api/categories/delete/${category_id}`,
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