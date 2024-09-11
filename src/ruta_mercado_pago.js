import { Router } from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";

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


router.post("/preference", async function (req, res) {

    const { products } = req.body;

    const data = {
        items: [
            /**
            title: req.body.description,
            unit_price: Number(req.body.price),
            quantity: Number(req.body.quantity),
            */
            ...products
        ],
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