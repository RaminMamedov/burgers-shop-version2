import { RootStateType } from "../../redux/store";

export const selectAddress = (state: RootStateType) => state.addressReducer;