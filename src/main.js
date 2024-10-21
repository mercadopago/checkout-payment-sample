import { config as setEnviroment } from "dotenv";
import app from "./server.js";
import mp_rutas from "./routes/mp.routes.js";
import products_rutas from "./routes/products.routes.js";
import User from "./models/User.js";

setEnviroment();

app.use("/mp", mp_rutas);
app.use("/products", products_rutas);

app.get("/ok", (_req, res) => {
    return res.json({
        message: "El servidor esta andando! :D"
    });
});

app.get("/test", async (_req, res) => {
    return res.json(
        await User.getAll()
    );
});

app.use((req, res) => {

    let page_name = req.url.slice(1);

    if (page_name == "") page_name = "index";

    res.sendFile(req.fromRoot("pages", `${page_name}.html`), () => {
        res.sendFile(req.fromRoot("pages", "404.html"));
    });

    return;

});

app.listen(app.get("port"), () => {
    console.log("Server http encendido! 😎");
});