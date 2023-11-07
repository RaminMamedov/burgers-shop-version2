import React, { useState } from "react";
import { useAppDispatch } from "../customHooks/useAppDispatch";
import { filterActions } from "../redux/filterSlice/filterSlice";
import { SortType } from "../redux/filterSlice/filterTypes";

type SortPropsType = {
  value: SortType;
};

type SelectedType = {
  name: string;
  sortProperty: string;
};
export const sortList: SelectedType[] = [
  { name: "popularity (High to Low)", sortProperty: "rating" },
  { name: "popularity (Low to High)", sortProperty: "-rating" },
  { name: "price (High to Low)", sortProperty: "price" },
  { name: "price (Low to High)", sortProperty: "-price" },
  { name: "alphabet (Z - A)", sortProperty: "title" },
  { name: "alphabet (A - Z)", sortProperty: "-title" },
];

export const Sort: React.FC<SortPropsType> = ({ value }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);

  const onClickItem = (element: SelectedType) => {
    dispatch(filterActions.setSort(element));
    setOpen(!open);
  };

  const onBlurHandler = () => {
    setOpen(false);
  };

  return (
    <div className="sort" onBlur={onBlurHandler} tabIndex={0}>
      <div className="sort__label">
        <b>Sort by:</b>
        <span onClick={() => setOpen(!open)}>{value.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((selectedValue) => {
              return (
                <li
                  key={selectedValue.sortProperty}
                  onClick={() => onClickItem(selectedValue)}
                  className={value.sortProperty === selectedValue.sortProperty ? "active" : ""}
                >
                  {selectedValue.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
