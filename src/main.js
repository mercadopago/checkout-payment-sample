import { app } from "./server.js";
import mp_rutas from "./ruta_mercado_pago.js";

app.use("/mp", mp_rutas);

app.get("/ok", (req, res) => {
    return res.json({
        message: "El servidor esta andando! :D"
    });
});

app.post("/buy", (req, res) => {
    console.log(req.body);
    return res.status(200);
})

app.listen(app.get("port"), () => {
    console.log("Server http encendido! 😎");
});