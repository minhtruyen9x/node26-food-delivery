// POST : /login - body: {eamil,password}

const { response } = require("../helpers/response")
const { User } = require("../models")
const authServices = require("../services/auth.service")

const login = () => {
    return async (req, res, next) => {
        try {
            const credentials = req.body
            const user = await authServices.login(credentials)
            res.status(200).json(response(user))
        } catch (error) {
            next(error)
        }
    }
}

const getProfile = () => {
    return (req, res, next) => {
        try {
            const { user } = res.locals
            res.status(200).json(response(user))
        } catch (error) {
            throw error
        }
    }

}

module.exports = {
    login,
    getProfile
}