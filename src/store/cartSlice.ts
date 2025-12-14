import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ConfirmedOrder {
  token: number;
  items: string[];
  dineType: string;
  timestamp: number;
}

interface CartState {
  cart: Record<string, number>;
  searchTerm: string;
  dineType: string | null;
  confirmedOrders: ConfirmedOrder[];
}

const initialState: CartState = {
  cart: {},
  searchTerm: '',
  dineType: null,
  confirmedOrders: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<string>) {
      state.cart[action.payload] = (state.cart[action.payload] || 0) + 1;
    },
    decreaseItem(state, action: PayloadAction<string>) {
      const count = state.cart[action.payload];
      if (count > 1) {
        state.cart[action.payload] = count - 1;
      } else {
        delete state.cart[action.payload];
      }
    },
    setCart(state, action: PayloadAction<Record<string, number>>) {
      state.cart = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    clearCart(state) {
      state.cart = {};
    },
    setDineType(state, action: PayloadAction<string>) {
      state.dineType = action.payload;
    },
    addConfirmedOrder(state, action: PayloadAction<ConfirmedOrder>) {
      state.confirmedOrders.push(action.payload);
    },
  },
});

export const { addItem, decreaseItem, setCart, setSearchTerm, clearCart, setDineType, addConfirmedOrder } = cartSlice.actions;
export default cartSlice.reducer;
