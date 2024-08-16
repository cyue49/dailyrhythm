import { baseURL } from './baseURL'

// get user info
export const getInfo = () => {
    return fetch(`${baseURL}/api/users/me`, { credentials: 'include' })
        .then((res) => res.json())
        .then((data) => {
            return data
        })
        .catch((e) => {
            console.log(e.message)
        })
}

// update general user info
export const updateInfo = (data) => {
    return fetch(`${baseURL}/api/users/me/edit/general`, {
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

// update is_verified status
export const updateVerified = (data) => {
    return fetch(`${baseURL}/api/users/me/edit/verified`, {
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

// update user password
export const updatePassword = (data) => {
    return fetch(`${baseURL}/api/users/me/edit/password`, {
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

// get user settings
export const getSettings = () => {
    return fetch(`${baseURL}/api/users/me/settings`, { credentials: 'include' })
        .then((res) => res.json())
        .then((data) => {
            return data
        })
        .catch((e) => {
            console.log(e.message)
        })
}

// update user settings
export const updateSettings = (data) => {
    return fetch(`${baseURL}/api/users/me/edit/settings`, {
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