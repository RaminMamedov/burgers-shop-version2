import { RootStateType } from '../store';

export const selectCart = (state: RootStateType) => state.cartReducer;

export const selectCartItemByIdAndType = (state: RootStateType, id: string, type: string) =>
    state.cartReducer.items.find(item => item.id === id && item.type === type);

