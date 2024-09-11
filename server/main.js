import { app } from "./server.js";

app.get('/', (_req, res) => {
    return res.status(200).json("Holi :3");
})

app.listen(app.get("port"), () => {
    console.log("Server http encendido! 😎");
});