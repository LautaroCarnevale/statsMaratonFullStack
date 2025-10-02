import http from './http';

export const CiudadesApi = {
    list() {
        return http.get('/ciudad');
    },
    create(payload) {
        return http.post('/ciudad', payload);
    },
    update(id, payload) {
        return http.put(`/ciudad/${id}`, payload);
    },
    remove(id) {
        return http.delete(`/ciudad/${id}`);
    },
};
