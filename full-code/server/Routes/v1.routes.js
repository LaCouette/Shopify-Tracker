import express from 'express';
import { getRunProducts, getTotalProducts, resetData, addProduct } from '../Controllers/product.controller.js';

const router = express.Router();



router.get("/products/run", getRunProducts);

router.get("/products/total", getTotalProducts);

router.get("/products/reset", resetData);

router.post("/products/add", addProduct);

router.use("*", (req, res) => {
    res.status(404).json({
        status: 404,
        error: "Not found"
    });
});

export default router;