const express = require("express");
const { sequelize } = require("./models");
const { AppError, handleErrors } = require("./helpers/error");
const authorization = require("./middlewares/authorization");

const app = express();
app.use(express.json());
app.use(express.static('.'))

// Sync cái model của sequelize với DB
sequelize.sync({ alter: true });

const v1 = require("./routers/v1");
const upload = require("./middlewares/upload");
app.use("/api/v1", v1);



// Demo handle error
app.get("/error", (req, res, next) => {
  throw new AppError(500, "Internal Server");
});

// Middleware dùng để bắt và xử lý trả lỗi ra cho client
// Phải được đặt bên dưới các routers
app.use(handleErrors);

app.listen(4000);
