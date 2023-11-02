import { RootStateType } from '../store';

export const selectCart = (state: RootStateType) => state.cartReducer;

export const selectCartItemById = (id: string) => (state: RootStateType) =>
    state.cartReducer.items.find((obj) => obj.id === id);
