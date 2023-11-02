import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {CartItem} from "../components/CartItem";
import {cartActions} from "../redux/cartSlice/cartSlice";
import {EmptyCart} from "../components/EmptyCart";
import {selectCart} from "../redux/cartSlice/selectCart";
import {useAppDispatch} from "../customHooks/useAppDispatch";
import comeBack from '../assets/img/grey-arrow-left.svg'


const Cart = () => {
    const {totalPrice, items} = useSelector(selectCart);
    const dispatch = useAppDispatch();
    const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0);

    const onClickClear = () => {
        if (window.confirm('Empty trash?')) {
            dispatch(cartActions.clearItems());
        }
    };
    return (
        <>
            {totalPrice > 0  ? <div className="container container--cart">
                <div className="cart">
                    <div className="cart__top">
                        <h2 className="content__title">
                            <img width="50" height="50" src="https://img.icons8.com/ios/50/shopping-cart--v1.png" alt="shopping-cart--v1"/>
                            Cart
                        </h2>
                        <div onClick={onClickClear}
                             className="cart__clear"
                        >
                            <img width="20" height="20" src="https://img.icons8.com/ios/50/delete-forever--v1.png" alt="delete-forever--v1"/>
                            <span>Clear the cart</span>
                        </div>
                    </div>
                    <div className="content__items">
                        {items.map((item: any) => (
                            <CartItem key={item.id} {...item} />
                        ))}
                    </div>
                    <div className="cart__bottom">
                        <div className="cart__bottom-details">
                            <span> Total burgers: <b>{totalCount} pcs.</b> </span>
                            <span> Order price: <b>{totalPrice} ₽</b> </span>
                        </div>
                        <div className="cart__bottom-buttons">
                            <Link to="/" className="button button--outline button--add go-back-btn">
                                <img src={comeBack} alt={'comeBack'}/>
                                <span>Come back</span>
                            </Link>
                            <div className="button pay-btn">
                                <span>Pay now</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <EmptyCart/>}
        </>
    );
};

export default Cart;