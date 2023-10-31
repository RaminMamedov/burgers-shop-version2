import React from 'react';
import './scss/app.scss';
import {Home} from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import Cart from "./pages/Cart";
import {BurgerPage} from "./pages/BurgerPage";
import {MainLayout} from "./layouts/MainLayout";
import {NotFound} from "./pages/NotFound";


function App() {

    return (
        <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route path={'/burgers-shop'} element={<Home/>}/>
                <Route path={''} element={<Home/>}/>
                <Route path={'/burger/:id'} element={<BurgerPage/>}/>
                <Route path={'/cart'} element={<Cart/>}/>
                <Route path={'/*'} element={<NotFound/>}/>
            </Route>
        </Routes>
    );
}

export default App;
