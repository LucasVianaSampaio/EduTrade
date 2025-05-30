import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ProtectedRoute from './services/ProtectedRoute.js';
import Footer from './components/Footer/Footer.js';
import Header from './components/Header/Header.js';
import Home from './components/Home/Home.js';
import Profile from './components/Profile/Profile.js';
import Produtos from './components/produtos/produtos.js';
import ProdutosForm from './components/produtos/produtosForm/ProdutosForm.js';
import Categorias from './components/Categorias/Categorias.js';
import CategoriasForm from './components/Categorias/CategoriasForm/CategoriasForm.js';
import Login from './components/Login/LoginUser.js'
import Register from './components/Login/RegisterUser.js';
import PageNotFound from './components/NotFound/NotFound.js';
import { ThemeProvider } from './components/ThemeToggle/ThemeContext.js';
import ThemeToggle from './components/ThemeToggle/ThemeToggle.js';
import './components/ThemeToggle/DarkTheme.css'

function HeaderWrapper() {
  const location = useLocation();

  // Não exibe o Header nas rotas de Login e Register
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return <Header />;
}

function FooterWrapper() {
  const location = useLocation();

  // Não exibe o Footer nas rotas de Login e Register
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return <Footer />;
}

function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
      <Router>
        <HeaderWrapper /> 

        <Routes>
          {/* Rotas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rotas protegidas (necessitam de login) */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/produtos" element={<ProtectedRoute><Produtos /></ProtectedRoute>} />
          <Route path='/produtosform' element={<ProtectedRoute><ProdutosForm /></ProtectedRoute>} />
          <Route path='/produtosform/:id' element={<ProtectedRoute><ProdutosForm /></ProtectedRoute>} />
          <Route path="/categorias" element={<ProtectedRoute><Categorias /></ProtectedRoute>} />
          <Route path="/categoriasform" element={<ProtectedRoute><CategoriasForm /></ProtectedRoute>} />
          <Route path="/categoriasform/:id" element={<ProtectedRoute><CategoriasForm /></ProtectedRoute>} />
          {/* Rota padrão ou erro 404 */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <FooterWrapper />
      </Router>
    </ThemeProvider>
  );
}

export default App;