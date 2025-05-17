import { useState, useEffect, useRef, useCallback } from "react";
import { getCategoriasByFilters, deleteCategoria } from "../../services/categoriasService"
import { Link } from "react-router-dom";
import "./Categorias.css";

const Produtos = () => {
    const [categorias, setCategorias] = useState([]);
    const [filters, setFilters] = useState({ nome: "", emailContato: "", cnpj: "" });
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const cnpjInputRef = useRef(null);

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
        <div className="editora-container">
            <h2 className="editora-title">Relação de Categorias</h2>

            <Link to="/categoriasform">
                <button className="editora-btn-new">Nova Categoria</button>
            </Link>

            {errorMessage && <p className="error-message">{errorMessage}</p>} 
            {successMessage && <p className="success-message">{successMessage}</p>}

            <div className="editora-filter">
                <span>Pesquisar</span>
                <input type="text" name="nome" placeholder="Buscar por nome" value={filters.nome} onChange={handleFilterChange} />
                <input type="email" name="emailContato" placeholder="Buscar por e-mail" value={filters.emailContato} onChange={handleFilterChange} />
                <input ref={cnpjInputRef} type="text" name="cnpj" placeholder="Buscar por CNPJ" value={filters.cnpj} onChange={handleFilterChange} />
            </div>

            <div className="editora-list">
                <div className="editora-table-wrapper">
                    <table className="editora-table">
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
                                            <button className="editora-btn-edit">Editar</button>
                                        </Link>
                                        <button className="editora-btn-delete" onClick={() => handleDelete(categoria.id)}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="editora-pagination">
                <p>Total: {totalRecords}</p>
                <label className="label-editora-pagination">
                    Registros por página:
                    <select value={limit} onChange={handleLimitChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </label>
            </div>

            <div className="pagination-info-editora">
                <span>
                    Mostrando de {((page - 1) * limit) + 1} até {Math.min(page * limit, totalRecords)} de {totalRecords} registros
                </span>
                <div className="pagination-buttons-editora">
                    <button onClick={() => setPage(Math.max(page - 1, 1))}>Anterior</button>
                    <span>Página {page}</span>
                    <button onClick={() => setPage(Math.min(page + 1, Math.ceil(totalRecords / limit)))}>Próxima</button>
                </div>
            </div>
        </div>
    );
};

export default Produtos;