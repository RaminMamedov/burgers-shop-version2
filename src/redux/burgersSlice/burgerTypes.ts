export type Burger = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  rating: number;
  description: string
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "completed",
  ERROR = "error",
}

export type SearchBurgerParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
};

export interface BurgerSliceState {
  items: Burger[];
  status: Status;
  currentBurger: Burger| null;
}
