import axios from './axios';

const v1 = 'v1';
// eslint-disable-next-line import/prefer-default-export
export const imageAPI = {
  fecthImage: () => {
    return new Promise(function (resolve) {
      axios
        .get(`${v1}/image/files`)
        // eslint-disable-next-line promise/always-return
        .then((res) => {
          console.log(res);
          resolve(res);
        })
        .catch((error) => console.log(error));
    });
  },
};
