import { AnyAction, combineReducers, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import { filterReducer } from "../redux/filterSlice/filterSlice";
import { cartReducer } from "../redux/cartSlice/cartSlice";
import { burgersReducer } from "../redux/burgersSlice/burgersSlice";
import { addressReducer } from "../redux/addressSlice/addressSlice";

const rootReducer = combineReducers({
  filterReducer: filterReducer,
  cartReducer: cartReducer,
  burgersReducer: burgersReducer,
  addressReducer: addressReducer
});
export const store = configureStore({
  reducer: rootReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootStateType, unknown, AnyAction>;
