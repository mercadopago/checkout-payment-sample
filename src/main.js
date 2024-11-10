import { config as setEnviroment } from "dotenv";
import app from "./server.js";
import mp_rutas from "./routes/mp.routes.js";
import products_rutas from "./routes/products.routes.js";
import auth_rutas from "./routes/auth.routes.js";
import cp_routes from "./routes/cp.routes.js";

setEnviroment();

app.use("/mp", mp_rutas);
app.use("/products", products_rutas);
app.use("/auth", auth_rutas);
app.use("/cp", cp_routes);

app.get("/ok", (_req, res) => {
    return res.json({
        message: "El servidor esta andando! :D"
    });
});

app.use((req, res) => {

    let page_name = req.url.slice(1);

    if (page_name == "") page_name = "index";

    res.sendFile(req.fromRoot("pages", `${page_name}.html`), (err) => {
        if (err) res.sendFile(req.fromRoot("pages", "404.html"));
    });

    return;

});

app.listen(app.get("port"), () => {
    console.log("Server https encendido! 😎");
});