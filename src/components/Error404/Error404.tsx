import React from "react";
import style from "../Error404/Error404.module.scss";
import errorImg from "../../assets/img/404.svg";

const Error404 = () => {
  return (
    <>
      <h1 className={style.text}>Error 404 Not Found</h1>
      <div className={style.wrapper}>
        <img src={errorImg} alt="404" className={style.error404} />
      </div>
    </>
  );
};

export default Error404;
