const prisma = require('@prisma/client');
const prismaClient = new prisma.PrismaClient();

class UserRepository {
    async findUserByEmail(email) {
        return await prismaClient.user.findUnique({
            where: { email }
        });
    }

    async createUser(userData) {
        return await prismaClient.user.create({
            data: userData
        });
    }

    async findUserById(id) {
        return await prismaClient.user.findUnique({
            where: { id }
        });
    }

    async updateUser(id, userData) {
        return await prismaClient.user.update({
            where: { id },
            data: userData
        });
    }
}

module.exports = new UserRepository();