const API_URL = 'http://localhost:5000/api/cart';

const getCart = async (token) => {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to get cart');
  }
  return response.json();
};

const addToCart = async (token, productId, quantity) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity }),
  });
  if (!response.ok) {
    throw new Error('Failed to add to cart');
  }
  return response.json();
};

const updateCartItem = async (token, productId, quantity) => {
  const response = await fetch(API_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity }),
  });
  if (!response.ok) {
    throw new Error('Failed to update cart item');
  }
  return response.json();
};

const removeFromCart = async (token, productId) => {
  const response = await fetch(API_URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  });
  if (!response.ok) {
    throw new Error('Failed to remove from cart');
  }
  return response.json();
};

export default {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
};
