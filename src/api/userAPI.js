import axios from './axios';
// eslint-disable-next-line import/prefer-default-export
export const UserAPI = {
  login: ({ username, password }) => {
    const user = {
      username,
      password,
    };
    // let config = {
    //     headers: {
    //         "Authorization": "Bearer",
    //     }
    // }
    return new Promise(function (resolve, reject) {
      const res = axios
        .post('login', user)
        // eslint-disable-next-line promise/always-return,@typescript-eslint/no-shadow
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
