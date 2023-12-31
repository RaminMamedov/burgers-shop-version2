import React, { useState } from "react";
import { useSelector } from "react-redux";
import { cartActions } from "../../redux/cartSlice/cartSlice";
import { selectCartItemByIdAndType } from "../../redux/cartSlice/selectCart";
import { useAppDispatch } from "../../customHooks/useAppDispatch";
import { Link } from "react-router-dom";
import { RootStateType } from "../../redux/store";

export type BurgersType = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  rating: number;
};

export const burgersTypes = ["medium", "well-done"];

export const Burgers: React.FC<BurgersType> = ({ id, title, price, imageUrl, types }) => {
  const [activeType, setActiveType] = useState<number>(0);
  const cartItem = useSelector((state: RootStateType) =>
    selectCartItemByIdAndType(state, id, burgersTypes[activeType]),
  );
  const dispatch = useAppDispatch();
  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: burgersTypes[activeType],
      count: 0,
    };
    dispatch(cartActions.addItem(item));
  };

  const onClickType = (el: number) => {
    setActiveType(el);
  };

  return (
    <div className="burger-block">
      <Link key={id} to={`/burger/${id}`}>
        <img className="burger-block__image" src={imageUrl} alt="Burger" />
        <h4 className="burger-block__title">{title}</h4>
      </Link>
      <div className="burger-block__selector">
        <ul>
          {types.map((typeId: number) => {
            return (
              <li key={typeId} onClick={() => onClickType(typeId)} className={activeType === typeId ? "active" : ""}>
                {burgersTypes[typeId]}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="burger-block__bottom">
        <div className="burger-block__price">{`${price} ₽`}</div>
        <button onClick={onClickAdd} className="button button--outline button--add">
          <img width="14" height="14" src="https://img.icons8.com/ios-glyphs/30/plus-math.png" alt="plus-math" />
          <span>Add</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
};
