import axios from 'axios';

const BASE_URI = 'http://165.22.38.106:3010/api/admin';

axios.defaults.withCredentials = true;

//REGISTERS
export const getRegisters = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${BASE_URI}/registers`)
            .then((res) => {
                resolve(res.data.success);
            })
            .catch((err) => {
                reject(err.response.data.error);
            });
    });
};

//LOGIN AND LOGOUT
export const verifyLogin = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${BASE_URI}/login`)
            .then((res) => {
                resolve(res.data.success);
            })
            .catch((err) => {
                reject(err.response.data.error);
            });
    });
};

export const login = (values) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${BASE_URI}/login`, values, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })
            .then((res) => {
                resolve(res.data.success);
            })
            .catch((err) => {
                reject(err.response.data.error);
            });
    });
};

export const logOut = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${BASE_URI}/logout`)
            .then((res) => resolve(res.data.success))
            .catch((err) => reject(err.response.data.error));
    });
};

//NEWS LETTER - EMAILS
export const emailsNewsLetter = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${BASE_URI}/emails`)
            .then((res) => {
                resolve(res.data.success);
            })
            .catch((err) => {
                reject(err.data.response.error);
            });
    });
};

export const deleteEmailNewsLetter = (email) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(`${BASE_URI}/emails/email?email=${email}`)
            .then((res) => {
                emailsNewsLetter()
                    .then((emails) => {
                        resolve({ emails, success: res.data.success });
                    })
                    .catch((err) => reject(err));
            })
            .catch((err) => {
                reject(err.response.data.error);
            });
    });
};

//CONTACTS - MESSAGES
export const contactsMessages = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${BASE_URI}/contacts`)
            .then((res) => {
                resolve(res.data.success);
            })
            .catch((err) => {
                reject(err.response.data.error);
            });
    });
};

export const deleteContactMessage = (id) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(`${BASE_URI}/contacts/id?id=${id}`)
            .then((res) => {
                contactsMessages()
                    .then((messages) => {
                        resolve({ messages, success: res.data.success });
                    })
                    .catch((err) => reject(err));
            })
            .catch((err) => {
                reject(err.response.data.error);
            });
    });
};

//MENUS
export const getMenus = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${BASE_URI}/menus`)
            .then((res) => {
                resolve(res.data.success);
            })
            .catch((err) => {
                reject(err.response.data.error);
            });
    });
};

export const deleteMenu = (id) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(`${BASE_URI}/menus/id?id=${id}`)
            .then((res) => {
                resolve(res.data.success);
            })
            .catch((err) => {
                reject(err.response.data.error);
            });
    });
};

export const addMenu = (values) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${BASE_URI}/menus`, values)
            .then((res) => {
                resolve(res.data.success);
            })
            .catch((err) => {
                reject(err.response.data.error);
            });
    });
};

export const deleteImage = (photo) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(`${BASE_URI}/deleteImage/path?path=${photo}`)
            .then((res) => {
                resolve(res.data.success);
            })
            .catch((err) => {
                reject(err.response.data.error);
            });
    });
};

export const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', file);
        axios
            .post(`${BASE_URI}/uploadImage`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                resolve(res.data.success);
            })
            .catch((err) => {
                reject(err.response.data.error);
            });
    });
};

export const updateMenu = (menu) => {
    return new Promise((resolve, reject) => {
        axios
            .put(`${BASE_URI}/menus/id?id=${menu.id}`, menu)
            .then((res) => {
                resolve(res.data.success);
            })
            .catch((err) => {
                reject(err.response.data.error);
            });
    });
};

//RESERVATIONS

export const getReservations = (from = '', to = '', page = 1) => {
    return new Promise((resolve, reject) => {
        if (from && to) {
            return axios
                .get(
                    `${BASE_URI}/reservations/all?from=${from}&to=${to}&page=${page}`
                )
                .then((res) => {
                    resolve(res.data.success);
                })
                .catch((err) => {
                    reject(err.response.data.error);
                });
        }

        if (from && !to) {
            return axios
                .get(`${BASE_URI}/reservations/all?from=${from}&page=${page}`)
                .then((res) => {
                    resolve(res.data.success);
                })
                .catch((err) => {
                    reject(err.response.data.error);
                });
        }

        return axios
            .get(`${BASE_URI}/reservations/all?page=${page}`)
            .then((res) => {
                resolve(res.data.success);
            })
            .catch((err) => {
                reject(err.response.data.error);
            });
    });
};

export const updateReservation = (reservation) => {
    return new Promise((resolve, reject) => {
        axios
            .put(
                `${BASE_URI}/reservations/id?id=${reservation.id}`,
                reservation
            )
            .then((res) => {
                resolve(res.data.success);
            })
            .catch((err) => {
                reject(err.response.data.error);
            });
    });
};

export const deleteReservation = (id) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(`${BASE_URI}/reservations/id?id=${id}`)
            .then((res) => {
                resolve(res.data.success);
            })
            .catch((err) => {
                reject(err.response.data.error);
            });
    });
};

// USERS - ADMINS
export const getUsers = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${BASE_URI}/users`)
            .then((res) => {
                resolve(res.data.success);
            })
            .catch((err) => {
                reject(err.response.data.error);
            });
    });
};

export const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(`${BASE_URI}/users/user?id=${id}`)
            .then((res) => {
                resolve(res.data.success);
            })
            .catch((err) => {
                reject(err.response.data.error);
            });
    });
};

export const addUser = (values) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${BASE_URI}/users`, values)
            .then((res) => {
                resolve(res.data.success);
            })
            .catch((err) => {
                reject(err.response.data.error);
            });
    });
};

export const updateUser = (user) => {
    return new Promise((resolve, reject) => {
        axios
            .put(`${BASE_URI}/users/user?id=${user.id}`, user)
            .then((res) => {
                resolve(res.data.success);
            })
            .catch((err) => {
                reject(err.response.data.error);
            });
    });
};

export const updateUserPassword = (id, values) => {
    return new Promise((resolve, reject) => {
        axios
            .put(`${BASE_URI}/users/user/password?id=${id}`, values)
            .then((res) => {
                resolve(res.data.success);
            })
            .catch((err) => {
                reject(err.response.data.error);
            });
    });
};
