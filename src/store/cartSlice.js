import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartService from '../services/cartService';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

export const getCart = createAsyncThunk('cart/getCart', async (_, { getState }) => {
  const { auth } = getState();
  if (auth.token) {
    const data = await cartService.getCart(auth.token);
    return data.items;
  }
  return [];
});

export const addToCart = createAsyncThunk('cart/addToCart', async ({ product, quantity }, { getState, dispatch }) => {
  const { auth } = getState();
  if (auth.token) {
    const cartItem = await cartService.addToCart(auth.token, product.id, quantity);
    dispatch(getCart());
    return cartItem;
  } else {
    return { ...product, quantity };
  }
});

export const updateCartItem = createAsyncThunk('cart/updateCartItem', async ({ productId, quantity }, { getState, dispatch }) => {
  const { auth } = getState();
  if (auth.token) {
    const cartItem = await cartService.updateCartItem(auth.token, productId, quantity);
    dispatch(getCart());
    return cartItem;
  } else {
    return { productId, quantity };
  }
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productId, { getState, dispatch }) => {
  const { auth } = getState();
  if (auth.token) {
    const cartItem = await cartService.removeFromCart(auth.token, productId);
    dispatch(getCart());
    return cartItem;
  } else {
    return { productId };
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
    },
    // Reducers for non-logged in users
    addToCartLocal: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeFromCartLocal: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
    },
    updateQuantityLocal: (state, action) => {
      const { productId, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.id === productId);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
      state.items = state.items.filter(item => item.quantity > 0);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        if (!action.payload.cartId) { // Not logged in
          const { product, quantity } = action.meta.arg;
          const existingItem = state.items.find((item) => item.id === product.id);
          if (existingItem) {
            existingItem.quantity += quantity;
          } else {
            state.items.push({ ...product, quantity });
          }
        }
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        if (!action.payload.id) { // Not logged in
          const { productId, quantity } = action.meta.arg;
          const itemToUpdate = state.items.find((item) => item.id === productId);
          if (itemToUpdate) {
            itemToUpdate.quantity = quantity;
          }
          state.items = state.items.filter(item => item.quantity > 0);
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        if (!action.payload.id) { // Not logged in
          const { productId } = action.meta.arg;
          state.items = state.items.filter((item) => item.id !== productId);
        }
      });
  },
});

export const { setCart, addToCartLocal, removeFromCartLocal, updateQuantityLocal, clearCart } = cartSlice.actions;

export default cartSlice.reducer;