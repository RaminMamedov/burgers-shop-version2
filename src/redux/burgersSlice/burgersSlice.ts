import {createSlice} from "@reduxjs/toolkit";
import {BurgerSliceState, Status} from "./burgerTypes";
import {fetchBurgers} from "./asyncActionsBurger";


const initialState: BurgerSliceState = {
    items: [],
    status: Status.LOADING,
};

const burgersSlice = createSlice({
    name: "burgers",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBurgers.pending, (state) => {
                state.status = Status.LOADING;
                state.items = [];
            })
            .addCase(fetchBurgers.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.items = action.payload;
            })
            .addCase(fetchBurgers.rejected, (state) => {
                state.status = Status.ERROR;
                state.items = [];
            });
    },
});

export const burgersReducer = burgersSlice.reducer;