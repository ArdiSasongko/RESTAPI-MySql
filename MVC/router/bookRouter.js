const express = require("express")
const router = new express.Router()
const book = require("../controller/bookController")

router.get("/", book.getBooks)
router.get("/:id", book.getBook)
router.post("/", book.insertBook)

module.exports = router