import React, { useCallback, useEffect } from "react";
import { Burgers, BurgersSkeleton, Categories, Pagination, Sort } from "../components";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../customHooks/useAppDispatch";
import { filterActions } from "../redux/filterSlice/filterSlice";
import { fetchBurgers } from "../redux/burgersSlice/asyncActionsBurger";
import { selectFilter } from "../redux/filterSlice/selectFilter";
import { selectBurgers } from "../redux/burgersSlice/selectBurgers";
import { useScrollToTop } from "../customHooks/useScrollToTop";

export const Home = () => {
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectBurgers);
  const dispatch = useAppDispatch();
  useScrollToTop(status);

  const burgers = items.map((el) => <Burgers key={el.id} {...el} />);
  const skeleton = [...new Array(6)].map((_, index) => <BurgersSkeleton key={index} />);

  const getBurgers = async () => {
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const search = searchValue ? `&search=${searchValue}` : "";
    const category = categoryId > 0 ? String(categoryId) : "";
    dispatch(
      fetchBurgers({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );
  };

  useEffect(() => {
    getBurgers();
  }, [categoryId, sort.sortProperty, currentPage, searchValue]);

  const onChangeCategory = useCallback((id: number) => {
    dispatch(filterActions.setCategoryId(id));
  }, []);

  const onChangePage = (number: number) => {
    dispatch(filterActions.setCurrentPage(number));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">All burgers</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>An error has occurred 😕</h2>
          <p>Unfortunately we were unable to get the burgers. Please try again later.</p>
        </div>
      ) : (
        <div className="content__items">{status === "loading" ? skeleton : burgers}</div>
      )}
      <Pagination currentPage={currentPage} setCurrentPage={onChangePage} />
    </div>
  );
};
