import { Router } from "express";
import Product from "../models/Product.js";

const router = Router();

router.get("/", async (_req, res) => {

    res.status(200).json({
        products: await Product.getAll()
    });

    return;

});

export default router;