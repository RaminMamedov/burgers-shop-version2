import { RootStateType } from "../store";

export const selectFilter = (state: RootStateType) => state.filterReducer;
export const selectSort = (state: RootStateType) => state.filterReducer.sort;
