import express from "express";
import cors from "cors";
import helmet from "helmet";

export const app = express();

app.use(express.json());

app.use(express.urlencoded({
    extended: false
}));

app.use(cors());

app.use(helmet());

app.set("port", process.env.PORT ?? 8080);