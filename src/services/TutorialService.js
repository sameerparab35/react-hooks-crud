import http from "../http-common";

const getAll = () => {
    return http.get("http://localhost:3001/tutorials");
};

const get = id => {
    return http.get(`http://localhost:3001/tutorials/${id}`);
};

const create = data => {
    return http.post("http://localhost:3001/tutorials", data);
};

const update = (id, data) => {
    return http.put(`http://localhost:3001/tutorials/${id}`, data);
};

const remove = id => {
    return http.delete(`http://localhost:3001/tutorials/${id}`);
};

const removeAll = () => {
    return http.delete(`http://localhost:3001/tutorials`);
};

const findByTitle = title => {
    return http.get(`http://localhost:3001/tutorials/search?title=${title}`);
    //return http.get(`http://localhost:3001/tutorials/search/${title}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};