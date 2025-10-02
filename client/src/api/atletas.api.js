import http from './http';

export const AtletasApi = {
  list(params) {
    return http.get('/atleta', { params });
  },
  get(id) {
    return http.get(`/atleta/${id}`);
  },
  create(payload) {
    return http.post('/atleta', payload);
  },
  update(id, payload) {
    return http.put(`/atleta/${id}`, payload);
  },
  remove(id) {
    return http.delete(`/atleta/${id}`);
  },
};
