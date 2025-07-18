import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import perfilIcon from "../../images/user.png";
import "./Header.css";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const checkLogin = () => {
            const token = localStorage.getItem('token');
            setIsLoggedIn(!!token);
        };

        checkLogin();
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setTimeout(() => setIsDropdownOpen(false), 200);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            navigate('/login');
        }
    };

    return (
        <header className="header-container">

            {/* Menu Hamburguer (somente mobile) */}
            <div className="hamburger-menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <div></div>
                <div></div>
                <div></div>
            </div>

            {/* Navbar mobile (hambúrguer) */}
            <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
                <ul>
                    <li><Link to="/home" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
                    <li><Link to="/produtos" onClick={() => setIsMobileMenuOpen(false)}>Produtos</Link></li>
                    <li><Link to="/categorias" onClick={() => setIsMobileMenuOpen(false)}>Categorias</Link></li>
                </ul>
            </nav>

            <div className="logo">
                <h1>Sistema de ecommerce</h1>
            </div>

            <div className="nav-content">
                <nav className="nav">
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/produtos">Produtos</Link></li>
                        <li><Link to="/categorias">Categorias</Link></li>
                    </ul>
                </nav>
            </div>

            {isLoggedIn && (
                <div className={`profile-container ${isDropdownOpen ? "active" : ""}`} ref={dropdownRef}>
                    <button
                        className="profileButton"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <img src={perfilIcon} alt="Ícone" height={40} />
                    </button>
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <Link to="/profile" className="dropdown-link">Ver Perfil</Link>
                            <Link to="/produtos" className="dropdown-link">Meus Produtos</Link>
                            <Link to="/carrinho" className="dropdown-link">Carrinho de Compras</Link>
                            <Link to="/pedido" className="dropdown-link">Meus Pedidos</Link>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;