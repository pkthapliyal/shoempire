const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const addressRoute = express.Router();
const { UserModel } = require("../models/user.model")

const { ProductModel } = require("../models/product.model");
const { AddressModel } = require("../models/address.model")

addressRoute.get("/:id", async (req, res) => {
    const token = req.headers.authorization;
    tokenvalue = token.replace("Bearer ", "")
    jwt.verify(tokenvalue, "secretKey", async (err, decoded) => {
        if (decoded) {
            user = await AddressModel.findOne({ _id: decoded.userID })
            console.log(user)
            return res.status(200).send(user.addressData)

        }
        return res.status(404).send({ "message": err })

    })
})

addressRoute.get("/", async (req, res) => {
    const token = req.headers.authorization;
    tokenvalue = token.replace("Bearer ", "")
    jwt.verify(tokenvalue, "secretKey", async (err, decoded) => {
        if (decoded) {
            console.log(decoded)
            user = await AddressModel.findOne({ userID: decoded.userID })

            if (!user.addressData) {
                return res.status(200).send(null)
            }
            return res.status(200).send(user.addressData)

        }
        return res.status(404).send({ "message": err })

    })
})
addressRoute.post("/add", async (req, res) => {
    const token = req.headers.authorization;
    tokenvalue = token.replace("Bearer ", "")
    jwt.verify(tokenvalue, "secretKey", async (error, decoded) => {

        if (decoded) {
            const productID = req.params.id;
            const userID = decoded.userID;
            const email = decoded.email;

            address = await AddressModel.findOne({ userID: userID })

            if (!address) {
                Address = AddressModel({ userID: userID, email: email, addressData: [req.body] })
                await Address.save()
                return res.status(200).send({ "message": `Address has been to your addresses` })

            }
            await AddressModel.updateOne({ userID: userID }, { $push: { addressData: req.body } })
            return res.status(200).send({ "message": `Address has been added to your addresses` })
        }
        else {
            return res.status(404).send({ "message": error.message })
        }
    })

})

module.exports = { addressRoute };