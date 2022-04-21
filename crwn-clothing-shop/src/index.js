import React from 'react';
import ReactDOM from "react-dom/client";
//import { render } from 'react-dom';
import './index.scss';
import App from './App';

import { UserProvider } from './contexts/user.context';
import { ProductProvider } from './contexts/products.context';

import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { CartProvider } from './contexts/cart.context';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
          <App />
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
);

reportWebVitals();