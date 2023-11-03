import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

type BurgerType = {
    imageUrl: string;
    title: string;
    price: number;
}
const BurgerPage = () => {
    const [burgers, setBurger] = useState<BurgerType | undefined>();
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchBurgers() {
            try {
                const { data } = await axios.get('https://650ab691dfd73d1fab08bfd5.mockapi.io/items/' + id);
                setBurger(data);
            } catch (error) {
                alert('Error when receiving burger!');
                navigate('/');
            }
        }
        fetchBurgers();
    }, []);

    if (!burgers) {
        return <>Loading...</>;
    }

    return (
        <div className="container">
            <img className="burger-block__image" src={burgers.imageUrl} alt={'burger'}/>
            <h2>{burgers.title}</h2>
            <h4>{burgers.price} ₽</h4>
            <Link to="/">
                <button className="button button--outline button--add">
                    <span>Back</span>
                </button>
            </Link>
        </div>
    );
};

export default BurgerPage;