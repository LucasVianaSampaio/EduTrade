import { useState, useEffect, useCallback } from "react";
import { getCategoriasByFilters, deleteCategoria } from "../../services/categoriasService"
import { Link } from "react-router-dom";
import "./Categorias.css";

const Produtos = () => {
    const [categorias, setCategorias] = useState([]);
    const [filters, setFilters] = useState({ nome: ""});
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const fetchCategorias = useCallback(async () => {
        try {
            const data = await getCategoriasByFilters();
            setCategorias(data);
            setTotalRecords(data.total);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Erro ao carregar categorias.");
            clearMessages();
        }
    }, []);

    useEffect(() => {
        fetchCategorias();
    }, [fetchCategorias]);


    const handleDelete = async (id) => {
        try {
            await deleteCategoria(id);
            setSuccessMessage("Categoria excluída com sucesso!");
            fetchCategorias();
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Erro ao excluir categoria.");
        } finally {
            clearMessages();
        }
    };

    const handleLimitChange = (e) => {
        setLimit(Number(e.target.value));
        setPage(1);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const clearMessages = () => {
        setTimeout(() => {
            setErrorMessage("");
            setSuccessMessage("");
        }, 3000);
    };

    return (
        <div className="categoria-container">
            <h2 className="categoria-title">Relação de Categorias</h2>

            <Link to="/categoriasform">
                <button className="categoria-btn-new">Nova Categoria</button>
            </Link>

            {errorMessage && <p className="error-message">{errorMessage}</p>} 
            {successMessage && <p className="success-message">{successMessage}</p>}

            <div className="categoria-filter">
                <span>Pesquisar</span>
                <input type="text" name="nome" placeholder="Buscar por nome" value={filters.nome} onChange={handleFilterChange} />
            </div>

            <div className="categoria-list">
                <div className="categoria-table-wrapper">
                    <table className="categoria-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categorias.map((categoria) => (
                                <tr key={categoria.id}>
                                    <td>{categoria.nome}</td>
                                    <td>{categoria.descricao}</td>
                                    <td>
                                        <Link to={`/CategoriasForm/${categoria.id}`}>
                                            <button className="categoria-btn-edit">Editar</button>
                                        </Link>
                                        <button className="categoria-btn-delete" onClick={() => handleDelete(categoria.id)}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="categoria-pagination">
                <p>Total: {totalRecords}</p>
                <label className="label-categoria-pagination">
                    Registros por página:
                    <select value={limit} onChange={handleLimitChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </label>
            </div>

            <div className="pagination-info-categoria">
                <span>
                    Mostrando de {((page - 1) * limit) + 1} até {Math.min(page * limit, totalRecords)} de {totalRecords} registros
                </span>
                <div className="pagination-buttons-categoria">
                    <button onClick={() => setPage(Math.max(page - 1, 1))}>Anterior</button>
                    <span>Página {page}</span>
                    <button onClick={() => setPage(Math.min(page + 1, Math.ceil(totalRecords / limit)))}>Próxima</button>
                </div>
            </div>
        </div>
    );
};

export default Produtos;