// get user info
export const getInfo = () => {
    return fetch('http://127.0.0.1:5000/api/users/me', { credentials: 'include' })
        .then((res) => res.json())
        .then((data) => {
            return data
        })
        .catch((e) => {
            console.log(e.message)
        })
}

// update user info
export const updateInfo = (data) => {
    return fetch(' http://127.0.0.1:5000/api/users/me/edit/general', {
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
    return fetch('http://127.0.0.1:5000/api/users/me/settings', { credentials: 'include' })
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
    return fetch(' http://127.0.0.1:5000/api/users/me/edit/settings', {
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