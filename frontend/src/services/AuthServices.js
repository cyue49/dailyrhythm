import { baseURL } from './baseURL'

// sign user out
export const signOut = () => {
    return fetch(`${baseURL}/api/auth/signout`, { credentials: 'include' })
        .then((res) => {
            if (res.status === 200 && res.ok) {
                return 1
            } else {
                return 0
            }
        }).catch((e) => {
            console.log(e.message)
        })
}

// sign user in
export const signIn = (data) => {
    return fetch(`${baseURL}/api/auth/signin`,
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
        } else if (res.status === 400) { // invalid email / password
            return 0
        }
    }).catch((e) => {
        console.log(e.message)
    })
}

// sign user up
export const signUp = (data) => {
    return fetch(`${baseURL}/api/users/signup`,
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

// email verification 
export const verifyEmail = (token) => {
    return fetch(`${baseURL}/api/auth/email/verify/${token}`, { credentials: 'include' })
        .then((res) => res.json())
        .then((data) => {
            return data.status
        })
        .catch((e) => {
            console.log(e.message)
        })
}