import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { getCartFromLS } from "../../utils/getCartFromLS";
import {CartItem, CartSliceState} from "../../redux/cartSlice/cartTypes";
import {calcTotalPrice} from "../../utils/calcTotalPrice";

const initialState: CartSliceState = getCartFromLS();

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const findItem = state.items.find((obj) => obj.id === action.payload.id && obj.type === action.payload.type);
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }
            state.totalPrice = calcTotalPrice(state.items);
        },
        minusItem: (state, action: PayloadAction<{ id: string, type: string }>) => {
            const findItem = state.items.find((obj) => obj.id === action.payload.id && obj.type === action.payload.type);
            if (findItem) {
                findItem.count--;
            }
            state.totalPrice = calcTotalPrice(state.items);
        },
        removeItem: (state, action: PayloadAction<{ id: string, type: string }>) => {
            state.items = state.items.filter(obj => !(obj.id === action.payload.id && obj.type === action.payload.type));
            state.totalPrice = calcTotalPrice(state.items);
        },
        clearItems: (state) => {
            state.items = [];
            state.totalPrice = 0;
        }
    }
});

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;