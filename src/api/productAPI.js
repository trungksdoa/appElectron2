import axios from './axios';

const v1 = 'v1/';
// eslint-disable-next-line import/prefer-default-export
export const productAPI = {
  fetchProduct: () => {
    return new Promise(function (resolve, reject) {
      axios
        .get(`${v1}product/`)
        // eslint-disable-next-line promise/always-return
        .then((res) => {
          //
          resolve(res);
        })
        .catch((error) => reject(error));
    });
  },
  fetchCatagorys: () => {
    return new Promise(function (resolve, reject) {
      axios
        .get(`${v1}product/catagorys`)
        // eslint-disable-next-line promise/always-return
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error));
    });
  },
  updateProduct: (data) => {
    return new Promise(function (resolve, reject) {
      axios
        .put(`${v1}product/`, data)
        // eslint-disable-next-line promise/always-return
        .then((res) => {
          //
          resolve(res);
        })
        .catch((error) => reject(error));
    });
  },
  updateCatagory: (data) => {
    return new Promise(function (resolve, reject) {
      axios
        .put(`${v1}product/catagory`, data)
        // eslint-disable-next-line promise/always-return
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error));
    });
  },
  insertProduct: (data) => {
    return new Promise(function (resolve, reject) {
      axios
        .post(`${v1}product/`, data)
        // eslint-disable-next-line promise/always-return
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error));
    });
  },
  insertCatagory: (data) => {
    return new Promise(function (resolve, reject) {
      axios
        .post(`${v1}product/catagory`, data)
        // eslint-disable-next-line promise/always-return
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error));
    });
  },
  deleteProduct: (id) => {
    return new Promise(function (resolve, reject) {
      axios
        .delete(`${v1}product/delete?id=${id}`)
        // eslint-disable-next-line promise/always-return
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error));
    });
  },
  deleteCatagory: (id) => {
    return new Promise(function (resolve, reject) {
      axios
        .delete(`${v1}product/catagory/delete?id=${id}`)
        // eslint-disable-next-line promise/always-return
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error));
    });
  },
};
