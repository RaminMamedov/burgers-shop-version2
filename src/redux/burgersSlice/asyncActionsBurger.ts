import { createAsyncThunk } from "@reduxjs/toolkit";
import { Burger, SearchBurgerParams } from ".//burgerTypes";
import axios from "axios";
import pickBy from "lodash/pickBy";
import identity from "lodash/identity";
import { ThunkError } from "../../utils/types";
import { createActions } from "../../utils/createActions";
import { handleAsyncServerAppError, handleAsyncServerNetworkError } from "../../utils/error-utils";


export const fetchBurgers = createAsyncThunk<Burger[], SearchBurgerParams, ThunkError>(
  "burger/fetchBurgersStatus",
  async (params, thunkAPI) => {
    thunkAPI.dispatch(createActions.setStatus({ status: "loading" }));
    try {
      const { sortBy, order, category, search, currentPage } = params;
      const response = await axios.get<Burger[]>(`https://650ab691dfd73d1fab08bfd5.mockapi.io/items`, {
        params: pickBy(
          {
            page: currentPage,
            limit: 4,
            category,
            sortBy,
            order,
            search,
          },
          identity,
        ),
      });
      thunkAPI.dispatch(createActions.setStatus({ status: "succeeded" }));
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          return handleAsyncServerAppError(error.response.data, thunkAPI);
        } else {
          return handleAsyncServerNetworkError(error, thunkAPI);
        }
      } else {
        thunkAPI.dispatch(createActions.setError({ error: "An unexpected error occurred" }));
        return thunkAPI.rejectWithValue({
          errors: ["An unexpected error occurred"],
          fieldsErrors: undefined,
        });
      }
    }
  },
);

// thunk для загрузки одного бургера
export const fetchBurgerById = createAsyncThunk<Burger, string, ThunkError>(
  "burger/fetchBurgerByIdStatus",
  async (burgerId, thunkAPI) => {
    thunkAPI.dispatch(createActions.setStatus({ status: "loading" }));
    try {
      const response = await axios.get<Burger>(`https://650ab691dfd73d1fab08bfd5.mockapi.io/items/${burgerId}`);
      thunkAPI.dispatch(createActions.setStatus({ status: "succeeded" }));
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          return handleAsyncServerAppError(error.response.data, thunkAPI);
        } else {
          return handleAsyncServerNetworkError(error, thunkAPI);
        }
      } else {
        thunkAPI.dispatch(createActions.setError({ error: "An unexpected error occurred" }));
        return thunkAPI.rejectWithValue({
          errors: ["An unexpected error occurred"],
          fieldsErrors: undefined,
        });
      }
    }
  }
);
