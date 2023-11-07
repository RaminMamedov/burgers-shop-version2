import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectBurgers } from "../redux/burgersSlice/selectBurgers";
import { fetchBurgerById } from "../redux/burgersSlice/asyncActionsBurger";
import { useAppDispatch } from "../customHooks/useAppDispatch";
import { Status } from "../redux/burgersSlice/burgerTypes";
import { Loader } from "../components/Loader";

const BurgerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentBurger, status } = useSelector(selectBurgers);

  useEffect(() => {
    if (id) {
      dispatch(fetchBurgerById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (status === Status.ERROR) {
      navigate("/");
    }
  }, [status, navigate]);


  if (!currentBurger) {
    return (<Loader/>)
  }

  return (
    <div className="burger-page">
      <img className="burger-page__image" src={currentBurger.imageUrl} alt={"burger"} />
      <h2 className="burger-page__title">Description:</h2>
      <p className="burger-page__description">{currentBurger.description}</p>
      <div className="burger-page__bottom">
        <h2>{currentBurger.title}</h2>
        <h4>{currentBurger.price} ₽</h4>
        <Link to="/">
          <button className="button button--outline button--add">
            <span>Back</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BurgerPage;
