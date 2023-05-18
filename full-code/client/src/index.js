import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import ProductsTable from './components/ProductsTable';
import AddProduct from './components/AddProduct';
import ResetData from './components/ResetData';
import NotFound from './components/NotFound';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} >
                <Route index element={<ProductsTable isRunData={true} />} />
                <Route path="total-data" element={<ProductsTable isRunData={false} />} />
                <Route path="add-product" element={<AddProduct />} />
                <Route path="reset-data" element={<ResetData />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    </BrowserRouter >
);