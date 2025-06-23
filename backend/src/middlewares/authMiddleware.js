const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        console.log('Token não fornecido');
        return res.status(401).json({ message: 'Acesso não autorizado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Erro ao verificar token:', err);
            return res.status(401).json({ message: 'Token inválido' });
        }

        req.user = { id: decoded.userId };
        next();
    });
}

module.exports = { authenticateToken };