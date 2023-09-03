import axios from 'axios';
import format from '../utils/format';
const BASE_URI = 'http://165.22.38.106:3010/api';

export const getMenus = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${BASE_URI}/menus`)
            .then((res) => {
                const { data } = res;
                resolve(data);
            })
            .catch((err) => reject(err.data));
    });
};

//RESERVATION
export const reservation = (values) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${BASE_URI}/reservations`, values)
            .then((res) => resolve(res.data.success))
            .catch((err) => reject(err.response.data.error));
    });
};

export const handleSubmitReservation = (e) => {
    return new Promise((resolve, reject) => {
        e.preventDefault();

        reservation(format.getInputsValues(e.target))
            .then((res) => {
                resolve(res);
                format.resetInputsValues(e.target);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

//CONTACT
export const contact = (values) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${BASE_URI}/contacts/new`, values)
            .then((res) => resolve(res.data.success))
            .catch((err) => reject(err.response.data.error));
    });
};

export const handleSubmitContact = (e) => {
    return new Promise((resolve, reject) => {
        e.preventDefault();
        contact(format.getInputsValues(e.target))
            .then((res) => {
                resolve(res);
                format.resetInputsValues(e.target);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

//NEWS LETTER
export const newsLetter = (values) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${BASE_URI}/newsLetter`, values)
            .then((res) => resolve(res.data.success))
            .catch((err) => reject(err.response.data.error));
    });
};

export const handleSubmitNewsLetter = (e) => {
    return new Promise((resolve, reject) => {
        e.preventDefault();
        newsLetter(format.getInputsValues(e.target))
            .then((res) => {
                resolve(res);
                format.resetInputsValues(e.target);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
