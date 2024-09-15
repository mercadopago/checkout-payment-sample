import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

export const app = express();

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(cors());

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
            "'self'",
            "https://sdk.mercadopago.com",
            "https://api.mercadopago.com",
            "https://www.mercadolibre.com",
            "https://www.mercadolivre.com",
            "https://http2.mlstatic.com",
            "'unsafe-inline'"  // Solo si necesitas permitir scripts en línea
        ],
        styleSrc: [
            "'self'",
            "https://fonts.googleapis.com",
            "'unsafe-inline'"  // Necesario si usas estilos en línea como los que cargan fuentes
        ],
        fontSrc: [
            "'self'",
            "https://fonts.gstatic.com",
            "https://http2.mlstatic.com"
        ],
        imgSrc: [
            "'self'",
            "data:",
            "https://www.mercadolibre.com",
            "https://www.mercadolivre.com",
            "https://http2.mlstatic.com"
        ],
        connectSrc: [
            "'self'",
            "https://api.mercadopago.com",
            "https://api.mercadolibre.com",
            "https://fonts.googleapis.com",
            "https://events.mercadopago.com",
            "https://www.mercadolibre.com",
            "https://www.mercadolivre.com",
            "https://http2.mlstatic.com"
        ],
        frameSrc: ["'self'", "https://www.mercadolibre.com"]
    }
}));



app.set("port", process.env.PORT ?? 8080);

app.use(express.static(
    path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        "client"
    )
));