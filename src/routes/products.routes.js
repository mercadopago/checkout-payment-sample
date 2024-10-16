import { Router } from "express";

const original_products = [
    {
        title: "Old Prince Premium (Perro adulto) ..",
        price: 6400,
        image: "/img/productos/1.webp",
        id: crypto.randomUUID(),
        type: "dog"
    },
    {
        title: "Purina Excelent (Perro adulto)",
        price: 5500,
        image: "/img/productos/2.webp",
        id: crypto.randomUUID(),
        type: "dog"
    },
    {
        title: "Purina Pro Plan (Perro adulto)",
        price: 3450,
        image: "/img/productos/3.webp",
        id: crypto.randomUUID(),
        type: "dog"
    },
    {
        title: "Purina excelent (Perro adulto)",
        price: 6900,
        image: "/img/productos/4.webp",
        id: crypto.randomUUID(),
        type: "dog"
    },
    {
        title: "Old Prince (Gato adulto)",
        price: 2440,
        image: "/img/productos/5.webp",
        id: crypto.randomUUID(),
        type: "dog"
    },
    {
        title: "Wishkas (Gato adulto)",
        price: 9000,
        image: "/img/productos/6.webp",
        id: crypto.randomUUID(),
        type: "cat"
    },
    {
        title: "Agility (Perro adulto)",
        price: 9000,
        image: "/img/productos/7.webp",
        id: crypto.randomUUID(),
        type: "dog"
    },
    {
        title: "Pro Plan (Perro adulto)",
        price: 9000,
        image: "/img/productos/8.webp",
        id: crypto.randomUUID(),
        type: "dog"
    },
    {
        title: "Therapy (Perro adulto)",
        price: 9000,
        image: "/img/productos/9.webp",
        id: crypto.randomUUID(),
        type: "dog"
    },
];

const router = Router();

router.get("/", (req, res) => {

    return res.status(200).json({
        products: original_products
    });

});

export default router;