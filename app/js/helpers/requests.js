var url = "https://eventafisha.com/api/v1/";

export function getEvent(idEvent) {
    return new Promise((res, rej) => {
        axios
            .get(url + "events/" + idEvent)
            .then(function (response) {
                let data = response.data;
                res({
                    data: data
                })
            })
            .catch(function (error) {
                rej(error.response.data);
                console.log(error);
            });
    });
};

export function getCategories() {
    return new Promise((res, rej) => {
        axios
            .get(url + "categories")
            .then(function (response) {
                let data = response.data;
                res({
                    data: data
                })
            })
            .catch(function (error) {
                rej(error.response.data);
                console.log(error);
            });
    });
};

export function getTags() {
    return new Promise((res, rej) => {
        axios
            .get(url + "tags")
            .then(function (response) {
                let data = response.data;
                res({
                    data: data
                })
            })
            .catch(function (error) {
                rej(error.response.data);
                console.log(error);
            });
    });
};

export function getCities() {
    return new Promise((res, rej) => {
        axios
            .get(url + "cities")
            .then(function (response) {
                let data = response.data;
                res({
                    data: data
                })
            })
            .catch(function (error) {
                rej(error.response.data);
                console.log(error);
            });
    });
};

export function getSubjects() {
    return new Promise((res, rej) => {
        axios
            .get(url + "subjects")
            .then(function (response) {
                let data = response.data;
                res({
                    data: data
                })
            })
            .catch(function (error) {
                rej(error.response.data);
                console.log(error);
            });
    });
};

export function createUserEvent(meta) {
    return new Promise((res, rej) => {
        axios.post(url + "events", meta)
            .then(function (response) {
                let data = response.data;
                res({
                    data: data
                })
            })
            .catch(function (error) {
                rej(error.response.data);
                errorHandle(error.response);
            });
    });
};

export function sentReport(meta) {
    return new Promise((res, rej) => {
        axios.post(url + "error-message", meta)
            .then(function (response) {
                let data = response.data;
                res({
                    data: data
                })
            })
            .catch(function (error) {
                rej(error.response.data);
                errorHandle(error.response);
            });
    });
};

export function orderNumber(idEvent) {
    return new Promise((res, rej) => {
        axios
            .put(url + "events/order-number/" + idEvent)
            .then(function (response) {
                let data = response.data;
                res({
                    data: data
                })
            })
            .catch(function (error) {
                rej(error.response.data);
                console.log(error);
            });
    });
};