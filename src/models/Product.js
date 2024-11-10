import { pool } from "../db.js";
import { v4 as uuidv4 } from "uuid";

export default class Product {

    static table_name = "products";

    // Obtener todos los productos
    static async getAll() {
        const [result] = await pool.query(`SELECT * FROM ${this.table_name}`);
        return result.map(product => ({
            ...product,
            tags: JSON.parse(product.tags) // Convertir tags de JSON a array
        }));
    }

    // Obtener un producto por ID
    static async getById(id) {
        const [result] = await pool.query(`SELECT * FROM ${this.table_name} WHERE id = ?`, [id]);
        if (result.length > 0) {
            return {
                ...result[0],
                tags: JSON.parse(result[0].tags) // Convertir tags de JSON a array
            };
        }
        return null; // Si no existe el producto
    }

    // Crear un nuevo producto
    static async create({ name, price, tags, image }) {
        const id = uuidv4()
        const [result] = await pool.query(
            `INSERT INTO ${this.table_name} (id, name, price, tags, image) VALUES (?, ?, ?, ?, ?)`,
            [id, name, price, JSON.stringify(tags), image] // Convertir tags de array a JSON
        );
        return result; // Regresa el ID del nuevo producto
    }

    // Actualizar un producto existente
    static async update(id, { name, price, tags, image }) {
        const [result] = await pool.query(
            `UPDATE ${this.table_name} SET name = ?, price = ?, tags = ?, image = ? WHERE id = ?`,
            [name, price, JSON.stringify(tags), image, id] // Convertir tags de array a JSON
        );
        return result.affectedRows; // Regresa el número de filas afectadas
    }

    // Eliminar un producto
    static async delete(id) {
        const [result] = await pool.query(`DELETE FROM ${this.table_name} WHERE id = ?`, [id]);
        return result.affectedRows; // Regresa el número de filas afectadas
    }
}
