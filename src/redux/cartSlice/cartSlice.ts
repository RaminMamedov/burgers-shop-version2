import {createSlice} from "@reduxjs/toolkit";
import { getCartFromLS } from "../../utils/getCartFromLS";
import {CartSliceState} from "../../redux/cartSlice/cartTypes";
import {calcTotalPrice} from "../../utils/calcTotalPrice";

const initialState: CartSliceState = getCartFromLS();

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addItem: (state, action) => {
            const findItem = state.items.find((obj) => obj.id === action.payload.id);
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
        minusItem: (state, action) => {
            const findItem = state.items.find((obj) => obj.id === action.payload);
            if (findItem) {
                findItem.count--;
            }
            state.totalPrice = calcTotalPrice(state.items);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            state.totalPrice = 0;
        },
        clearItems: (state) => {
            state.items = [];
            state.totalPrice = 0;
        }
    }
});

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;