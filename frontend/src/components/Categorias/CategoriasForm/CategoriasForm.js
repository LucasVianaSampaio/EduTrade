import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CategoriasForm.css";
import { createCategoria, getCategoriaById, updateCategoria } from "../../../services/categoriasService"

const ProdutosForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchCategoryData = useCallback(async (categoriaId) => {
    try {
      const data = await getCategoriaById(categoriaId);
      if (data) {
        setFormData({
          nome: data.nome || "",
          descricao: data.descricao || "",
        });
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Erro ao carregar categoria."
      );
      clearMessages();
    }
  }, []);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      fetchCategoryData(id);
    }
  }, [id, fetchCategoryData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBack = () => {
    navigate("/categorias");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        await updateCategoria(id, formData);
        setSuccessMessage("Categoria atualizada com sucesso!");
      } else {
        await createCategoria(formData);
        setSuccessMessage("Categoria cadastrada com sucesso!");
      }
      setTimeout(() => navigate("/categorias"), 2000);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Erro ao salvar categoria."
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
    <div className="categoriaform-container">
      <div className="form-container-categoriaform">
        <h2 className="form-title-categoriaform">
          {isEditing ? "Editar Categoria" : "Cadastrar Categoria"}
        </h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group-categoriaform">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Digite o nome da categoria"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group-categoriaform">
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
            className="form-button-categoriaform"
            disabled={loading}
          >
            {loading ? "Salvando..." : isEditing ? "Atualizar" : "Cadastrar"}
          </button>
          <button
            className="form-button-cancel-categoriaform"
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
