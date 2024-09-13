import { Router } from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { body, validationResult } from "express-validator";

const router = Router();

const client = new MercadoPagoConfig({
    accessToken: "<token>"
});

/**
 * @param {Express.Request} request 
 * @param {Express.Response} res 
 * @param {import("express").NextFunction} next 
*/
const preference_error_handler = (request, res, next) => {

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { products } = request.body;

    res.locals.products = products.map(product => ({
        title: product.title,
        unit_price: product.price,
        quantity: product.quantity
    }));

    next();

}

const preference_validator = [
    body("products").exists("Tu carrito esta vacio"),
    body("products").isArray().withMessage("Este campo debe ser una lista de productos"),
    body("products.*.title").exists().isString().withMessage("El nombre del producto debe ser un string"),
    body("products.*.price").exists().isNumeric().withMessage("El precio unitario debe ser un numero"),
    body("products.*.quantity").exists().isNumeric().withMessage("La cantidad debe ser un numero"),
    preference_error_handler
];

router.post("/preference", ...preference_validator, async function (req, res) {

    if (req.params.test) {
        console.log("A continuación se muestra los datos sobre los productos: ");
        console.log(res.locals.products);
        return res.status(200).json({
            id: -1
        });
    }

    const data = {
        items: [...res.locals.products],
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
            message: "Hubo un error al pagar con Mercado Pago",
            id: -1
        });

    }
});

router.get('/feedback', function (req, res) {
    return res.json({
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id
    });
});

export default router;