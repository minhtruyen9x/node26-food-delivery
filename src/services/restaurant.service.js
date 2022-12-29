const { Restaurant, User } = require('../models')
const { AppError } = require('../helpers/error')

const getRestaurants = async () => {
    try {
        const restaurants = await Restaurant.findAll({
            // include: {
            //     association: 'userLikes',
            //     through: {
            //         attributes: []
            //     }
            // },
            attributes: {
                exclude: "userId"
            },
            include: [
                'owner',
                {
                    association: 'userLikes',
                    attributes: {
                        exclude: ["email", "password"],
                    },
                    through: {
                        attributes: [],
                    }
                }
            ]
        })
        return restaurants
    } catch (error) {
        console.log(error)
        throw error
    }
}

const createRestaurant = async (restaurant) => {
    try {
        const newRestaurant = await Restaurant.create(restaurant)
        return newRestaurant
    } catch (error) {
        throw error
    }
}

// requester : thông tin user thực hiện request này
const deleteRestaurant = async (restaurantId, requester) => {
    try {
        const restaurant = await Restaurant.findByPk(restaurantId)
        if (!restaurant) {
            throw new AppError(400, "Restaurant not found")
        }

        // Kiểm tra người xóa nhà hàng, có phải là chủ nhà hàng hay không 
        if (restaurant.userId !== requester.id) {
            throw new AppError(403, "no have permission")
        }

        await restaurant.destroy()

    } catch (error) {
        throw error
    }
}

const likeRestaurant = async (userId, restaurantId) => {
    try {
        const restaurant = await Restaurant.findByPk(restaurantId)
        if (!restaurant) throw new AppError(400, "Restaurant not found")
        const user = await User.findByPk(userId)
        if (!user) throw new AppError(400, "User not found")
        console.log(restaurant.__proto__)
        // Khi thiết lập relationships cho các model,
        // mặc định sequelize sẽ tạo ra các phương thức cho các model
        // để tương tác với các model khác
        const hasLiked = await restaurant.hasUserLike(userId)
        if (hasLiked) {
            await restaurant.removeUserLike(userId)
        } else {

            await restaurant.addUserLike(userId)
        }
        return "OK"
    } catch (error) {

    }
}

module.exports = {
    getRestaurants,
    likeRestaurant,
    createRestaurant,
    deleteRestaurant
}