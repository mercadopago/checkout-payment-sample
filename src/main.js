import { app } from "./server.js";
import mp_rutas from "./routes/mp.routes.js";
import products_rutas from "./routes/products.routes.js";

app.use("/mp", mp_rutas);
app.use("/products", products_rutas);

app.get("/ok", (_req, res) => {
    return res.json({
        message: "El servidor esta andando! :D"
    });
});

app.use((req, res) => {

    let page_name = req.url.slice(1);

    if (page_name == "") page_name = "index";

    return res.sendFile(req.fromRoot("pages", `${page_name}.html`), () => {
        res.sendFile(req.fromRoot("pages", "404.html"));
    });

});

app.listen(app.get("port"), () => {
    console.log("Server http encendido! 😎");
});