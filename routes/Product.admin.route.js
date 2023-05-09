const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const adminRoute = express.Router();
const { UserModel } = require("../models/user.model")

const { ProductModel } = require("../models/product.model");



module.exports = { adminRoute }