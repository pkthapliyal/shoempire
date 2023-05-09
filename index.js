const express = require("express");
const cors = require("cors");

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors())


const { userRoute } = require("./routes/User.route")
const { productRoute } = require("./routes/Product.route")
const { cartRoute } = require("./routes/Cart.route")
const { adminRoute } = require("./routes/Product.admin.route")
const { addressRoute } = require('./routes/Address.route')
const { orderRoute } = require("./routes/Order.route")

app.use("/", userRoute)
app.use("/products", productRoute)
app.use("/cart", cartRoute)
app.use("/admin", adminRoute)
app.use("/address", addressRoute)
app.use("/order", orderRoute)


const connection = require("./db");

app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Server is listening")
    } catch (error) {
        console.log(error)
    }

})