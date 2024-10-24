import ProdutoModel from '../model/ProdutoModel.js'

class ProdutoController {

    async create(req, res) {
        try {
            console.log(`Salvando o produto: ${req.body}`);
            const produto = await ProdutoModel.create(req.body);
            return res.json(produto);
        } catch (e) {
           res.json(e);
        }
    }

    async findAll(req, res) {
        try {
            const produtos = await ProdutoModel.findAll();
            return res.json(produtos);
        } catch (e) {
            return res.json(null);
        }
    }

    async findById(req, res) {
        try {
            const produto = await ProdutoModel.findByPk(req.params.id);
            return res.json(produto);
        } catch (e) {
            return res.json(null);
        }
    }

    async update(req, res) {
        try {

            const produto = await ProdutoModel.findByPk(req.params.id);

            if(!produto) {
                return res.status(400).json({
                    errors: ['Produto não existe - {error.produto.update.produto.not-exist}\t\n']
                })
            }
            const novosDados = await produto.update(req.body);

            return res.json(novosDados);

        } catch (e) {
            return res.json(null);
        }
    }

    async delete(req, res) {
        try {
            const produto = await ProdutoModel.findByPk(req.params.id);
            
            if(!produto) {
                return res.status(400).json({
                    errors: ['Produto não existe - {error.produto.delete.produto.not-exist}\t\n']
                })
            }
            const novosDados = await produto.update({"deleted": true});

            return res.json(novosDados);
        } catch (e) {
            console.log(e);
            return res.json(null);
        }
    }
}

export default new ProdutoController();