import clienteAxios from '../config/axios';

const getToken = () => localStorage.getItem('token');

export const fetchCustomers = async (page = 0, size = 10) => {
  const token = getToken();
  const { data } = await clienteAxios.get(`/customer?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const fetchCustomerById = async (id) => {
  const token = getToken();
  const { data } = await clienteAxios.get(`/customer/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const createCustomer = async (payload) => {
  const token = getToken();
  const { data } = await clienteAxios.post('/customer', payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const updateCustomer = async (id, payload) => {
  const token = getToken();
  const { data } = await clienteAxios.put(`/customer/${id}`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const deleteCustomer = async (id) => {
  const token = getToken();
  await clienteAxios.delete(`/customer/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

