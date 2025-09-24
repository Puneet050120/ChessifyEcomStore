
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders';

const createOrder = async (orderData, token) => {
  const response = await axios.post(API_URL, orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getOrder = async (orderId, token) => {
  const response = await axios.get(`${API_URL}/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getUserOrders = async (userId, token) => {
  const response = await axios.get(`${API_URL}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const orderService = {
  createOrder,
  getOrder,
  getUserOrders,
};

export default orderService;
