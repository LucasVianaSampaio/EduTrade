import { useState, useEffect, useRef, useCallback } from "react";
import { getProdutosByFilters, deleteProduto } from "../../services/produtosService";
import { Link } from "react-router-dom";
import "./Produtos.css";

const Produtos = () => {
    const [produtos, setProdutos] = useState([]);
    const [filters, setFilters] = useState({ nome: "", emailContato: "", cnpj: "" });
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const cnpjInputRef = useRef(null);

    const fetchProdutos = useCallback(async () => {
        try {
            const data = await getProdutosByFilters();
            setProdutos(data);
            setTotalRecords(data.total);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Erro ao carregar produtos.");
            clearMessages();
        }
    }, []);

    useEffect(() => {
        fetchProdutos();
    }, [fetchProdutos]);


    const handleDelete = async (id) => {
        try {
            await deleteProduto(id);
            setSuccessMessage("Produto excluído com sucesso!");
            fetchProdutos();
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Erro ao excluir produto.");
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
            <h2 className="editora-title">Relação de produtos</h2>

            <Link to="/produtosform">
                <button className="editora-btn-new">Novo Produto</button>
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
                                <th>Preço</th>
                                <th>Descrição</th>
                                <th>Categoria</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map((produto) => (
                                <tr key={produto.id}>
                                    <td>{produto.titulo}</td>
                                    <td>{produto.preco}</td>
                                    <td>{produto.descricao}</td>
                                    <td>{produto.categoria.nome}</td>
                                    <td>
                                        <Link to={`/ProdutosForm/${produto.id}`}>
                                            <button className="editora-btn-edit">Editar</button>
                                        </Link>
                                        <button className="editora-btn-delete" onClick={() => handleDelete(produto.id)}>Excluir</button>
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