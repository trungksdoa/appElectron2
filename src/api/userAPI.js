import axios from './axios';
export const UserAPI = {
    login: ({ username, password }) => {
        const user = {
            username: username,
            password: password
        };
        // let config = {
        //     headers: {
        //         "Authorization": "Bearer",
        //     }
        // }
        return new Promise(function (resolve, reject) {
            const res = axios.post("login", user)
                .then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                });
        })
    },
}