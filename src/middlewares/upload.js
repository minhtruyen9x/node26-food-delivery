const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(req, file)
        // Setup thư mục mà file sẽ được lưu vào
        cb(null, './static/')
    },
    filename: (req, file, cb) => {
        // Override filename để tránh trường hợp cùng 1 thời điểm có 2 hoặc nhiều files cùng tên được upload
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

        cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
})

const upload = multer({ storage })

module.exports = upload