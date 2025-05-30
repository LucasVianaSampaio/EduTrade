import { useEffect, useState, useCallback } from "react";
import { getProdutosByFilters } from "../../services/produtosService";
import { getCategoriasByFilters } from "../../services/categoriasService";

import "./Home.css";

const Home = () => {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  return (
    <div className="home-page-container">
      <h2 className="home-title">Bem-vindo ao EduTrade</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="home-featured">
        <h3>Lista de Produtos</h3>
        <ul>
          {produtos.length > 0 ? (
            produtos.map((produto) => (
              <li key={produto.id}>
                <img
                  src={"https://img.olx.com.br/images/12/123546280105650.jpg"}
                  alt={produto.titulo}
                  style={{
                    width: "100px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                {produto.titulo} - {`R$${produto.preco}`}
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
