const { response } = require("../helpers/response");
const restaurantService = require("../services/restaurant.service");

const getRestaurants = () => {
    return async (req, res, next) => {
        const restaurants = await restaurantService.getRestaurants()
        res.status(200).json(response(restaurants))
        try {
        } catch (error) {
            next(error);
        }
    };
};

const createRestaurant = () => {
    return async (req, res, next) => {
        try {
            const { user } = res.locals
            const data = req.body
            // set userId, là thông tin người tạo nhà hàng
            data.userId = user.id

            const restaurant = await restaurantService.createRestaurant(data)

            res.status(200).json(response(restaurant))
        } catch (error) {
            next(error)
        }
    }
}

const deleteRestaurant = () => {
    return async (req, res, next) => {
        try {
            const { user } = res.locals
            const { id } = req.params

            await restaurantService.deleteRestaurant(id, user)
            res.status(200).json(response(true))
        } catch (error) {
            next(error)
        }
    }
}

// localhost:4000/restaurants/:restaurantId/like/:userId
const likeRestaurant = () => {
    return async (req, res, next) => {
        try {
            const { restaurantId } = req.params
            const { user } = res.locals
            const data = await restaurantService.likeRestaurant(user.id, restaurantId)
            res.status(200).json(response(data))
        } catch (error) {

        }
    }
}

module.exports = {
    getRestaurants,
    likeRestaurant,
    createRestaurant,
    deleteRestaurant
}