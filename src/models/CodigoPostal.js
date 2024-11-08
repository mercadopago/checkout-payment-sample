import { pool } from "../db.js";

export default class CodigoPostal {

    static table_name = "codigos_postales";

    // Obtener todos los códigos postales
    static async getAll() {
        const [result] = await pool.query(`SELECT * FROM ${this.table_name}`);
        return result;
    }

    // Obtener un código postal por CP
    static async getByCP(cp) {
        const [result] = await pool.query(`SELECT * FROM ${this.table_name} WHERE CP = ?`, [cp]);
        return result.length > 0 ? result[0] : null; // Regresa el primer resultado si existe
    }

    // Crear un nuevo código postal
    static async create({ CP, Provincia, Localidad, price }) {
        const [result] = await pool.query(
            `INSERT INTO ${this.table_name} (CP, Provincia, Localidad, price) VALUES (?, ?, ?, ?)`,
            [CP, Provincia, Localidad, price]
        );
        if (result) return CP; // Regresa el CP del nuevo código postal
        return null;
    }

    // Actualizar un código postal existente
    static async update(cp, { Provincia, Localidad, price }) {
        const [result] = await pool.query(
            `UPDATE ${this.table_name} SET Provincia = ?, Localidad = ?, price = ? WHERE CP = ?`,
            [Provincia, Localidad, price, cp]
        );
        return result.affectedRows; // Regresa el número de filas afectadas
    }

    // Eliminar un código postal
    static async delete(cp) {
        const [result] = await pool.query(`DELETE FROM ${this.table_name} WHERE CP = ?`, [cp]);
        return result.affectedRows; // Regresa el número de filas afectadas
    }
}
