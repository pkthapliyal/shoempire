const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const cartRoute = express.Router();

const { CartModel } = require("../models/cart.model")
const { ProductModel } = require("../models/product.model")

//  getting cart item of individual user

cartRoute.get("/", async (req, res) => {
    const token = req.headers.authorization;
    tokenvalue = token.replace("Bearer ", "")
    jwt.verify(tokenvalue, "secretKey", async (err, decoded) => {
        if (decoded) {
            user = await CartModel.findOne({ userID: decoded.userID })
            if (user.cartItem.value == 0) {
                return res.status(200).send({ "message": "nothing in cart list" })
            }

            const { ObjectId } = require('mongodb');
            const ids = user.cartItem.map(id => new ObjectId(id))
            data = await ProductModel.find({ _id: { $in: ids } });
            return res.status(200).send(data)
        }
        return res.status(404).send({ "message": err })

    })
})

cartRoute.post("/:id", async (req, res) => {
    const token = req.headers.authorization;
    tokenvalue = token.replace("Bearer ", "")
    jwt.verify(tokenvalue, "secretKey", async (error, decoded) => {

        if (decoded) {
            const productID = req.params.id;
            const userID = decoded.userID;
            const email = decoded.email;

            product = await CartModel.findOne({ userID: userID })

            if (!product) {
                const cartItem = [productID]
                item = CartModel({ userID, email, cartItem })
                await item.save();
                return res.status(200).send({ "message": `Item has been added to cart ` })
            }
            let data = await CartModel.find({}, { _id: product._id, cartItem: { $elemMatch: { $eq: productID } } })
            if (data[0].cartItem.length == 0) {
                await CartModel.findOneAndUpdate({ _id: product._id, cartItem: { $ne: productID } }, { $push: { cartItem: productID } }, { new: true })
                return res.status(200).send({ "message": `Item has been added to cart ` })
            }
            else {
                return res.status(200).send({ "message": `Item is already in cart !` })
            }
        }
        else {
            return res.status(404).send({ "message": error.message })
        }
    })

})



cartRoute.patch("/remove/:id", async (req, res) => {
    const token = req.headers.authorization;
    tokenvalue = token.replace("Bearer ", "")
    jwt.verify(tokenvalue, "secretKey", async (error, decoded) => {

        if (decoded) {
            const productID = req.params.id;
            const userID = decoded.userID;
            const email = decoded.email;

            product = await CartModel.findOne({ userID: userID })
            let ans = await CartModel.findByIdAndUpdate({ _id: product._id }, { $pull: { cartItem: { $eq: productID } } })
            if (ans) {
                return res.status(200).send({ "message": "Item has been deleted !" })
            }
            else {
                return res.status(200).send(false)
            }
        }
        else {
            return res.status(404).send({ "message": error.message })
        }
    })
})

//  clear cart

cartRoute.patch("/clear", async (req, res) => {
    const token = req.headers.authorization;
    tokenvalue = token.replace("Bearer ", "")
    jwt.verify(tokenvalue, "secretKey", async (error, decoded) => {
        if (decoded) {
            const productID = req.params.id;
            const userID = decoded.userID;
            const email = decoded.email;

            await CartModel.updateOne({ userID: userID }, { $set: { cartItem: [] } })
            return res.status(200).send({ "message": "Cart has been cleared" })
        }
        else {
            return res.status(404).send({ "message": error.message })
        }
    })

})



module.exports = { cartRoute }