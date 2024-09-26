import { app } from "./server.js";
import mp_rutas from "./ruta_mercado_pago.js";
import products_rutas from "./ruta_productos.js";

app.use("/mp", mp_rutas);
app.use("/products", products_rutas);

app.get("/ok", (_req, res) => {
    return res.json({
        message: "El servidor esta andando! :D"
    });
});

app.listen(app.get("port"), () => {
    console.log("Server http encendido! 😎");
});