import { RootStateType } from '../store';

export const selectBurgers = (state: RootStateType) => state.burgersReducer;
