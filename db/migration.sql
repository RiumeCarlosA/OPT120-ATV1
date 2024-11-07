CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    estoque INT NOT NULL,
    data TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO produtos (nome, descricao, preco, estoque, data) 
VALUES 
('Produto A', 'Descrição do Produto A', 49.99, 10, '2024-11-01 10:00:00'),
('Produto B', 'Descrição do Produto B', 29.50, 25, '2024-11-02 11:30:00'),
('Produto C', 'Descrição do Produto C', 99.90, 5, '2024-11-03 09:45:00'),
('Produto D', 'Descrição do Produto D', 75.00, 20, '2024-11-04 14:20:00'),
('Produto E', 'Descrição do Produto E', 150.00, 8, '2024-11-05 16:00:00');
