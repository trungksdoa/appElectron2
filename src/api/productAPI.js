import axios from './axios';

const v1 = 'v1/';
// eslint-disable-next-line import/prefer-default-export
export const productAPI = {
  fetchProduct: () => {
    return new Promise(function (resolve) {
      axios
        .get(`${v1}product/`)
        // eslint-disable-next-line promise/always-return
        .then((res) => {
          //
          resolve(res);
        })
        .catch((error) => console.log(error));
    });
  },
  fetchCatagorys: () => {
    return new Promise(function (resolve) {
      axios
        .get(`${v1}product/catagorys`)
        // eslint-disable-next-line promise/always-return
        .then((res) => {
          resolve(res);
        })
        .catch((error) => console.log(error));
    });
  },
  updateProduct: (data) => {
    return new Promise(function (resolve) {
      axios
        .put(`${v1}product/`, data)
        // eslint-disable-next-line promise/always-return
        .then((res) => {
          //
          resolve(res);
        })
        .catch((error) => console.log(error));
    });
  },
  updateCatagory: (data) => {
    return new Promise(function (resolve) {
      axios
        .put(`${v1}product/catagory`, data)
        // eslint-disable-next-line promise/always-return
        .then((res) => {
          resolve(res);
        })
        .catch((error) => console.log(error));
    });
  },
  insertProduct: (data) => {
    return new Promise(function (resolve) {
      axios
        .post(`${v1}product/`, data)
        // eslint-disable-next-line promise/always-return
        .then((res) => {
          resolve(res);
        })
        .catch((error) => console.log(error));
    });
  },
  insertCatagory: (data) => {
    return new Promise(function (resolve) {
      axios
        .post(`${v1}product/catagory`, data)
        // eslint-disable-next-line promise/always-return
        .then((res) => {
          resolve(res);
        })
        .catch((error) => console.log(error));
    });
  },
  deleteProduct: (id) => {
    return new Promise(function (resolve) {
      axios
        .delete(`${v1}product/delete?id=${id}`)
        // eslint-disable-next-line promise/always-return
        .then((res) => {
          resolve(res);
        })
        .catch((error) => console.log(error));
    });
  },
  deleteCatagory: (id) => {
    return new Promise(function (resolve) {
      axios
        .delete(`${v1}product/catagory/delete?id=${id}`)
        // eslint-disable-next-line promise/always-return
        .then((res) => {
          resolve(res);
        })
        .catch((error) => console.log(error));
    });
  },
};
