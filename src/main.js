import { app } from "./server.js";
import mp_rutas from "./ruta_mercado_pago.js";

app.get('/', (_req, res) => {
    return res.status(200).json("Holi :3");
});

app.use("/mp", mp_rutas);

app.listen(app.get("port"), () => {
    console.log("Server http encendido! 😎");
});