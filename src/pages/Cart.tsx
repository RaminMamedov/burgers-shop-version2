import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {CartItem, EmptyCart, ConfirmModal} from "../components";
import {cartActions} from "../redux/cartSlice/cartSlice";
import {selectCart} from "../redux/cartSlice/selectCart";
import {useAppDispatch} from "../customHooks/useAppDispatch";
import comeBack from '../assets/img/grey-arrow-left.svg';
import {calcTotalPrice} from "../utils/calcTotalPrice";
import {CartItemType} from "../redux/cartSlice/cartTypes";


const Cart = () => {
    const [isConfirmModalVisible, setConfirmModalVisible] = useState<boolean>(false);
    const {totalPrice, items} = useSelector(selectCart);
    const [predictedTotalPrice, setPredictedTotalPrice] = useState<number>(totalPrice);
    const dispatch = useAppDispatch();
    const totalCount = items.reduce((sum: number, item: CartItemType) => sum + item.count, 0);

    useEffect(() => {
        setPredictedTotalPrice(totalPrice);
    }, [totalPrice]);


    const onClickClear = () => {
        setConfirmModalVisible(true);
    };

    const onCancel = () => {
        setConfirmModalVisible(false);
        setPredictedTotalPrice(totalPrice);
    };

    const onConfirmClear = () => {
        dispatch(cartActions.clearItems());
        setConfirmModalVisible(false);
        setPredictedTotalPrice(totalPrice);
    };

    const recalculateTotalPrice = () => {
        setPredictedTotalPrice(calcTotalPrice(items));
    };

    return (
        <>
            {totalPrice > 0 ? <div className="container container--cart">
                    <div className="cart">
                        <div className="cart__top">
                            <h2 className="content__title">
                                <img width="50" height="50" src="https://img.icons8.com/ios/50/shopping-cart--v1.png"
                                     alt="shopping-cart--v1"
                                />
                                Cart
                            </h2>
                            <div onClick={onClickClear}
                                 className="cart__clear"
                            >
                                <img width="20" height="20" src="https://img.icons8.com/ios/50/delete-forever--v1.png"
                                     alt="delete-forever--v1"
                                />
                                <span>Clear the cart</span>
                            </div>
                        </div>
                        <div className="content__items">
                            {items.map((item: CartItemType) => (
                                <CartItem key={item.id} {...item}
                                          recalculateTotalPrice={recalculateTotalPrice}
                                />
                            ))}
                        </div>
                        <div className="cart__bottom">
                            <div className="cart__bottom-details">
                                <span> Total burgers: <b>{totalCount} pcs.</b> </span>
                                <span> Order price: <b>{predictedTotalPrice} ₽</b> </span>
                            </div>
                            <div className="cart__bottom-buttons">
                                <Link to="/" className="button button--outline button--add go-back-btn">
                                    <img src={comeBack} alt={'comeBack'}/>
                                    <span>Come back</span>
                                </Link>
                                <button className="button pay-btn">
                                    <span>Pay now</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                : <EmptyCart/>}
            <ConfirmModal
                isVisible={isConfirmModalVisible}
                onConfirm={onConfirmClear}
                onCancel={onCancel}
                message="Are you sure you want to empty the cart?"
            />
        </>
    );
};

export default Cart;