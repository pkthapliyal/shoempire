const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const orderRoute = express.Router();

const { UserModel } = require("../models/user.model")
const { ProductModel } = require("../models/product.model");
const { AddressModel } = require("../models/address.model")
const { OrderModel } = require("../models/order.model")

orderRoute.get("/user", async (req, res) => {
    const token = req.headers.authorization;
    tokenvalue = token.replace("Bearer ", "")
    jwt.verify(tokenvalue, "secretKey", async (err, decoded) => {
        if (decoded) {
            orderList = await OrderModel.find({ userID: decoded.userID })
            if (!orderList) {
                return res.status(200).send({ "message": false })
            }
            return res.status(200).send(orderList)
        }
        return res.status(404).send({ "message": err })
    })

})

orderRoute.get("/", async (req, res) => {
    orderList = await OrderModel.find()
    return res.status(200).send(orderList)
})


//  getting method

orderRoute.post("/add", async (req, res) => {
    const token = req.headers.authorization;
    tokenvalue = token.replace("Bearer ", "")
    jwt.verify(tokenvalue, "secretKey", async (error, decoded) => {
        if (decoded) {
            const userID = decoded.userID;
            const email = decoded.email;

            req.body.userID = userID;
            req.body.email = email;

            order = await OrderModel(req.body)
            await order.save();
            return res.status(200).send({ "message": `Your order has been placed successfully !` })
        }
        else {
            return res.status(404).send({ "message": error.message })
        }
    })
})




module.exports = { orderRoute }

