import http from "./http-common";

const getAll = () => {
    return http.get("/class/admin/usermanage");
};

const get = id => {
    return http.get(`/class/admin/usermanage/${id}`);
};

const borrow = (id, data) => {
    return http.put(`/class/admin/usermanage/borrow/${id}`, data);
};

const remove = id => {
    return http.delete(`/class/admin/usermanage/${id}`);
};

const findByName = username => {
    return http.get(`/class/admin/usermanage?username=${username}`);
};

const BookService = {
    getAll,
    get,
    borrow,
    remove,
    findByName
};

export default BookService;