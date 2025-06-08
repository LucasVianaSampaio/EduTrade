const userService = require('../services/userService');

async function registerUser(req, res) {
    try {
        const { name, cpf, email, password } = req.body;
        await userService.register(name, cpf, email, password);
        return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const token = await userService.login(email, password);
        return res.json({ token });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
}

async function getUserData(req, res) {
    try {
        const userId = req.userId;
        const userData = await userService.getUserData(userId);
        return res.json(userData);
    } catch (error) {
        console.error(error);
        return res.status(404).json({ message: error.message });
    }
}

async function updateUserData(req, res) {
    try {
        const userId = req.userId;
        const { name, cpf, email } = req.body;
        const updatedUser = await userService.updateUserData(userId, { name, cpf, email });
        return res.json({
            id: updatedUser.id,
            name: updatedUser.name,
            cpf: updatedUser.cpf,
            email: updatedUser.email
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro no servidor' });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserData,
    updateUserData
};