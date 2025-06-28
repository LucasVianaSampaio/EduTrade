import React, { useEffect, useState } from 'react';
import './Carrinho.css';
import { getCarrinho, atualizarQuantidadeItem, removerItemDoCarrinho, limparCarrinho } from '../../services/carrinhoService';
import { useNavigate } from 'react-router-dom';

function Carrinho() {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const carregarCarrinho = async () => {
  setLoading(true);
  try {
    const response = await getCarrinho();
    setItens(Array.isArray(response) ? response : []);
  } catch (error) {
    console.error(error);
    alert('Erro ao carregar carrinho');
    setItens([]); 
  }
  setLoading(false);
};

  useEffect(() => {
    carregarCarrinho();
  }, []);

  const handleQuantidade = async (produtoId, quantidade) => {
    if (quantidade < 1) return;
    await atualizarQuantidadeItem(produtoId, quantidade);
    carregarCarrinho();
  };

  const handleRemover = async (produtoId) => {
    await removerItemDoCarrinho(produtoId);
    carregarCarrinho();
  };

  const handleLimpar = async () => {
    await limparCarrinho();
    carregarCarrinho();
  };

  const total = Array.isArray(itens)
  ? itens.reduce((acc, item) => acc + item.produto.preco * item.quantidade, 0)
  : 0;

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="carrinho-container">
      {Array.isArray(itens) && itens.length === 0 ? (
  <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <table className="carrinho-tabela">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Total</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {itens.map(item => (
                <tr key={item.id}>
                  <td>{item.produto.titulo}</td>
                  <td>{item.produto.categoria.nome}</td>
                  <td>R$ {item.produto.preco.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantidade}
                      onChange={e => handleQuantidade(item.produtoId, parseInt(e.target.value))}
                      className="carrinho-quantidade"
                    />
                  </td>
                  <td>R$ {(item.produto.preco * item.quantidade).toFixed(2)}</td>
                  <td>
                    <button onClick={() => handleRemover(item.produtoId)} className="carrinho-remover">Remover</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="carrinho-total">
            <strong>Total: R$ {total.toFixed(2)}</strong>
          </div>
          <div className="carrinho-acoes">
            <button onClick={handleLimpar} className="carrinho-limpar">Limpar Carrinho</button>
            <button onClick={() => navigate('/pedido')} className="carrinho-finalizar">Finalizar Compra</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Carrinho;