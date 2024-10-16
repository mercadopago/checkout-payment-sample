import { Router } from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { body, validationResult } from "express-validator";

const router = Router();

const client = new MercadoPagoConfig({
    accessToken: "APP_USR-3338153327237083-091421-a3dcc8f1836ba5dca212648316f6ecd1-1105831639"
});

/**
 * @param {Express.Request} request 
 * @param {Express.Response} res 
 * @param {import("express").NextFunction} next 
*/
const preference_error_handler = (request, res, next) => {

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        console.log({ errors: errors.array() })
        return res.status(400).json({ errors: errors.array() });
    }

    const { products } = request.body;

    res.locals.products = products.map(product => ({
        title: product.title,
        unit_price: Number(product.price),
        quantity: Number(product.quantity),
        currency_id: "ARS"
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

    if (req.query.test != undefined) {
        console.log("A continuación se muestra los datos sobre los productos: ");
        console.log(res.locals.products);
        return res.status(200).json({
            id: -1
        });
    }

    const data = {
        items: res.locals.products,
        back_urls: {
            "success": `http://localhost:8080/mp/feedback`,
            "failure": `http://localhost:8080/mp/feedback`,
            "pending": `http://localhost:8080/mp/feedback`
        },
        auto_return: "approved",
    };

    try {

        const preference = new Preference(client);
        const result = await preference.create({ body: data });

        return res.status(200).json({
            id: result.id
        });

    } catch (e) {

        console.log(e);

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