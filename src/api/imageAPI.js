import axios from './axios';
const v1 = "v1"
export const imageAPI = {
    fecthImage: () => {
        return new Promise(function (resolve, reject) {
            axios.get(`${v1}/image/files`)
                .then(res => {
                    console.log(res);
                    resolve(res)
                })
                .catch(error => console.log(error));
        })
    },
}