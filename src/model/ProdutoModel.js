import dotenv from 'dotenv';
dotenv.config();

import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DATABASE_USERNAME,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

class ProdutoModel {
  constructor() {
    this.pool = pool;
  }

  
  async create({ nome, descricao, preco, estoque, data }) {
    try {
      console.log(`Iniciando a criação de produto: { nome: ${nome}, descricao: ${descricao}, preco: ${preco}, estoque: ${estoque}, data: ${data} }`);
      const result = await this.pool.query(
        `INSERT INTO produtos (nome, descricao, preco, estoque, data) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [nome, descricao, preco, estoque, data]
      );
      console.log(`Produto criado com sucesso: ${JSON.stringify(result.rows[0])}`);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao criar o produto:', error.message);
      throw new Error('Erro ao criar o produto no banco de dados.');
    }
  }

  
  async findAll() {
    try {
      console.log('Buscando todos os produtos...');
      const result = await this.pool.query(`SELECT * FROM produtos ORDER BY id ASC`);
      console.log(`Produtos encontrados: ${result.rows.length}`);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar todos os produtos:', error.message);
      throw new Error('Erro ao buscar produtos no banco de dados.');
    }
  }

  
  async findByPk(id) {
    try {
      console.log(`Buscando produto com ID: ${id}`);
      const result = await this.pool.query(`SELECT * FROM produtos WHERE id = $1`, [id]);
      if (result.rows.length === 0) {
        console.log(`Nenhum produto encontrado com ID: ${id}`);
        return null;
      }
      console.log(`Produto encontrado: ${JSON.stringify(result.rows[0])}`);
      return result.rows[0];
    } catch (error) {
      console.error(`Erro ao buscar o produto com ID ${id}:`, error.message);
      throw new Error('Erro ao buscar o produto no banco de dados.');
    }
  }

  
  async update(id, { nome, descricao, preco, estoque, data }) {
    try {
      console.log(`Atualizando produto com ID: ${id}`);
      const result = await this.pool.query(
        `UPDATE produtos 
         SET nome = $1, descricao = $2, preco = $3, estoque = $4, data = $5 
         WHERE id = $6 
         RETURNING *`,
        [nome, descricao, preco, estoque, data, id]
      );
      if (result.rows.length === 0) {
        console.log(`Nenhum produto encontrado para atualização com ID: ${id}`);
        return null;
      }
      console.log(`Produto atualizado com sucesso: ${JSON.stringify(result.rows[0])}`);
      return result.rows[0];
    } catch (error) {
      console.error(`Erro ao atualizar o produto com ID ${id}:`, error.message);
      throw new Error('Erro ao atualizar o produto no banco de dados.');
    }
  }

  
  async delete(id) {
    try {
      console.log(`Marcando o produto com ID ${id} como deletado...`);
      const result = await this.pool.query(
        `UPDATE produtos SET deleted = true WHERE id = $1 RETURNING *`,
        [id]
      );
      if (result.rows.length === 0) {
        console.log(`Nenhum produto encontrado para exclusão com ID: ${id}`);
        return null;
      }
      console.log(`Produto com ID ${id} marcado como deletado.`);
      return result.rows[0];
    } catch (error) {
      console.error(`Erro ao deletar o produto com ID ${id}:`, error.message);
      throw new Error('Erro ao deletar o produto no banco de dados.');
    }
  }
}

export default new ProdutoModel();