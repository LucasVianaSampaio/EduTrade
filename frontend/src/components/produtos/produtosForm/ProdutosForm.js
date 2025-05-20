import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProdutosForm.css";
import {
  createProduto,
  getProdutoById,
  updateProduto,
} from "../../../services/produtosService";
import { getCategoriasByFilters } from "../../../services/categoriasService";

const ProdutosForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: "",
    preco: "",
    descricao: "",
    categoriaId: "",
    imagemUrl: "https://exemplo.com/imagem-mouse.jpg",
    disponivel: true,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [categorias, setCategorias] = useState([]);

  const fetchProductData = useCallback(async (produtoId) => {
    try {
      const data = await getProdutoById(produtoId);
      if (data) {
        setFormData({
          titulo: data.titulo || "",
          preco: data.preco || "",
          descricao: data.descricao || "",
          categoriaId: data.categoriaId || "",
          imagemUrl: data.imagemUrl || "",
          disponivel: data.disponivel || true,
        });
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Erro ao carregar produto."
      );
      clearMessages();
    }
  }, []);

  const fetchCategorias = useCallback(async () => {
    try {
      const categorias = await getCategoriasByFilters();
      setCategorias(categorias);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Erro ao carregar categorias."
      );
      clearMessages();
    }
  }, []);

  useEffect(() => {
    fetchCategorias();
    if (id) {
      setIsEditing(true);
      fetchProductData(id);
    }
  }, [id, fetchProductData, fetchCategorias]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBack = () => {
    navigate("/produtos");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      preco: Number(formData.preco),
      categoriaId: Number(formData.categoriaId),
    };

    try {
      if (isEditing) {
        await updateProduto(id, formData);
        setSuccessMessage("Produto atualizado com sucesso!");
      } else {
        await createProduto(payload);
        setSuccessMessage("produto cadastrado com sucesso!");
      }
      setTimeout(() => navigate("/produtos"), 2000);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Erro ao salvar produto."
      );
    } finally {
      setLoading(false);
      clearMessages();
    }
  };

  const clearMessages = () => {
    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div className="produtoform-container">
      <div className="form-container-produtoform">
        <h2 className="form-title-produtoform">
          {isEditing ? "Editar Produto" : "Cadastrar Produto"}
        </h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group-produtoform">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              placeholder="Digite o nome do produto"
              value={formData.titulo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group-produtoform">
            <label htmlFor="preco">Preço</label>
            <input
              type="number"
              id="preco"
              name="preco"
              step={0.01}
              min={0}
              placeholder="Digite o preço do seu produto"
              value={formData.preco}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group-produtoform">
            <label htmlFor="categoria">Categoria</label>
            <select
              id="categoriaId"
              name="categoriaId"
              value={formData.categoriaId}
              onChange={handleChange}
              required
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group-produtoform">
            <label htmlFor="descricao">Descrição</label>
            <input
              type="text"
              id="descricao"
              name="descricao"
              placeholder="Digite a descrição do seu produto"
              value={formData.descricao}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="form-button-produtoform"
            disabled={loading}
          >
            {loading ? "Salvando..." : isEditing ? "Atualizar" : "Cadastrar"}
          </button>
          <button
            className="form-button-cancel-produtoform"
            onClick={handleBack}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProdutosForm;
