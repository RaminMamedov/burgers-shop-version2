import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSliceState, SortType } from "../../redux/filterSlice/filterTypes";

const initialState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "popularity",
    sortProperty: "rating",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSort: (state, action: PayloadAction<SortType>) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      if (action.payload.currentPage) {
        state.currentPage = Number(action.payload.currentPage);
      }
      if (action.payload.sort && typeof action.payload.sort === "object" && action.payload.sort.sortProperty) {
        state.sort = action.payload.sort;
      }
      if (action.payload.categoryId) {
        state.categoryId = Number(action.payload.categoryId);
      }
    },
  },
});

export const filterActions = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
