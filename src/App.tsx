import React, { lazy, Suspense } from "react";
import "./scss/app.scss";
import { Home } from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Loader } from "./../src/components/Loader";

const BurgerPage = lazy(() => import(/* webpackChunkName: "BurgerPage" */ "./pages/BurgerPage"));
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound"));
const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ "./pages/Cart"));
const PaymentPage = lazy(() => import(/* webpackChunkName: "PaymentPage" */ "./pages/PaymentPage/PaymentPage"));

function App() {
  return (
    <Suspense fallback={<Loader/>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/burgers-shop-version2/" element={<Home />} />
          <Route index element={<Home />} />
          <Route path="/burger/:id" element={<BurgerPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
