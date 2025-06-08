const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

class UserService {
    async register(name, cpf, email, password) {
        if (!name || !cpf || !email || !password) {
            throw new Error('Todos os campos são obrigatórios');
        }

        const existingUser = await userRepository.findUserByEmail(email);
        if (existingUser) {
            throw new Error('Email já cadastrado');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        return await userRepository.createUser({
            name,
            cpf,
            email,
            password: hashedPassword
        });
    }

    async login(email, password) {
        if (!email || !password) {
            throw new Error('Email e senha são obrigatórios');
        }

        const user = await userRepository.findUserByEmail(email);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Senha inválida');
        }

        return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    }

    async getUserData(userId) {
        const user = await userRepository.findUserById(userId);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        return {
            id: user.id,
            name: user.name,
            cpf: user.cpf,
            email: user.email
        };
    }

    async updateUserData(userId, { name, cpf, email }) {
        return await userRepository.updateUser(userId, { name, cpf, email });
    }
}

module.exports = new UserService();