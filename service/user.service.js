const db = require('../dataBase').getInstance();


module.exports = {
    getUsers: () => {
        const UserModel = db.getModel('User')
        return UserModel.findAll({})

    },

    getUser: (id) => {
        const UserModel = db.getModel('User')
        return UserModel.findByPk(id)
    },

    getUserByParams: (params) => {
        const UserModel = db.getModel('User')

        return UserModel.findOne({
            where: params
        })
    },

    getUsersByParams: (params) => {
        const UserModel = db.getModel('User')

        return UserModel.findAll({
            where: params
        })
    },

    createUser: (user) => {
        const UserModel = db.getModel('User')
        return UserModel.create(user)

    },

    deleteUser: (id) => {
        const UserModel = db.getModel('User')
        return UserModel.destroy({
            where: {
                id
            }
        })
    },

    updateUser: (id, userParams) => {
        const UserModel = db.getModel('User')
        return UserModel.update(
            userParams, {
                where: {
                    id
                }
            })

    }
}
