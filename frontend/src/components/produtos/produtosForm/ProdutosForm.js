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
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

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
        setImagePreview(data.imagemUrl || "");
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrorMessage('Por favor, selecione apenas arquivos de imagem.');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('A imagem deve ter no máximo 5MB.');
        return;
      }

      setSelectedImage(file);
      
      compressImage(file).then((compressedDataUrl) => {
        setImagePreview(compressedDataUrl);
      });
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        const maxWidth = 800;
        const maxHeight = 600;
        
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }
        
        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);
        
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
        resolve(compressedDataUrl);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleBack = () => {
    navigate("/produtos");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imagemUrl = formData.imagemUrl;

      if (selectedImage) {
        imagemUrl = await compressImage(selectedImage);
      }

      const payload = {
        ...formData,
        preco: Number(formData.preco),
        categoriaId: Number(formData.categoriaId),
        imagemUrl: imagemUrl,
      };

      if (isEditing) {
        await updateProduto(id, payload);
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

          <div className="form-group-produtoform">
            <label htmlFor="imagem">Imagem do Produto</label>
            <input
              type="file"
              id="imagem"
              name="imagem"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
            <small className="file-help">
              Selecione uma imagem (máximo 5MB). Formatos aceitos: JPG, PNG, GIF.
            </small>
          </div>

          {imagePreview && (
            <div className="image-preview-container">
              <label>Prévia da Imagem:</label>
              <img 
                src={imagePreview} 
                alt="Prévia" 
                className="image-preview"
              />
            </div>
          )}

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
