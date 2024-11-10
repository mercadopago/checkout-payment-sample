import { Router } from "express";
import CodigoPostal from "../models/CodigoPostal.js";

const router = Router();

router.get("/", async (req, res) => {
    return res.json(await CodigoPostal.getAll());
});

router.get("/:cp", async (req, res) => {
    const result = await CodigoPostal.getByCP(req.params.cp);

    if (!result) return res.status(404).json({
        message: "Envio no disponible para esa zona."
    })

    return res.json(result);
})

export default router;