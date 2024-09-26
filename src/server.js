import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

export const app = express();

const fromRoot = (...p) => path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    ...p
)

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(cors());

app.set("port", process.env.PORT ?? 8080);

app.use(express.static(fromRoot("client")));
