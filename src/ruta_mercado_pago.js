import { Router } from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { body, validationResult } from "express-validator";

const router = Router();

const client = new MercadoPagoConfig({
    accessToken: "<token>"
});

router.get('/feedback', function (req, res) {
    return res.json({
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id
    });
});

const preference_validator = [
    body("products").exists("Tu carrito esta vacio"),
    body("products").isArray().withMessage("Este campo debe ser una lista de productos"),
    body("products.*.title").exists().isString().withMessage("El nombre del producto debe ser un string"),
    body("products.*.unit_price").exists().isNumeric().withMessage("El precio unitario debe ser un numero"),
    body("products.*.quantity").exists().isNumeric().withMessage("La cantidad debe ser un numero")
];

router.post("/preference", ...preference_validator, async function (req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { products } = req.body;

    const data = {
        items: [...products],
        back_urls: {
            "success": `http://localhost:${req.app.get("port")}/feedback`,
            "failure": `http://localhost:${req.app.get("port")}/feedback`,
            "pending": `http://localhost:${req.app.get("port")}/feedback`
        },
        auto_return: "approved",
    };

    try {

        const preference = new Preference(client);
        const result = await preference.create(data);

        return res.status(200).json({
            id: result.id
        });

    } catch (e) {

        return res.status(500).json({
            message: "Hubo un error al pagar con Mercado Pago"
        });

    }
});


export default router;