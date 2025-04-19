import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer-container">
            <p>&copy; {new Date().getFullYear()} Sistema de Biblioteca. Todos os direitos reservados.</p>
            <p>Feito para o programa <strong>Capacita Brasil</strong> por:</p>
            <ul className="footer-links">
            </ul>
        </footer>
    );
};

export default Footer;