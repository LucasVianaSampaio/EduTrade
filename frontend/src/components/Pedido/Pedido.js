import React, { useEffect, useState } from 'react';
import './Pedido.css';
import { criarPedido } from '../../services/pedidoService';
import { getCarrinho } from '../../services/carrinhoService';
import { useLocation, useNavigate } from 'react-router-dom';

function Pedido() {
  const location = useLocation();
  const navigate = useNavigate();

  const produtoUnico = location.state?.produto || null;
  const quantidadeUnica = location.state?.quantidade || 1;

  const [itens, setItens] = useState([]);
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (produtoUnico) {
      setItens([{
        produto: produtoUnico,
        quantidade: quantidadeUnica
      }]);
    } else {
      // Veio do carrinho
      getCarrinho().then(data => setItens(data));
    }
  }, [produtoUnico, quantidadeUnica]);

  const total = itens.reduce((acc, item) => acc + item.produto.preco * item.quantidade, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem('');
    try {
      if (produtoUnico) {
        await criarPedido({
          endereco,
          telefone,
          observacoes,
          itens: [{
            produtoId: produtoUnico.id,
            quantidade: quantidadeUnica,
            precoUnitario: produtoUnico.preco
          }]
        });
      } else {
        await criarPedido({ endereco, telefone, observacoes });
      }
      setMensagem('Pedido realizado com sucesso!');
      setTimeout(() => navigate('/pedido'), 1500);
    } catch (error) {
      setMensagem('Erro ao finalizar pedido');
    }
    setLoading(false);
  };

  return (
    <div className="pedido-container">
      <h2>Finalizar Pedido</h2>
      <div className="pedido-itens">
        <h3>Itens do Pedido</h3>
        {itens.length === 0 ? (
          <p>Nenhum item selecionado.</p>
        ) : (
          <ul>
            {itens.map((item, idx) => (
              <li key={idx}>
                <span>{item.produto.titulo}</span> - 
                <span>Qtd: {item.quantidade}</span> - 
                <span>R$ {(item.produto.preco * item.quantidade).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="pedido-total">
          <strong>Total: R$ {total.toFixed(2)}</strong>
        </div>
      </div>
      <form className="pedido-form" onSubmit={handleSubmit}>
        <label>
          Endereço de entrega:
          <input
            type="text"
            value={endereco}
            onChange={e => setEndereco(e.target.value)}
            required
          />
        </label>
        <label>
          Telefone para contato:
          <input
            type="text"
            value={telefone}
            onChange={e => setTelefone(e.target.value)}
            required
          />
        </label>
        <label>
          Observações:
          <textarea
            value={observacoes}
            onChange={e => setObservacoes(e.target.value)}
          />
        </label>
        <button type="submit" disabled={loading || itens.length === 0}>
          {loading ? 'Enviando...' : 'Finalizar Pedido'}
        </button>
      </form>
      {mensagem && <div className="pedido-mensagem">{mensagem}</div>}
    </div>
  );
}

export default Pedido;