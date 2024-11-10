import mysql from "mysql2";
import { config } from "dotenv";

config()

const mysql_config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
};

export const pool = mysql.createPool(mysql_config).promise();

process.on("exit", () => {
    pool.destroy()
    console.log("Se cerro la conexión a la base de datos :)")
})