import http from "./http-common";

const getAll = () => {
    return http.get("/usermanage");
};

const get = id => {
    return http.get(`/usermanage/${id}`);
};

const update = (id, data) => {
    return http.put(`/usermanage/${id}`, data);
};

const borrow = (id, data) => {
    return http.put(`/usermanage/borrow/${id}`, data);
};

const remove = id => {
    return http.delete(`/usermanage/${id}`);
};

const removeAll = () => {
    return http.delete(`/usermanage`);
};

const findByName = username => {
    return http.get(`/usermanage?username=${username}`);
};

const BookService = {
    getAll,
    get,
    update,
    borrow,
    remove,
    removeAll,
    findByName
};

export default BookService;