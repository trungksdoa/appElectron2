export const cartAPI = {
    saveCart: (requestData) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
        };
        return new Promise(function (resolve, reject) {
            fetch('http://localhost:3004/cart', requestOptions)
                .then(res => res.json())
                .then(json => resolve(json))
        })
    },
    updateCart: (requestData) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: requestData.id,
                item: requestData.item,
                quantity: requestData.quantity,
                price: requestData.price,
                total: requestData.total
            })
        };
        return new Promise(function (resolve, reject) {
            fetch(`http://localhost:3004/cart/${requestData.id}`, requestOptions)
                .then(res => res.json())
                .then(json => resolve(json))
        })
    },
    RemoveCart: (id) => {
        const requestOptions = {
            method: 'DELETE',
        };
        return new Promise(function (resolve, reject) {
            fetch(`http://localhost:3004/cart/${id}`,requestOptions)
            resolve(true);
        })
    },
    getCart: () => {
        return new Promise(function (resolve, reject) {
            fetch('http://localhost:3004/cart')
                .then(res => res.json())
                .then(json => resolve(json))
        })
    },

}