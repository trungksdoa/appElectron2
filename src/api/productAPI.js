import axios from './axios';
const v1 = "v1/"
export const productAPI = {
    fetchProduct: () => {
        return new Promise(function (resolve, reject) {
            axios.get(`${v1}product/`)
                .then(res => {
                    //
                    resolve(res)
                })
                .catch(error => console.log(error));
        })
    },
    fetchCatagorys: () => {
        return new Promise(function (resolve, reject) {
            axios.get(`${v1}product/catagorys`)
                .then(res => {

                    resolve(res)
                })
                .catch(error => console.log(error));
        })
    },
    updateProduct: (data) => {
        return new Promise(function (resolve, reject) {
            axios.put(`${v1}product/`, data)
                .then(res => {
                    //
                    resolve(res)
                })
                .catch(error => console.log(error));
        })
    },
    updateCatagory: (data) => {
        return new Promise(function (resolve, reject) {
            axios.put(`${v1}product/catagory`, data)
                .then(res => {
                    resolve(res)
                })
                .catch(error => console.log(error));
        })
    },
    insertProduct: (data) => {
        return new Promise(function (resolve, reject) {
            axios.post(`${v1}product/`, data)
                .then(res => {
                    resolve(res)
                })
                .catch(error => console.log(error));
        })
    },
    insertCatagory: (data) => {
        return new Promise(function (resolve, reject) {
            axios.post(`${v1}product/catagory`, data)
                .then(res => {
                    resolve(res)
                })
                .catch(error => console.log(error));
        })
    },
    deleteProduct: (id) => {
        return new Promise(function (resolve, reject) {
            axios.delete(`${v1}product/delete?id=${id}`)
                .then(res => {
                    resolve(res)
                })
                .catch(error => console.log(error));
        })
    },
    deleteCatagory: (id) => {
        return new Promise(function (resolve, reject) {
            axios.delete(`${v1}product/catagory/delete?id=${id}`)
                .then(res => {
                    resolve(res)
                })
                .catch(error => console.log(error));
        })
    },
    SortProduct: ({ _page, _limit, _order }) => {
        console.log(_page)
        return new Promise(function (resolve, reject) {
            fetch(`http://localhost:3000/product?_page=${_page}&_limit=${_limit}&_sort=rating.count&_order=${_order}`)
                .then(res => res.json())
                .then(json => resolve(json))
        })
    },
    searchProduct: ({ _page, _limit, q }) => {
        return new Promise(function (resolve, reject) {
            fetch(`http://localhost:3000/product?_page=${_page}&_limit=${_limit}&q=${q}`)
                .then(res => res.json())
                .then(json => resolve(json))
        })
    },
    fetchProductPage: ({ _page, _limit }) => {
        return new Promise(function (resolve, reject) {
            fetch(`http://localhost:3000/product?_page=${_page}&_limit=${_limit}`)
                .then(res => res.json())
                .then(json => resolve(json))
        })
    },
    searchByCatagory: ({ _page, _limit, catagory }) => {
        return new Promise(function (resolve, reject) {
            fetch(`http://localhost:3000/product?category=${catagory}&_page=${_page}&_limit=${_limit}`)
                .then(res => res.json())
                .then(json => resolve(json))
        })
    },
    fetchCatagory: () => {
        return new Promise(function (resolve, reject) {
            fetch(`http://localhost:3000/categories`)
                .then(res => res.json())
                .then(json => resolve(json))
        })
    },

}