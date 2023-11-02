import React from 'react';
import {Link, useLocation} from "react-router-dom";
import {Search} from "../components/Search/Search";
import logo from '../assets/img/burger-logo.svg';
import {useSelector} from "react-redux";
import {selectCart} from "../redux/cartSlice/selectCart";
import cartItem from '../assets/img/cart-item.png';


export const Header = () => {
    const {totalPrice, items} = useSelector(selectCart);
    const location = useLocation();

    const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0);

    return (
        <div className="header">
            <div className="container">
                <Link to='/'>
                    <div className="header__logo">
                        <img width="60" src={logo} alt="Burger logo"/>
                        <div>
                            <h1>Burgers</h1>
                            <p>the most delicious burgers</p>
                        </div>
                    </div>
                </Link>
                <Search/>
                <div className="header__cart">
                    {location.pathname !== '/cart' && (
                        <Link to='/cart' className="button button--cart">
                            <span>{totalPrice} ₽</span>
                            <div className="button__delimiter"></div>
                            <img width="18" height="18" src={cartItem} alt="shopping-cart"/>
                            <span>{totalCount}</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};
