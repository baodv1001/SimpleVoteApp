import axiosClient from './axiosClient';

const url = '/item/';

const itemApi = {
  getAll: async () => {
    const res = await axiosClient.get(url);
    return res.data;
  },

  getById: async idItem => {
    const res = await axiosClient.get(`${url}${idItem}`);
    return res.data;
  },

  create: async item => {
    const res = await axiosClient.post(url, item);
    return res.data;
  },

  update: async item => {
    const res = await axiosClient.put(`${url}${item.idItem}`, item);
    return res.data;
  },

  delete: async idItem => {
    const res = await axiosClient.delete(`${url}${idItem}`);
    return res.data;
  },
};

export default itemApi;
