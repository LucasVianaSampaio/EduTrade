import { useEffect, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { getProdutosByFilters } from "../../services/produtosService";
import { getCategoriasByFilters } from "../../services/categoriasService";
import { adicionarItemAoCarrinho } from '../../services/carrinhoService';

import "./Home.css";

const Home = () => {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const fetchProdutos = useCallback(async () => {
    try {
      const data = await getProdutosByFilters();
      setProdutos(data);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Erro ao carregar produtos."
      );
      clearMessages();
    }
  }, []);

  const fetchCategorias = useCallback(async () => {
    try {
      const data = await getCategoriasByFilters();
      setCategorias(data);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Erro ao carregar categorias."
      );
      clearMessages();
    }
  }, []);

  useEffect(() => {
    document.title = "EduTrade - Compra e Venda de materiais";
    fetchProdutos();
    fetchCategorias();
  }, [fetchProdutos, fetchCategorias]);

  const clearMessages = () => {
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };

  const handleAdicionarCarrinho = async (produtoId) => {
    try {
      await adicionarItemAoCarrinho(produtoId, 1);
      setSuccessMessage('Produto adicionado ao carrinho!');
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (error) {
      setErrorMessage('Erro ao adicionar ao carrinho.');
      clearMessages();
    }
  };

  return (
    <div className="home-page-container">
      <h2 className="home-title">Bem-vindo ao EduTrade</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <div className="home-featured">
        <h3>Lista de Produtos</h3>
        <ul>
          {produtos.length > 0 ? (
            produtos.map((produto) => (
              <li key={produto.id}>
                <img
                  src={produto.imagemUrl}
                  alt={produto.titulo}
                  style={{
                    width: "100px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <div className="carrinho-texto">
                  <div className="carrinho-titulo"><strong>{produto.titulo}</strong></div>
                  <div className="carrinho-preco">{`R$${produto.preco.toFixed(2)}`}</div>
                  <button
                    className="btn-adicionar-carrinho"
                    onClick={() => handleAdicionarCarrinho(produto.id)}
                  >
                    Carrinho
                  </button>
                  <button
                    className="btn-adicionar-carrinho"
                    onClick={() => navigate('/pedido', { state: { produto, quantidade: 1 } })}
                  >
                    Comprar
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>Nenhum produto em destaque encontrado.</p>
          )}
        </ul>
      </div>

      <div className="home-categories">
        <h3>Categorias Populares</h3>
        <div className="categories-list">
          {categorias.map((categoria, index) => (
            <span key={index} className="category">
              {categoria.nome}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
