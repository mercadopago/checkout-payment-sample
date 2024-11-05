CREATE TABLE `products`(
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `price` DECIMAL(8, 2) NOT NULL,
    `tags` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`)
);
CREATE TABLE `users`(
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`)
);
-- Insertar los datos proporcionados en la tabla products
INSERT INTO `products` (`id`, `name`, `price`, `image`, `tags`) VALUES
(UUID(), 'Old Prince Premium (Perro cachorro)', 6400, '/img/productos/1.webp', '["perro", "cachorro"]'),
(UUID(), 'Purina Excelent (Gato cachorro)', 5500, '/img/productos/2.webp', '["gato", "cachorro"]'),
(UUID(), 'Purina Pro Plan (Perro adulto)', 3450, '/img/productos/3.webp', '["perro", "adulto"]'),
(UUID(), 'Purina Excelent (Perro cachorro)', 6900, '/img/productos/4.webp', '["perro", "cachorro"]'),
(UUID(), 'Old Prince (Gato adulto)', 2440, '/img/productos/5.webp', '["gato", "adulto"]'),
(UUID(), 'Wishkas (Gato adulto)', 9000, '/img/productos/6.webp', '["gato", "adulto"]'),
(UUID(), 'Agility (Perro adulto)', 9000, '/img/productos/7.webp', '["perro", "adulto"]'),
(UUID(), 'Pro Plan (Perro adulto)', 9000, '/img/productos/8.webp', '["perro", "adulto"]'),
(UUID(), 'Therapy (Perro adulto)', 9000, '/img/productos/9.webp', '["perro", "adulto"]');