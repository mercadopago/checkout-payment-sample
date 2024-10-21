import { pool } from "../db.js";

export default class User {

    static table_name = "users";

    static async getAll() {
        const [result] = await pool.query(`SELECT * FROM ${this.table_name}`);
        return result;
    }

}