import React, {useState} from "react";
import {cartActions} from "../redux/cartSlice/cartSlice";
import {CartItem as CartItemType} from '../redux/cartSlice/cartTypes';
import {useAppDispatch} from "../customHooks/useAppDispatch";
import {ConfirmModal} from "../components";

type CartItemProps = {
    id: string
    title: string
    type: string
    price: number
    count: number
    imageUrl: string
    updatePredictedTotalPrice: (amountToRemove: number) => void
};

export const CartItem: React.FC<CartItemProps> = ({id, title, type, price, count, imageUrl, updatePredictedTotalPrice}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useAppDispatch();

    const onClickPlus = () => {
        dispatch(cartActions.addItem({id} as CartItemType));
    };

    const onClickMinus = () => {
        dispatch(cartActions.minusItem(id));
    };

    const onClickRemove = () => {
        updatePredictedTotalPrice(price * count);
        setIsModalVisible(true);
    };

    const onConfirmDelete = () => {
        dispatch(cartActions.removeItem(id));
        setIsModalVisible(false);
    };

    const onCancelDelete = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="cart__item">
            <div className="cart__item-img">
                <img className="pizza-block__image" src={imageUrl} alt="Burger"/>
            </div>
            <div className="cart__item-info">
                <h3>{title}</h3>
                <p>
                    {type}
                </p>
            </div>
            <div className="cart__item-count">
                <button
                    disabled={count === 1}
                    onClick={onClickMinus}
                    className="button button--outline button--circle cart__item-count-minus">
                    <img width="20" height="20" src="https://img.icons8.com/material-outlined/24/minus.png" alt="minus"/>
                </button>
                <b>{count}</b>
                <button
                    onClick={onClickPlus}
                    className="button button--outline button--circle cart__item-count-plus">
                    <img width="20" height="20" src="https://img.icons8.com/android/24/plus.png" alt="plus"/>
                </button>
            </div>
            <div className="cart__item-price">
                <b>{price * count} ₽</b>
            </div>
            <div className="cart__item-remove">
                <button className="button button--outline button--circle"
                        onClick={onClickRemove}
                >
                    <img width="20" height="20" src="https://img.icons8.com/ios/50/delete-sign--v1.png" alt="delete-sign"/>
                </button>
            </div>
            <ConfirmModal
                onConfirm={onConfirmDelete}
                onCancel={onCancelDelete}
                isVisible={isModalVisible}
                message="Are you sure you want to remove the item?"
            />
        </div>
    );
};